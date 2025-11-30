
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





