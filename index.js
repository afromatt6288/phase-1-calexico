// // Write your code here...

// // Global level variables already present in the HTML & DOM
// const menuItems = document.getElementById('menu-items')
// const dish = document.getElementById('dish')
// const dishImage = document.getElementById("dish-image")
// const dishName = document.getElementById('dish-name')
// const dishDescription = document.getElementById('dish-description')
// const dishPrice = document.getElementById('dish-price')
// const numberInCart = document.getElementById('number-in-cart')
// const addToCart = document.getElementById("cart-form")


// fetch('http://Localhost:3000/menu')
// .then(function (response) {
//     if (response.ok) {
//         return response.json()
//     } else {
//         throw (response.statusText)
//     }
// })
// .then(function(menu) {

//     //create initial contents that will be added to the DOM and replaced by a future click event
//     const initialDish = menu[0]
//     dishImage.src = initialDish.image
//     dishName.textContent = initialDish.name
//     dishDescription.textContent = initialDish.description
//     dishPrice.textContent = `$${initialDish.price}`
//     console.log(initialDish)

//     return menu.forEach(renderMenu)
// })


// function renderMenu(menu) {
//     const span = document.createElement('span')
//     span.className = 'menu-item'
//     span.innerText = menu.name
//     menuItems.append(span)
//     //console.log(menuItems)
    
    
//     //content to load into the menu description on click
//     span.addEventListener('click', loadDish)
    
//     function loadDish() {
//         numberInCart.textContent = menu.number_in_bag
//         dishImage.src = menu.image
//         dishName.textContent = menu.name
//         dishDescription.textContent = menu.description
//         dishPrice.textContent = `$${menu.price}`
//     }
//     addToCart.addEventListener('submit', addToCartHandler)
    
//     function addToCartHandler(event) {
//         event.preventDefault()
//         numberAdd(event.target['cart-amount'].value)
//         addToCart.reset()
//     }
    
//     function numberAdd(num) {
//         a = parseInt(numberInCart.textContent) 
//         numberInCart.textContent = parseInt(+a + +num)
//     }
// }

//////////////////////////////////////////////////////////

//Global Variables

let currentDish

fetch('http://localhost:3000/menu')
.then(response => response.json())
.then(menuData =>{
    //wishlist of Functions
    //render menu items to menu-items div
    renderMenu(menuData)
    //render item details. should start with first item
    renderDetails(menuData[0])
    //function to add number of items to the cart
    addToCart()
})

function renderMenu(menuData) {
    let menu = document.querySelector('#menu-items')
    menuData.forEach(item => {
        let menuItem = document.createElement('span')
        menuItem.textContent = item.name
        menu.append(menuItem)

        //challenge 3
        menuItem.addEventListener('click', () => {
            renderDetails(item)
        })
    })
}

function renderDetails(menuItem){
    currentDish = menuItem
    //selectors for details
    let dishImage = document.querySelector('#dish-image')    
    let dishName = document.querySelector('#dish-name')
    let dishPrice = document.querySelector('#dish-price')
    let dishDescription = document.querySelector('#dish-description')
    let numberInBag = document.querySelector('#number-in-cart')

    dishImage.src = currentDish.image
    dishName.textContent = currentDish.name
    dishPrice.textContent = `$${currentDish.price}`
    dishDescription.textContent = currentDish.description
    numberInBag.textContent = currentDish.number_in_bag
}

function addToCart() {
    let cartForm = document.querySelector("#cart-form")
    cartForm.addEventListener("submit", (e) => {
        e.preventDefault()

        currentDish.number_in_bag += parseInt(e.target['cart-amount'].value)
        renderDetails(currentDish)
    })
}