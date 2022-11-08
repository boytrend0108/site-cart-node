Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },
    template: /*html*/`
    <!--if isVisible === true we show this div-->
    <div class="error-block" v-if="isVisible"> 
        <p class="error-msg">
        <!-- we use '' in serError couse there will be a string -->
            <button class="close-btn" @click="setError('')">&times;</button>
            {{ text }}
        </p>
    </div>
    `,
    methods: {
        setError(error) {
            this.text = error // substitude a text of the error
        }
    },
    computed: {
        isVisible() {
            return this.text !== '' // if this.text not empty return 'true' and if vice versa 'false'
        }
    },

});
