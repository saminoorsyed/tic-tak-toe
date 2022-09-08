const spaces = document.querySelectorAll('.draw')
const chooseO = document.querySelector('.playerO')

const moves = []
// flags
// true means X turn, false means O turn
let playerFlag = false;
let startGameFlag = false;



drawMove = (move) => {
    const canvas = move
    const ctx = canvas.getContext("2d");
    if (playerFlag){
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
    // startGameFlag = !startGameFlag
    computerMove()
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
    const CpMove = spaces[move]
    drawMove(CpMove)
}

playerMove = (e)=> {
    console.log(e.target)
    drawMove(e.target)

}

spaces.forEach(space => space.addEventListener('click', playerMove));
chooseO.addEventListener('click', playTurnX)