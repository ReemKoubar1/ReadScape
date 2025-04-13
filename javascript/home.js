function selectItem(product) {
   
    console.log("Product data:", product);
    
    
    const bookData = {
      id: product.id,
      title: product.title,
      author: product.author,
      image: product.image,
      description: product.description || product.synopsis || "",
      price: product.price
    };
    
    localStorage.setItem('selectedBook', JSON.stringify(bookData));
    window.location.href = 'book-details.html';
  }
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

            // Add to cart button functionality
            card.querySelector('.add-to-cart').addEventListener('click', () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || [];

                
                if (!cart.find(item => item.title === product.title)) {
                    cart.push({...product,quantity:1});
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${product.title} added to cart`);
                } else {
                    alert(`${product.title} is already in the cart`);
                }

                
                const badge = document.getElementById("badge");
                if (badge) badge.textContent = cart.length;
            });
            card.querySelector('.view').addEventListener('click', () => {
                selectItem(product)
            });
            
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
    loadProducts('products', 'data/product.json');
document.getElementsByClassName("add-to-cart").forEach((addToCartButton)=>{
addToCartButton.addEventListener('click', () => {
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    
    cart.push(product);

    
    localStorage.setItem('cart', JSON.stringify(cart));

    
    document.getElementById("badge").textContent = cart.length;
});
}
)
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

document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const response = await fetch('data/product.json'); 
        if (!response.ok) {
            throw new Error('Failed to load products.json');
        }
        window.allProducts = await response.json(); 
    } catch (error) {
        console.error('Error loading products:', error);
    }

    
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    let selectedIndex = -1;

    
    function handleSearch() {
        const term = searchInput.value.trim().toLowerCase();
        if (term.length < 1) {
            searchDropdown.style.display = 'none';
            return;
        }

        const results = window.allProducts
            .filter(product => 
                product.title.toLowerCase().includes(term) || 
                (product.author && product.author.toLowerCase().includes(term))
            )
            .sort((a, b) => {
                const aIndex = a.title.toLowerCase().indexOf(term);
                const bIndex = b.title.toLowerCase().indexOf(term);
                return aIndex - bIndex;
            });

        showResults(results);
    }

    function showResults(results) {
        searchDropdown.innerHTML = '';
        selectedIndex = -1;
    
        if (results.length === 0) {
            searchDropdown.innerHTML = '<div class="search-dropdown-item">No results found</div>';
            searchDropdown.style.display = 'block';
            return;
        }

        const uniqueResults = results.filter((product, index, self) =>
            index === self.findIndex(p => p.id === product.id)
        );
    
        uniqueResults.slice(0, 8).forEach((product, index) => {
            const item = document.createElement('div');
            item.className = 'search-dropdown-item';
            item.innerHTML = `
                <img src="${product.image}" alt="${product.title}" onerror="this.src='https://via.placeholder.com/40x60'">
                <div class="info">
                    <div class="title">${product.title}</div>
                    <div class="author">${product.author || 'Unknown Author'}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                selectItem(product);
            });
            searchDropdown.appendChild(item);
        });
        searchDropdown.style.display = 'block';

        const searchBar = document.querySelector('.search-bar');
        const searchBarRect = searchBar.getBoundingClientRect();
        
        searchDropdown.style.width = `${searchBarRect.width}px`;
        searchDropdown.style.left = `${searchBarRect.left}px`;
        searchDropdown.style.top = `${searchBarRect.bottom + window.scrollY + 5}px`;
        
        searchDropdown.style.display = 'block';
    }

   

    
    searchInput.addEventListener('keydown', (e) => {
        const items = searchDropdown.querySelectorAll('.search-dropdown-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = Math.min(selectedIndex + 1, items.length - 1);
            updateSelection();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = Math.max(selectedIndex - 1, -1);
            updateSelection();
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        }
    });

    function updateSelection() {
        const items = searchDropdown.querySelectorAll('.search-dropdown-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === selectedIndex);
        });
    }

  

    
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim().length > 0) {
            handleSearch();
        }
    });

    
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
            searchDropdown.style.display = 'none';
        }
    });

    

    
    loadProducts('bestsellers', 'data/bestseller.json');
    loadProducts('new-arrivals', 'data/new-arrival.json');
    loadProducts('products', 'data/product.json');
});