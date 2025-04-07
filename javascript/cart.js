window.onload = function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p>Price: $${item.price.toFixed(2)}</p>
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

        // Handling quantity change
        document.querySelectorAll('.increase').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.dataset.id, 1));
        });

        document.querySelectorAll('.decrease').forEach(button => {
            button.addEventListener('click', () => updateQuantity(button.dataset.id, -1));
        });

        // Remove item from cart
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => removeItem(button.dataset.id));
        });
    }
};

function updateQuantity(itemId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id == itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) item.quantity = 1; // Prevent negative quantity
        localStorage.setItem('cart', JSON.stringify(cart));
        location.reload(); // Reload to reflect changes
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(i => i.id != itemId); // Remove item by ID
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload(); // Reload to reflect changes
}
