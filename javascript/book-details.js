document.addEventListener('DOMContentLoaded', () => {
    const savedBook = localStorage.getItem('selectedBook');
    
    if (!savedBook) {
        console.error("No book data found");
        return;
    }

    try {
        const book = JSON.parse(savedBook);
        console.log("Loaded book data:", book);

        // Title
        document.getElementById('book-title').textContent = book.title || "Untitled";

        // Price
        const priceElement = document.getElementById('book-price');
        if (priceElement) {
            console.log(book);
            if (book.price && book.price.trim() !== "") {
                priceElement.textContent = book.price;
            } else {
                priceElement.textContent = "Price not available";
                console.warn("Book has no price.");
            }
        } else {
            console.warn("Price element not found in DOM.");
        }

        // Category
        const categoryElement = document.getElementById('book-category');
        if (categoryElement && book.category) {
            categoryElement.textContent = book.category;
        } else {
            console.warn("Category element missing or no category data");
        }

        // Author
        const authorElement = document.getElementById('book-author');
        if (authorElement && book.author) {
            authorElement.innerHTML = `<strong>Author:</strong> ${book.author}`; // Corrected this line
        } else {
            console.warn("Author element missing or no author data");
        }

        // Image
        const imgElement = document.getElementById('book-cover');
        if (imgElement) {
            imgElement.src = book.image || 'https://via.placeholder.com/300x450';
            imgElement.alt = book.title || "Book cover";
        }

        // Description
        const descElement = document.getElementById('book-description');
        if (descElement && book.description) {
            descElement.textContent = book.description;
        }

    } catch (error) {
        console.error("Error loading book:", error);
    }
});

document.getElementById('add-to-cart').addEventListener('click', () => {
    const savedBook = localStorage.getItem('selectedBook');
    if (!savedBook) {
        console.error("No book data found to add to cart.");
        return;
    }

    try {
        const book = JSON.parse(savedBook); // We already have the book data in localStorage

        const newItem = {
            id: book.id,
            title: book.title,
            price: parseFloat(book.price.replace('$', '')), // Remove '$' and convert to number
            image: book.image,
            category: book.category,
            description: book.description,
            quantity: 1, // Initially set to 1
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || []; // Get existing cart or create a new one
        // Check if the item already exists in the cart
        const existingItemIndex = cart.findIndex(item => item.id === book.id);
        if (existingItemIndex > -1) {
            // If the item exists, increment the quantity
            cart[existingItemIndex].quantity++;
        } else {
            // If the item doesn't exist, add it to the cart
            cart.push(newItem);
        }
        localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage

        alert('Book added to cart!');
    } catch (error) {
        console.error('Error adding book to cart:', error);
    }
});
