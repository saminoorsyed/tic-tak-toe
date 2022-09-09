// modularized version of code
// structured with the following modules: gameBoard, computer, display, gameFlow


// tracks and gets player and computer moves, resets the move arrays
const gameBoard=(()=>{
    let _playerXMoves = []
    let _playerOMoves = []

    const pushPlayerMove = (playerFlag, move) => {
        playerFlag ? player = playerXMoves.push(move) : player = playerOMoves.push(move)
    }

    const getPlayerMoves = (playerFlag) => {
        playerFlag ? player = playerXMoves.push(move) : player = playerOMoves.push(move)
        return player
    }

    return {
        pushPlayerMove,
        getPlayerMoves,
    }
})

