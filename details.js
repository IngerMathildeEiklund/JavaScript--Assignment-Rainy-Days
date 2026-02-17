import { renderOrderSummary } from "./render-order.js";

const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
const SummaryContainer = document.getElementById("ordersummary-section");

renderOrderSummary(cart, SummaryContainer);
console.log(cart);
