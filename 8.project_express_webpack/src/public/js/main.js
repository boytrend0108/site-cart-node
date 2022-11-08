// import all ours modules
import cart from './CartComp.js'
import products from './ProducComp.js'
import search from './FilterComp.js'
import error from './ErrorComp.js'

const app = {
    el: '#app', // connect app whith html
    components: {// add this components
        cart,
        products,
        error,
        search,
    },
    methods: {
        getJson(url) {
            return fetch(url)// go to server.js
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {// data - our product that we clicked on + (quantity: 1)
            return fetch(url,
                // this is mixin of our request
                {
                    method: 'POST',// specify our method
                    headers: {
                        "Content-Type": "application/json"// specify type of our request
                    },
                    body: JSON.stringify(data) // body of our request
                })// // go to server.js and return promise (object Response)
                .then(result => result.json())// turn object Response to json end send json to CartComp
                .catch(error => { // catch err if there is one
                    this.$refs.error.setError(error);
                });
        },
        putJson(url, data) {// url is: `/api/cart/${find.id_product}`, data is-{ quantity: 1 }
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)// body of our request ({ quantity: 1})
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