$(document).ready(function () {
    const $productContainer = $("#products");
    const $categoryFilter = $("#categoryFilter");

    async function fetchProducts() {
        try {
            const response = await fetch('data/product.json');
            const products = await response.json();

            // Populate category filter
            const categories = new Set();
            products.forEach(product => categories.add(product.category));

            categories.forEach(category => {
                $categoryFilter.append(
                    $("<option></option>").val(category).text(category)
                );
            });

            function renderProducts(selectedCategory) {
                $productContainer.empty();

                const filteredProducts = selectedCategory
                    ? products.filter(product => product.category === selectedCategory)
                    : products;

                filteredProducts.forEach(product => {
                    const $productCard = $(`
                        <div class="product-card">
                            <img src="${product.image}" alt="${product.title}" class="product-image">
                            <h3>${product.title}</h3>
                            <p>${product.description}</p>
                            <p class="price">${product.price}</p>
                            <button class="add-to-cart">Add to Cart</button>
                        </div>
                    `);

                    $productCard.find(".add-to-cart").on("click", () => {
                        let cart = JSON.parse(localStorage.getItem("cart")) || [];

                        if (!cart.find(item => item.title === product.title)) {
                            cart.push({ ...product, quantity: 1 });
                            localStorage.setItem("cart", JSON.stringify(cart));
                            alert(`${product.title} added to cart`);
                        } else {
                            alert(`${product.title} is already in the cart`);
                        }

                        $("#badge").text(cart.length);
                    });

                    $productContainer.append($productCard);
                });
            }

            // Initial render
            renderProducts("");

            // On category change
            $categoryFilter.on("change", function () {
                renderProducts($(this).val());
            });

        } catch (error) {
            console.error("Error fetching the product data: ", error);
        }
    }

    fetchProducts();
});

function selectItem(product) {
    console.log("Product data:", product);

    const bookData = {
        id: product.id,
        title: product.title,
        author: product.author,
        image: product.image,
        description: product.description || product.synopsis || "",
        price: product.price
    };

    localStorage.setItem("selectedBook", JSON.stringify(bookData));
    window.location.href = "book-details.html";
}
