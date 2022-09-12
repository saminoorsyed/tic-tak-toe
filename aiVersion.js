// modularized version of code
// structured with the following modules: gameBoard, computer, display, gameFlow


// contains the functionality for getting all the player moves and checking the status of the game
const gameBoard=(()=>{
    'use strict'
    // takes two player objects and returns all moves made on the board
    const getAllMoves = (playerX, playerO)=>{
        return playerX.getMoves().concat(playerO.getMoves())
    }

    const checkWin =(player) => checkRows(player) || checkCols(player) || checkDiag(player);
    
    checkRows =(player)=>{
        const moves = player.moves
        for (let i=1; i<=7; i+=3){
            if (moves.includes(i) && moves.includes(i+1) && moves.includes(i+2)){
                return true;
            }
        }
        return false;
    }
    checkCols =(player)=>{
        const moves = player.moves;
        for (let i=1; i<=3; i++){
            if (moves.includes(i) && moves.includes(i+3) && moves.includes(i+6)) return true;
        }
        return false
    }
    checkDiag =(player)=>{
        const moves = player.moves
        if (moves.includes(1) && moves.includes(5) && moves.includes(9)) return true;
        if (moves.includes(3) && moves.includes(5) && moves.includes(7)) return true;
        return false;
    }

    const checkDraw = ()=>{
        const allMoves = [1,2,3,4,5,6,7,8,9]
        if (!checkWin(true) && !checkWin(false) && getAllMoves().sort()=== allMoves) return true;
        return false;
    }

    return {
        getAllMoves,
        checkWin,
        checkDraw
    }
})();

// factory function that maintains the player flag 
const Player = (flag)=>{
    const moves = []
    const playerFlag = flag;
    // true playerFlag is for X, false is for O
    
    const pushMove = (move) => {
        moves.push(move);
    }
    const popMove = () => {
        moves.pop();
    }
    const getMoves = () => {
        return moves;
    }
    const getName = () => {
        return playerFlag ? "X" : "O";
    }
    const reset = () =>{
        while (moves[0]){
            moves.pop()
        }
    }
    return {
        getMoves,
        getName,
        popMove,
        pushMove,
        reset,
    }
}

// module to handle computer moves
const computer = (()=>{
    'use strict';

    let maxPlayer;
    let minPlayer;

    let score = {
        X: 1,
        O: -1,
        tie: 0,
    }

    const whoWon =(player) => {
        if (gameBoard.checkWin(player)){
            if (player.playerFlag) {
                return 'X'
            }else if (!player.playerFlag){
                return 'O'
            }
        }
        if(gameBoard.checkDraw){
            return 'tie'
        }
        return false
    }
    

    const chooseMove = (difficulty, computerFlag) => {
        if (difficulty === 'easy'){
            return chooseRand();
        }
        maxPlayer = Player(computerFlag)
        minPlayer = Player(!computerFlag)
        if (computerFlag){
            // the computer is player X
            playGame.playerX.getMoves().forEach(move => maxPlayer.pushMove(move))
            playGame.playerO.getMoves().forEach(move => minPlayer.pushMove(move))

        } else{
            // the computer is player Y
            playGame.playerX.getMoves().forEach(move => minPlayer.pushMove(move))
            playGame.playerX.getMoves().forEach(move => maxPlayer.pushMove(move))

        }
        if (difficulty === 'medium'){
            return chooseMedium();
        } 
        return chooseUnbeatable();
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

    const chooseUnbeatable =(player) =>{
        // if there is a win or a draw after the last move, return the appropriate score
        if (whoWon(player)!== false) return score[whoWon];
        let bestScore = -Infinity;
        let bestMove;
        for (i = 1; i<10 ; i++) {
            if (gameBoard.getAllMoves(maxPlayer,minPlayer).includes(i)) continue
            player.pushMove(i)
            move
            if (player.playerFlag == maxPlayer.playerFlag) {
                let score = chooseUnbeatable(minPlayer)
                if (score > bestScore){
                    bestScore = score
                    bestMove = move
                }
            }
            if (player.playerFlag == minPlayer.playerFlag){
                let score = chooseUnbeatable(maxPlayer)
                if (score < bestScore){
                    bestScore = score
                }
            }
            player.popMove()
        }
        return bestMove
    }



    return{
        chooseMove
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
        chooseX.classList.add('highlighted')
        }
    const setPlayerTurn = (e)=>{
        if (gameStart) return
        chooseO.classList.add('highlighted')
        chooseX.classList.remove('highlighted')
        const move = computer.chooseMove(gameMode.value);
        playerX.makeMove(move);
        drawMove(spaces[move-1]);
        gameStart = true;
        playerTurn = false;
    }
    const drawMove = (moveCanvas) => {
        const canvas = moveCanvas
        const ctx = canvas.getContext("2d");
        ctx.lineWidth = 7;
        if (playerTurn){
            ctx.beginPath();
            ctx.moveTo(10,10);
            ctx.lineTo(90,90);
            ctx.moveTo(90,10);
            ctx.lineTo(10,90);
            ctx.stroke();
        }else {
            ctx.beginPath();
            ctx.arc(50,50,40,0,2*Math.PI);
            ctx.stroke();
        }
    }
    // careful with cp<ove and move values. they don't match with the node list index and need to be adjusted
    // flow of the game log and make player move, then computer move, check for win after each move.
    const _playGame = (e)=>{
        gameStart = true
        move = parseInt(e.target.dataset.spot);
        let player;
        let comp;
        if (playerTurn){
            player = playerX;
            comp = playerO;
        }else{
            player = playerO;
            comp = playerX
        }
        if (gameBoard.getAllMoves().includes(move)){
            return
        }
        player.makeMove(move)
        drawMove(spaces[move-1])
        if (game.checkWin(playerTurn)){
            animateGame.displayWinner(player);
            setTimeout(reset, 2000);
            return
        }
        playerTurn = !playerTurn;
        const cpMove = computer.chooseMove(gameMode.value);
        comp.makeMove(cpMove);
        drawMove(spaces[cpMove-1]);
        if (game.checkWin(playerTurn)){
            animateGame.displayWinner(comp);
            setTimeout(reset, 2000);
            return
        }
        playerTurn = !playerTurn;
    }
    

    const reset = ()=> {
        gameBoard.reset()
        animateGame.reset()
        chooseO.classList.remove('highlighted');
        chooseX.classList.add('highlighted');
        playerTurn = true;
        gameStart=false
        spaces.forEach((space) => {
            ctx = space.getContext('2d')
            ctx.clearRect(0,0,100,100)
        })
    }
    return {
        initGame,
        reset,
        playerTurn,
        spaces,
        playerO,
        playerX,
    }
})();

const animateGame = (()=>{
    const prompt = document.querySelector('.prompt>p')
    const displayWinner = (winner)=>{
        changePrompt(winner)
        spinWinner(winner)
    }

    const changePrompt = (winner)=>{
        prompt.textContent = `player ${winner.getName()} won!`
    }

    const spinWinner = (winner)=>{
        playGame.spaces.forEach(space => {
            if (winner.getMoves().includes(parseInt(space.dataset.spot))) {
                space.classList.add('spin')
            }
        })
    }

    const reset = ()=>{
        playGame.spaces.forEach(space => {
                space.classList.remove('spin')
            });
        prompt.textContent = 'Start the game of select a player'
    }
    
    return{
        displayWinner,
        reset
    }
})();
playGame.initGame()


