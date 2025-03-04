const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const productGrid = document.querySelector('.product-grid');
const cartIcon = document.querySelector('.cart-icon');
const cartBox = document.querySelector('.cart-box');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const cartCount = document.querySelector('.cart-count');
let cartItems = []; // Array to store cart items

// Scroll product grid left
leftArrow.addEventListener('click', () => {
    productGrid.scrollBy({ left: -200, behavior: 'smooth' });
});

// Scroll product grid right
rightArrow.addEventListener('click', () => {
    productGrid.scrollBy({ left: 200, behavior: 'smooth' });
});

// Magnifier icon to preview book (dummy functionality)
const magnifierIcons = document.querySelectorAll('.magnifier-icon');
magnifierIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        alert('Previewing book!');
    });
});

// Plus icon to add book to cart (update cart count)
const plusIcons = document.querySelectorAll('.plus-icon');
plusIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        const product = event.target.closest('.product');
        const id = product.dataset.id;
        const title = product.dataset.title;
        const price = parseFloat(product.dataset.price);
        const image = product.dataset.image;

        const existingItem = cartItems.find(item => item.id === id);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cartItems.push({ id, title, price, image, quantity: 1 });
        }

        updateCart();
    });
});

function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    cartCount.textContent = totalItems;
    populateCart();
}

function populateCart() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="cart-item-details">
                <p>${item.title}</p>
                <div class="cart-item-quantity">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

    // Quantity controls
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            const item = cartItems.find(item => item.id === id);
            if (item) {
                item.quantity++;
                updateCart();
            }
        });
    });

    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            const item = cartItems.find(item => item.id === id);
            if (item && item.quantity > 1) {
                item.quantity--;
                updateCart();
            }
        });
    });

    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            cartItems = cartItems.filter(item => item.id !== id);
            updateCart();
        });
    });
}

// Clear cart
document.querySelector('.clear-cart-btn').addEventListener('click', () => {
    cartItems = [];
    updateCart();
});

cartIcon.addEventListener('click', (event) => {
    event.preventDefault();
    cartBox.classList.toggle('active');
    if (cartBox.classList.contains('active')) {
        populateCart();
    }
});

// Close cart when clicking outside
document.addEventListener('click', (event) => {
    if (!cartIcon.contains(event.target) && !cartBox.contains(event.target)) {
        cartBox.classList.remove('active');
    }
});

// Prevent cart from closing when clicking inside
cartBox.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Close cart when clicking close button
document.querySelector('.close-cart-btn').addEventListener('click', () => {
    cartBox.classList.remove('active');
});

const searchBar = document.getElementById('search-bar');
const searchButton = document.getElementById('search-btn');

searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        //implementing the search functionality for later
        alert('Searching for: ' + query); // Example placeholder action
    }
});

// Enter key
searchBar.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const query = searchBar.value.trim();
        if (query) {
            alert('Searching for: ' + query); // Example placeholder action
        }
    }
});
