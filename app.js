function getRandomNum(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

const app = Vue.createApp({
    data () {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
        };
    },

    computed: {
        monsterBarStyles () {
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles () {
            return {width: this.playerHealth + '%'}
        },
        specialAttackButtonDisabled() {
            return this.currentRound % 3 !== 0;
        },
        healButtondDisabled () {
            return this.playerHealth >=80;
        },
    },

    methods: {
        attackMonster () {
            const attackValue = getRandomNum(1, 20);
            this.monsterHealth -= attackValue;
            console.log("Monster health:",this.monsterHealth);
            this.attackPlayer();
        },
        attackPlayer () {
            this.currentRound++;
            for (let i=0; i<3; i++) {
                const attackValue = getRandomNum(1, 10)
                this.playerHealth -= attackValue
            }
            console.log("Player health", this.playerHealth)
        },
        specialAttack() {
            this.currentRound++;
            for (i=0; i<2; i++) {
                const specialAttackValue = getRandomNum(10, 20)
                this.monsterHealth -= specialAttackValue
            }
            console.log("Monster health after special attack:",this.monsterHealth)
            this.attackPlayer();
        },
        healPlayer () {
            this.currentRound++;
            for (i=0; i<6; i++) {
                const healValue = getRandomNum(1, 6);
                // console.log(`Dice ${i+1}: `, healValue)
                this.playerHealth += healValue;
                if (this.playerHealth > 100) {
                    this.playerHealth = 100
                }
            }
            this.attackPlayer()
        }
    },
})

app.mount('#game')
