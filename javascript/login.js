// Function to switch between login and registration forms
function switchForm(formType) {
    const container = document.getElementById('authContainer');
    if (formType === 'register') {
        container.classList.add('register-active');
    } else {
        container.classList.remove('register-active');
    }
}

// Login functionality
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        alert("Welcome, " + user.name + "!");

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
    } else {
        alert("Invalid email or password.");
    }

    return false;
}


function registerUser(event) {
    event.preventDefault();

    
    const allowedUsers = [
        { name: "lynn Chahine", email: "lynn@gmail.com" },
        { name: "alaa Saab", email: "alaa@gmail.com" },
        { name: "adam Khatib", email: "adam@gmail.com" }
    ];

    const nameInput = document.getElementById("reg-name").value.trim().toLowerCase();
    const emailInput = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Check if the user is allowed to register
    const matchedUser = allowedUsers.find(
        user => user.name.toLowerCase() === nameInput && user.email.toLowerCase() === emailInput
    );

    if (!matchedUser) {
        alert("Welcome to ReadScape");
        return false;
    }

    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem("demoUsers")) || [];
    if (users.find(user => user.name === nameInput)) {
        alert("User already registered.");
        return false;
    }

    // Check if the user limit is reached
    if (users.length >= 3) {
        alert("Maximum number of users already registered.");
        return false;
    }

    // Add new user and save to localStorage
    users.push({ name: nameInput, email: emailInput, password });
    localStorage.setItem("demoUsers", JSON.stringify(users));

    alert(`Welcome, ${nameInput.charAt(0).toUpperCase() + nameInput.slice(1)}! You've been registered.`);

    // Clear the form fields after successful registration
    document.getElementById("reg-name").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("reg-confirm-password").value = "";

    // Switch to login form after clearing fields
    if (typeof switchForm === 'function') {
        switchForm('login');
    }

    return false;

 
}

function clearDemoUsers() {
    localStorage.removeItem("demoUsers");
    alert("Demo users data has been cleared.");
}

// Default users (stored in localStorage if not present)
const defaultUsers = [
    { name: "Farah", email: "farah@gmail.com", password: "1234" },
    { name: "Reem", email: "reem@gmail.com", password: "1234" },
    { name: "Angy", email: "angy@gmail.com", password: "1234" }
];


if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}
