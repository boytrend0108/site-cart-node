Vue.component('error', {
    data() {
        return {
            text: ''
        }
    },

    template:
        /*HTML*/
        `<div class="error-block" v-if="isVisible"> 
             <p class="error-msg">
             <!--При клике вызываем метот setError и добавляем ковычки чтобы вывести текст ошибки.-->
        <button class="close-btn" @click="setError('')">&times;</button>
        {{ text }}
             </p>
         </div>
`,

    methods: {
        setError(error) {
            this.text = error
        }
    },
    computed: {
        isVisible() {
            return this.text !== ''// если text не пустой то возвращаем true
        }
    },

});
