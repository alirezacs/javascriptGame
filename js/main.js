
localStorage.actorRecord = 0;

class Start{
    constructor(division) {
        this.division = division;
        this.gameBoxItems = [];
        this.actor = {
            currentLocation: {
                x: null,
                y: null
            },
            prevLocation: null,
        };
        this.actorScore = 0;
    }

    /* Registering Events */
    registerEvent() {
        let actorMoveBtn = document.getElementsByClassName('game-actor-move-btn');
        for (let i of actorMoveBtn){
            i.addEventListener('click', this.directionBtnClickEvent);
        }
        window.addEventListener('keydown', this.windowKeyDownEvent);
    }

    windowKeyDownEvent = (e) =>  {
        e.preventDefault();
        switch (e.keyCode) {
            case 38:
                this.actorMove('top');
                break;
            case 39:
                this.actorMove('right');
                break;
            case 40:
                this.actorMove('bottom');
                break;
            case 37:
                this.actorMove('left');
                break;
        }
    }

    directionBtnClickEvent = (e) => {
        switch (e.target.id) {
            case 'game-panel-keyboard-move-top-btn':
                obj.actorMove('top');
                break;
            case 'game-panel-keyboard-move-right-btn':
                obj.actorMove('right');
                break;
            case 'game-panel-keyboard-move-bottom-btn':
                obj.actorMove('bottom');
                break;
            case 'game-panel-keyboard-move-left-btn':
                obj.actorMove('left');
                break;
        }
    }
    /* Registering Events */

    /* Start Game Process */    
    init() {

        /* Register Events */
        this.registerEvent();
        /* Register Events */

        /* Game Box Container (game-box class) */
        let gameBoxContainer = document.getElementById('game-box');
        gameBoxContainer.innerHTML = ''; // Remove All Game Box Container Childes
        /* Game Box Container (game-box class) */

        /* Set Actor Score To Zero */
        let gameStatusScoreContainer = document.getElementById('game-status-score-span');
        this.actorScore = 0;
        let actorCurrentScore = this.actorScore;
        gameStatusScoreContainer.innerHTML = `${actorCurrentScore} Score`;
        /* Set Actor Score To Zero */

        
        /* Picking The Game Box Item */
        for (let i = 0; i < this.division; i++){

            /* Create a Row */
            let row = document.createElement('div');
            row.classList = 'game-box-item-row';
            row.setAttribute('id', 'game-box-item-row');
            /* Create a Row */

            /* Append Row to Game Box Container */
            gameBoxContainer.appendChild(row);
            /* Append Row to Game Box Container */

            /* Picking The Columns */
            for (let j = 0; j < this.division; j++){

                /* Create a Column */
                let gameBoxItem = document.createElement('div');
                gameBoxItem.classList = 'game-box-item';
                gameBoxItem.setAttribute('id', 'game-box-item');
                gameBoxItem.style.width = row.clientWidth / this.division - 15 + 'px';
                gameBoxItem.style.height = row.clientWidth / this.division - 15 + 'px';
                /* Create a Column */

                /* Append Column to Row */
                row.appendChild(gameBoxItem);
                /* Append Column to Row */
                
                /* Seting Column Info */
                let gameBoxItemInfo = {
                    id: this.gameBoxItems.length,
                    locationX: i,
                    locationY: j,
                    isPit: false,
                    isUsed: false,
                };
                /* Seting Column Info */

                /* Register Column Info */
                this.gameBoxItems.push(gameBoxItemInfo);
                /* Register Column Info */

            }
            /* Picking The Columns */

        }
        /* Picking The Game Box Item */

        /* Entering Actor To The Game */
        this.enterActorToTheGame();
        /* Entering Actor To The Game */

        /* Disabling Car Accident Image */
        document.getElementById('game-status-accident').style.display = 'none';
        /* Disabling Car Accident Image */

        /* Set Pits */
        this.setPits();
        /* Set Pits */

        /* Start Timer */
        clearInterval(this.gameTimer);
        this.startGameTimer();
        /* Start Timer */

        console.log('Init End');


    }
    /* Start Game Process */

    /* Start Timer */
    startGameTimer() {
        let gameStatusTimerContainer = document.getElementById('game-status-timer-container');
        let hourse = 0;
        let minutes = 0;
        let second = 0;
        this.gameTimer = setInterval(() => {
            second++;
            if (second == 60) {
                minutes++;
                second = 0;
            }
            if (minutes == 60) {
                hourse = 1;
                minutes = 0;
            }
            gameStatusTimerContainer.innerHTML = hourse + ':' + minutes + ':' + second;
        }, 1000);
    }
    /* Start Timer */

    /* Seting Pits */
    setPits() {
        let pitsCount = (this.gameBoxItems.length / 100) * 20;
        let pitsLocation = [];

        /* Define Pits Location In Map */
        while (pitsLocation.length < pitsCount) {
            let number = Math.floor(Math.random() * this.gameBoxItems.length - 1) + 1;
            if (pitsLocation.indexOf(number) === -1 && number !== 0) {
                pitsLocation.push(number)
            };
        }
        /* Define Pits Location In Map */

        /* Picking Up Pits */
        pitsLocation.forEach(pit => {
            this.gameBoxItems[pit].isPit = true;
        });
        /* Picking Up Pits */

    }
    /* Seting Pits */
    
    /* Entering The Actor To The Game */
    enterActorToTheGame(){
        this.actor.currentLocation = {
            x: 0,
            y: 0,
        };
        let firstColumn = document.getElementsByClassName('game-box-item-row')[this.actor.currentLocation.x].children[this.actor.currentLocation.y];
        this.actorElement = document.createElement('div');
        this.actorElement.classList = 'game-actor';
        let actorElementIcon = document.createElement('i');
        actorElementIcon.classList = 'fa-solid fa-car';
        this.actorElement.appendChild(actorElementIcon);
        firstColumn.appendChild(this.actorElement);
    }
    /* Entering The Actor To The Game */
    

    /* Move Actor */
    actorMove(direction) {

        /* Disabling Car Accident Image */
        document.getElementById('game-status-accident').style.display = 'none';
        /* Disabling Car Accident Image */

        let moveDirection = direction;
        let actor = this.actor;
        let actorElement = this.actorElement;

        let actorCurrentLocation = {
            x: actor.currentLocation.x,
            y: actor.currentLocation.y,
        };


        let actorCurrentColumn = document.getElementsByClassName('game-box-item-row')[actorCurrentLocation.x].children[actorCurrentLocation.y];
        /* Finding Actor Current Column Info */
        let actorCurrentColumnInfo = this.gameBoxItems.filter((box) => {
            if (box.locationX == actorCurrentLocation.x && box.locationY == actorCurrentLocation.y) {
                return box;
            }
        });
        /* Finding Actor Current Column Info */

        /* Reseting Column Style */
        actorCurrentColumn.style.border = '1px solid #333';
        /* Reseting Column Style */

        

        /* Create Game Box Shake */
        function gameBoxShake() {
            let gameBoxContainer = document.getElementById('game-box');
            gameBoxContainer.classList.add('game-box-shake');
            gameBoxContainer.onanimationend = () => {
                gameBoxContainer.classList.remove('game-box-shake');
            }
        }
        /* Create Game Box Shake */

        /* Stop Game If User Go To a Pit */
        if (actorCurrentColumnInfo[0].isPit) {
            for (let i of this.gameBoxItems) {
                if (i.isPit) {
                    document.getElementsByClassName('game-box-item-row')[i.locationX].children[i.locationY].style.backgroundColor = 'red';
                }
            }
            this.showGameOver(this.actorScore);
        } else {
            /* Recognition Move Direction */
            switch (moveDirection) {
                /* If Direction Move Is Top... */
                case 'top': {
                    if (!(actorCurrentLocation.x <= 0)) {
                        /* If Actor Don't Get Walls, Resume... */
                        if (! actorCurrentColumnInfo[0].isUsed) {
                            this.actorScore++;
                        }
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        this.actor.currentLocation.x--;
                        actorCurrentColumn.innerHTML = '';
                        let actorNextLocation = document.getElementsByClassName('game-box-item-row')[actorCurrentLocation.x - 1].children[actorCurrentLocation.y];
                        actorNextLocation.appendChild(actorElement);
                        this.gameBoxItems[actorCurrentColumnInfo[0].id].isUsed = true;
                        /* If Actor Don't Get Walls, Resume... */
                    } else {
                        /* If Actor Get Walls, Stop Game And Do... */
                        this.actorScore--;
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        document.getElementById('game-status-accident').style.display = 'flex';
                        actorCurrentColumn.style.border = '1px solid';
                        actorCurrentColumn.style.borderTopColor = '#e01818';
                        this.actorElement.style.color = '#e01818';
                        gameBoxShake();
                        /* If Actor Get Walls, Stop Game And Do... */
                    }
                }
                break;
                /* If Direction Move Is Top... */
                
                /* If Direction Move Is Right... */
                case 'right': {
                        /* If Actor Don't Get Walls, Resume... */
                    if (!(actorCurrentLocation.y == this.division - 1)) {
                        /* If Actor Don't Get Walls, Resume... */
                        if (! actorCurrentColumnInfo[0].isUsed) {
                            this.actorScore++;
                        }
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        this.actor.currentLocation.y++;
                        actorCurrentColumn.innerHTML = '';
                        let actorNextLocation = document.getElementsByClassName('game-box-item-row')[actorCurrentLocation.x].children[actorCurrentLocation.y + 1];
                        actorNextLocation.appendChild(actorElement);
                        this.gameBoxItems[actorCurrentColumnInfo[0].id].isUsed = true;
                        /* If Actor Don't Get Walls, Resume... */
                    } else {
                        /* If Actor Get Walls, Stop Game And Do... */
                        this.actorScore--;
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        document.getElementById('game-status-accident').style.display = 'flex';
                        actorCurrentColumn.style.border = '1px solid';
                        actorCurrentColumn.style.borderRightColor = '#e01818';
                        this.actorElement.style.color = '#e01818';
                        gameBoxShake();
                        /* If Actor Get Walls, Stop Game And Do... */
                    }
                }
                break;
                /* If Direction Move Is Right... */
                
                /* If Direction Move Is Bottom... */
                case 'bottom': {
                    if (!(actorCurrentLocation.x == this.division - 1)) {
                        /* If Actor Don't Get Walls, Resume... */
                        if (! actorCurrentColumnInfo[0].isUsed) {
                            this.actorScore++;
                        }
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        this.actor.currentLocation.x++;
                        actorCurrentColumn.innerHTML = '';
                        let actorNextLocation = document.getElementsByClassName('game-box-item-row')[actorCurrentLocation.x + 1].children[actorCurrentLocation.y];
                        actorNextLocation.appendChild(actorElement);
                        this.gameBoxItems[actorCurrentColumnInfo[0].id].isUsed = true;
                        /* If Actor Don't Get Walls, Resume... */
                    } else {
                        /* If Actor Get Walls, Stop Game And Do... */
                        this.actorScore--;
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        document.getElementById('game-status-accident').style.display = 'flex';
                        actorCurrentColumn.style.border = '1px solid';
                        actorCurrentColumn.style.borderBottomColor = '#e01818';
                        this.actorElement.style.color = '#e01818';
                        gameBoxShake();
                        /* If Actor Get Walls, Stop Game And Do... */
                    }
                }
                break;
                /* If Direction Move Is Bottom... */
                
                /* If Direction Move Is Left... */
                case 'left': {
                    if (!(actorCurrentLocation.y <= 0)) {
                        /* If Actor Don't Get Walls, Resume... */
                        if (! actorCurrentColumnInfo[0].isUsed) {
                            this.actorScore++;
                        }
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        this.actor.currentLocation.y--;
                        actorCurrentColumn.innerHTML = '';
                        let actorNextLocation = document.getElementsByClassName('game-box-item-row')[actorCurrentLocation.x].children[actorCurrentLocation.y - 1];
                        actorNextLocation.appendChild(actorElement);
                        this.gameBoxItems[actorCurrentColumnInfo[0].id].isUsed = true;
                        /* If Actor Don't Get Walls, Resume... */
                    } else {
                        /* If Actor Get Walls, Stop Game And Do... */
                        this.actorScore--;
                        document.getElementById('game-status-score-span').innerHTML = `${this.actorScore} Score`;
                        document.getElementById('game-status-accident').style.display = 'flex';
                        actorCurrentColumn.style.border = '1px solid';
                        actorCurrentColumn.style.borderLeftColor = '#e01818';
                        this.actorElement.style.color = '#e01818';
                        gameBoxShake();
                        /* If Actor Get Walls, Stop Game And Do... */
                    }
                }
                break;
                /* If Direction Move Is Left... */
                    
            }
            /* Recognition Move Direction */
            
            /* Set Record */
            if (this.actorScore > localStorage.actorRecord) {
                localStorage.actorRecord = this.actorScore;
            }
            /* Set Record */

            console.log(localStorage.actorRecord);

        }
        /* Stop Game If User Go To a Pit */
        

    }
    /* Move Actor */

    /* Show Game Over Page */
    showGameOver(actorScore) {
        /* Create Game Over Div And Set Styles */
        let gameOverPage = document.createElement('div');
        gameOverPage.classList = 'game-over';
        gameOverPage.innerHTML = '<h1>Game Over!</h1>';
        gameOverPage.innerHTML += `<h5>Your Score : ${actorScore}</h5>`;
        /* If Actor Has New Record Insert Below Tag */
        if (actorScore >= localStorage.actorRecord) {
            gameOverPage.innerHTML += `<h6>New Record : ${localStorage.actorRecord}</h6>`;
        }
        /* If Actor Has New Record Insert Below Tag */
        gameOverPage.innerHTML += "<button class='game-over-again-btn' id='game-over-again-btn'>Again</button>";
        /* Create Game Over Div And Set Styles */

        /* Append Game Over Page In To Game Box Container */
        let gameBoxContainer = document.getElementById('game-box');
        gameBoxContainer.append(gameOverPage);
        document.getElementById('game-over-again-btn').addEventListener('click', () => {
            let level = document.querySelector('.game-menu-start-game-level .radio-group input[type=radio]:checked').value;
            switch (level) {
                case 'easy': {
                    let obj = new Start(5);
                    obj.init();
                }
                break;
                case 'medium': {
                    let obj = new Start(8);
                    obj.init();
                }
                break;
                case 'hard': {
                    let obj = new Start(10);
                    obj.init();
                }
                break;
            }
        });
        /* Append Game Over Page In To Game Box Container */

        /* Stop Game Timer */
        clearInterval(this.gameTimer);
        /* Stop Game Timer */

        /* Remove Keyboard Event */
        window.removeEventListener('keydown', this.windowKeyDownEvent);
        /* Remove Keyboard Event */

        /* Remove Buttons Event */
        let actorMoveBtn = document.getElementsByClassName('game-actor-move-btn');
        for (let i of actorMoveBtn) {
            i.removeEventListener('click', this.directionBtnClickEvent);
        }
        /* Remove Buttons Event */

        console.log('Show Game Over End');

    }
    /* Show Game Over Page */

    /* Reset Game */
    resetGame() {
        let level = document.querySelector('.game-menu-start-game-level .radio-group input[type=radio]:checked').value;
        switch (level) {
            case 'easy': {
                let obj = new Start(5);
                obj.init();
            }
            break;
            case 'medium': {
                let obj = new Start(8);
                obj.init();
            }
            break;
            case 'hard': {
                let obj = new Start(10);
                obj.init();
            }
            break;
        }
    }
    /* Reset Game */


}
/* Game Events */



/* Start Game Button Event */

let startGameButton = document.getElementById('game-menu-start-game-btn');
startGameButton.addEventListener('click', (e) => {
    let level = document.querySelector('.game-menu-start-game-level .radio-group input[type=radio]:checked').value;
    switch (level) {
        case 'easy': {
            let obj = new Start(5);
            obj.init();
        }
        break;
        case 'medium': {
            let obj = new Start(8);
            obj.init();
        }
        break;
        case 'hard': {
            let obj = new Start(10);
            obj.init();
        }
        break;
    }
    let gameMenu = document.getElementById('game-menu');
    gameMenu.style.transform = 'translateX(100%)';
});
/* Start Game Button Event */

/* Game Events */
/* Reset Button Event */
let resetButton = document.getElementById('game-panel-reset-btn');
resetButton.addEventListener('click', () => {
    obj.resetGame();
});
/* Reset Button Event */