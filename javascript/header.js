let products = JSON.parse(localStorage.getItem("cart")) || [];
let totalProducts = products.reduce((sum, item) => sum + item.quantity, 0);
document.getElementById("badge").textContent = totalProducts;