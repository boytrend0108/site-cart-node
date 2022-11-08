Vue.component('cart', {

    data() {
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            cartUrl: '/getBasket.json',
            cartItems: [], // сюда складываем товары корзины
            showCart: false,
        }
    },

    template:
        /*HTML*/
        `<div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
        <!-- если массив cartItems пустой ввіводим єту надпись-->
            <p v-if="!cartItems.length">Корзина пуста</p>
            <!--Вставляем компонент cart-item  -->
            <cart-item class="cart-item" 
            v-for="item of cartItems" :key="item.id_product"
            :cartItem="item" 
            :img="imgCart"
            @remove="remove"
            @add="addProduct">
            </cart-item>
        </div>
    </div>`,

    mounted() {// заполняем массив cartItems товарами
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {// получаем данные о товарах в корзине из АПИ
                for (let el of data.contents) { // каждый елемент из data.contents
                    this.cartItems.push(el);// пушим в массив cartItems
                }
            });
    },
    methods: {
        addProduct(product) {
            //идем к родителю (main), забираем метод getJSON
            this.$parent.getJson(`${API}/addToBasket.json`) // подтставляем АПИ-адресс и берем данные.
                .then(data => {
                    if (data.result === 1) {// если всё ок.(проверка на корректность получения данных)
                        // используем метод find, чтобы понять есть ли уже наш product в корзине.
                        // берем id елемента корзины и сравниваем с id нашего product.
                        // если есть то записываем этот продакт в переменную find
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {// если find cуществует (т.е. такой product уже есть в корзине)
                            find.quantity++; // к его количеству прибавляем 1
                        } else { // если такого товара в козине нет создаем новый объект с 
                            // помощью метода Object.assign
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod) // пушим этот объект в массив корзины.
                        }
                    } else {// если не удалось получить данніе - віводим ощибку
                        alert('Error');
                    }
                })
        },

        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        // если кол-во товара больше 1
                        if (item.quantity > 1) {
                            item.quantity--; // то уменьшаем на единицу
                        } else { // в противном случае удаляем етот item из массива
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },



});

Vue.component('cart-item', {
    props: ['cartItem', 'img'], // получаем данные извне
    template:
        /*HTML*/
        ` <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за шт.</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                        <!--сartItem это объект(товар в корзине)-->
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <button class="del-btn" @click="$emit('add', cartItem)">+</button>
                    </div>
                </div>
         `
});
