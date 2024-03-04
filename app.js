function getRandomNum(min, max) {
    return Math.floor(Math.random() * (Math.ceil(max) - Math.ceil(min) + 1)) + Math.ceil(min);
}

function sumArray(array) {
    return array.reduce((acc, current) => acc + current, 0);
}
  

const app = Vue.createApp({
    data () {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            logMessages: [],
            gameOverMessage: null,
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

    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.gameOverMessage = "EPIC DEATH";
                this.monsterHealth = 0;
                this.playerHealth = 0;
            } else if (value <= 0) {
                this.gameOverMessage = "YOU DIED";
                this.playerHealth = 0;
            }
        },
        monsterHealth(value) {
            if (value <= 0) {
                this.gameOverMessage = "GREAT VICTORY!!!";
                this.monsterHealth = 0;
            }
        }
    },

    methods: {
        attackMonster () {
            const attackValue = getRandomNum(1, 20);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
            this.addBattleLog("Player", "Attack", attackValue);
        },
        attackPlayer () {
            this.currentRound++;
            const attackValues = []
            for (let i=0; i<3; i++) {
                const attackValue = getRandomNum(1, 10)
                attackValues.push(attackValue)
                this.playerHealth -= attackValue
            }
            this.addBattleLog("Monster", `Attack`, sumArray(attackValues));
        },
        specialAttack() {
            this.currentRound++;
            const attackValues = []
            for (i=0; i<2; i++) {
                const specialAttackValue = getRandomNum(10, 20)
                attackValues.push(specialAttackValue)
                this.monsterHealth -= specialAttackValue
            }
            this.attackPlayer();
            this.addBattleLog("Player", "Special Attack", sumArray(attackValues));
        },
        healPlayer () {
            this.currentRound++;
            const healValues = []
            for (i=0; i<6; i++) {
                const healValue = getRandomNum(1, 6);
                healValues.push(healValue)
                this.playerHealth += healValue;
                if (this.playerHealth > 100) {
                    this.playerHealth = 100
                }
            }
            this.attackPlayer()
            this.addBattleLog("Player", "Heal", sumArray(healValues));
        },
        surrender () {
            const options = {
                0: "MONSTER ATE YOU AND SPARE VILLAGERS",
                1: "MONSTER ATE YOU AND MAKE MASACRE",
                2: "MONSTER BECAME YOUR FRIEND",
            }
            const random = getRandomNum(0,2)
            this.addBattleLog("Player", "Surrender", options[random]);
            this.gameOverMessage = options[random]
        },
        addBattleLog(actor, event, value) {
            logMessage = {  
                actor: actor,
                event: event,
                value: value
            }
            this.logMessages.unshift(logMessage);

        },
        resetGame () {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 100;
            this.gameOverMessage = null;
            this.logMessages = [];
        },
        actorLogClass (actor) {
            if (actor=== "Player"){
                return "log--player"
            }else if (actor === "Monster"){
                return "log--monster"
            }
        },
        eventLogClass(event) {
            if (event === "Attack" || event === "Special Attack") {
                return "log--damage";
            } else if (event === "Heal") {
                return "log--heal";
            }
        },
    },
})

app.mount('#game')
