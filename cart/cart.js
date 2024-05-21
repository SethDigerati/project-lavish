
let cart = document.querySelectorAll("#showCart");
let cardlist = document.querySelector("#card-list")
let total_price_elements = document.querySelectorAll(".total-amount");



let storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]"); // getting data from local storage and converting to js array
let total_price = 0;
cartCount = 0;



function createCard(item, index){

    return ` 
    <div class="col-lg-3 col-md-12 mb-4 mb-lg-0">
      <!-- Image -->
      <div class="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
        <img src="${item.image}"
          class="w-100" alt="Blue Jeans Jacket" />
        <a href="#!">
          <div class="mask" style="background-color: rgba(251, 251, 251, 0.2)"></div>
        </a>
      </div>
      <!-- Image -->
    </div>

    <div class="col-lg-5 col-md-6 mb-4 mb-lg-0">
      <!-- Data -->
      <p><strong>${item.title}</strong></p>
      <button  type="button" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger btn-sm me-1 mb-2" data-mdb-tooltip-init
        title="Remove item" onclick="deleteItem(${index})">
        <i class="fas fa-trash"></i>
      </button>
      <!-- Data -->
    </div>

    <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
      <!-- Quantity -->
      <div class="d-flex mb-4" style="max-width: 300px">
        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary px-3 me-2"
          onclick="updateQuantity(${index}, false);">
          <i class="fas fa-minus"></i>
        </button>

        <div data-mdb-input-init class="form-outline">
          <input id="form-${index}" min="0" name="quantity" value="${item.quantity ? item.quantity : 1}" type="number" class="form-control" />
          <label class="form-label" for="form1">Quantity</label>
        </div>

        <button data-mdb-button-init data-mdb-ripple-init class="btn btn-primary px-3 ms-2"
          onclick="updateQuantity(${index}, true);">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <!-- Quantity -->

      <!-- Price -->
      <p class="text-start text-md-center">
        <strong>Ksh ${item.price}</strong>
      </p>
      <!-- Price -->
    </div>`;


}

function addDivider(){
    let hr = document.createElement("hr");

    hr.classList.add("my-4");

    return hr;
}







function storeCartItems(index) {
    let cartItems = localStorage.getItem("cartItems") || "[]";
    let items = JSON.parse(cartItems);
    items.push(storedItems[index]);
    localStorage.setItem("cartItems", JSON.stringify(items));
}


function deleteCartItems(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const item = storedItems[index];
    const idx = cartItems.findIndex(x => x.title === item.title);
    if (idx !== -1) {
        cartItems.splice(idx, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        storedItems = JSON.parse(localStorage.getItem("cartItems") || "[]"); // update stored items
    }
}

function isItemInCart(index) {
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const item = storedItems[index];
    const idx = cartItems.findIndex(x => x.title === item.title);
    return idx !== -1;
}




function deleteItem(index) {
    if (isItemInCart(index)) {
        decrementCartCount();
        deleteCartItems(index);
        load(); // re-render the cards
    } else {
        alert("invalid item")
    }
}

function getCartCount() {
    let value = localStorage.getItem("cartCount") || 0;
    return parseInt(value);
}


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


function updateQuantity(index, isIncrement) {

    if (!isItemInCart(index)) {
        alert("invalid item")
        return;
    }

    if(!storedItems[index].quantity){
        storedItems[index].quantity = 1;
    }

    if (isIncrement) {
        storedItems[index].quantity++;
    } else {
        if (storedItems[index].quantity > 1) {
            storedItems[index].quantity--;
        }
    }
    load();
}

function renderCartCount() {
    cart.forEach(c => {
        c.innerHTML = cartCount;
    });
}


function renderPrice() {
    total_price_elements.forEach(t => {
        t.innerHTML = `Ksh ${total_price}`;
    });
}


function load(){
    cardlist.innerHTML = ""

    price = 0;

    storedItems.map((item, index)=>{
        let card = document.createElement("div");
        card.classList.add("row");
        card.innerHTML = createCard(item, index);
        

        
        cardlist.appendChild(card);

        cardlist.append(addDivider())

        quantity = item.quantity || 1;

        price += item.price * quantity;
    })

    total_price = price;
    renderPrice();
}



window.addEventListener("DOMContentLoaded", function () {
    cartCount = getCartCount();
    renderCartCount();

    load();
});
