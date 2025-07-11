let boxes = document.querySelectorAll(".box");
let reset = document.querySelector(".reset-game");
let newGameBtn = document.querySelector(".new-game");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let container = document.querySelector(".container");
let choseBtn1 = document.querySelector(".choseBtn1");
let choseBtn2 = document.querySelector(".choseBtn2");
let choseOptions = document.querySelector(".choseOptions");
let chosePara = document.querySelector(".chose-para");  
let box1 = document.querySelectorAll(".box1");
let start = document.querySelector(".start");
let resetBtn = document.querySelector(".reset-btn");
let StartingText = document.querySelector(".starting-text");
let displayBoxes = document.querySelector(".display-boxes");    
let previous = document.querySelector(".previous");
let all = document.querySelector(".all");
let onePlayer = document.querySelector(".one-player");
let firstSecond = document.querySelector(".first-second");
let firstBtn = document.querySelector(".first-btn");
let secondBtn = document.querySelector(".second-btn");
let choseOneTwo = document.querySelector(".chose-1-2");

let computerTurn = false;
let turno = true;
let count = 0;
let user;
let computer;
let playerOne = false;
let winningPattern = [];

reset.classList.remove("hide");
StartingText.classList.remove("hide");
displayBoxes.classList.remove("hide");
container.classList.remove('extra');

const patterns = [  
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

box1.forEach((box) => {
    box.disabled = true;
});

const resetGame = () => {
    msgContainer.classList.add("hide");
    reset.classList.remove("hide");
    choseOptions.classList.remove("hide");
    chosePara.classList.remove("hide"); 
    if( playerOne){
        firstBtn.classList.remove("hide");
        secondBtn.classList.remove("hide");
        choseOneTwo.classList.remove("hide");
        firstBtn.disabled = true;
        secondBtn.disabled = true;
    }
    boxes.forEach((box) => {
        box.innerText = "";
    });
    container.classList.remove('extra');
    all.classList.add("new");
    count = 0;
    computer = null;
    user = null;
    disableBoxes();
}

const checkWinner = () => {
   for( let pattern of patterns){
       let pos1 = boxes[pattern[0]].innerText;
       let pos2 = boxes[pattern[1]].innerText;
       let pos3 = boxes[pattern[2]].innerText;
     if(pos1 !== "" && pos2 !== "" && pos3 !==""  ){
        if(pos1 === pos2 && pos2 === pos3){
            showWinner(pos1);
            break;
         }
         else if(count === 9){
            gameDraw();
        }
      }
   }
}

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    container.classList.add('extra');   
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations the Winner is : ${winner}`;
    msgContainer.classList.remove("hide");
    reset.classList.add("hide");
    all.classList.remove("new");
    disableBoxes();
}

const gameDraw = () => {
    msg.innerText = "Game Draw";
    msgContainer.classList.remove("hide");
    reset.classList.add("hide");
    all.classList.remove("new");
    disableBoxes();
}

const winningPatterns = (pattern) =>{
    winningPattern.push(pattern);
    console.log(winningPattern);
}

const change = () =>{
    count++;
    if( user === "X")
        turno = false;
    if(user === "O")
        turno = true;
    computerTurn = false;
    checkWinner();
}
const secondChance = () => {
    if(count >= 3){
        for( let pattern of patterns){
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
            console.log(pattern);
            if (pos1 !=="" && pos2 !=="" && pos3 ==="" && pos1 === pos2) {
                boxes[pattern[2]].innerText = computer;
                winningPatterns(pattern);
                change();
                break;
            }
            else if (pos2 !=="" && pos3 !=="" && pos1 ===""  && pos2 === pos3) {
                boxes[pattern[0]].innerText = computer;
                winningPatterns(pattern);
                change();
                break;
            }
            else if (pos3 !=="" && pos1 !=="" && pos2 ===""  && pos3 === pos1) {
                boxes[pattern[1]].innerText = computer;
                winningPatterns(pattern);
                change();
                break;
            }
        } 
        console.log('out');
        randomLogic();
    }else{
        randomLogic();
    }
}

const randomLogic = () => {
    let emptyBoxes = [...boxes].filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return; // Prevent infinite loop
    if(computerTurn === false) return;
    while (true) {
        let random = Math.floor(Math.random() * 9);
        if (boxes[random].innerText == "") {
            boxes[random].innerText = computer;
            change();
            break;
        }
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            console.log(turno);
            if (turno) {
                box.innerText = "O"; 
                turno = false;
                if( playerOne){
                    computerTurn = true;
                }
            } else {
                box.innerText = "X"; 
                turno = true;
                if( playerOne){
                    computerTurn = true;
                }
            }
            count++;
            checkWinner();
            console.log(computerTurn ,"turn :" ,turno);
            if (computerTurn) {
                secondChance();
            }
        }
    });
});

newGameBtn.addEventListener("click", () => {
    resetGame();
});

reset.addEventListener("click", () => {
    resetGame();
});

start.addEventListener("click", () => {
    choseOptions.classList.remove("hide");
    chosePara.classList.remove("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    StartingText.classList.add("hide");
    displayBoxes.classList.add("hide");
    previous.style.height = "0px";
    choseOneTwo.classList.add("hide");
    firstBtn.classList.add("hide");
    secondBtn.classList.add("hide");
    firstSecond.classList.add("hide");
    disableBoxes();
});

onePlayer.addEventListener("click", () => {
    playerOne = true;
    choseOptions.classList.remove("hide");
    chosePara.classList.remove("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    StartingText.classList.add("hide");
    displayBoxes.classList.add("hide");
    previous.style.height = "0px";
    choseOneTwo.classList.remove("hide");
    firstBtn.classList.remove("hide");
    secondBtn.classList.remove("hide");
    firstSecond.classList.remove("hide");
    firstBtn.disabled = true;
    secondBtn.disabled = true;
    disableBoxes();
});
    
firstBtn.addEventListener('click', () => {
    computerTurn = false;
    choseOneTwo.classList.add("hide");
    firstBtn.classList.add("hide");
    secondBtn.classList.add("hide");
    choseOptions.classList.add("hide"); 
    chosePara.classList.add("hide");
    enableBoxes();
});

secondBtn.addEventListener('click', () => {
    computerTurn = true;
    choseOneTwo.classList.add("hide");
    firstBtn.classList.add("hide");
    secondBtn.classList.add("hide");
    choseOptions.classList.add("hide"); 
    chosePara.classList.add("hide");
    enableBoxes();
    secondChance();
});

choseBtn1.addEventListener("click", () => {
     turno = false;
     user = "X";
     computer = "O";
     firstBtn.disabled = false;
     secondBtn.disabled = false;
     if( playerOne){
        firstBtn.classList.remove("hide");
        secondBtn.classList.remove("hide");
        choseOneTwo.classList.remove("hide");
        disableBoxes();
     }else{
        enableBoxes();
     }
});

choseBtn2.addEventListener("click", () => {
     turno = true;  
     user = "O";
     computer = "X";
     firstBtn.disabled = false;
     secondBtn.disabled = false;            
     if( playerOne){
        firstBtn.classList.remove("hide");
        secondBtn.classList.remove("hide");
        choseOneTwo.classList.remove("hide");
        disableBoxes();
     }else{
        enableBoxes();
     }
});
