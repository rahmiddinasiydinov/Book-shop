const header = document.querySelector('.header__wrapper');
const main = document.querySelector(".main__wrapper");
const footer = document.querySelector(".footer__wrapper");
const form = document.querySelector('.form');
const orderText = document.querySelector('.order__text')
var books = [];
var cart = [];
//fetching data
fetch('./data/books.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
      books = data;
       render(books)
    });
    //form 
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const { name, surname, date, street, house_number, flat_number, payment } = e.target.elements;
      console.log(name.value, surname.value, date.value, street.value, house_number.value, flat_number.value, payment.value);
   
      orderText.innerText = 'The order created. The delivery adress is house ' + house_number.value + " flat " + flat_number.value + ". Customer " + name.value + surname.value+'.'
    });
    //HTML background
let background = document.createElement('div');
background.setAttribute('class', 'body__wrapper');
let backgroundInner = document.createElement("div");
backgroundInner.setAttribute("class", "body__wrapper--inner");
background.appendChild(backgroundInner);
let body = document.querySelector('body');
body.appendChild(background);

//show more
let showMoreWrapper = document.createElement('div');
let showMore = document.createElement('div'); 
let showMoreText = document.createElement("p");
let showMoreTitle = document.createElement("h3");
let showMoreExit = document.createElement("button");
let basketIcon = document.createElement('i');
showMoreExit.textContent = 'Close'
// setting attribute

showMoreWrapper.setAttribute('class', 'show__wrapper');
showMoreWrapper.dataset.id = 'show__wrapper';
showMore.setAttribute("class", "show");
showMoreText.setAttribute("class", "show__text");
showMoreTitle.setAttribute("class", "show__title");
showMoreExit.setAttribute("class", "show__button");
basketIcon.setAttribute(
  "class",'fa-solid fa-cart-shopping icon'
);
showMoreExit.addEventListener('click', () => {
  showMoreWrapper.classList.remove('show__active')
})
showMoreWrapper.addEventListener('click', (e) => {
  if (e.target.dataset.id === 'show__wrapper') {
    showMoreWrapper.classList.remove('show__active');
  }
})
showMoreWrapper.appendChild(showMore);
showMore.appendChild(showMoreTitle)
showMore.appendChild(showMoreText);
showMore.appendChild(showMoreExit);
body.appendChild(showMoreWrapper);

const showMoreFunc = (title, text) => {
  showMoreTitle.innerText = title;
  showMoreText.innerText = text;
}



//CART
//create element
let cartWrapper = document.createElement("div");
let cartList = document.createElement('ul');
let cartExit = document.createElement('button');
let confirm = document.createElement('a');
confirm.innerText = "Confirm";
//set Attributes
cartWrapper.setAttribute('class', 'cart__wrapper');
cartList.setAttribute("class", "cart__list");
cartExit.setAttribute("class", "cart__button");
confirm.setAttribute("href", "./order.html");
confirm.setAttribute("class", "cart__link");
//set text
cartExit.innerText = 'Exit';
cartExit.addEventListener('click', () => {
  cartWrapper.classList.remove('cart__active')
})
//append Child
cartWrapper.appendChild(cartExit);
cartWrapper.appendChild(cartList);
cartWrapper.appendChild(confirm);
body.appendChild(cartWrapper);


function toogleConfirm(cart) {
  if (cart.length === 0) {
    confirm.classList.add("none");
    console.log(cart.length);
  } else {
    confirm.classList.remove("none");
  }
}
toogleConfirm(cart)

    //HERADER
    // button creation
let basket = document.createElement('button');
basket.appendChild(basketIcon)
header.appendChild(basket);
basket.setAttribute('class', 'header__button'); 
basket.addEventListener('click', () => {
  cartWrapper.classList.add('cart__active');
})
    //MAIN SECTION 
    //title
let mainTitle = document.createElement('h1');
mainTitle.setAttribute('class', 'main__title');
mainTitle.innerText = 'Welcome to our Book Shop!'
main.appendChild(mainTitle);
   //warapper
let bookWrapper = document.createElement('ul');
bookWrapper.setAttribute('class', 'main__list');
main.appendChild(bookWrapper)


function render(books) {
  books?.map((e, i) => {
    //creation phase
    let item = document.createElement("li");
    let itemTitle = document.createElement("h2");
    let divLeft = document.createElement("div");
    let divRight = document.createElement("div");
    let itemImg = document.createElement("img");
    let itemButton = document.createElement("button");
    let addToBasket = document.createElement("button");
    let buttonWrapper = document.createElement('div');
    let itemAuthor = document.createElement("span");
    let itemPrice = document.createElement("span");
    let itemBack = document.createElement("div");
    //setting attribute phase
    item.setAttribute("class", "main__item");
    divLeft.setAttribute("class", "item__left");
    divRight.setAttribute("class", "item__right");
    itemImg.setAttribute("class", "item__img");
    itemTitle.setAttribute("class", "item__title");
    itemButton.setAttribute("class", "item__button");
    itemImg.setAttribute('src', e.imageLink);
    itemImg.setAttribute("alt", 'book_img');
    itemAuthor.setAttribute("class", "item__author");
    itemPrice.setAttribute("class", "item__price");
    itemBack.setAttribute("class", "item__back");
    addToBasket.setAttribute('class', 'item__basket');
    buttonWrapper.setAttribute('class', 'button__wrapper');
    itemButton.addEventListener('click', () => {
      showMoreWrapper.classList.add('show__active');
      showMoreFunc(e.title, e.description);
     
    })
    addToBasket.addEventListener('click', () => {
      let found = books.find(elem => elem.id === e.id);
      if (cart.includes(found)) {
        found.amount = found.amount + 1;
        renderCart(cart)
      }
      else {
        found.amount = 1;
        cart.push(found);
        renderCart(cart);
        console.log(cart);
      }
       toogleConfirm(cart);
    })
    //setting text phase
    itemTitle.innerText = e.title;
    itemButton.innerText = 'Show more';
    addToBasket.innerText = 'Add'
    itemAuthor.innerText = 'author:' + e.author;
    itemPrice.innerText = "Pirce :" + e.price + "$";
    //appending phase
    item.appendChild(divLeft);
    item.appendChild(divRight);
    item.appendChild(itemBack);
    buttonWrapper.appendChild(itemButton);
    buttonWrapper.appendChild(addToBasket);
    divLeft.appendChild(itemImg);
    divRight.appendChild(itemTitle);
    divRight.appendChild(itemAuthor);
    divRight.appendChild(itemPrice);
    divRight.appendChild(buttonWrapper);
    bookWrapper.appendChild(item);
  });
  console.log(books);
};


function renderCart(cart) {
  cartList.innerHTML = null; 
  cart?.map((e, i) => {
    //creation phase
    let item = document.createElement("li");
    let itemTitle = document.createElement("h2");
    let divLeft = document.createElement("div");
    let divRight = document.createElement("div");
    let itemImg = document.createElement("img");
    let itemButton = document.createElement("button");
    let buttonWrapper = document.createElement("div");
    let itemAuthor = document.createElement("span");
    let itemPrice = document.createElement("span");
    let itemBack = document.createElement("div");

    //setting attribute phase
    item.setAttribute("class", "cart__item");
    divLeft.setAttribute("class", "item__left");
    divRight.setAttribute("class", "item__right");
    itemImg.setAttribute("class", "cart__img");
    itemTitle.setAttribute("class", "cart__title");
    itemButton.setAttribute("class", "cart__btn");
    itemImg.setAttribute("src", e.imageLink);
    itemImg.setAttribute("alt", "book_img");
    itemAuthor.setAttribute("class", "cart__amount");
    itemPrice.setAttribute("class", "item__price");
    itemBack.setAttribute("class", "item__back");
    buttonWrapper.setAttribute("class", "button__wrapper");
   

    //setting text phase
    
    itemTitle.innerText = e.title;
    itemButton.innerText = "Remove";
    itemButton.addEventListener('click', () => {
      let found = cart.find(elem => elem.id === e.id);
      console.log(found);
   
      if (found.amount > 1) {
        let index = cart.findIndex(item => item.id === found.id);
        cart[index].amount = cart[index].amount - 1;
        renderCart(cart);
        toogleConfirm(cart);
      } else {
        cart = [...cart.filter((elem) => elem.id !== e.id)];
        renderCart(cart);
        toogleConfirm(cart);
      }
         
    })
    itemAuthor.innerText = "Amount:" + e.amount;
    itemPrice.innerText = "Pirce :" + e.price + "$";
    //appending phase
    item.appendChild(divLeft);
    item.appendChild(divRight);
    item.appendChild(itemBack);
    buttonWrapper.appendChild(itemButton);
    divLeft.appendChild(itemImg);
    divRight.appendChild(itemTitle);
    divRight.appendChild(itemAuthor);
    divRight.appendChild(itemPrice);
    divRight.appendChild(buttonWrapper);
    cartList.appendChild(item);
  });
}
      
//form

