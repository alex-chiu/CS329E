// JS Hangman Code

var gameStarted = false;
var word = "";
var guessedWord = "";

document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("guess-button").addEventListener("click", checkGuess);

function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        word = document.getElementById("input-box").value;
        word = word.toUpperCase();
        document.getElementById("input-box").value = "";

        for (var i = 0; i < word.length; i++) {
            guessedWord = guessedWord.concat("X");
        }

        document.getElementById("guess-space").innerHTML = guessedWord;
    }
}

function checkGuess() {
    
}