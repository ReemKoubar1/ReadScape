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

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Use the same key as registration
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

    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value.trim();

    // Use the same key as registration
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

// Register functionality
function registerUser(event) {
    event.preventDefault();

    const nameInput = document.getElementById("reg-name").value.trim().toLowerCase();
    const emailInput = document.getElementById("reg-email").value.trim().toLowerCase();
    const password = document.getElementById("reg-password").value;
    const confirmPassword = document.getElementById("reg-confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Optional: allow only certain users (disabled for now)
    // const matchedUser = allowedUsers.find(
    //     user => user.name.toLowerCase() === nameInput && user.email.toLowerCase() === emailInput
    // );

    // if (!matchedUser) {
    //     alert("User not allowed to register.");
    //     return false;
    // }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(user => user.email === emailInput)) {
        alert("User already registered.");
        return false;
    }
    users.push({ name: nameInput, email: emailInput, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert( "Welcome ", ` ${nameInput.charAt(0).toUpperCase() + nameInput.slice(1)}! You've been registered. `);

    document.getElementById("reg-name").value = "";
    document.getElementById("reg-email").value = "";
    document.getElementById("reg-password").value = "";
    document.getElementById("reg-confirm-password").value = "";

    switchForm('login');

    return false;
}

// Clear all registered users (for testing)
function clearDemoUsers() {
    localStorage.removeItem("users");
    alert("User data has been cleared.");
}

// Add default users if none exist
const defaultUsers = [
    { name: "Farah", email: "farah@gmail.com", password: "1234" },
    { name: "Reem", email: "reem@gmail.com", password: "1234" },
    { name: "Angy", email: "angy@gmail.com", password: "1234" }
];

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(defaultUsers));
}