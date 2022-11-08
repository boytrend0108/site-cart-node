
Vue.component('products', { // создаем копонент для каталога
    data() {
        return {
            catalogUrl: '/catalogData.json', // адресс
            products: [], // массив для продуктов каталогоа
            filtered: [], // массив для отфильтрованных товаров
            imgCatalog: 'https://via.placeholder.com/200x150', // картинка для каталога
        }
    },
    template:
        /*HTML */
        `<div class="products">
        <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
     </div>
    `,

    mounted() { // метод заполняет массивы для каталога и корзины
        // идем к родителю, забираем метод getJSON и подставляем в него собранныю сcылку на каталог.
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    // и пушим его в массив products
                    this.products.push(el);
                    // и тоже кладем  в массив filtered, т.к у нас отрисовка будет по нему
                    this.filtered.push(el);
                }
            });
    },

    methods: {
        filter(value) {// метод фильтрации
            // создаем регулярку из того что ввели в поле userSearch
            let regexp = new RegExp(value, 'i');
            //  фильтруем массив products с и  меняем массив filtered, из которого рисуется каталог.
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

});


Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            /**
             * Создали ссылку на API нашей корзины. Т.к. все компоненты у нас регистрируются в корневом экземпляре Vue,
             * то мы легко можем получить доступ к ним используя свойство $root.
             * $parent можно использовать для доступа к родительскому экземпляру из дочернего.
             */

            cartAPI: this.$root.$refs.cart,// идем в корневой компонент, идем в refs потом в карт - потом оттуда будем достовать нужные методs
        };
    },

    template:
        /*HTML*/
        `<div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
                    
<!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
});
