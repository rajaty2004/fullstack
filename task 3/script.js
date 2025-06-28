const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const productList = document.getElementById('productList');
const sortSelect = document.getElementById('sortSelect');

let allProducts = [];

function renderProducts(products) {
    productList.innerHTML = '';
    products.forEach(function(product) {
        const li = document.createElement('li');
        li.className = 'product-item';

        const img = document.createElement('img');
        img.src = product.image;
        img.alt = product.name;
        img.width = 180;
        img.height = 180;
        img.className = 'product-image';

        const name = document.createElement('h3');
        name.textContent = product.name;
        name.className = 'product-name';

        const title = document.createElement('p');
        title.textContent = product.title;
        title.className = 'product-title';

        const price = document.createElement('p');
        price.textContent = 'Price: $' + (product.price ? product.price.toFixed(2) : 'N/A');
        price.className = 'product-price';

        li.appendChild(img);
        li.appendChild(name);
        li.appendChild(title);
        li.appendChild(price);

        productList.appendChild(li);
    });
}

function fetchProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            allProducts = data.map(function(product) {
                return {
                    id: product.id,
                    name: product.title,
                    title: product.description || '',
                    image: product.image,
                    price: product.price,
                    rating: product.rating && product.rating.rate ? product.rating.rate : 0
                };
            });
            renderProducts(allProducts);
        })
        .catch(function(error) {
            console.error('Error fetching products:', error);
            productList.innerHTML = '<li>Error loading products</li>';
        });
}

function filterAndSortProducts() {
    const query = searchInput.value.trim().toLowerCase();
    let filtered = allProducts;

    if (query !== '') {
        filtered = allProducts.filter(function(product) {
            return product.name.toLowerCase().includes(query);
        });
    }

    const sortValue = sortSelect ? sortSelect.value : '';

    if (sortValue === 'asc') {
        filtered.sort(function(a, b) {
            return a.price - b.price;
        });
    } else if (sortValue === 'desc') {
        filtered.sort(function(a, b) {
            return b.price - a.price;
        });
    }

    renderProducts(filtered);
}

searchButton.addEventListener('click', filterAndSortProducts);
if (sortSelect) {
    sortSelect.addEventListener('change', filterAndSortProducts);
}
window.addEventListener('load', fetchProducts);
