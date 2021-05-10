$(document).ready(function() {
    const ALPHABET = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const LIST_OF_WORDS = ["CENTURY", "SUSPICIOUS", "ADJUST", "LEARNING", "EXPERIENCE", "NOVEL", "LANGUAGE", "KITCHEN", "OFFICIAL",
        "GUITAR", "MUSICAL", "TODAY", "LIVING", "INSTANT", "WINTER", "INNOCENT", "VALLEY", "LOCAL", "PICTURE", "TELEVISION",
        "DIAMOND", "SECRET", "STUDENT", "EARLY", "FOREVER"];
    var currentWordDisplay = [];
    var matchedLetters = [];
    var correctGuesses = 0;
    var wrongGuesses = 0;
    var currentWord = "";

    $(document.body).on("click", "#new-game", setupGame);

    $(document.body).on("click", ".letter", guessLetter);

    function setupGame() {
        console.log("Starting new game");
        correctGuesses = 0;
        matchedLetters = [];
        currentWordDisplay = [];
        $("#result-message").empty();
        $("#alphabet-area").empty();
        $("#word-display").empty();

        currentWord = getWord();

        for (var i = 0; i <currentWord.length; i++) {
            currentWordDisplay.push("-");
        }

        $("#word-display").append(currentWordDisplay.join(""));

        generateAlphabet();

        wrongGuesses = 0;

        hangmanImage();
    }

    function generateAlphabet() {
        for (var i = 0; i < ALPHABET.length; i++) {
            var currentLetter = ALPHABET[i]
            var letterButton = $("<button/>").attr({
                type: "button",
                class: "letter",
                "data-letter": currentLetter
            }).append(currentLetter);

            $("#alphabet-area").append(letterButton);
        }
    }

    function getWord() {
        var randomNumber = Math.floor(Math.random() * LIST_OF_WORDS.length);
        var word = LIST_OF_WORDS[randomNumber];
        return word;
    }

    function hangmanImage() {
        if (wrongGuesses === 0) {
            $("#hangman-img").attr("src", "img/hangman0.png");
        } else if (wrongGuesses === 1) {
            $("#hangman-img").attr("src", "img/hangman1.png");
        } else if (wrongGuesses === 2) {
            $("#hangman-img").attr("src", "img/hangman2.png");
        } else if (wrongGuesses === 3) {
            $("#hangman-img").attr("src", "img/hangman3.png");
        } else if (wrongGuesses === 4) {
            $("#hangman-img").attr("src", "img/hangman4.png");
        } else if (wrongGuesses === 5) {
            $("#hangman-img").attr("src", "img/hangman5.png");
        } else if (wrongGuesses === 6) {
            $("#hangman-img").attr("src", "img/hangman6.png");
        }
    }

    function guessLetter() {
        if ($(this).hasClass("disabled")) {
            return;
        }

        $(this).addClass("guessed-letter disabled");

        var guessedLetter = $(this).data("letter");
        console.log("Letter clicked = " + guessedLetter);

        var matchCounter = 0;

        for (var i = 0; i < currentWord.length; i++) {
            if (guessedLetter === currentWord.charAt(i)) {
                matchCounter++;
            }
        }

        console.log(matchCounter + " matches");

        if (matchCounter === 0) {
            wrongGuess(guessedLetter);
        } else {
            correctGuess(guessedLetter, matchCounter);
        }
    }

    function correctGuess(letter, matches) {
        matchedLetters.push(letter);
        currentWordDisplay = [];
        for (var i = 0; i < currentWord.length; i++) {
            if (matchedLetters.includes(currentWord[i])) {
                currentWordDisplay.push(currentWord[i]);
            } else {
                currentWordDisplay.push("-");
            }
        }

        newDisplay = currentWordDisplay.join("");

        console.log(newDisplay);
        $("#word-display").empty().append(newDisplay);

        correctGuesses += matches;
        console.log(correctGuesses + " correct guesses");
        if (correctGuesses === currentWord.length) {
            $(".letter").addClass("disabled");
            $("#result-message").text("You win!");
        }
    }

    function wrongGuess(letter) {
        wrongGuesses++;
        console.log(wrongGuesses + " wrong guesses");

        hangmanImage();

        if (wrongGuesses >= 6) {
            lostGame();
        }
    }

    function lostGame() {
        $(".letter").addClass("disabled");
        $("#result-message").text("You lost. Try again.");
    }
});