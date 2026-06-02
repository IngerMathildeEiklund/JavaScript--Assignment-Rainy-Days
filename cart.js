"use strict";
import { cart, loadCart, saveCart } from "./productpage.js";
import { renderOrderSummary } from "./render-order.js";

loadCart();

const cartSummaryContainer = document.getElementById(
  "cart-and-summary-container",
);
const cartContainer = document.getElementById("cart-container");
const summaryContainer = document.getElementById("summary-container");

if (cartSummaryContainer && cartContainer && summaryContainer) {
  summaryContainer.classList.add("card-cart");
  summaryContainer.classList.add("flex-start");
  cartContainer.classList.add("card-cart");

  const cartTitle = document.createElement("h2");
  const summaryTitle = document.createElement("h2");

  cartTitle.textContent = "Your cart";
  summaryTitle.textContent = "Order summary";

  cartSummaryContainer.appendChild(cartContainer);
  cartSummaryContainer.appendChild(summaryContainer);
  cartContainer.append(cartTitle);
  summaryContainer.append(summaryTitle);

  function displayCart() {
    if (cart.length === 0) {
      summaryContainer.classList.add("hidden");
      cartContainer.innerHTML = `<h2> Your cart </h2> <p> No items found in cart! Let's go shopping! <button class="btn" id="return-to-homepage"> Go to homepage <button> </p>`;
      const returnToHomepageBTN = document.getElementById("return-to-homepage");
      returnToHomepageBTN.addEventListener("click", () => {
        window.location.href = "index.html";
      });
      summaryContainer.innerHTML = "";
      const bagImage = document.createElement("img");
      bagImage.src = "svg/shopping-bag-cart-svgrepo-com.svg";
      bagImage.alt = "Image of three shopping bags in lively colors";
      bagImage.classList.add("empty-cart-img");
      cartContainer.appendChild(bagImage);
    } else {
      summaryContainer.innerHTML = "<h2> Order summary </h2>";
      cartContainer.innerHTML = "<h2> Your cart </h2>";
      const clearCartBTN = document.createElement("button");
      clearCartBTN.textContent = `Clear all items from cart`;
      clearCartBTN.setAttribute("aria-label", "Clear all items from cart");
      clearCartBTN.classList.add("clear-cart-button");

      clearCartBTN.addEventListener("click", () => {
        if (cart.length === 0) {
          clearCartBTN.disabled = true;
        } else {
          cart.splice(0, cart.length);
          saveCart();
          const cartStatus = document.getElementById("cart-status");
          if (cartStatus) cartStatus.textContent = `Cart successfully cleared`;
          displayCart();
        }
      });
      cart.forEach((item, index) => {
        const productContainer = document.createElement("div");
        const productImage = document.createElement("img");
        const productInfoWrapper = document.createElement("div");
        const productName = document.createElement("p");
        const productSize = document.createElement("p");
        const productPrice = document.createElement("p");
        const productQuantity = document.createElement("p");

        productContainer.classList.add("cart-product");
        productImage.src = item.image;
        productInfoWrapper.classList.add("cart-product-info");
        productImage.classList.add("cart-image");
        productName.textContent = item.title;
        productPrice.textContent = ` $${item.price}`;
        productPrice.setAttribute(
          "aria-label",
          `Original price $${item.price}`,
        );
        productSize.textContent = `Size: ${item.size} `;
        productQuantity.textContent = `Quantity: ${item.quantity}`;
        const deleteBTN = document.createElement("button");
        deleteBTN.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        deleteBTN.classList.add("delete-button");
        deleteBTN.setAttribute("aria-label", `Remove ${item.title} from cart`);
        deleteBTN.addEventListener("click", () => {
          cart.splice(index, 1);
          saveCart();
          const cartStatus = document.getElementById("cart-status");
          if (cartStatus)
            cartStatus.textContent = `${item.title} removed from cart`;
          displayCart();
        });

        productContainer.appendChild(productImage);
        productInfoWrapper.appendChild(productName);
        productInfoWrapper.appendChild(productSize);
        productInfoWrapper.appendChild(productPrice);

        productContainer.appendChild(productInfoWrapper);
        if (item.onSale) {
          const salePrice = document.createElement("p");
          salePrice.classList.add("sale-price");
          salePrice.setAttribute(
            "aria-label",
            `Sale price $${item.discountedPrice}`,
          );
          productPrice.classList.add("strike");
          salePrice.textContent = `$${item.discountedPrice}`;
          productInfoWrapper.appendChild(salePrice);
        }
        productInfoWrapper.appendChild(productQuantity);
        productContainer.appendChild(deleteBTN);
        cartContainer.appendChild(productContainer);
        cartContainer.appendChild(clearCartBTN);
      });
      renderOrderSummary(cart, summaryContainer);
      const checkoutBTN = document.createElement("button");
      checkoutBTN.textContent = `Continue to checkout`;
      checkoutBTN.setAttribute("aria-label", "Continue to checkout");
      checkoutBTN.classList.add("checkout-button");
      checkoutBTN.addEventListener("click", () => {
        window.location.href = `details.html`;
      });
      summaryContainer.appendChild(checkoutBTN);
    }
  }

  displayCart();
}
