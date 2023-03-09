//let's start with popup
let popup = document.querySelector('.popup');
let startGameBtn = document.querySelector('#startGameBtn');
startGameBtn.addEventListener('click',()=>{
  popup.classList.add('hidden');
})

const boxes = document.querySelectorAll(".box");
let newGame = document.querySelector(".new-game");
let gameInfo = document.querySelector(".game-info");

let currentPlayer;
let gameGrid;     //make gamegrid array for the logic

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    boxes[index].classList.remove('win');
  });

  newGame.classList.add("hidden");
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;

}
initGame(); 


function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
      //all 3 boxes should be non-empty and exactly same in value
      if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
          && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]])) {

              //check if winner is X
              if(gameGrid[position[0]] === "X") 
                  answer = "X";
              else {
                  answer = "O";
              } 
                  

              //disable pointer events
              boxes.forEach((box) => {
                  box.style.pointerEvents = "none";
              })

              //now we know X/O is a winner
              boxes[position[0]].classList.add("win");
              boxes[position[1]].classList.add("win");
              boxes[position[2]].classList.add("win");
          }
  });

  //it means we have a winner
  if(answer !== "" ) {
      gameInfo.innerText = `Winner Player - ${answer}`;
      newGame.classList.remove("hidden");

      return;
  }

  //We know, NO Winner Found, let's check whether there is tie
  let fillCount = 0;
  gameGrid.forEach((box) => {
      if(box !== "" )
          fillCount++;
  });

  //board is Filled, game is TIE
  if(fillCount === 9) {
      gameInfo.innerText = "Game Tied !";
      newGame.classList.remove("hidden");

  }

}

function swapTurn() {
  if (currentPlayer == "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  gameInfo.innerHTML = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
  if(gameGrid[index] === ""){
    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    swapTurn();
    newGame.classList.remove("hidden");
    checkGameOver();
  }
}


boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGame.addEventListener("click", initGame);

