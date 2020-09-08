// JS Hangman Code

// Initialize variables
var gameStarted = false;
var word = "";
var guessedWord = "";
var guess = "";
var gameOver;
var loss;
var wrongGuessCt = 0;
var wrongGuesses = [];

// Add button event listeners
document.getElementById("start-button").addEventListener("click", startGame);
document.getElementById("guess-button").addEventListener("click", checkGuess);
document.getElementById("restart-button").addEventListener("click", restartGame);

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
            guessedWord = guessedWord.concat("_");
        }

        // Set initial word space to all _'s
        document.getElementById("guess-space").innerHTML = guessedWord;
    }
}

// CheckGuess Function - Runs each time user hits the guess button
function checkGuess() {
    if (gameStarted) {

        // Read in value of letter-input
        guess = document.getElementById("letter-input").value;
        guess = guess.toUpperCase();
        document.getElementById("letter-input").value = "";

        // Check if user is guessing a letter or word
        if (guess.length > 1) {
            if (guess != word) {
                wrongGuessCt++; // Increments count of incorrect guesses
                drawMan(wrongGuessCt); // Updates drawing

                updateWrongGuesses();

                var alertMsg = guess + " is not the word!";
                alert(alertMsg);

                if (wrongGuessCt >= 6) {
                    loss = true;
                    gameOver();
                    document.getElementById("guess-space").innerHTML = "GAME OVER: DEFEAT <br><br> WORD WAS: " + word;
                }
            }
            else {
                var alertMsg = guess + " is the word!";
                alert(alertMsg);

                loss = false;
                gameOver();
                document.getElementById("guess-space").innerHTML = "GAME OVER: VICTORY <br><br> WORD WAS: " + word;
            }
        }
        else {
            guessedWord = checkWord(word, guess, guessedWord); // Checks a letter with the current word.
            document.getElementById("guess-space").innerHTML = guessedWord; // Sets HTML
        }
    }
}

// Checks and updates the actual word based on user letter guess
function checkWord(correctWord, guessedLetter, currentWord) {

    // Check if user has already guessed the wrong letter
    if(wrongGuesses.includes(guessedLetter)) {
        alert("You've already guessed that letter! Try another one.");
        return currentWord;
    }

    var returnedWord = "";

    // Loops through entire correct word
    for(var i = 0; i < correctWord.length; i++) {

        if (currentWord[i] != guessedLetter) {

            // Checks if current letter has already been guessed
            if (currentWord[i] == "_") {

                // Shows the letter if it is present in the word
                if (correctWord[i] == guessedLetter) {
                    returnedWord = returnedWord.concat(guessedLetter);
                }
                else {
                    returnedWord = returnedWord.concat("_");
                }
            }
            else {
                returnedWord = returnedWord.concat(currentWord[i]);
            }

            // Case where guessed letter is not in word.
            if (returnedWord == currentWord) {
                wrongGuesses.push(guessedLetter); // Adds to list of wrong guesses
                wrongGuessCt++; // Increments count of incorrect guesses
                drawMan(wrongGuessCt); // Updates drawing

                var alertMsg = guessedLetter.concat(" is not in the word!");
                alert(alertMsg);
                updateWrongGuesses();

                if (wrongGuessCt >= 6) {
                    loss = true;
                    gameOver();
                    return "GAME OVER: DEFEAT <br><br> WORD WAS: " + correctWord;
                }
            }
            // Case where word is successfully guessed.
            else if (returnedWord == correctWord) {
                loss = false;
                gameOver();
                return "GAME OVER: VICTORY <br><br> WORD WAS: " + correctWord;
            }
        }
        else {
            returnedWord = returnedWord.concat(guessedLetter);
            alert("You already guessed " + guessedLetter + "!");
            return currentWord;
        }
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

    document.getElementById("wrong-guess-counter").innerHTML = "Wrong Guesses: ".concat(wrongGuessCt);
}


// Updates drawing of man
function drawMan(ct) {
    switch(ct) {
        case 1:
            document.getElementById("drawing-head").style.visibility = "visible";
            break;
        case 2:
            document.getElementById("drawing-body").style.visibility = "visible";
            break;
        case 3:
            document.getElementById("l-arm").style.visibility = "visible";
            break;
        case 4:
            document.getElementById("r-arm").style.visibility = "visible";
            break;
        case 5:
            document.getElementById("l-leg").style.visibility = "visible";
            break;
        case 6:
            document.getElementById("r-leg").style.visibility = "visible";
            break;
    }
}

// Runs when game is over, win or loss.
function gameOver() {
    if (loss == true) {
        alert("Sorry, you lost! Better luck next time!");
    }
    else {
        alert("Congratulations! You guessed the word!");
    }
    document.getElementById("restart-button").style.display="initial";
}

// Resets the game
function restartGame() {
    gameStarted = false;
    word = "";
    guessedWord = "";
    guess = "";
    wrongGuessCt = 0;
    wrongGuesses= [];

    // Clear drawing
    document.getElementById("drawing-head").style.visibility = "hidden";
    document.getElementById("drawing-body").style.visibility = "hidden";
    document.getElementById("l-arm").style.visibility = "hidden";
    document.getElementById("r-arm").style.visibility = "hidden";
    document.getElementById("l-leg").style.visibility = "hidden";
    document.getElementById("r-leg").style.visibility = "hidden";

    // Clear guess space
    document.getElementById("guess-space").innerHTML = ""; // Sets HTML

    // Clear wrong guess space
    document.getElementById("wrong-guess-content").innerHTML = "";
    document.getElementById("wrong-guess-counter").innerHTML = "Wrong Guesses: 0";

    // Hide play again button
    document.getElementById("restart-button").style.display="none";
}