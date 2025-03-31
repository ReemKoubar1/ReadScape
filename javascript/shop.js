document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("products");
    const categoryFilter = document.getElementById("categoryFilter");

    // Function to fetch products and display them
    async function fetchProducts() {
        try {
            const response = await fetch('data/product.json');
            const products = await response.json();

            // Populate category filter
            const categories = new Set();
            products.forEach(product => categories.add(product.category));

            categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            // Function to render products based on selected category
            function renderProducts(selectedCategory) {
                productContainer.innerHTML = '';
                const filteredProducts = selectedCategory
                    ? products.filter(product => product.category === selectedCategory)
                    : products;

                filteredProducts.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.classList.add('product-card');
                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" class="product-image">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <p class="price">${product.price}</p>
                        <button class="add-to-cart">Add to Cart</button>
                    `;
                    productContainer.appendChild(productCard);
                });
            }

            // Initially render all products
            renderProducts("");

            // Update products when category filter changes
            categoryFilter.addEventListener('change', () => {
                renderProducts(categoryFilter.value);
            });

        } catch (error) {
            console.error("Error fetching the product data: ", error);
        }
    }

    fetchProducts();
});


