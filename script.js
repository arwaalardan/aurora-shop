
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const name = card.querySelector(".card-title").textContent.trim();
      const priceText = card.querySelector(".card-text").textContent.trim();
      const price = parseFloat(priceText.replace("SR", "").trim());
      const img = card.querySelector("img").getAttribute("src");

      addToCart(name, price, img); 
    });
  });
});

function addToCart(name, price, img) {
  const existing = JSON.parse(localStorage.getItem("cart")) || [];
  const found = existing.find(item => item.name === name);

  if (!found) {
    existing.push({ name, price, img, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(existing));
    updateCartCount();
    showAddedMessage(); 
  } else {
    showAlreadyExists();
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").textContent = cart.length;
}

function showAddedMessage() {
  const message = document.createElement("div");
  message.textContent = "Item has been added";
  message.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow";
  message.style.zIndex = 9999;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 2000);
}

// cart 
if (window.location.pathname.includes("cart.html")) {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("cart-table-body");
  const totalElement = document.getElementById("total");
  const countElement = document.getElementById("cart-count");

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * (item.quantity || 1);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name} <br><small class="text-muted">Quantity: ${item.quantity || 1}</small></td>
      <td>${itemTotal.toFixed(2)} SR</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Delete</button></td>
    `;

    tableBody.appendChild(row);
    total += itemTotal;
  });

  totalElement.textContent = `${total.toFixed(2)} SR`;
  countElement.textContent = cart.length;

  window.removeItem = function (index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };

}






