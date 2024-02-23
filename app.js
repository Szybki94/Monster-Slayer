function getRandomNum(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const app = Vue.createApp({
    data () {
        return {
            playerHealth: 100,
            monsterHealth: 100,
        };
    },

    methods: {
        attackMonster () {
            const attackValue = getRandomNum(1, 20)
            this.monsterHealth -= attackValue
            console.log("Monster health:",this.monsterHealth)
            return this.monsterHealth
        },
        attackPlayer () {
            for (let i=0; i<3; i++) {
                const attackValue = getRandomNum(1, 10)
                this.playerHealth -= attackValue
            }
            console.log("Player health", this.playerHealth)
            return this.playerHealth
        }
    },
})

app.mount('#game')
