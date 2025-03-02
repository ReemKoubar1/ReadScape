const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const productGrid = document.querySelector('.product-grid');

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

const cartCount = document.querySelector('.cart-count');  // Get the cart count element
let cartItems = parseInt(cartCount.textContent) || 0;  // Initialize the cart count (starting from the current number or 0)

// Plus icon to add book to cart (update cart count)
const plusIcons = document.querySelectorAll('.plus-icon');
plusIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        cartItems++;  // Increment the cart count
        cartCount.textContent = cartItems;  // Update the cart count display
    });
});
