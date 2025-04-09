// JavaScript to handle form submission and show the popup
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Show the popup
    document.getElementById('popup').style.display = 'block';

    // Optionally, hide the contact form if you want to
    document.querySelector('.contact-form-section').style.display = 'none';
});

// Function to close the popup and clear form inputs
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.contact-form-section').style.display = 'block'; // Show the form again

    // Clear all input fields
    document.getElementById('contact-form').reset();
}
