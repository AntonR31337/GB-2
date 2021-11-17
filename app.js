"use stric"

let cartItem = document.querySelector('.menu-button_cart-positions__title');
let cartPrice = document.querySelector('.menu-button_cart-positions__summ');

const basket = {};
basket.summ = 0;

document.querySelector(".feature-products").addEventListener('click', (event)=>{
    if (!event.target.classList.contains('feature-products-overlay_btn')){
        return
    }
    const thisGood = event.target.closest('.feature-product-item');
    
    const goodId = thisGood.id;
    const goodName = thisGood.dataset.name;
    const goodPrice = Number(thisGood.dataset.price);
    toBasket(goodId, goodName, goodPrice);
    renderProductInBasket(goodId);
    basket.summ = basket.summ + goodPrice;
    cartPrice.textContent = basket.summ;
});

function toBasket(id, name, price){
    if (!(id in basket)){
        basket[id] = {
            id,
            name,
            price,
            count: 0,
        }
    }; 
    basket[id].count++;
};

function renderProductInBasket(productId){
    const cartPosition = document.querySelector(`.menu-button_cart-positions__title[data-productId="${productId}"]`);
    if (!cartPosition){
        renderNewProductInBasket(productId);
        return;
    }

    const product = basket[productId];
    cartPosition.querySelector('.menu-button_cart-positions__goods-count').textContent = product.count;

    cartPosition.querySelector('.menu-button_cart-positions__goods-summ').textContent = (product.price * product.count);
}

function renderNewProductInBasket(productId){
    const cartPosition = `
    <ul class="menu-button_cart-positions__title" data-productId="${productId}">
        <li class="menu-button_cart-positions__goods-item">
        ${basket[productId].name}
        </li>
        <li class="menu-button_cart-positions__goods-count">
        ${basket[productId].count}
        </li>
        <li class="menu-button_cart-positions__goods-price">
        ${basket[productId].price}
        </li>
        <li class="menu-button_cart-positions__goods-summ">
        ${basket[productId].price}
        </li>
</ul>
    `;
    cartItem.insertAdjacentHTML("afterend", cartPosition);
}


// скртытие/показ меню

document.querySelector("body > header > div > div.header-col-2 > button").addEventListener('click', () => {
    document.querySelector("body > header > div > div.header-col-2 > nav").classList.toggle('main-menu-hidden');
});

document.querySelector("body > header > div > div.header-col-2 > nav > div > button").addEventListener('click', () => {
    document.querySelector("body > header > div > div.header-col-2 > nav").classList.toggle('main-menu-hidden');
})