async function loadProducts(sectionId, jsonFile) {
    const container = document.getElementById(sectionId);
    try {
        const response = await fetch(jsonFile);
        const products = await response.json();

        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');

            card.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <div class="info">
                    <div class="title">${product.title}</div>
                    <div class="price">${product.price}</div>
                    <div class="actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="view">View</button>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    } catch (error) {
        console.error(`Error loading ${jsonFile}:`, error);
    }
}

function scrollSection(sectionId, direction) {
    const container = document.getElementById(sectionId);
    const scrollAmount = 200; 
    container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts('bestsellers', 'data/bestseller.json');
    loadProducts('new-arrivals', 'data/new-arrival.json');
    loadProducts('products', 'data/product.json');
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const answer = button.nextElementSibling;
        const isVisible = answer.style.display === 'block';

        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });

        if (!isVisible) {
            answer.style.display = 'block';
        } else {
            answer.style.display = 'none';
        }
    });
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    alert('Thank you for contacting us! We will get back to you soon.');

    this.reset();
});