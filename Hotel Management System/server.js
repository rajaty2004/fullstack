const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

let bookings = [];
let inventory = [
  { item: "Towel", quantity: 100 },
  { item: "Soap", quantity: 200 },
];
let bills = [];
let feedbacks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.post("/book", (req, res) => {
  const { name, room } = req.body;
  bookings.push({ name, room });
  res.redirect("/bookings.html");
});

app.post("/inventory", (req, res) => {
  const { item, quantity } = req.body;
  inventory.push({ item, quantity: parseInt(quantity) });
  res.redirect("/inventory.html");
});

app.post("/billing", (req, res) => {
  const { guest, amount } = req.body;
  bills.push({ guest, amount: parseFloat(amount) });
  res.redirect("/billing.html");
});

app.post("/feedback", (req, res) => {
  const { guest, message } = req.body;
  feedbacks.push({ guest, message });
  res.redirect("/feedback.html");
});

app.get("/data", (req, res) => {
  res.json({ bookings, inventory, bills, feedbacks });
});

app.get("/all-bookings", (req, res) => {
  let html = "<h1>All Bookings</h1><ul>";
  bookings.forEach(b => html += `<li>${b.name} - Room ${b.room}</li>`);
  html += "</ul><a href='/'>Back</a>";
  res.send(html);
});

app.get("/all-inventory", (req, res) => {
  let html = "<h1>Inventory</h1><ul>";
  inventory.forEach(i => html += `<li>${i.item}: ${i.quantity}</li>`);
  html += "</ul><a href='/'>Back</a>";
  res.send(html);
});

app.get("/all-bills", (req, res) => {
  let html = "<h1>Bills</h1><ul>";
  bills.forEach(b => html += `<li>${b.guest}: $${b.amount}</li>`);
  html += "</ul><a href='/'>Back</a>";
  res.send(html);
});

app.get("/all-feedbacks", (req, res) => {
  let html = "<h1>Feedbacks</h1><ul>";
  feedbacks.forEach(f => html += `<li>${f.guest}: ${f.message}</li>`);
  html += "</ul><a href='/'>Back</a>";
  res.send(html);
});

app.listen(port, () => {
  console.log(`Hotel Management app running at http://localhost:${port}`);
});
