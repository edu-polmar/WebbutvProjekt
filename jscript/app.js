let iconCart = document.querySelector(".icon_cart");
let closeCart = document.querySelector(".close");
let checkoutCart = document.querySelector(".checkout");
let body = document.querySelector("body");
let listProductHTML = document.querySelector(".listProduct");
let ListCartHTML = document.querySelector(".ListCart");
let iconCartSpan = document.querySelector(".menu-item span");

let listProducts = [];
let carts = [];

console.log("DOM Elements loaded:", {
  iconCart: !!iconCart,
  closeCart: !!closeCart,
  listProductHTML: !!listProductHTML,
  ListCartHTML: !!ListCartHTML,
  iconCartSpan: !!iconCartSpan,
});

if (!listProductHTML) {
  console.error(".listProduct element not found on this page");
}

if (iconCart) {
  iconCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
} else {
  console.warn(".icon_cart element not found");
}

if (closeCart) {
  closeCart.addEventListener("click", () => {
    body.classList.toggle("showCart");
  });
} else {
  console.warn(".close element not found");
}

if (checkoutCart) {
  checkoutCart.addEventListener("click", () => {
    window.location.href = "cart.html";
  });
}

const addDataToHTML = () => {
  console.log("Adding data to HTML. Products count:", listProducts.length);
  listProductHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product, index) => {
      console.log(`Adding product ${index + 1}:`, product.name, product.price);
      let newProduct = document.createElement("div");
      newProduct.classList.add("product_outer_ratio");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `
        <img class="product_image" src="${product.image}" alt="${product.name}" />
        <h2><a href="product.html?id=${product.id}">${product.name}</a></h2>
        <span class="price">$${product.price}</span>
        <button class="addToCart">ADD TO CART</button>
      `;
      listProductHTML.appendChild(newProduct);
    });
  }
  console.log("Final product count in DOM:", listProductHTML.children.length);
  listProductHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains("addToCart")) {
      let product_id = positionClick.parentElement.dataset.id;
      addToCart(product_id);
    }
  });
};

const addToCart = (product_id) => {
  console.log("Adding to cart, product_id:", product_id);
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == product_id,
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: product_id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_id: product_id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  console.log("Updated carts:", carts);
  addCartToHTML();
  addCartToMemory();
  toastr.options = {
    closeButton: false,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-top-center",
    preventDuplicates: false,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  toastr["success"]("Item added to Cart!");
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

const addCartToHTML = () => {
  console.log(
    "addCartToHTML called. ListCartHTML:",
    !!ListCartHTML,
    "Carts:",
    carts,
  );
  if (!ListCartHTML) {
    console.error(".ListCart element not found");
    return;
  }

  ListCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart, cartIndex) => {
      console.log(`Processing cart item ${cartIndex}:`, cart);
      totalQuantity = totalQuantity + parseInt(cart.quantity) || 0;
      let newCart = document.createElement("div");
      newCart.classList.add("item");
      newCart.dataset.id = cart.product_id;
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.product_id,
      );
      console.log(
        `Product position for ID ${cart.product_id}:`,
        positionProduct,
      );
      let info = listProducts[positionProduct];
      if (!info) {
        console.error(`Product not found for ID ${cart.product_id}`);
        return;
      }
      newCart.innerHTML = `
      <div class="image">
              <img src="${info.image}" alt="${info.name}" />
            </div>
            <div class="name">${info.name}</div>
            <div class="totalPrice">$${info.price * cart.quantity}</div>
            <div class="quantity">
              <span class="minus" data-type="minus">-</span>
              <span>${cart.quantity}</span>
              <span class="plus" data-type="plus">+</span>
            </div>`;
      ListCartHTML.appendChild(newCart);
      console.log(`Added cart item to DOM`);
    });
  }
  if (iconCartSpan) {
    iconCartSpan.innerText = totalQuantity;
  }
  console.log(
    "Cart updated in HTML. Total items:",
    totalQuantity,
    "DOM items:",
    ListCartHTML.children.length,
  );
};

if (ListCartHTML) {
  ListCartHTML.addEventListener("click", (event) => {
    let positionClick = event.target;

    let type = positionClick.dataset.type;
    if (!type) return;

    let itemElement = positionClick.closest(".item");
    if (!itemElement) return;

    let product_id = itemElement.dataset.id;

    changeQuantity(product_id, type);
  });
}

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_id == product_id,
  );
  if (positionItemInCart >= 0) {
    let currentQuantity = Number(carts[positionItemInCart].quantity) || 0;
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity = currentQuantity + 1;
        break;

      default:
        let valueChange = currentQuantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  console.log("initApp called");
  //get data from json
  fetch("json/products.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("JSON data received:", data);
      listProducts = data;
      if (listProductHTML) {
        addDataToHTML();
      }

      //fetch cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
      }
    })
    .catch((error) => console.error("Error loading JSON:", error));
};

// Call initApp when the DOM is ready
document.addEventListener("DOMContentLoaded", initApp);
