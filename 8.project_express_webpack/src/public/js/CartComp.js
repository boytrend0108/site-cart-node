// At first create product, then products- otherwise app don't work

const cartItem = {
    // recieve cartItem and img from cart
    props: ['cartItem', 'img'],
    template:
        /*html*/
        `        <div class="cart-item">
                    <div class="product-bio">
                        <img :src="img" alt="Some image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за шт</p>
                        </div>
                    </div>
                    <div class="right-block">
                        <p class="product-price">{{cartItem.sumPrice}}₽</p>
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <button class="buy-btn" @click="$emit('add', cartItem)" style="background-color:green">+</button>
                    </div>
                </div>
    `
};

const cart = {// coздаем module cart
    components: { cartItem },
    data() {
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            cartItems: [],// array for cart
            showCart: false,// on click make cart visible/invisible
            amount: 0,// total amound for items in the cart $
            countGoods: 0, // total amound itemd in the cart
            // sumPrice: 0 // total price for one single item
        }
    },
    // mount cart
    mounted() {
        this.$parent.getJson('/api/cart') // go to main.js and take getJSON(), as arg insert api/cart
            .then(data => {// if OK we get data from userCart.json
                for (let el of data.contents) {// every el pushes in cartItems
                    this.cartItems.push(el);
                    // забираем данные из сервера чтобы отрисовать в НТML
                    this.amount = data.amount;
                    this.countGoods = data.countGoods;

                }
            });
    },

    template:
        // :key - for correct work v-for, :cartItem and :img- for props in "cart-item" components
        /*html*/
        ` <div>
        <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>
        <div class="cart-block" v-show="showCart">
            <p v-if="!cartItems.length">Корзина пуста</p>
            <cart-item class="cart-item" 
            v-for="item of cartItems" 
            :key="item.id_product"
            :cartItem="item" 
            :img="imgCart"
            @remove="remove"
            @add="addProduct">
            </cart-item>
            <!--If cartItems.length exist- we show this div-->
            <div  class="cart-item" v-if="cartItems.length">
            <h3>Итого {{amount}}</h3>
            <button class="del-btn" @click="clearCart">Clear cart</button>
            </div>
        </div>
    </div>`,
    methods: {
        addProduct(product) { // try to find in cartItems our product by id
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {// if true
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {// here data is { result: 1, Cart } from handler.js
                        if (data.result === 1) {// if 
                            this.amount = data.Cart.amount; // update amount
                            find.quantity++;
                            find.sumPrice = find.price * find.quantity;
                        }
                    });

            } else {// if this product doesn't exsist in cartItems-make a copy of product using Object.assign and add quantity:1 and sumPrice
                // create new cartItem by copying our product and add (quantity: 1, sumPrice: product.price )
                let prod = Object.assign({ quantity: 1, sumPrice: product.price }, product);
                this.$parent.postJson('/api/cart', prod)// go to main.js and call postJSON 
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.amount = data.Cart.amount;
                        }
                    });
            }
        },
        remove(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                    .then(data => { // дата это { "result": 1, Cart } из hanler.js
                        if (data.result === 1) {
                            item.quantity--;
                            this.amount = data.Cart.amount;
                        }
                    });

            } else {
                this.$parent.deleteJson(`/api/cart/${item.id_product}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.amount = data.Cart.amount;
                        }
                    });

            }
        },
        clearCart() {
            this.$parent.deleteJson('/api/cart/clear') // go to main.js and take getJSON(), as arg insert api/cart/clear
                .then(data => {// if OK we get data from userCart.json
                    this.cartItems = data.Cart.contents;
                });
        },
    },
};

// export cart outside
export default cart;