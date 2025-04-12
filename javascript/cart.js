window.addEventListener('DOMContentLoaded', async function () {
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const badge = document.querySelector('.badge');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = [];
    try {
        const [productsResponse, bestsellersResponse] = await Promise.all([
            fetch('data/product.json'),
            fetch('data/bestseller.json')
        ]);

        const productsData = await productsResponse.json();
        const bestsellersData = await bestsellersResponse.json();

        // Combine both arrays into one
        products = [...productsData, ...bestsellersData];
    } catch (error) {
        console.error('Error fetching product data:', error);
    }

    function renderCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceElement.textContent = '0.00';
            updateBadge();
            return;
        }

        cart.forEach(item => {
            const product = products.find(p => p.id == item.id);
            if (!product) return;

            const price = typeof product.price === 'string' ? parseFloat(product.price.replace('$', '')) : product.price;
            totalPrice += price * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
         
            cartItem.innerHTML = `
                <img src="${product.image}" alt="${product.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${product.title}</h3>
                    <p>Price: $${price.toFixed(2)}</p>
                    <p>Category: ${product.category}</p>
                    <p>Description: ${product.description || "No description available."}</p>
                    <button class="remove-item" data-id="${product.id}">Remove</button>
                </div>
                <div class="quantity">
                    <button class="decrease" data-id="${product.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${product.id}">+</button>
                </div>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalPriceElement.textContent = totalPrice.toFixed(2);
        updateBadge();
        attachEventListeners();
    }

    function updateBadge() {
        if (badge) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badge.textContent = totalItems;
        }
    }

    function attachEventListeners() {
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.id;
                const item = cart.find(i => i.id == itemId);
                if (item) {
                    item.quantity++;
                    saveCart();
                }
            });
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.id;
                const item = cart.find(i => i.id == itemId);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    saveCart();
                }
            });
        });

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const itemId = button.dataset.id;
                cart = cart.filter(i => i.id != itemId);
                saveCart();
            });
        });
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    // Checkout
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const address = document.getElementById('address').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !address || !email) {
                alert("Please fill in all the fields.");
                return;
            }

            alert(`Thank you for your purchase, ${name}!\nTotal: $${totalPriceElement.textContent}`);
            localStorage.removeItem('cart');
            window.location.href = 'thankyou.html';
        });
    }

    renderCart();
});
