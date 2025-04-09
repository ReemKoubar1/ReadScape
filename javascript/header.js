let products = JSON.parse(localStorage.getItem("cart")) || [];
let totalProducts = products.length;
document.getElementById("badge").textContent = totalProducts;