let iconCart = document.querySelector('.icon-cart');
let closeCart = document.querySelector('.close'); 
let body = document.querySelector('body');
let listProductHTML=document.querySelector('.listProduct');
let listCartHtml = document.querySelector('.listCart');
let iconCartSpan=document.querySelector('.icon-cart span') ;

let listProducts = [];
let carts=[];

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
});

const addDataToHTML = () =>{
  listProductHTML.innerHTML='';
  if(listProducts.length>0){
    listProducts.forEach(product => {
      let newProduct = document.createElement('div');
      newProduct.classList.add('item');
      newProduct.dataset.id=product.id;
      newProduct.innerHTML=`
      <img src="${product.image}" alt="">
      <h2>${product.name}</h2>
      <div class="price">$${product.price}</div>
      <button class="addCart">
      Add To Cart
      </button>
      `;
      listProductHTML.appendChild(newProduct);
    })
  }
}

listProductHTML.addEventListener('click',(event)=>{
  let positionClick=event.target;
  if(positionClick.classList.contains('addCart')){
    let product_id=positionClick.parentElement.dataset.id;
    addToCart(product_id);
  }
})

const addToCart = (product_id) => {
  let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
  if(carts.length <= 0){
      carts = [{
          product_id: product_id,
          quantity: 1
      }];
  }else if(positionThisProductInCart < 0){
      carts.push({
          product_id: product_id,
          quantity: 1
      });
  }else{
      carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
}

const addCartToHTML = () =>{
  listCartHtml.innerHTML = '';
  if(carts.length>0){
    carts.forEach(cart => {
      let newCart=document.createElement('div');
      newCart.classList.add('item-container')
    })
  }
}

const initApp = () => {
  //GET DATA FROM JSON
  fetch('products.json')
  .then(response => response.json())
  .then(data => {
    listProducts=data;
    addDataToHTML();
  })
}
initApp();


var header=document.getElementById("myDIV");
var btn=header.getElementsByClassName("btn");
for(var i=0;i<btn.length;i++){
  btn[i].addEventListener("click",function(){
    var current=document.getElementsByClassName("active");
    current[0].className=current[0].className.replace(" active","");
    this.className+=" active";
  });
}

const img1=document.getElementById('img1');
img1.addEventListener('click',function(){
  window.open('first.html','_self');
});

let v=document.getElementById("one");
let u=document.getElementById("two");
let w=document.getElementById("three");
function display1(){
  v.style.display="block";
  u.style.display="none";
  w.style.display="none";
}
function display2(){
  u.style.display="block";
  v.style.display="none";
  w.style.display="none";
}
function display3(){
  w.style.display="block";
  v.style.display="none";
  u.style.display="none";
}


document.getElementById('filter-button').addEventListener('click', function() {
  const filterOptions = document.getElementById('filter-options');
  
  // Toggle visibility
  if (filterOptions.style.display === 'none') {
      filterOptions.style.display = 'block';
      filterOptions.style.zIndex = 111; // Ensure it's above other elements


  } else {
      filterOptions.style.display = 'none';
      // filterOptions.style.zIndex = 111; // Ensure it's above other elements
  }
});
document.getElementById('filter-button').addEventListener('click', function() {
  console.log('Filter button clicked'); // Debug log
  const filterOptions = document.getElementById('filter-options');
  
});


document.getElementById('apply-filters').addEventListener('click', function() {
  const sortValue = document.getElementById('sort').value;
  const filterValue = document.getElementById('filter-dropdown').value; // Changed to filter-dropdown
  const items = document.querySelectorAll('.item-container');

  // Convert NodeList to Array for easier manipulation
  const itemsArray = Array.from(items);

  // Filter items based on selected filter
  let filteredItems = itemsArray.filter(item => {
      const priceText = item.querySelector('.price').textContent.replace('₹', '').replace(',', '');
      const price = parseInt(priceText, 10);

      if (filterValue === 'under-5000') {
          return price < 5000;
      } else if (filterValue === '5000-10000') {
          return price >= 5000 && price <= 10000;
      } else if (filterValue === 'above-10000') {
          return price > 10000;
      }
      return true; // 'all' option
  });

  // Sort items based on selected sort option
  if (sortValue === 'price-asc') {
      filteredItems.sort((a, b) => {
          const priceA = parseInt(a.querySelector('.price').textContent.replace('₹', '').replace(',', ''), 10);
          const priceB = parseInt(b.querySelector('.price').textContent.replace('₹', '').replace(',', ''), 10);
          return priceA - priceB;
      });
  } else if (sortValue === 'price-desc') {
      filteredItems.sort((a, b) => {
          const priceA = parseInt(a.querySelector('.price').textContent.replace('₹', '').replace(',', ''), 10 );
          const priceB = parseInt(b.querySelector('.price').textContent.replace('₹', '').replace(',', ''), 10);
          return priceB - priceA;
      });
  } else if (sortValue === 'rating') {
      filteredItems.sort((a, b) => {
          const ratingA = parseFloat(a.querySelector('.rating').textContent);
          const ratingB = parseFloat(b.querySelector('.rating').textContent);
          return ratingB - ratingA; // Sort by rating descending
      });
  }

  // Clear current items and append filtered and sorted items
  const itemsContainer = document.querySelector('.items-container');
  itemsContainer.innerHTML = ''; // Clear existing items
  filteredItems.forEach(item => itemsContainer.appendChild(item)); // Append filtered items
});