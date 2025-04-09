window.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            // Convert string price "$10.00" to number 10.00
            const numericPrice = parseFloat(item.price.replace('$', ''));
            totalPrice += numericPrice * item.quantity;

            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>Price: ${item.price}</p>
                    <p>Category: ${item.category}</p>
                    <p>Description: ${item.description}</p>
                    <button class="remove-item" data-id="${item.id}">Remove</button>
                </div>
                <div class="quantity">
                    <button class="decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-id="${item.id}">+</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        // Show total price
        totalPriceElement.textContent = totalPrice.toFixed(2);

        // Quantity buttons
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.dataset.id, 1));
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.dataset.id, -1));
        });

        // Remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });
    }

    // Quantity update function
    function updateQuantity(itemId, change) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const item = cart.find(i => i.id == itemId);
        if (item) {
            item.quantity += change;
            if (item.quantity < 1) item.quantity = 1;
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        }
    }

    // Remove item
    function removeItem(itemId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(i => i.id != itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload();
    }

    // Checkout form submission
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

            alert(`Thank you for your purchase, ${name}!\nTotal: $${totalPrice.toFixed(2)}`);
            localStorage.removeItem('cart');
            window.location.href = 'thankyou.html'; // Or use location.reload();
        });
    }
});
