const container = document.getElementById('container')


let currentPlayer = true

let turn = 0

container.onclick = function (e) {
    if (e.target != container && e.target.innerHTML == "") {
        turn++
        const box = e.target
        if (currentPlayer) {
            box.innerHTML = "X"
        } else { box.innerHTML = "O" }

    } checkWinner()
    currentPlayer = !currentPlayer
}


function checkWinner() {
    const boxes = document.querySelectorAll(".box")
    const combos = ["012", "345", "678", "036", "147", "258", "048", "246"]


    for (let i = 0; i < combos.length; i++) {
        const combo = combos[i]
        const x = combo[0]
        const y = combo[1]
        const z = combo[2]
        if (boxes[x].innerHTML == boxes[y].innerHTML && boxes[y].innerHTML == boxes[z].innerHTML && boxes[x].innerHTML != "") {
            alert("Winner winner chicken dinner")
            container.onclick = undefined
            return true
        }



    }
    if (turn == 9) {
        alert("That's a tie!")

    }





}



//setup with variables

const wordToGuess = "chocolate";

const wordState = [];
let guessesLeft = 10

const prevGuesses = [];

function displayWordState(state) {
    let output = '';

    for (let i = 0; i < state.length; i++) {
        const char = state[i];
        output = output + char;
        output = output + '_';
        // if (char != undefined) {
        //     output = output + char;

        //     { output = output + '_' }
    }
    const wordStateContainer = document.getElementById('word');

    wordStateContainer.innerHTML = output;


}

function displayGuessessLeft(num) {
    document.getElementById('Guesses-left').innerHTML = num;
}


function displayPreviousGuessess(guessesArray) {

    const list = document.getElementById('Past-guesses');

    //clear list before adding guesses

    list.innerHTML = ''
    //for each guess append a li child
    for (let i = 0; i < guessesArray.length; i++) {

        const guess = document.createElement('li');

        guess.innerHTML = guessesArray[i];

        list.appendChild(guess)

    }
}

//takes in word to guess, the current state of the word and the new character to guess
function guess(wordToGuess, wordState, currGuess) {
    //for each character in the word to be guessed
    for (let i = 0; i < wordToGuess.length; i++) {
        //if the character matches the current guess
        //update word state at that position

        if (wordToGuess[i] == currGuess) {
            wordState[i] = currGuess;

        }



    }
    displayWordState(wordState);



}


// guess(wordToGuess, wordState, 's');
//update word state
// displayWordState(wordState);

// displayGuessessLeft(guessesLeft);

// displayPreviousGuessess(prevGuesses);



function checkWon(wordState) {

    let hasBlanks = true;
    for (let i = 0; i < wordState.length; i++) {

        //if any parts of the wordstate has blank, return false
        if (wordState[i] == '_') {

            hasBlanks = false;
        }

    }
    return hasBlanks
}


//initial setup code
function setup() {
    for (let i = 0; i < wordToGuess.length; i++) {

        wordState.push("_");
    }



    displayGuessessLeft(guessesLeft);

    displayWordState(wordState);

    checkWon(wordState);



    displayPreviousGuessess(prevGuesses);
}


function setupForm() {


    //add form submit handler
    const form = document.getElementById('Player-input')
    const input = document.getElementById('Player-guess')

    form.onsubmit = function (event) {
        event.preventDefault();
        //check current guess
        const currentInput = input.value.toLowerCase();

        //clear input field

        input.value = '';

        //check if input is valid

        if (!validateInput(validateInput, prevGuesses)) {
            widnow.alert('Please enter a single character as guess')
            return;

        }


        //add guess to previous guesses
        prevGuesses.push(currentInput);
        //update guesses left
        guessesLeft = guessesLeft - 1;
        displayGuessessLeft(guessesLeft);
        //make guess

        guess(wordToGuess, wordState, currentInput);

        //check if user has won

        const won = checkWon(wordState);
        console.log(won)
        if (won) {
            window.alert('You Won');

        }

        //check if user has lost
        else if (guessesLeft == 0) {
            window.alert('you lost');

        }

        //update previous guess
        displayPreviousGuessess(prevGuesses);
    }
}
//if guess is a valid choice then return true, else return false
function validateInput(guess) {
    //check that guess is one charaacter

    //user has not guessed this before and character is not in prevGuesses

    if (guess.length == 1 && prevGuesses.indexOf(guess) == -1) {

        return true;
    }

    return false;
}



// console.log(input.value);
// console.log(event.target)

setup();
setupForm();





