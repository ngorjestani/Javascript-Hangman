const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const LIST_OF_WORDS = ["CENTURY", "SUSPICIOUS", "ADJUST", "LEARNING", "EXPERIENCE", "NOVEL", "LANGUAGE", "KITCHEN", "OFFICIAL",
    "GUITAR", "MUSICAL", "TODAY", "LIVING", "INSTANT", "WINTER", "INNOCENT", "VALLEY", "LOCAL", "PICTURE", "TELEVISION",
    "DIAMOND", "SECRET", "STUDENT", "EARLY", "FOREVER"];
var currentWordDisplay = [];
var matchedLetters = [];
var correctGuesses = 0;
var wrongGuesses = 0;
var currentWord = "";
var newGameButton = document.getElementById("new-game");
var letterButton = document.getElementsByClassName('letter');
var resultMessage = document.getElementById('result-message');
var wordDisplay = document.getElementById('word-display');
var alphabetArea = document.getElementById('alphabet-area');

newGameButton.addEventListener('click', setupGame);

function setupGame() {
    console.log('Starting new game...');

    clearGame();

    currentWord = getWord();
    for (var i = 0; i < currentWord.length; i++) {
        currentWordDisplay.push('-');
    }

    wordDisplay.textContent = currentWordDisplay.join('');

    generateAlphabet();

    for (var i = 0; i < letterButton.length; i++) {
        letterButton[i].addEventListener('click', guessLetter);
    }

    wrongGuesses = 0;

    hangmanImage();
}

function clearGame() {
    correctGuesses = 0;
    matchedLetters = [];
    currentWordDisplay = [];

    resultMessage.textContent = '';
    wordDisplay.textContent = '';
    alphabetArea.innerHTML = '';
}

function getWord() {
    var randomNumber = Math.floor(Math.random() * LIST_OF_WORDS.length);
    return LIST_OF_WORDS[randomNumber];
}

function generateAlphabet() {
    for (var i = 0; i < ALPHABET.length; i++) {
        var currentLetter = ALPHABET[i];
        var button = document.createElement('button');

        function addAttributes(el, attr) {
            for (var key in attr) {
                el.setAttribute(key, attr[key]);
            }
        }

        addAttributes(button, {
            'type': 'button',
            'class': 'letter',
            'data-letter': currentLetter
        });

        button.textContent = currentLetter;

        alphabetArea.appendChild(button);
    }
}

function hangmanImage() {
    var hangmanImg = document.getElementById('hangman-img');
    var imgLocation = 'img/hangman' + wrongGuesses + '.png';

    hangmanImg.setAttribute('src', imgLocation);


/*    if (wrongGuesses === 0) {
        hangmanImg.setAttribute("src", "img/hangman0.png");
    } else if (wrongGuesses === 1) {
        hangmanImg.setAttribute("src", "img/hangman1.png");
    } else if (wrongGuesses === 2) {
        hangmanImg.setAttribute("src", "img/hangman2.png");
    } else if (wrongGuesses === 3) {
        hangmanImg.setAttribute("src", "img/hangman3.png");
    } else if (wrongGuesses === 4) {
        hangmanImg.setAttribute("src", "img/hangman4.png");
    } else if (wrongGuesses === 5) {
        hangmanImg.setAttribute("src", "img/hangman5.png");
    } else if (wrongGuesses === 6) {
        hangmanImg.setAttribute("src", "img/hangman6.png");
    }*/
}

function guessLetter() {
    if (this.classList.contains('disabled')) {
        return;
    }
    this.classList.add('guessed-letter','disabled');
    var guessedLetter = this.getAttribute('data-letter');

    var matchCounter = 0;

    for (var i = 0; i < currentWord.length; i++) {
        if (guessedLetter === currentWord.charAt(i)) {
            matchCounter++;
        }
    }

    if (matchCounter === 0) {
        wrongGuess();
    } else {
        correctGuess(guessedLetter, matchCounter);
    }
}

function correctGuess(letter, matches) {
    matchedLetters.push(letter);

    currentWordDisplay = [];
    for (var i = 0; i < currentWord.length; i++) {
        if (matchedLetters.includes(currentWord[i])) {
            currentWordDisplay.push(currentWord[i])
        } else {
            currentWordDisplay.push('-');
        }
    }

    wordDisplay.textContent = currentWordDisplay.join('');

    correctGuesses += matches;
    if (correctGuesses === currentWord.length) {
        letterButton.classList.add('disabled');
        resultMessage.textContent = 'You win!';
    }
}

function wrongGuess() {
    wrongGuesses++;

    hangmanImage();

    if (wrongGuesses >= 6) {
        lostGame();
    }
}

function lostGame() {
    for (var i of letterButton) {
        i.classList.add('disabled');

    }
    resultMessage.textContent = 'You lost. Try again.';
}
