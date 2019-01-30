const inquirer = require("inquirer");
const Word = require("./word.js");

const maxGuesses = 8;
let answer;
let lettersGuessed;
let word;

function addConsoleHighlight(string) {
  return "\x1b[93m" + string + "\x1b[0m";
}

function askToPlayAgain() {
  inquirer.prompt([
    {
      message: "Would you like to play again?",
      name: "confirm",
      type: "confirm",
    },
  ]).then((response) => {
    if (response.confirm) {
      startGame();
    }
  });
}

function pickWord() {
  const words = [
    "dancing",
  ];
  return words[randomIntRange(0, words.length - 1)];
}

function lose() {
  console.log("\n"
      + "You lose! No guesses left.\n"
      + "\n"
      + "The word was " + answer + ".\n");

  askToPlayAgain();
}

function randomIntRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function requestGuess() {
  const guessesLeft = maxGuesses - lettersGuessed.length;

  if (guessesLeft <= 0) {
    lose();
    return;
  }

  console.log("\n"
      + word.toString() + "\n"
      + "\n"
      + "Guesses Left: " + guessesLeft + "\n"
      + "Letters Guessed: " + lettersGuessed.join(", ") + "\n");

  inquirer.prompt([
    {
      filter: input => input.toLowerCase(),
      message: "Guess a letter.",
      name: "letter",
      validate: validateLetter,
    },
  ]).then((response) => {
    if (!lettersGuessed.includes(response.letter)) {
      word.guess(response.letter);
      lettersGuessed.push(response.letter);
    }

    if (word.isGuessed()) {
      win();
    } else {
      requestGuess();
    }
  });
}

function startGame() {
  lettersGuessed = [];
  answer = pickWord();
  word = new Word(answer);
  requestGuess();
}

function validateLetter(response) {
  if (response.length !== 1) {
    return false;
  }

  const letter = response[0].toLowerCase();

  return letter >= "a" && letter <= "z";
}

function win() {
  console.log("\n"
      + "You win!\n"
      + "\n"
      + "The word was " + addConsoleHighlight(answer) + ".\n");

  askToPlayAgain();
}

startGame();