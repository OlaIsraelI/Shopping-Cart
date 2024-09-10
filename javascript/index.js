// alert("Welcome, I'm Connected!");

const cartItems = [
  {
    id: "aaaa",
    productName: "Nike Canvas", 
    description: "Just Do it", 
    price: 200, 
    imageUr: "assets/baskets.png",
    isFavourite: false,
    quantity: 0,
  },
  {
    id: "abbb",
    productName: "Addidas Socks", 
    description: "Soak the mud", 
    price: 20, 
    imageUr: "assets/socks.png",
    isFavourite: false,
    quantity: 0,
  },
  {
    id: "abcc",
    productName: "New Balance Bag", 
    description: "Carry the Money", 
    price: 100, 
    imageUr: "assets/bag.png",
    isFavourite: false,
    quantity: 0,
  }

];

//Traget the Product list
const productListDiv = document.querySelector(".product-list");
// console.log(productListDiv);
const totalPriceSpan = document.querySelector(".total");
//function to render the cart item
function renderCartItems (){

  productListDiv.innerHTML = "";
  totalPriceSpan.textContent = "";
  let productTotalPrice = 0;

  for (cartItem of cartItems){

    let itemPrice = cartItem.price * cartItem.quantity;
    productTotalPrice += itemPrice;

    totalPriceSpan.textContent = `$${productTotalPrice}`;

    //create a new cart div
    const cartCard = document.createElement("div");
    cartCard.classList.add("card-body");

    cartCard.innerHTML = `<div class="card-body">
            <div class="card" style="width: 18rem">
              <img
                src=${cartItem.imageUr}
                class="card-img-top"
                alt="item"
              />
              <div class="card-body">
                <h5 class="card-title">${cartItem.productName}</h5>
                <p class="card-text">${cartItem.description}</p>
                <h4 class="unit-price">${cartItem.price}</h4>
                <div>
                  <i class="fas fa-plus-circle" value=${cartItem.id}></i>
                  <span class="quantity">${cartItem.quantity}</span>
                  <i class="fas fa-minus-circle" value=${cartItem.id}></i>
                </div>
                <div>
                  <i class="fa-solid fa-trash-can" value=${cartItem.id}></i>
                  <i class="fas fa-trash-alt" value=${cartItem.id}></i>
                  <i class="fas fa-heart ${cartItem.isFavourite ? 'heart' : ''}" value=${cartItem.id} 
                     style="color: ${cartItem.isFavourite ? 'red' : 'black'};"></i>


                </div>
              </div>
            </div>
          </div> `;
          productListDiv.appendChild(cartCard);
  }

  const increaseItemBtn = document.getElementsByClassName("fa-plus-circle");
  const dereaseItemBtn = document.getElementsByClassName("fa-minus-circle");
  const trashItemBtn = document.getElementsByClassName("fa-trash-can");
  const deleteItemBtn = document.getElementsByClassName("fa-trash-alt");
  const heartItemBtn = document.getElementsByClassName("fa-heart");


  //Loop Over the Array of Increased item button
  for (increasedBtn of increaseItemBtn){
    increasedBtn.addEventListener("click", increaseCartItemPrice);
  }

  for (decreaseBtn of dereaseItemBtn){
    decreaseBtn.addEventListener("click", decreaseCartItemPrice);
  }

  for (let trashItem of trashItemBtn){
    trashItem.addEventListener("click", clearCartItemPrice);
  } 


  for (let deleteItem of deleteItemBtn){
    deleteItem.addEventListener("click", deleteCard);
  }

  for (let heartItem of heartItemBtn) {
    heartItem.addEventListener("click", toggleFavourite);
  }
}

//Call the renderCartItems function on window load
window.addEventListener("load", renderCartItems);

//Increase the Quantity and price of the item
function increaseCartItemPrice(event){
  const productId = event.target.getAttribute("value");
// console.log(event.target.getAttribute("value"))
    // console.log("I want to increase the price.")

//get the actual product on the cart items array by the product index
    const foundProductIndex = cartItems.findIndex(item => item.id === productId);

//get the actual product on the cart items array by the products index
    const productToUpdate = cartItems[foundProductIndex];

//update quantity of product on products object
    const updateProduct = {...productToUpdate, 
      quantity: (productToUpdate.quantity += 1),};
    
//update cart items array with update product
    cartItems[foundProductIndex] = updateProduct;

    // productListDiv.innerHTML = "";
    return renderCartItems();
}

//Reduce the Quantity and Price of the item
function decreaseCartItemPrice(event){
  const productId = event.target.getAttribute("value");
  // console.log(event.target.getAttribute("value"))
  // console.log("I want to decrease price.")

//get the actual product on the cart items array by the product index
const foundProductIndex = cartItems.findIndex(item => item.id === productId);

//get the actual product on the cart items array by the products index
    const productToUpdate = cartItems[foundProductIndex];

//Delete quantity of product on products object
const updateProduct = {
  ...productToUpdate,
  quantity: productToUpdate.quantity > 0 ? productToUpdate.quantity - 1 : 0,
};

    
//update cart items array with update product
    cartItems[foundProductIndex] = updateProduct;

    // productListDiv.innerHTML = "";
    return renderCartItems();

}

// const trashItemBtn = document.getElementsByClassName("fa-trash-alt");
function clearCartItemPrice(event) {
  const productId = event.target.getAttribute("value");

  // Find the index of the product in the cartItems array
  const foundProductIndex = cartItems.findIndex(item => item.id === productId);

  // Set the quantity of the found product to zero
  if (foundProductIndex !== -1) {
    cartItems[foundProductIndex].quantity = 0;
  }

  // Re-render the cart items to update the UI
  renderCartItems();
}

//This code is taking from the code above
// ${
//   cartItem.isFavourite
//   ? `<i class="fas fa-heart heart" value=${cartItem.id}></i>`
//   : `<i class="fas fa-heart" value=${cartItem.id}></i>`
// }
function toggleFavourite(event) {
  const productId = event.target.getAttribute("value");

  // Find the index of the clicked product in the cartItems array
  const foundProductIndex = cartItems.findIndex(item => item.id === productId);

  // Toggle the `isFavourite` status of the found product
  if (foundProductIndex !== -1) {
    cartItems[foundProductIndex].isFavourite = !cartItems[foundProductIndex].isFavourite;
  }

  return renderCartItems();
}

function deleteCard(event){
  const productId = event.target.getAttribute("value");

  const foundProductIndex = cartItems.findIndex(item => item.id === productId);

  if (foundProductIndex < 0){
    return
  }

  cartItems.splice(foundProductIndex, 1)

  return renderCartItems();
}


