const words = ['javascript', 'hangman', 'programming', 'developer', 'coding', 'computer', 'algorithm'];

let selectedWord;
let guessedLetters = [];
let guessesLeft = 6;

const wordDisplay = document.getElementById('word-display');
const guessCountDisplay = document.getElementById('guess-count');
const lettersContainer = document.getElementById('letters');

function selectWord() {
    selectedWord = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    guessesLeft = 6;
    updateGuessesLeft();
    displayWord();
    displayLetters();
}

function displayWord() {
    wordDisplay.innerHTML = selectedWord
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
}

function displayLetters() {
    lettersContainer.innerHTML = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    alphabet.split('').forEach(letter => {
        const letterButton = document.createElement('button');
        letterButton.textContent = letter.toUpperCase();
        letterButton.classList.add('letter');
        letterButton.addEventListener('click', () => handleGuess(letter));
        lettersContainer.appendChild(letterButton);
    });
}

function handleGuess(letter) {
    if (!guessedLetters.includes(letter) && selectedWord.includes(letter)) {
        guessedLetters.push(letter);
        displayWord();
        if (checkWin()) {
            gameOver(true);
        }
    } else {
        guessesLeft--;
        updateGuessesLeft();
        if (guessesLeft === 0) {
            gameOver(false);
        }
    }
    event.target.disabled = true;
}

function updateGuessesLeft() {
    guessCountDisplay.textContent = guessesLeft;
}

function checkWin() {
    return selectedWord.split('').every(letter => guessedLetters.includes(letter));
}

function gameOver(win) {
    const message = win ? 'You win!' : 'Game over. You lose!';
    alert(message);
    selectWord();
}

// Start the game
selectWord();
