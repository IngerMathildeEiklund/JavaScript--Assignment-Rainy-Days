import { url, ALL_PRODUCTS_ENDPOINT, ONE_PRODUCT_ENDPOINT } from "./script.js";
import { cart, loadCart, saveCart, addToCart } from "./productpage.js";

loadCart();

const cartSummaryContainer = document.getElementById(
  "cart-and-summary-container",
);

const cartContainer = document.getElementById("cart-container");
const summaryContainer = document.getElementById("summary-container");

const cartTitle = document.createElement("h3");
const summaryTitle = document.createElement("h3");
cartTitle.textContent = "Your cart";
summaryTitle.textContent = "Order summary";
cartSummaryContainer.appendChild(cartContainer);
cartSummaryContainer.appendChild(summaryContainer);
cartContainer.append(cartTitle);
summaryContainer.append(summaryTitle);

function displayCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = `<h3> Your cart </h3> <p> Your cart is empty </p>`;
  } else {
    cartContainer.innerHTML = "<h3> Your cart </h3>";
    const clearCartBTN = document.createElement("button");
    clearCartBTN.textContent = `Clear cart`;
    cartContainer.appendChild(clearCartBTN);
    clearCartBTN.addEventListener("click", () => {
      if (cart.length === 0) {
        clearCartBTN.disabled = true;
      } else {
        cart.splice(0, cart.length);
        saveCart();
        displayCart();
      }
    });

    cart.forEach((item, index) => {
      const productContainer = document.createElement("div");
      const productImage = document.createElement("img");
      const productName = document.createElement("h4");
      const productSize = document.createElement("p");
      const productPrice = document.createElement("p");
      const productQuantity = document.createElement("p");
      productImage.src = item.image;
      productImage.classList.add("cart-image");
      productName.textContent = item.title;
      productPrice.textContent = `Total: $${item.price}`;
      productSize.textContent = `Size: ${item.size} `;
      productQuantity.textContent = `Quantity: ${item.quantity}`;
      if (item.onSale) {
        const salePrice = document.createElement("p");
        salePrice.classList.add("sale-price");
        productPrice.classList.add("strike");
        salePrice.textContent = item.discountedPrice;
      }
      const deleteBTN = document.createElement("button");
      deleteBTN.textContent = "Remove item";
      deleteBTN.addEventListener("click", () => {
        cart.splice(index, 1);
        saveCart();
        displayCart();
      });

      productContainer.appendChild(productImage);
      productContainer.appendChild(productName);
      productContainer.appendChild(productSize);
      productContainer.appendChild(productPrice);
      productContainer.appendChild(productQuantity);
      productContainer.appendChild(deleteBTN);
      cartContainer.appendChild(productContainer);
    });
  }
}

displayCart();
