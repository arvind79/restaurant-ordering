import {menuArray} from './data.js'

const priceArray = []
let totalPrice = 0

document.addEventListener("click", function(e){
    if(e.target.dataset.add) {
        addItem(e.target.dataset.add)
    }
    else if(e.target.dataset.remove) {
        removeItem(e.target.dataset.remove)
    }
})

function itemsTotalPrice(priceArray) {
    totalPrice = 0
    priceArray.forEach(function(item){
        totalPrice += item.price
    })
}

function addItem(itemId) {
    const itemObj = menuArray.filter(function(menu){
        return menu.id == itemId
    })[0]

    priceArray.push(
        {
            name: itemObj.name,
            price: itemObj.price,
            id: itemObj.id
        },
    )
    
    itemsTotalPrice(priceArray)
    renderPriceHtml(priceArray)
    
}

function renderPriceHtml(priceArray) {
    let priceHtml = ``
    priceHtml = `<h2>Your Order</h2>`
    priceArray.forEach(function(item){
        priceHtml += `
            <div class="grid-price">
                <h2>${item.name}</h2>
                <span class="light-color" data-remove="${item.id}">remove</span>
                <span class="right-align">$${item.price}</span>
            </div>
        `
    })

    priceHtml += `
        <div class="grid-price total-price">
            <h2>Total Price:</h2>
            <span class="right-align">$${totalPrice}</span>
        </div>

        <button>Complete Order</button>
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