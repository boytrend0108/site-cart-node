// import all ours moduls
import cart from './CartComp.js'
import products from './ProducComp.js'
import search from './FilterComp.js'
import error from './ErrorComp.js'


const app = {
    el: '#app', // connect app whith html
    // add this components
    components: {
        cart,
        products,
        error,
        search,
    },
    methods: {
        getJson(url) {// делаем запрос на сервер методом get (см server.js/CartRouter.js) и на url получаем данные из userCart.json или product.json в зависимости от url 
            return fetch(url)// запрашиваем  данные по указанному url(идем на server.js) и если ОК- возвращаем откуда был запрос
                .then(result => result.json())// получаем данные в ввиlе потока и вынемаем тело JSON-файла 
                .catch(error => {//тогда обработаем ошибку методом setError
                    this.$refs.error.setError(error);// go to ErrorComp, and use setError method
                })
        },
        postJson(url, data) {
            return fetch(url, { // go to server.js
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data) // body of our request
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)// body of our request
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
        deleteJson(url) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                });
        },
    },
};

// export app outside
export default app;