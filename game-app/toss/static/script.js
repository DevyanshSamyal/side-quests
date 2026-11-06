//alert("Welcome to Toss Game!");
let pressButton = document.getElementById("press");
let playerChoice = document.getElementById("player_choice");
let resultDisplay = document.getElementById("result");
let playerScoreDisplay = document.getElementById("player-score");
let computerScoreDisplay = document.getElementById("computer-score");

let playerScore = 0;
let computerScore = 0;

pressButton.addEventListener("click", function(){
    fetch(tossUrl, {
        method: "POST",
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Something went wrong!");
        }
        return response.json();
    })
    .then(data => {

        playerChoice.innerText = `You got: ${data.coin}`;
        resultDisplay.innerText = data.result;

        if (data.result === "YOU WIN") {
            playerScore++;
        }
        else {
            computerScore++;
        }

        playerScoreDisplay.innerText = `Your Score: ${playerScore}`;
        computerScoreDisplay.innerText = `Computer Score: ${computerScore}`;
        })
        .catch(error => {
            console.error(error);
            resultDisplay.innerText = error.message;
        });

});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", function() {
    playerScore = 0;
    computerScore = 0;

    playerScoreDisplay.innerText = "Your Score: 0";
    computerScoreDisplay.innerText = "Computer Score: 0";

    playerChoice.innerText = "You got: ";
    resultDisplay.innerText = "Waiting for your move...";
});