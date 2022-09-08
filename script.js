const spaces = document.querySelectorAll('.draw')
const chooseO = document.querySelector('.playerO')

let moves = []
let playerXMoves = []
let playerOMoves = []

// flags
// true means X turn, false means O turn
let playerFlag = true;
let startGameFlag = false;



drawMove = (move) => {
    const canvas = move
    const ctx = canvas.getContext("2d");
    if (playerFlag){
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(100,100);
        ctx.moveTo(100,0);
        ctx.lineTo(0,100);
        ctx.stroke()
    }else {
        ctx.beginPath();
        ctx.arc(50,50,45,0,2*Math.PI)
        ctx.stroke()
    }
}

playTurnX =()=> {
    // if the game has already started, player cannot switch teams
    if (startGameFlag) return
    startGameFlag = !startGameFlag
    computerMove()
    playerFlag = false
}

computerMove = () => {
    if (moves.length === 9) return
    // computer has an equal chance of choosing 1 through 9 (adding .49 prevents top and bottom of range from missing out)
    let move = Math.round((Math.random()*9)+.49)
    // if the move has already been chosen, or ===0 choose again
    while (moves.includes(move)|| move ===0){
        move = Math.round((Math.random()*9)+.49)
    }
    moves.push(move)
    pushPlayerMove(move)
    // node list index starts at 0, so we need to subtract 1
    const CpMove = spaces[move-1]
    drawMove(CpMove)
}

playerMove = (e)=> {
    if (!startGameFlag) startGameFlag = !startGameFlag;
    const move = parseInt(e.target.dataset.spot)
    if (moves.includes(move)) return
    moves.push(move);
    drawMove(e.target)
    pushPlayerMove(move)
    playerFlag = !playerFlag
    computerMove()
    playerFlag = !playerFlag
}

pushPlayerMove = (move)=>{
    playerFlag ? player = playerXMoves.push(move) : player = playerOMoves.push(move)
    console.log(checkWin())
}

restart = () => {
    spaces.forEach((space) => {
        ctx = space.getContext('2d')
        ctx.clearRect(0,0,100,100)
    })
    // reset logged moves
    moves = []
    playerXMoves = []
    playerOMoves = []
    playerFlag = true
    startGameFlag = false
}

// check the rows, columns and diagonals
checkWin = () => checkRows() || checkCols() || checkDiag()

checkRows =()=>{
    let player;
    playerFlag ? player = playerXMoves : player = playerOMoves
    for (let i=1; i<=7; i+=3){
        if (player.includes(i) && player.includes(i+1) && player.includes(i+2)){
            return true
        }
    }
    return false
    
}
checkCols =()=>{
    let player;
    playerFlag ? player = playerXMoves : player = playerOMoves 
    for (let i=1; i<=3; i++){
        if (player.includes(i) && player.includes(i+3) && player.includes(i+6)) return true
    }
    return false
}
checkDiag =()=>{
    let player;
    playerFlag ? player = playerXMoves : player = playerOMoves 
    if (player.includes(1) && player.includes(5) && player.includes(9)) return true
    if (player.includes(3) && player.includes(5) && player.includes(7)) return true
    return false
}
spaces.forEach(space => space.addEventListener('click', playerMove));
chooseO.addEventListener('click', playTurnX)