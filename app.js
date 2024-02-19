const app = Vue.createApp({
    data () {
        return {
            playerHealth: undefined,
            monsterHealth: undefined,
        };
    },

    methods: {
        attackMonster () {
            const min = Math.ceil(0);
            const max = Math.floor(20);
            const result = Math.floor(Math.random() * (max - min + 1)) + min;
            console.log(result)
            return result
        }
    },
})

app.mount('#game')
