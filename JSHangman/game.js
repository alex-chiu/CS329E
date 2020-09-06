// JS Hangman Code

// Define variables
var gameStarted = false;
var word = "";
var guessedWord = "";
var guess = "";
var gameOver;
var wrongGuessCt = 0;
const wrongGuesses = [];

// Add button event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("guess-button").addEventListener("click", checkGuess);

// StartGame Function
function startGame() {
    if (!gameStarted) {
        gameStarted = true;
        document.getElementById("input-box").autofocus = false;

        // Read in value of input-box
        word = document.getElementById("input-box").value;
        word = word.toUpperCase();
        document.getElementById("input-box").value = "";

        for (var i = 0; i < word.length; i++) {
            guessedWord = guessedWord.concat("X");
        }

        // Set initial word space to all X's
        document.getElementById("guess-space").innerHTML = guessedWord;
    }
}

// CheckGuess Function - Runs each time user guesses
function checkGuess() {
    if (gameStarted) {

        // Read in value of letter-input
        guess = document.getElementById("letter-input").value;
        guess = guess.toUpperCase();
        document.getElementById("letter-input").value = "";

        // Check if user is guessing a letter or word
        if (guess.length > 1) {
            
        }
        else {
            guessedWord = checkWord(word, guess, guessedWord); // Checks a letter with the current word.
            document.getElementById("guess-space").innerHTML = guessedWord; // Sets HTML
        }
    }
}

// Checks and updates the actual word based on user letter guess
function checkWord(correctWord, guessedLetter, currentWord) {

    // Check if user has already guessed wrong letter.
    if(wrongGuesses.includes(guessedLetter)) {
        alert("You've already guessed that letter! Try another one.");
        return currentWord;
    }

    var returnedWord = "";

    // Loops through entire correct word
    for(var i = 0; i < correctWord.length; i++) {

        // Checks if current letter has already been guessed
        if (currentWord[i] == "X") {

            // Shows the letter if it is present in the word
            if (correctWord[i] == guessedLetter) {
                returnedWord = returnedWord.concat(guessedLetter);
            }
            else {
                returnedWord = returnedWord.concat("X");
            }
        }
        else {
            returnedWord = returnedWord.concat(currentWord[i]);
        }
    }

    // Case where guessed letter is not in word.
    if (returnedWord == currentWord) {
        wrongGuesses.push(guessedLetter); // Adds to list of wrong guesses
        wrongGuessCt++; // Increments count of incorrect guesses

        var alertMsg = guessedLetter.concat(" is not in the word!");
        alert(alertMsg);
        updateWrongGuesses();
    }
    // Case where word is successfully guessed.
    else if (returnedWord == correctWord) {
        alert("Congratulations! You guessed the word!");
        gameOver();
    }

    return returnedWord;
}

// Updates list of wrong guesses
function updateWrongGuesses() {
    var wrongGuessStr = "";

    for(var i = 0; i < wrongGuesses.length; i++) {
        wrongGuessStr = wrongGuessStr.concat(wrongGuesses[i]);
        wrongGuessStr = wrongGuessStr.concat(" ")
    }
    document.getElementById("wrong-guess-content").innerHTML = wrongGuessStr;
}

// Runs when game is over, win or loss.
function gameOver() {

}