const initCartPage = () => {
  fetch("/json/products.json")
    .then((response) => response.json())
    .then((products) => {
      const carts = JSON.parse(localStorage.getItem("cart")) || [];
      const cartList = document.querySelector(".CartItemList");

      if (carts.length === 0) {
        cartList.innerHTML = "<h1>Your cart is empty.</h1>";
        return;
      }

      cartList.innerHTML = "";
      let total = 0;

      carts.forEach((cart) => {
        const product = products.find((p) => p.id == cart.product_id);
        if (!product) return;

        const itemTotal = product.price * cart.quantity;
        total += itemTotal;

        const item = document.createElement("div");
        item.classList.add("CartItem");
        item.dataset.id = cart.product_id;
        item.innerHTML = `
          <div class="image"><img src="${product.image}" alt="${product.name}" /></div>
          <div class="name"><a href="product.html?id=${product.id}">${product.name}</a></div>
          <div class="totalPrice">$${itemTotal.toFixed(2)}</div>
          <div class="quantity">
            <span class="minus" data-type="minus">-</span>
            <span>${cart.quantity}</span>
            <span class="plus" data-type="plus">+</span>
          </div>
        `;
        cartList.appendChild(item);
      });

      // Uppdatera totalpriset
      document.querySelector(".CheckoutWindow .total-price").textContent =
        "$" + total.toFixed(2);
    });
};

document.addEventListener("DOMContentLoaded", initCartPage);
