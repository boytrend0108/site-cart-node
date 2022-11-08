// At first create product, then products- otherwise app don't work
const product = {
    // recieve product and img from products
    props: ['product', 'img'],
    template: /*html*/ `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
<!-- 2 var <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
};

// Create products
const products = {
    components: { product },// connect with product component
    data() {
        return {
            products: [],// массив для продуктов каталога
            filtered: [],// массив для отфильтрованных товаров(каталог отрисовывается через него)
            imgCatalog: 'https://via.placeholder.com/200x150',// заглушка картинки
        }
    },
    // монтируем катaлог
    mounted() {// идем в main.js достаем метод getJson и подтсавляем /api/products
        this.$parent.getJson('/api/products')// если запрос прошел- ответ записывается в data-(products.json)
            .then(data => {// обрабатываем ответ
                for (let el of data) {// проходимся по массиву и каждый елемент...
                    this.products.push(el);//пушим в products 
                    this.filtered.push(el);//пушим в filtered (из него будем отрисовывать)
                }
            });
    },
    methods: {
        filter(userSearch) {// userSearch we recieve from FilterComp.js
            let regexp = new RegExp(userSearch, 'i');// create a regexp
            // to 'filtered' we put all items in products that match our regexp
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },

    template: /*html*/ `
        <div class="products">
        <!--:product="item"- this we send to product as a props-->
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
};

export default products;// export products outside