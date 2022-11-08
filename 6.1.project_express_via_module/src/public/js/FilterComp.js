const search = {

    data() {
        return {
            userSearch: ''// field of search
        }
    },
    template:/*html*/ `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
            <!--Replaced event click to event input-->
                <input type="text" class="search-field" v-model="userSearch" @input="$parent.$refs.products.filter(userSearch)">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
};

export default search;
