`use strict`
// Получаем ссыдку на JSON-файл с данными товаров в коталоге. (которые вызываются функцией  _fetchGoods() )
const API = `https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses`

class productList {
    constructor(container = `.products`) {
        this._container = document.querySelector(container);
        this._goods = []; // храним товары в виде сырых данных, изначально массив пустой.
        this._allProducts = []; // храним уже готовые товары
        this._fetchGoods(); // выполяем этот метод. (заполняем пустой массив)
        this._render(); // выполняем этот метод.
        this.totalPrice();


    }
    // создаем метод с помощью которого мы получаем данные, пока просто в ввиде массива
    // в будущем будем подучать и АPi или сервера. 
    _fetchGoods() {
        this._goods = [
            { id: 1, title: `Notebook`, price: `1000`, quantity: `10`, img: `https://picsum.photos/200/300` },
            { id: 2, title: `Mouse`, price: `100`, quantity: `15`, img: `https://picsum.photos/200/300` },
            { id: 3, title: `Keyboard`, price: `250`, quantity: `1`, img: `https://picsum.photos/200/300` },
            { id: 4, title: `Gamepad`, price: `150`, img: `https://picsum.photos/200/300` }
        ];
    }
    // здесь собираем все товары в кучу в НТМЛ
    _render() {
        for (const product of this._goods) { // для каждого елемента из масива делаем...
            const productObject = new ProductItem(product);// coздаем объект 
            this._allProducts.push(productObject); // добавляем этот объект в хранилище для готовых объектов.
            this._container.insertAdjacentHTML(`beforeend`, productObject.getHTMLString()) // добавляем НTML
            console.log(productObject);
        }

    }

    // Метот обределяющий сумарную стоимость всех товаров
    totalPrice() {
        let totalPrice = this._goods.reduce((sum, { price }) => +sum + +price, 0);
        return totalPrice;
    }


}



// С помощью этого класса будем создавать карточку товара в НТМЛ
class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.quantity = product.quantity;
        this.img = product.img;
    }

    getHTMLString() {
        return `<div class="product-item">
        <h3>${this.title}</h3>
        <img src="${this.img}" alt="img">
        <p> Цена ${this.price}</p>
        <p> Количество ${this.quantity}</p>
        <button class="by-bnt">Добавить</button>
    </div>`;
    }
}

new productList(); // запускаем 

productList.testFn;



// // класс для корзины

// class CartProducts {
//     constructor(container = `.busketWrapper`) {
//         this.title = product.title;
//         this.price = product.price;
//         this.quantity = product.quantity;
//         this.summ();
//     }
//     // Считаем стоимость одного товара
//     summ(/*кол-во и цена*/) {
//         /*кол-во * цена */
//     }
//     // Считаем общую стоимость товаров в корзине
//     totalSumm(/*массив из продуктов*/) {
//         /* Складываем стоимость */
//     };

//     // удаляем товар из корзины
//     // меняем кол-во выбранного товара
//     // очистить корзину

// }

// // класс для елемента корзины

// class ItemInCart {
//     constructor(container = `.busketItemBox`) {
//         this.title = product.title;
//         this.price = product.price;
//         this.quantity = product.quantity;
//         this.summ();
//     }

//     // метод - удалить товар
//     // изменить кол-во
// }

// const products = [
//     { id: 1, title: `Notebook`, price: `1000`, quantity: `10`, img: `https://picsum.photos/200/300` },
//     { id: 2, title: `Mouse`, price: `100`, quantity: `15`, img: `https://picsum.photos/200/300` },
//     { id: 3, title: `Keyboard`, price: `250`, quantity: `1`, img: `https://picsum.photos/200/300` },
//     { id: 4, title: `Gamepad`, price: `150`, img: `https://picsum.photos/200/300` },

// ]

// const renderProduct = (title, price, quantity = 0, img) =>
// `<div class="product-item">
//         <h3>${title}</h3>
//         <img src="${img}" alt="img">
//         <p> Цена ${price}</p>
//         <p> Количество ${quantity}</p>
//         <button class="by-bnt">Добавить</button>
//     </div>`;


// const renderProducts = (list) => {
//     const productList = list.map(item =>
//         renderProduct(item.title, item.price, item.quantity, item.img)).join(``);
//     document.querySelector(`.products`).innerHTML = productList;
// }

// renderProducts(products);


