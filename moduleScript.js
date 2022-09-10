// modularized version of code
// structured with the following modules: gameBoard, computer, display, gameFlow


// tracks and gets player and computer moves, resets the move arrays
const gameBoard=(()=>{
    'use strict'
    let _playerXMoves = [];
    let _playerOMoves = [];

    const pushPlayerMove = (playerFlag, move) => {
        playerFlag ?  _playerXMoves.push(move) : _playerOMoves.push(move);
    }

    const getPlayerMoves = (playerFlag) => {
        return playerFlag ? _playerXMoves : _playerOMoves;
    }
    const getAllMoves = ()=>{
        return _playerOMoves.concat(_playerXMoves)
    }
    const reset = ()=> {
        _playerXMoves = [];
        _playerOMoves = [];
    }

    return {
        pushPlayerMove,
        getPlayerMoves,
        getAllMoves,
        reset,
    }
})();

// factory function that maintains the player flag and combines that to push the player move to GameBoard
const Player = (player)=>{
    const playerFlag = player;
    // true playerFlag is for X, false is for O
    const makeMove = (move) => {
        if (gameBoard.getAllMoves.length === 9) return;
        gameBoard.pushPlayerMove(playerFlag, move);
    }

    return {
        makeMove,

    }
}

// module to handle computer moves
const computer = (()=>{
    'use strict';
    const chooseMove = (difficulty) => {
        if (difficulty === 'easy'){
            return chooseRand();
        }else if (difficulty === 'medium'){
            return chooseMedium();
        }else {
            return chooseUnbeatable();
        }
    }

    const chooseRand =() =>{
        let move = 0
        const moves = gameBoard.getAllMoves()
        while (moves.includes(move)|| move === 0){
            move = Math.round((Math.random()*9)+.49)
        }
        return move
    }

    const chooseMedium =() =>{
        return
    }

    const chooseUnbeatable =() =>{
        return
    }

    return{
        chooseMove
    }
})();

const game = (()=> {
    const checkWin =(playerFlag) => checkRows(playerFlag) || checkCols(playerFlag) || checkDiag(playerFlag);
    checkRows =(playerFlag)=>{
        const player = gameBoard.getPlayerMoves(playerFlag)
        for (let i=1; i<=7; i+=3){
            if (player.includes(i) && player.includes(i+1) && player.includes(i+2)){
                return true;
            }
        }
        return false;
    }
    checkCols =(playerFlag)=>{
        const player = gameBoard.getPlayerMoves(playerFlag)
        for (let i=1; i<=3; i++){
            if (player.includes(i) && player.includes(i+3) && player.includes(i+6)) return true
        }
        return false
    }
    checkDiag =(playerFlag)=>{
        const player = gameBoard.getPlayerMoves(playerFlag)
        if (player.includes(1) && player.includes(5) && player.includes(9)) return true
        if (player.includes(3) && player.includes(5) && player.includes(7)) return true
        return false
    }
    return {
        checkWin,
    }
})();

// plays the game
const playGame = (() =>{
    // element selectors
    const gameMode = document.querySelector('select')
    const spaces = document.querySelectorAll('.draw');
    const chooseO = document.querySelector('.playerO');
    const chooseX = document.querySelector('.playerX');
    
    let playerX = Player(true);
    let playerO = Player(false);
    let gameStart = false
    // true for x, false for o
    let playerTurn = true;
    const initGame = () => {
        spaces.forEach(space => space.addEventListener('click', _playGame));
        chooseO.addEventListener('click', setPlayerTurn);
        chooseX.addEventListener('click', setPlayerTurn);
        }
    const setPlayerTurn = (e)=>{
        if (gameStart) return
        if ("false" === e.target.dataset.flag){
           const move = computer.chooseMove(gameMode.value);
           playerX.makeMove(move);
           drawMove(spaces[move]);
           gameStart = true;
        }
    }
    const drawMove = (moveCanvas) => {
        const canvas = moveCanvas
        const ctx = canvas.getContext("2d");
        if (playerTurn){
            ctx.beginPath();
            ctx.moveTo(0,0);
            ctx.lineTo(100,100);
            ctx.moveTo(100,0);
            ctx.lineTo(0,100);
            ctx.stroke();
        }else {
            ctx.beginPath();
            ctx.arc(50,50,45,0,2*Math.PI);
            ctx.stroke();
        }
    }

    const _playGame = (e)=>{
        gameStart = true
        move = parseInt(e.target.dataset.spot);

    }
    return {
        initGame,
    }
})();

playGame.initGame()

