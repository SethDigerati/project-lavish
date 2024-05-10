// Sample scraped product data (replace with actual scraped data)
const products = [
    { name: "Product 1", price: "$19.99", image: "product1.jpg" },
    { name: "Product 2", price: "$29.99", image: "product2.jpg" },
    { name: "Product 3", price: "$39.99", image: "product3.jpg" }
];

// Function to create a product card HTML element
function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    const image = document.createElement('img');
    image.src = product.image;
    card.appendChild(image);

    const name = document.createElement('h3');
    name.textContent = product.name;
    card.appendChild(name);

    const price = document.createElement('p');
    price.textContent = product.price;
    card.appendChild(price);

    return card;
}

// Function to display products as product cards
function displayProducts(products) {
    const container = document.getElementById('product-container');
    products.forEach(product => {
        const card = createProductCard(product);
        container.appendChild(card);
    });
}

// Call the function to display products
displayProducts(products);
