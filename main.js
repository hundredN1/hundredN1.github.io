// Array to keep track of items added to the cart
let cart = [];

// Functions to open and close the cart drawer panel
function openCart() {
  document.getElementById("cartDrawer").style.right = "0";
  document.getElementById("cartOverlay").style.display = "block";
}

function closeCart() {
  document.getElementById("cartDrawer").style.right = "-400px";
  document.getElementById("cartOverlay").style.display = "none";
}

// Global function so your menu buttons can trigger it
window.addToCart = function (name, price) {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  updateCartUI();
  openCart(); // Automatically slides open the cart panel to confirm addition!
};

function updateCartUI() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const navCartCount = document.getElementById("navCartCount");

  // Calculate total items count for the navbar badge
  let totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  navCartCount.innerText = totalItemsCount;

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = `<p style="color: #8a8077; font-style: italic;">Your cart is empty. Add items from the menu!</p>`;
    cartTotalSpan.innerText = "RM 0";
    return;
  }

  let html = "";
  let total = 0;

  cart.forEach((item) => {
    let itemTotal = item.price * item.quantity;
    total += itemTotal;
    html += `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; font-size: 14px; border-bottom: 1px dashed #f0e6db; padding-bottom: 10px;">
        <div>
          <span style="font-weight: 600; color: #1a1410;">${item.name}</span><br>
          <span style="color: #8a8077;">RM ${item.price} &times; ${item.quantity}</span>
        </div>
        <span style="font-weight: 500;">RM ${itemTotal}</span>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = html;
  cartTotalSpan.innerText = `RM ${total}`;
}

// Attach all event handlers once the web page initializes
window.addEventListener("DOMContentLoaded", () => {
  // Toggle buttons
  document.getElementById("cartToggleBtn").addEventListener("click", openCart);
  document.getElementById("closeCartBtn").addEventListener("click", closeCart);
  document.getElementById("cartOverlay").addEventListener("click", closeCart);

  // WhatsApp Checkout Processing
  const checkoutBtn = document.getElementById("whatsappCheckoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const name = document.getElementById("custName").value.trim();
      const table = document.getElementById("custTable").value.trim();

      if (!name || !table) {
        alert("Please fill in your Name and Location details before sending!");
        return;
      }
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      let total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      let message = `☕ *New Order from Lazy Duck Coffee* ☕\n\n`;
      message += `👤 *Customer:* ${name}\n`;
      message += `📍 *Location/Type:* ${table}\n\n`;
      message += `🛒 *Order Summary:*\n`;

      cart.forEach((item) => {
        message += `• ${item.quantity}x ${item.name} (RM ${item.price * item.quantity})\n`;
      });

      message += `\n💰 *Total Amount:* RM ${total}\n\n`;
      message += `Please reply with the payment QR code to confirm!`;

      const businessPhoneNumber = "60125613468";
      const whatsappUrl = `https://wa.me/${businessPhoneNumber}?text=${encodeURIComponent(message)}`;

      window.open(whatsappUrl, "_blank");
    });
  }
});
