fetch("/json/products.json");
const initProductPage = () => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    console.error("Inget produkt-id i URL");
    return;
  }

  fetch("json/products.json")
    .then((response) => response.json())
    .then((products) => {
      const product = products.find((p) => p.id == productId);
      if (!product) {
        console.error("Produkt hittades inte");
        return;
      }

      document.querySelector(".product_image").src = product.image;
      document.querySelector("#product_info h1").textContent = product.name;
      document.querySelector(".price").textContent = "$" + product.price;
      document.querySelector("#addtocart").onclick = () => addToCart(productId);
    });
};

document.addEventListener("DOMContentLoaded", initProductPage);
