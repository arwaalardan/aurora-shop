document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const addButtons = document.querySelectorAll(".add-to-cart");
  addButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".card");
      const name = card.querySelector(".card-title").textContent.trim();
      const price = parseFloat(card.querySelector(".card-text").textContent);
      const img = card.querySelector("img").src;

      addToCart(name, price, img);
    });
  });
});


function addToCart(name, price, img) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const found = cart.find(item => item.name === name);

  if (!found) {
    cart.push({ name, price, img, quantity: 1 });
    showAddedMessage();
  } else {
    found.quantity += 1; 
    showAddedMessage();
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}


// تحديث رقم السله
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = 0;

  cart.forEach(item => {
    count += item.quantity;
  });

  document.getElementById("cart-count").textContent = count;
}


function showAddedMessage() {
  const message = document.createElement("div");
  message.textContent = "Item added to cart";
  message.className = "alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow";
  message.style.zIndex = 9999;
  document.body.appendChild(message);
  setTimeout(() => message.remove(), 2000);
}



if (window.location.pathname.includes("cart.html")) {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const tableBody = document.getElementById("cart-table-body");
  const totalElement = document.getElementById("total");

  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    total += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity}</td>
      <td>${itemTotal} SR</td>
      <td><button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">Delete</button></td>
    `;

    tableBody.appendChild(row);
  });

  totalElement.textContent = `${total} SR`;

  window.removeItem = function(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };
}

