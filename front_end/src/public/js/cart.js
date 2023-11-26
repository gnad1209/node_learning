const SanPhams = require('../../models/SanPhams');
const {
    mutipleMongooseToObject,
    mongooseToObject,
} = require('../../ulti/mongoose');

let productsEle = mutipleMongooseToObject(SanPhams)

function renderUI(arr) {
    productsEle.innerHTML = '';

    if (arr.length == 0) {
        productsEle.insertAdjacentHTML(
            'afterbegin',
            '<li>Không có sản phẩm nào trong giỏ hàng</li>'
        );
        document.querySelector('.option-container').style.display = 'none';
        return;
    }
}

function renderUI(arr) {
    // ...
    let countEle = document.querySelector('.count');
    countEle.innerText = `${updateTotalItem(arr)} items in the bag`;

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `
            <li class="row">
                <div class="col left">
                    <div class="thumbnail">
                        <a href="#">
                            <img src="W" alt="${p.name}">
                        </a>
                    </div>
                    <div class="detail">
                        <div class="name"><a href="#">${p.name}</a></div>
                        <div class="description">
                            ${p.description}
                        </div>
                        <div class="price">${convertMoney(p.price)}</div>
                    </div>
                </div>
                <div class="col right">
                    <div class="quantity">
                        <input type="number" class="quantity" step="1" value="${ p.count}" >
                    </div>
                    <div class="remove">
                        <span class="close">
                            <i class="fa fa-times" aria-hidden="true"></i>
                        </span>
                    </div>
                </div>
            </li>
        `;
    }

    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        productsEle.innerHTML += `

        <div class="remove">
            <span class="close" onclick="removeItem(${p.id})">
                <i class="fa fa-times" aria-hidden="true"></i>
            </span>
        </div>
        `;
    }
}

function convertMoney(num) {
    return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

function removeItem(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == id) {
            products.splice(i, 1);
        }
    }
    renderUI(products);
}

function updateTotalItem(arr) {
    let total = 0;
    for (let i = 0; i < arr.length; i++) {
        const p = arr[i];
        total += p.count;
    }
    return total;
}

window.onload = renderUI(products);