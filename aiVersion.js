// modularized version of code
// structured with the following modules: gameBoard, computer, display, gameFlow


// contains the functionality for getting all the player moves and checking the status of the game
const gameBoard=(()=>{
    'use strict'
    // takes two player objects and returns all moves made on the board
    const getAllMoves = (player1, player2)=>{
        return player1.getMoves().concat(player2.getMoves())
    }

    const checkWin =(player) => checkRows(player) || checkCols(player) || checkDiag(player);
    
    const checkRows =(player)=>{
        const moves = player.getMoves();
        for (let i=1; i<=7; i+=3){
            if (moves.includes(i) && moves.includes(i+1) && moves.includes(i+2)){
                return true;
            }
        }
        return false;
    }
    const checkCols =(player)=>{
        const moves = player.getMoves();
        for (let i=1; i<=3; i++){
            if (moves.includes(i) && moves.includes(i+3) && moves.includes(i+6)) return true;
        }
        return false
    }
    const checkDiag =(player)=>{
        const moves = player.getMoves();
        if (moves.includes(1) && moves.includes(5) && moves.includes(9)) return true;
        if (moves.includes(3) && moves.includes(5) && moves.includes(7)) return true;
        return false;
    }

    const checkDraw = (player1, player2)=>{
        console.log(getAllMoves(player1, player2).length ===9);
        return (getAllMoves(player1, player2).length ===9)
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
        playerFlag
    }
}

// module to handle computer moves
const computer = (()=>{
    'use strict';

    let maxPlayer;
    let minPlayer;
    

    const chooseMove = (difficulty, computerFlag) => {
        if (difficulty === 'easy'){
            return chooseRand();
        }
        maxPlayer = Player(computerFlag)
        minPlayer = Player(!computerFlag)
        if (!computerFlag){
            // the computer is player X
            playGame.playerX.getMoves().forEach(move => minPlayer.pushMove(move))
            playGame.playerO.getMoves().forEach(move => maxPlayer.pushMove(move))

        } else{
            // the computer is player 'O'
            playGame.playerO.getMoves().forEach(move => minPlayer.pushMove(move))
            playGame.playerX.getMoves().forEach(move => maxPlayer.pushMove(move))

        }
        if (difficulty === 'medium'){
            return chooseMedium();
        } 
        return chooseUnbeatable(maxPlayer);
    }

    const chooseRand =() =>{
        let move = 0
        const moves = gameBoard.getAllMoves(playGame.playerX, playGame.playerO)
        if (gameBoard.getAllMoves(playGame.playerX,playGame.playerO).length === 9) return 
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
        let bestScore = -Infinity
        let bestMove=1;
        for (let i = 1; i<10 ; i++) {
            if (gameBoard.getAllMoves(maxPlayer,minPlayer).includes(i)) continue
            player.pushMove(i)
            let score = minimax(0,player)
            if (score > bestScore){
                bestScore = score
                bestMove = i
            }
            player.popMove()
        }
        return bestMove
    }

    const minimax = (depth, player) => {
        if (gameBoard.checkWin(player)){
            if (player === maxPlayer) return -1
            if (player === minPlayer) return 1
        };
        if (gameBoard.checkDraw(maxPlayer, minPlayer)) return 0
        
        if (player === maxPlayer){
            let bestScore = -Infinity
            for( let i = 1; i<10 ; i++){
                if (!gameBoard.getAllMoves(maxPlayer,minPlayer).includes(i)){
                    player.pushMove(i)
                    let score = minimax(depth + 1, minPlayer)
                    player.popMove()
                    bestScore = Math.max(score , bestScore)
                }
            }
            return bestScore
        }
        if (player === minPlayer){
            let bestScore = Infinity
            for( let i = 1; i<1 ; i++){
                if (!gameBoard.getAllMoves(maxPlayer,minPlayer).includes(i)){
                player.pushMove(i)
                let score = minimax(depth + 1, maxPlayer)
                player.popMove()
                bestScore = Math.min(score, bestScore)
                }
            }
            return bestScore
        }
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
    const setPlayerTurn = ()=>{
        if (gameStart) return
        chooseO.classList.add('highlighted')
        chooseX.classList.remove('highlighted')
        const move = computer.chooseMove(gameMode.value);
        playerX.pushMove(move);
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
        let move = parseInt(e.target.dataset.spot);
        let player;
        let comp;
        if (playerTurn){
            player = playerX;
            comp = playerO;
        }else{
            player = playerO;
            comp = playerX
        }
        if (gameBoard.getAllMoves(playerO,playerX).includes(move)) return
        player.pushMove(move)
        drawMove(spaces[move-1])
        if(gameBoard.checkDraw(playerX,playerO)) {
            animateGame.spinAll()
            return
        }
        if (gameBoard.checkWin(player)){
            animateGame.displayWinner(player);
            setTimeout(reset, 2000);
            return
        }
        playerTurn = !playerTurn;
        move = computer.chooseMove(gameMode.value, playerTurn);
        comp.pushMove(move);
        drawMove(spaces[move-1]);
        // console.log(gameBoard.checkDraw(playerX,playerO))
        if(gameBoard.checkDraw(playerX,playerO)) {
            animateGame.spinAll()
            return
        }
        if (gameBoard.checkWin(comp)){
            animateGame.displayWinner(comp);
            setTimeout(reset, 2000);
            return
        }
        playerTurn = !playerTurn;
    }
    

    const reset = ()=> {
        playerO.reset()
        playerX.reset()
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

    const spinAll = () =>{
        playGame.spaces.forEach(space => {
            space.classList.add('spin')
        });
    }


    const reset = ()=>{
        playGame.spaces.forEach(space => {
                space.classList.remove('spin')
            });
        prompt.textContent = 'Start the game of select a player'
    }
    
    return{
        displayWinner,
        reset,
        spinAll
    }
})();
playGame.initGame()


