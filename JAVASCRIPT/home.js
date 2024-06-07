


// add class when click cart icon
let cart = document.querySelector(".cart-icon");
let cartbox = document.querySelector(".cart-box");
let cartclose = document.querySelector("#cart-close");
cart.addEventListener("click", () => {
  cartbox.classList.add("cart-box-active");
});
cartclose.addEventListener("click", () => {
  cartbox.classList.remove("cart-box-active");
});

document.addEventListener("DOMContentLoaded", loadMobile);
function loadMobile() {
  loadContent();
}
function loadContent() {
  //add event listener to cart quntity
  let cartqty = document.querySelectorAll(".cart-item-qty");
  cartqty.forEach((input) => {
    input.addEventListener("change", changeQty);
  });
  // function to handle bar icon
let baricon=document.querySelector(".bar-icon");
baricon.addEventListener("click",navBarHandle)
  // add listener to close cart item
  let cartitemremove = document.querySelectorAll("#cart-item-remove");
  cartitemremove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });
  //add click event listener to button
  let cartbtns = document.querySelectorAll(".cartbtn");
  cartbtns.forEach((btn) => {
    btn.addEventListener("click", addToCart);
  });
  updateTotal();
}
//function to change quantity
function changeQty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadContent();
}
//function to remove quantity
function removeItem() {
  if (confirm("are you want to remove the item")) {
    let productTitle = this.parentElement.querySelector(".cart-item-name");
    itemList = itemList.filter((el) => el.productTitle != productTitle);
    this.parentElement.remove();
    loadContent();
  }
}
let itemList=[];

// function to add cart
function addToCart() {
  let product = this.parentElement;
  let productTitle = product.querySelector(".name").innerHTML;
  let productPrice = product.querySelector(".price").innerHTML;
  let productImage = product.querySelector(".image").src;

  let newProduct = { productTitle, productPrice, productImage };
  // check the product alredy exixts
  if (itemList.find((el) => el.productTitle == newProduct.productTitle)) {
    alert("product already exixts");
    return;
  } else {
    itemList.push(newProduct);
  }

  let newProductItem = createCartProduct(productTitle,productPrice,productImage);
  let cartBox = document.createElement("div");
  cartBox.innerHTML = newProductItem;
  let cartBasket = document.querySelector(".cart-content");
  cartBasket.append(cartBox);
  loadContent();
}

function createCartProduct(productTitle, productPrice, productImage) {
  return `
    <div class="cart-item">
                <div class="cart-image">
                    <img src="${productImage}" alt="">
                </div>
                <div class="cart-content">
                    <div class="cart-item-np">
                        <h4 class="cart-item-name">${productTitle}</h4>
                        <h5 class="cart-item-price">${productPrice}</h5>
                    </div>
                    <div class="cart-update">
                        <input type="number" id="changeqty-input" value="1" class="cart-item-qty">
                        <div class="cart-item-amt">${productPrice}</div>
                    </div>
                </div>
                <span class="material-symbols-outlined" id="cart-item-remove">delete</span>
            </div>
    `;
}
function updateTotal() 
{
  const cartItems = document.querySelectorAll(".cart-item");
  const totalValue = document.querySelector(".total");
  
  let total = 0;

  cartItems.forEach((product) => {
    let priceElement = product.querySelector(".cart-item-price");
    let price = parseFloat(priceElement.innerHTML.replace("Rs:-",""));
    let qty = product.querySelector(".cart-item-qty").value;

    total += (price * qty);

    product.querySelector(".cart-item-amt").innerText = "RS." + price * qty;
  });
  totalValue.innerHTML = "RS." +total;

//add product count in cart icon
const cartCount = document.querySelector(".cart-item-count");
let count =itemList.length;
cartCount.innerHTML = count;
if (count == 0) {
  cartCount.style.display = "none";
} else {
  cartCount.style.display = "inline-block";
}

}

function navBarHandle(){
let links=document.querySelector(".links");
if(links.style.display === "block"){
  links.style.display="none";
}
else{
  links.style.display="block";
}
}
