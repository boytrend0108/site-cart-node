Vue.component('filter-el', {
    data() {
        return {
            userSearch: ''
        }
    },
    // это заметка компонента "filter-el" которая будет вставлятся в НТМЛ. При нажатии на кнопку поиска - идем к родителю $parent, у родителя ищем копонент products ($refs.products) и вытягиваем оттуда метод filter и подставляем userSearch
    template:
        /*HTML*/
        `<form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
        `
});
