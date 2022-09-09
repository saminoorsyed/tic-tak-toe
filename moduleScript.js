// modularized version of code
// structured with the following modules: gameBoard, computer, display, gameFlow


// tracks and gets player and computer moves, resets the move arrays
const gameBoard=(()=>{
    'use strict'
    let _playerXMoves = [];
    let _playerOMoves = [];

    const pushPlayerMove = (playerFlag, move) => {
        playerFlag ? player = _playerXMoves.push(move) : player = _playerOMoves.push(move);
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
const Player = (playerFlag)=>{
    // true playerflag is for X, false is for O
    const makeMove = (move) => {
        gameBoard.pushPlayerMove(playerFlag, move)
    }

    return {
        makeMove,
    }
}

// module to handle computer moves
const Computer = (()=>{
    'use strict';
    
    let difficulty;
    
    const setDifficulty = (gameMode) => {
        difficulty = gameMode;
    }
    const chooseMove = () => {
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

const Game = (()=> {

    const playerX = Player(true);
    const playerO = Player(false);
    
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
        playerO,
        playerX,
        checkWin
    }
})