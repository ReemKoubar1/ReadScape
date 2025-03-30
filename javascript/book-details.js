document.addEventListener('DOMContentLoaded', () => {
    const savedBook = localStorage.getItem('selectedBook');
    
    if (!savedBook) {
        console.error("No book data found");
        return;
    }

    try {
        const book = JSON.parse(savedBook);
        console.log("Loaded book data:", book); // Debug log

        // Update required fields
        document.getElementById('book-title').textContent = book.title || "Untitled";
        
        // PRICE - ensure this element exists in HTML
        const priceElement = document.getElementById('book-price');
        if (priceElement && book.price) {
            priceElement.textContent = book.price;
        } else {
            console.warn("Price element missing or no price data");
        }
        
        // CATEGORY - ensure this element exists in HTML
        const categoryElement = document.getElementById('book-category');
        if (categoryElement && book.category) {
            categoryElement.textContent = book.category;
        } else {
            console.warn("Category element missing or no category data");
        }

        // IMAGE
        const imgElement = document.getElementById('book-cover');
        imgElement.src = book.image || 'https://via.placeholder.com/300x450';
        imgElement.alt = book.title || "Book cover";

        // DESCRIPTION (optional)
        if (document.getElementById('book-description') && book.description) {
            document.getElementById('book-description').textContent = book.description;
        }

    } catch (error) {
        console.error("Error loading book:", error);
    }
});