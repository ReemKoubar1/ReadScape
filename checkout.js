const checkoutCartItems = document.getElementById('checkoutCartItems');
const checkoutCartTotal = document.getElementById('checkoutCartTotal');

// Retrieve cart items from localStorage (or your preferred storage)
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function populateCheckoutCart() {
    checkoutCartItems.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <p>${item.title}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            </div>
        `;
        checkoutCartItems.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    checkoutCartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

populateCheckoutCart();

// Address form submission (dummy functionality)
document.getElementById('addressForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const zip = document.getElementById('zip').value;

    alert(`Address submitted:\nName: ${name}\nAddress: ${address}\nCity: ${city}\nZIP: ${zip}`);

    // Here you would send the address and cart data to your server
    // For now, clear the cart and redirect or show a confirmation
    localStorage.removeItem('cartItems');
    window.location.href = 'index.html'; // Redirect to home page
});