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

    const reset = ()=> {
        _playerXMoves = [];
        _playerOMoves = [];
    }

    return {
        pushPlayerMove,
        getPlayerMoves,
        reset,
    }
})

