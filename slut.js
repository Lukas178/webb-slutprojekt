let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, index) => {
    slide.style.display = index === slideIndex ? "block" : "none";
  });
  slideIndex = (slideIndex + 1) % slides.length;
  setTimeout(showSlides, 5000); 
}

showSlides();


const cartList = document.getElementById('cart-list');
const totalElement = document.getElementById('total');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ${item.price} kr 
      <button onclick="removeFromCart(${index})">Ta bort</button>
    `;
    cartList.appendChild(li);
    total += item.price;
  });

  totalElement.textContent = `Totalt: ${total} kr`;
}


updateCart();

function clearCart() {
  cart = [];
  saveCart();
  updateCart();
}

function sendOrder() {
  if (cart.length === 0) {
    alert("Din varukorg är tom!");
    return;
  }
  let orderText = cart.map(item => `${item.name} - ${item.price} kr`).join('%0D%0A');
  orderText += `%0D%0A${totalElement.textContent}`;
  window.location.href = `mailto:lukas.bruce@skola.taby.se?subject=Beställning från Lisslö Butik&body=${orderText}`;
}
