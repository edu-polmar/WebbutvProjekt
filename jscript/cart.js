let iconCart = document.querySelector(".icon_cart");
let closeCart = document.querySelector(".close");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");

let listProducts = [];

iconCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

closeCart.addEventListener("click", () => {
  body.classList.toggle("showCart");
});

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("product_outer_ratio");
      newProduct.innerHTML = `
        <img class="product_image" src="${product.image}" alt="${product.name}" />
        <h2><a href="product.html">${product.name}</a></h2>
        <span class="price">$${product.price}</span>
        <button class="addToCart">ADD TO CART</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
};

const initApp = () => {
  //get data from json
  fetch("json/cart.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
    })
    .catch((error) => console.error("Error loading JSON:", error));
};

// Call initApp when the DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
