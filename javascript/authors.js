const authors = [
    { name: "J.K. Rowling", image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-1061157246.jpg?crop=1xw:1.0xh;center,top&resize=640:*", books: ["Harry Potter and the Philosopher's Stone", "Harry Potter and the Chamber of Secrets"] },
    { name: "Ernest Hemingway", image: "https://d3i6fh83elv35t.cloudfront.net/static/2018/08/ernest_hemingway-1024x820.jpg", books: ["The Old Man and the Sea", "A Farewell to Arms"] },
    { name: "Jane Austen", image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTumFtyTl8aU7YueE9RG11lj1GDxJXf4BjLm-4Iznkm5-7hyQv3foGINzhUZkuDNrPSSwXTyHJNzmIWTjYFImKGuA", books: ["Pride and Prejudice", "Sense and Sensibility"] },
    { 
        name: "F. Scott Fitzgerald", 
        image: "https://m.media-amazon.com/images/M/MV5BNzhkYTNkNTktN2M5OS00MjU5LWFkMWQtZGEwOWIzZjcyY2NiXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg", 
        books: ["The Great Gatsby"] 
    },
    { 
        name: "George Orwell", 
        image: "https://static.toiimg.com/photo/101256138/101256138.jpg?v=3", 
        books: ["1984", "Animal Farm"] 
    },
    { 
        name: "Harper Lee", 
        image: "https://lambdaliterary.org/wp-content/uploads/2016/02/Harper-Lee.jpg", 
        books: ["To Kill a Mockingbird"] 
    },
    
   
    { 
        name: "J.D. Salinger", 
        image: "https://media.newyorker.com/photos/590951a96552fa0be682be33/master/pass/gopnik-salinger.jpg", 
        books: ["The Catcher in the Rye"] 
    },
    { 
        name: "Herman Melville", 
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Herman_Melville_by_Joseph_O_Eaton.jpg", 
        books: ["Moby Dick"] 
    },
    { 
        name: "Leo Tolstoy", 
        image: "https://www.thoughtco.com/thmb/74ysiATPKgj6bGEVy5Ge4eT8XQA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-3088579-ba5869cf16484fb3a31edb588a63d187.jpg", 
        books: ["War and Peace"] 
    },
    { 
        name: "Fyodor Dostoevsky", 
        image: "https://www.thoughtco.com/thmb/m1OBwm7kZ3wx6GKKOJubQLtOrzw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-961442608-68a9f6aaa0ef455890f2a95b4357941c.jpg", 
        books: ["Crime and Punishment"] 
    },
    { 
        name: "J.R.R. Tolkien", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZtSowIDBzUpfOY6J8g1ZayUm2m09bQ6r0Ng&s", 
        books: ["The Hobbit"] 
    },
    { 
        name: "Aldous Huxley", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKBgnmGn2tE50vS-ZFL7bSUMHYlZwi_Fol9w&s", 
        books: ["Brave New World"] 
    }
    
];

function filterAuthors() {
    const searchTerm = document.getElementById('authorSearch').value.toLowerCase();
    const filteredAuthors = authors.filter(author => author.name.toLowerCase().includes(searchTerm));
    
    displayAuthors(filteredAuthors);
}

function displayAuthors(filteredAuthors) {
    const authorListContainer = document.getElementById('authorList');
    authorListContainer.innerHTML = ''; // Clear existing authors

    filteredAuthors.forEach(author => {
        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card');
        authorCard.innerHTML = `
            <img src="${author.image}" alt="${author.name}" class="author-image">
            <div class="author-info">
                <h2 class="author-name">${author.name}</h2>
            </div>
        `;

        authorCard.addEventListener('click', () => openAuthorBooks(author)); // Open books when clicked
        authorListContainer.appendChild(authorCard);
    });
}

function openAuthorBooks(author) {
    const authorListContainer = document.getElementById('authorList');
    
    // Replace the entire content with books
    authorListContainer.innerHTML = `
        <div class="books-container">
            <h1>Books by ${author.name}</h1>
            <div class="books-grid">
                ${author.books.map(book => `<div class="book-card">${book}</div>`).join('')}
            </div>
        </div>
    `;
}


// Initialize with all authors
document.addEventListener('DOMContentLoaded', () => {
    displayAuthors(authors);
});
