addEventListener("DOMContentLoaded", () => {
  const currencySelect = document.getElementById("currency-select");
  const priceElements = document.querySelectorAll(".price");

  // Store original prices (assuming USD as base)
  priceElements.forEach((priceElement) => {
    const originalPrice = parseFloat(
      priceElement.textContent.replace(/[^0-9.]/g, ""),
    );
    priceElement.setAttribute("data-original-price", originalPrice);
  });

  // Function to convert and display prices
  const convertPrices = (selectedCurrency) => {
    priceElements.forEach((priceElement) => {
      const originalPrice = parseFloat(
        priceElement.getAttribute("data-original-price"),
      );
      let convertedPrice;
      switch (selectedCurrency) {
        case "USD":
          convertedPrice = (originalPrice * 1).toFixed(2);
          priceElement.textContent = `$${convertedPrice}`;
          break;
        case "EUR":
          convertedPrice = (originalPrice * 0.85).toFixed(2);
          priceElement.textContent = `€${convertedPrice}`;
          break;
        case "GBP":
          convertedPrice = (originalPrice * 0.75).toFixed(2);
          priceElement.textContent = `£${convertedPrice}`;
          break;
        default:
          priceElement.textContent = `$${originalPrice.toFixed(2)}`;
      }
    });
  };

  // Apply initial currency on page load
  convertPrices(currencySelect.value);

  currencySelect.addEventListener("change", () => {
    convertPrices(currencySelect.value);
  });
});
