const addButton = document.getElementById('addButton');
const progressBar = document.getElementById('progressBar');

let currentWidth = 0;

addButton.addEventListener('click', () => {
    if (currentWidth < 100) {
        currentWidth += 10;
        if (currentWidth > 100) currentWidth = 100;
        progressBar.style.width = currentWidth + '%';
    }
});
