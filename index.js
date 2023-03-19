import {menuArray} from './data.js'

let priceArray = []
let totalPrice = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
    else if(e.target.id == 'complete-order-btn') {
        completeOrder()
    }
    else if(e.target.id == 'pay-modal-btn') {
        payOrder()
    }
    else if(e.target.dataset.decrement) {
        decrement(e.target.dataset.decrement)
    }
    else if(e.target.dataset.increment) {
        increment(e.target.dataset.increment)
    }
})

function decrement(itemId) {
    const targetObj = priceArray.filter(function(item) {
        return item.id == itemId
    })[0]

    if(targetObj.qty > 1) {
        targetObj.qty--
    }

    targetObj.price = targetObj.basePrice * targetObj.qty

    itemsTotalPrice(priceArray)
    renderPriceHtml(priceArray)
}

function increment(itemId) {
    const targetObj = priceArray.filter(function(item) {
        return item.id == itemId
    })[0]

    targetObj.qty++
    targetObj.price = targetObj.basePrice * targetObj.qty

    itemsTotalPrice(priceArray)
    renderPriceHtml(priceArray)
}

function itemsTotalPrice(priceArray) {
    totalPrice = 0
    priceArray.forEach(function(item){
        totalPrice += (item.price)
    })
}

function addItem(itemId) {
    const itemObj = menuArray.filter(function(menu){
        return menu.id == itemId
    })[0]

    const priceArrayObj = priceArray.filter(function(item){
        return itemObj.id == item.id
    })[0]       //for checking if item already exist or not

    if(!priceArrayObj) {    //if item not exist already then only add
        priceArray.push(
            {
                name: itemObj.name,
                qty: 1,
                price: itemObj.price,
                basePrice: itemObj.price,
                id: itemObj.id
            },
        )
    }
    
    itemsTotalPrice(priceArray)
    renderPriceHtml(priceArray)
    
}

function removeItem(itemId) {
    let i = 0
    let index = i       //to get the index of object which is to be removed
    priceArray.filter(function(item){
        if(item.id == itemId) {
            index = i
        }
        i++
    })

    totalPrice -= priceArray[index].price
    priceArray.splice(index, 1)
    renderPriceHtml(priceArray)
}

function completeOrder() {
    if(totalPrice != 0) {
        document.getElementById("modal").style.display = "flex"
    }
}

function payOrder() {
    document.getElementById("modal").style.display = "none"
    const userNameInput = document.getElementById("user-name-input")

    render()
    renderThanksMsg(userNameInput.value)
}

function renderThanksMsg(userName) {
    document.getElementById("price-html-container").style.padding = "0"
    document.getElementById("price-html-container").innerHTML = ""
    document.getElementById("thanks-msg").style.display = "flex"
    document.getElementById("thanks-name").innerText = `Thanks, ${userName}! Your order is on its way!`

}

document.getElementById("form-el").addEventListener('submit', function(e){
    e.preventDefault()
})

function renderPriceHtml(priceArray) {
    let priceHtml = ``
    priceHtml = `<h2>Your Order</h2>`
    priceArray.forEach(function(item){
        priceHtml += `
            <div class="grid-price">
                <h2>${item.name}</h2>
                <div class="order-numbers">
                    <span data-decrement="${item.id}">-</span>
                    <span class="order-numbers-value">${item.qty}</span>
                    <span data-increment="${item.id}">+</span>
                </div>
                <span class="light-color remove" data-remove="${item.id}">remove</span>
                <span class="right-align">$${item.price}</span>
            </div>
        `
    })

    priceHtml += `
        <div class="grid-price total-price">
            <h2>Total Price:</h2>
            <span class="right-align">$${totalPrice}</span>
        </div>

        <button id="complete-order-btn">Complete Order</button>
    `

    document.getElementById("price-html").innerHTML = priceHtml
}


function getMainHtml() {
    let mainHtml = ''
    menuArray.forEach(function(menu){
        mainHtml += `
            <section class="grid">
                <div>
                    <span class="food">${menu.emoji}</span>
                </div>
                <div>
                    <h2>${menu.name}</h2>
                    <p class="light-color">${menu.ingredients}</p>
                    <span>$${menu.price}</span>
                </div>
                <div class="right-align">
                    <i class="fa-light fa-plus"
                    data-add="${menu.id}"></i>
                </div>
            </section>
        `
    })

    return mainHtml
}

function render() {
    document.getElementById("main-html").innerHTML = getMainHtml()
}

render()