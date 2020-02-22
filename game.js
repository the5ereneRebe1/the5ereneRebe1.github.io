let canvas  = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 50;
let turn;
const cells = document.querySelectorAll('.cell');
let selectedArray =[0,0,0,0,0,0,0,0,0];
startGame();

function startGame(){
    
    init();
    turn = 'human';
}
function updateBanner(value){
    ctx.clearRect(0,0,800,50);
    ctx.fillStyle = '#000'; 
    ctx.font = '30px Arial';
    var grd = ctx.createLinearGradient(0, 0, 150, 0);
    grd.addColorStop(0, "GREY");
    grd.addColorStop(1, "black");
    ctx.fillStyle=grd;
    ctx.textAlign = "left";
    ctx.fillText(value,10,37);
}
function init(){
updateBanner("Welcome to Tic Tac Toe!");
selectedArray =[0,0,0,0,0,0,0,0,0];
for(var i = 0;i<cells.length;i++){
    cells[i].addEventListener('click',turnClick,false);
    cells[i].innerText = '';
}
}



//Question here: How is square getting passed?
function turnClick(square){
    let id = square.target.id;
    console.log(id);
    console.log(turn);
    if(turn == 'human'){
        
        if(selectedArray[id]==0){
            cells[id].innerText = 'X';
            selectedArray[id] = 1;
            turn = 'computer';
        }

    }
    if(turn == 'computer'){
        console.log(turn);
        turn = 'human';
        
        for(var i=0;i<selectedArray.length;i++){
            if(selectedArray[i]==0){
                console.log("Computer plays:"+i);
                updateBanner("Computer plays at cell "+i+".");
                selectedArray[i] = 2;
                cells[i].innerText = 'O';
                break;
            }
        }
    }
    checkGameStates();
}
function checkGameStates(){
    let countZeroes = 0;
    for(let i=0;i<selectedArray.length;i++){
        if(selectedArray[i]==0) countZeroes++;
    }
    console.log(countZeroes);
    if(countZeroes==0){
        updateBanner("Restart");
        canvas.addEventListener("click",restartGame,false);
    }

}
function restartGame(){
    init();
}
