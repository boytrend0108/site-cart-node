`use strict`
// Cсылка на неизменяемую часть адреса АПИ
const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
// Создаем объект класса Vue
const app = new Vue({
    el: '#app', // ID куда будем отрисовывать
    methods: {
        getJson(url) { // получаем JSON
            return fetch(url)
                .then(result => result.json())
                .catch(error => { // здесь отлавливаем ошибку если не удалось получить данные из АПИ
                    this.$refs.error.setError(error);
                })
        },
    },

});

