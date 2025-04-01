document.addEventListener("DOMContentLoaded", () => {
    const authorContainer = document.getElementById("authors");
    const authorSearch = document.getElementById("authorSearch");
    const backArrowContainer = document.getElementById("backArrowContainer");
    const backArrow = document.getElementById("backArrow");
    let allAuthors = [];

    async function fetchAuthors() {
        try {
            const response = await fetch('data/authors.json');
            allAuthors = await response.json();
            displayAuthors(allAuthors);
            authorSearch.addEventListener("input", () => filterAuthors(allAuthors));
        } catch (error) {
            console.error("Error fetching authors:", error);
        }
    }

    function displayAuthors(authorsList) {
        authorContainer.innerHTML = '';
        backArrowContainer.style.display = "none"; // Hide back arrow when displaying authors
        authorsList.forEach(author => {
            const authorCard = document.createElement('div');
            authorCard.classList.add('author-card');
            authorCard.innerHTML = `
                <img src="${author.image}" alt="${author.name}" class="author-image" />
                <h3>${author.name}</h3>
            `;
            authorCard.addEventListener("click", () => showAuthorDetails(author));
            authorContainer.appendChild(authorCard);
        });
    }

    function filterAuthors(authorsList) {
        const searchTerm = authorSearch.value.toLowerCase();
        const filteredAuthors = authorsList.filter(author =>
            author.name.toLowerCase().includes(searchTerm)
        );
        displayAuthors(filteredAuthors);
    }

    function showAuthorDetails(author) {
        authorContainer.innerHTML = `
            <div class="author-details">
                <img src="${author.image}" alt="${author.name}" class="author-details-image" />
                <h2>${author.name}</h2>
                <p><strong>Nationality:</strong> ${author.nationality}</p>
                <p><strong>Bio:</strong> ${author.bio}</p> 
                <h3>Books</h3>
                <ul>
                    ${author.books.map(book => `<li>${book}</li>`).join('')}
                </ul>
            </div>
        `;
        backArrowContainer.style.display = "block"; // Show back arrow when displaying details
    }

    backArrow.addEventListener("click", () => {
        displayAuthors(allAuthors);
    });

    fetchAuthors();
});