function switchForm(form) {
    const authContainer = document.querySelector('.auth-container');
    
    if (form === 'register') {
        authContainer.classList.add('register-active');
    } else {
        authContainer.classList.remove('register-active');
    }
}


// Hardcoded users (only added once)
const users = [
    { name: "Farah Ismaeil", email: "farah@gmail.com", password: "1234" },
    { name: "Reem Koubar", email: "reem@gmail.com", password: "1234" },
    { name: "Angy Chehadi", email: "angy@gmail.com", password: "1234" }
];

// Store users if not already saved
if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(users));
}

// Login functionality
document.querySelector(".login-form form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = this.querySelector("input[type='email']").value.trim();
    const password = this.querySelector("input[type='password']").value.trim();
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    const matchedUser = storedUsers.find(user => user.email === email && user.password === password);

    if (matchedUser) {
        alert(`Welcome, ${matchedUser.name}!`);
        // You can redirect or show dashboard here
        // window.location.href = "dashboard.html";
    } else {
        alert("Invalid email or password.");
    }
});
