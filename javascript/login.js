function switchForm(form) {
    const authContainer = document.querySelector('.auth-container');
    
    if (form === 'register') {
        authContainer.classList.add('register-active');
    } else {
        authContainer.classList.remove('register-active');
    }
}

// Initialize the user list (only once)
const defaultUsers = [
    { name: "Farah", email: "farah@gmail.com", password: "1234" },
    { name: "Reem", email: "reem@gmail.com", password: "1234" },
    { name: "Angy", email: "angy@gmail.com", password: "1234" }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Handle login
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Welcome, " + user.name + "!");
        // Redirect or show dashboard here
    } else {
        alert("Invalid email or password.");
    }

    return false;
}
