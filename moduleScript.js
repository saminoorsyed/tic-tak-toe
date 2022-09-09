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