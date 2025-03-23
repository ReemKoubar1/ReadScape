function switchForm(form) {
    const authContainer = document.querySelector('.auth-container');
    
    if (form === 'register') {
        authContainer.classList.add('register-active');
    } else {
        authContainer.classList.remove('register-active');
    }
}
