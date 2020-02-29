let canvas  = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");
const GAME_WIDTH = 800;
const GAME_HEIGHT = 50;
let turn;
const cells = document.querySelectorAll('.cell');
let selectedArray =[0,0,0,0,0,0,0,0,0];
let positionWins = [0,0,0,0,0,0,0,0,0];
let isWinner = false;
const winningStates = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
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
    turn = "human";
    isWinner = false;
    updateBanner("Welcome to Tic Tac Toe!");
    selectedArray =[0,0,0,0,0,0,0,0,0];
    for(var i = 0;i<cells.length;i++){
        cells[i].addEventListener('click',turnClick,false);
        cells[i].innerText = '';
    }
}
function backtrack(currentState,turn,flag){
    let totalWins = 0;
    //base case
    
    if(checkIfPlayerWon(2))
            return 1;
    else if(checkIfPlayerWon(1)) 
            return 0;
    let isEmpty = false;
    for(let i=0;i<currentState.length;i++)
        if(currentState[i]==0)
            isEmpty = true;
    if(!isEmpty)
        return 0;


    //Pruning logic , if there is a win condition play that win condition
    for(let i=0;i<currentState.length;i++){
        
        if(currentState[i]==0){
            if(turn==1){
                currentState[i] = 1;
                totalWins += backtrack(currentState, 2,false);
                currentState[i] = 0;
            }else{
                currentState[i] = 2;
                let wins =  backtrack(currentState, 1,false);
                if(flag) {
                    console.log(wins);
                    positionWins[i] = wins;
                    console.log(positionWins);
                }

                totalWins += wins;
                currentState[i] = 0;
            }
            //recur
            //totalWins +=backtrack(currentState, turn);

        }

    }
    return totalWins;
}

function checkforWinning(player){
    if(!isWinner){
        for(let i=0;i<winningStates.length;i++){
            let filled=0,empty=0,retVal=-1;
            for(let j=0;j<3;j++){
                if(selectedArray[winningStates[i][j]]==player)
                    filled++;
                if(selectedArray[winningStates[i][j]]==0){
                    empty++;
                    retVal = winningStates[i][j];
                }
            }
            if(filled==2 && empty==1)
                return retVal; 
        }
    }
    return -1;
}
function checkIfPlayerWon(player) {
    for(let i=0;i<winningStates.length;i++){
        if(selectedArray[winningStates[i][0]]==selectedArray[winningStates[i][1]] &&
            selectedArray[winningStates[i][1]]==selectedArray[winningStates[i][2]])
            {
                if(selectedArray[winningStates[i][0]]==player)
                    return true;
            }
    }
    return false;
}
function checkWinner(){
    
    if(!isWinner){
    console.log(selectedArray);
    let winner;
    for(let i=1;i<3;i++)
        if(checkIfPlayerWon(i))
            winner=i;
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
    //TODO: Make it cleaner and more readable
    if((turn == 'computer') && !isWinner){
        console.log(turn);
        turn = 'human';
       
        let i1 = checkforWinning(2);
        console.log("Checking if computer is winning: "+i1);
        let i2 = checkforWinning(1);
        console.log("Checking if human is winning: "+i2);
        if(i1!=-1 || i2!=-1){
            i1 = i1!=-1?i1:i2;
            console.log("Computer plays:"+i1);
            updateBanner("Computer plays at cell "+i1+".");
            selectedArray[i1] = 2;
            cells[i1].innerText = 'O';
        }
        else
        {
            positionWins = [0,0,0,0,0,0,0,0,0];
            backtrack(selectedArray,2,true);
            console.log(positionWins);
            let pos = -1,max = -1;
            for(let i=0;i<positionWins.length;i++)
                if(positionWins[i]>max){
                    max = positionWins[i];
                    pos = i;
                }
            if(max==0 && pos ==0){
                pos=-1;
                for(let i = 0;i<9;i++)
                    if(selectedArray[i]==0)
                        pos = i;
                if(pos!=-1){
                    console.log("Computer plays:"+pos);
                    updateBanner("Computer plays at cell "+pos+".");
                    selectedArray[pos] = 2;
                    cells[pos].innerText = 'O';
                }
            } else {
                console.log("Computer plays:"+pos);
            updateBanner("Computer plays at cell "+pos+".");
            selectedArray[pos] = 2;
            cells[pos].innerText = 'O';
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
