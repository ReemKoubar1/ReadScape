document.addEventListener('DOMContentLoaded', () => {
    const savedBook = localStorage.getItem('selectedBook');
    const badge = document.querySelector('.badge');

    // Set initial cart badge
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (badge) {
        badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    if (!savedBook) {
        console.error("No book data found");
        return;
    }

    try {
        const book = JSON.parse(savedBook);
        console.log("Loaded book data:", book);

        // Display book data
        document.getElementById('book-title').textContent = book.title || "Untitled";
        document.getElementById('book-author').innerHTML = `<strong>Author:</strong> ${book.author || "Unknown"}`;
        document.getElementById('book-price').textContent = book.price || "Price not available";
        document.getElementById('book-category').textContent = book.category || "";
        document.getElementById('book-description').textContent = book.description || "No description available.";
        const imgElement = document.getElementById('book-cover');
        imgElement.src = book.image || 'https://via.placeholder.com/300x450';
        imgElement.alt = book.title || "Book cover";
    } catch (error) {
        console.error("Error parsing saved book:", error);
    }

    // Add to cart logic
    const addToCartBtn = document.getElementById('add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        const savedBook = localStorage.getItem('selectedBook');
        if (!savedBook) {
            console.error("No book data found to add to cart.");
            return;
        }

        try {
            const book = JSON.parse(savedBook);

            const newItem = {
                id: book.id || book.title, // Fallback to title if ID is not provided
                title: book.title,
                price: parseFloat(book.price?.replace('$', '') || 0),
                image: book.image,
                category: book.category,
                description: book.description,
                quantity: 1,
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingIndex = cart.findIndex(item => item.id === newItem.id);

            if (existingIndex > -1) {
                cart[existingIndex].quantity++;
            } else {
                cart.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            // Update badge
            if (badge) {
                badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
            }

            alert('Book added to cart!');
        } catch (err) {
            console.error("Error adding to cart:", err);
        }
    });
});