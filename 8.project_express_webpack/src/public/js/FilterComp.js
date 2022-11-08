const search = {

    data() {
        return {
            userSearch: ''// field of search
        }
    },
    template:/*html*/ `
            <!-- If we'll use click on button, to see result- use this html:
             <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">... -->

            <form action="#" class="search-form">
            <!-- Every inpun run filter method -->
                <input type="text" class="search-field" v-model="userSearch" @input="$parent.$refs.products.filter(userSearch)">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>
    `
};

export default search; // export search outside
