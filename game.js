let canvas  = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 50;
let turn;
const cells = document.querySelectorAll('.cell');
let selectedArray =[0,0,0,0,0,0,0,0,0];
let isWinner = false;
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
isWinner = false;
updateBanner("Welcome to Tic Tac Toe!");
selectedArray =[0,0,0,0,0,0,0,0,0];
for(var i = 0;i<cells.length;i++){
    cells[i].addEventListener('click',turnClick,false);
    cells[i].innerText = '';
}
}
function checkWinner(){
    if(!isWinner){
    let winningStates = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    console.log(selectedArray);
    let winner;
    for(let i=0;i<winningStates.length;i++){
        if(selectedArray[winningStates[i][0]]==selectedArray[winningStates[i][1]] &&
            selectedArray[winningStates[i][1]]==selectedArray[winningStates[i][2]]){
                if(selectedArray[winningStates[i][0]]==1)
                    {winner=1;break;}
                else if(selectedArray[winningStates[i][0]]==2)
                    {winner=2;break;}
        }
    }
    if(winner==1)
        {restart("You Win! RESTART");isWinner=true;}
    else if(winner == 2)
        {restart("Computer Wins! RESTART");isWinner=true;}
    }
}


//Question here: How is square getting passed?
function turnClick(square){
    let id = square.target.id;
    console.log(id);
    console.log(turn);
    console.log(isWinner);
    
    if((turn == 'human') && !isWinner){
        
        if(selectedArray[id]==0){
            cells[id].innerText = 'X';
            selectedArray[id] = 1;
            turn = 'computer';
            checkWinner();
        }

    }

    if((turn == 'computer') && !isWinner){
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
    checkWinner();
    let countZeroes = 0;
    for(let i=0;i<selectedArray.length;i++){
        if(selectedArray[i]==0) countZeroes++;
    }
    console.log(countZeroes);
    if(countZeroes==0 && !isWinner){
        restart("Tie RESTART");
    }

}
function restart(value){
    console.log(value);
    for(var i = 0;i<cells.length;i++)
        cells[i].removeEventListener('click',turnClick,false);
    updateBanner(value);
        canvas.addEventListener("click",restartGame,false);
}
function restartGame(){
    init();
    canvas.removeEventListener("click",restartGame,false);
}
