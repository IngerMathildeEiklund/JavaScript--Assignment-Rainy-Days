export function renderOrderSummary(cart, summaryContainer) {
  cart.forEach((item) => {
    const orderTitleSummary = document.createElement("li");
    const orderPriceSummary = document.createElement("li");
    orderTitleSummary.textContent = item.title;
    orderPriceSummary.textContent = item.onSale
      ? `$${item.discountedPrice}`
      : `$${item.price}`;
    summaryContainer.appendChild(orderTitleSummary);
    summaryContainer.appendChild(orderPriceSummary);
  });
  const total = cart.reduce((sum, item) => {
    return sum + (item.onSale ? item.discountedPrice : item.price);
  }, 0);
  const orderTotal = document.createElement("h3");
  orderTotal.textContent = `Order total: $${total.toFixed(2)}`;
  summaryContainer.appendChild(orderTotal);
}
