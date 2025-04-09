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
                    productCard.querySelector('.add-to-cart').addEventListener('click', () => {
                        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        
                        // Optional: avoid duplicate entries
                        if (!cart.find(item => item.title === product.title)) {
                            cart.push({...product,quantity:1});
                            localStorage.setItem('cart', JSON.stringify(cart));
                            alert(`${product.title} added to cart`);
                        } else {
                            alert(`${product.title} is already in the cart`);
                        }
        
                        // Update badge count
                        const badge = document.getElementById("badge");
                        if (badge) badge.textContent = cart.length;
                    });
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


function selectItem(product) {
    // Verify we have the right product data
    console.log("Product data:", product);
    
    // Ensure we're saving all required fields
    const bookData = {
      title: product.title,
      author: product.author,
      image: product.image,
      description: product.description || product.synopsis || "",
      price: product.price
    };
        
    localStorage.setItem('selectedBook', JSON.stringify(bookData));
    window.location.href = 'book-details.html';
}