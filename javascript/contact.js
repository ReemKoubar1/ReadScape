
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

 
    document.getElementById('popup').style.display = 'block';

   
    document.querySelector('.contact-form-section').style.display = 'none';
});


function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.querySelector('.contact-form-section').style.display = 'block'; 

    
    document.getElementById('contact-form').reset();
}
