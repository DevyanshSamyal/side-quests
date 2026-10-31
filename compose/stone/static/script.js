//alert("Welcome to Stone Paper Scissors!");
let playerChoice = document.getElementById("player-choice");
let computerChoiceDisplay = document.getElementById("computer-choice");
let resultDisplay = document.getElementById("result");
let playerScoreDisplay = document.getElementById("player-score");
let computerScoreDisplay = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

function playGame(playerMove) {
    stoneButton.disabled = true;
    paperButton.disabled = true;
    scissorsButton.disabled = true;
    fetch("/play-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
        player_move: playerMove
        })
    })
    .then(response => {
        if (!response.ok) {
        throw new Error("Something went wrong!");
    }
        return response.json();
    })
    .then(data => {
        console.log(data);

        computerChoiceDisplay.innerText = `Computer's choice: ${data.computer_move}`;
        resultDisplay.innerText = data.result;

        resultDisplay.classList.remove("win", "lose", "draw");

        if (data.result === "You WIN") {
            resultDisplay.classList.add("win");
            playerScore++;
        }
        else if (data.result === "Computer WINS") {
            resultDisplay.classList.add("lose");
            computerScore++;
        }
        else {
            resultDisplay.classList.add("draw");
        }

        playerScoreDisplay.innerText = `Your Score: ${playerScore}`;
        computerScoreDisplay.innerText = `Computer Score: ${computerScore}`;
    })
    .catch(error => {
    console.error(error);
    resultDisplay.innerText = error.message;
    })
    .finally(() => {
    stoneButton.disabled = false;
    paperButton.disabled = false;
    scissorsButton.disabled = false;
    });
}

let stoneButton = document.getElementById("stone");
stoneButton.addEventListener("click", function() {
    playerChoice.innerText = "Your choice: Stone";
    playGame("stone");    
});

let paperButton = document.getElementById("paper");
paperButton.addEventListener("click", function() {
    playerChoice.innerText = "Your choice: Paper";
    playGame("paper");
});

let scissorsButton = document.getElementById("scissors");
scissorsButton.addEventListener("click", function() {
    playerChoice.innerText = "Your choice: Scissors";
    playGame("scissors");
});

let reset = document.getElementById("reset");
reset.addEventListener("click", function(){
    playerScore=0;
    computerScore=0;
    playerScoreDisplay.innerText = 'Your Score: 0';
    computerScoreDisplay.innerText = 'Computer Score: 0';
})


//fetch("/computer-choice")
//    .then(response => response.text())
//    .then(computerChoice => {
//        console.log(computerChoice);
//    });

