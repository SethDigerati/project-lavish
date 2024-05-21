
let all_data = [];
let container = document.querySelector("#list-items");

let cart = document.querySelector("#showCart");

let storedItems = localStorage.getItem("cartItems") || [];

cartCount = 0;

$.getJSON("all_merged.json", async function (data) {
  const shuffledData = data
    .map(x => [Math.random(), x])
    .sort((a, b) => a[0] - b[0])
    .map(x => x[1]);

  all_data = shuffledData;

  load();
});


function load() {
  all_data.forEach(function (item, index) {
    let card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("my-3");
    card.style.width = "18rem";

    card.innerHTML = `
    <img
    src="${item.image}"
    class="card-img-top"
    alt="Product Image"
    loading="lazy"
  />
  <div class="card-body">
    <h5 class="card-title text-truncate text-wrap" style="max-width: 200px; min-height: 40px; max-height: 48px" title="${item.title}">${item.title}</h5>
    <div class="d-flex justify-content-between align-items-center">
      <span class="price">Ksh ${item.price}</span>
      <button id="item-${index}" onclick="addToCart(${index})" class="btn ${isItemInCart(index) ? "btn-danger" : "btn-primary"}">
        ${isItemInCart(index) ? "Remove from Cart" : "Add to Cart"}
      </button   >
    </div>
  </div>`;  

    container.appendChild(card);
  });
}



// storing and deleting cart items
function storeCartItems(index) {
    let cartItems = localStorage.getItem("cartItems") || "[]";
    let items = JSON.parse(cartItems);
    items.push(all_data[index]);
    localStorage.setItem("cartItems", JSON.stringify(items));
}


function deleteCartItems(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const item = all_data[index];
    const idx = cartItems.findIndex(x => x.title === item.title);
    if (idx !== -1) {
        cartItems.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
}

function isItemInCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const item = all_data[index];
    const idx = cartItems.findIndex(x => x.title === item.title);
    return idx !== -1;
}


function getCartCount() {
    let value = localStorage.getItem("cartCount") || 0;
    console.log(value);
    return parseInt(value);
}


function toggleButtonn(index, type) {
    let item_id = "item-"+index;

    let btn = document.getElementById(item_id);

    if (type) {
        btn.innerText = "Remove from Cart";
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-danger");
    } else { 
        btn.innerText = "Add to Cart";
        btn.classList.remove("btn-danger");
        btn.classList.add("btn-primary");
    }
}

function addToCart(index) {
    if (isItemInCart(index)) {
        decrementCartCount();
        deleteCartItems(index);
        toggleButtonn(index, false); // change button back to Add to Cart (blue)

    } else {
        incrementCartCount();
        storeCartItems(index);
        toggleButtonn(index, true); // change button to Remove from Cart (red)
    }
}

/**
 * Increments the cart count, updates the local storage with the new cart count, and renders the cart count.
 *
 * @return {void} This function does not return a value.
 */
function incrementCartCount() {
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    renderCartCount();
}



function decrementCartCount() {
    cartCount--;
    localStorage.setItem("cartCount", cartCount);
    renderCartCount();
}

function renderCartCount() {
    cart.innerText = cartCount;
}


window.addEventListener("DOMContentLoaded", function () {
    cartCount = getCartCount();
    renderCartCount();

    
});
