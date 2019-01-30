const inquirer = require("inquirer");
const Word = require("./word.js");

let guessesLeft = 4;
let word;

function generateWord() {
  return "Dancing";
}

function requestGuess() {
  if (guessesLeft <= 0) {
    return;
  }

  guessesLeft -= 1;

  inquirer.prompt([
    {
      filter: input => input.toLowerCase(),
      message: "Guess a letter.",
      name: "letter",
      validate: validateLetter,
    },
  ]).then((response) => {
    word.guess(response.letter);
    requestGuess();
  });
}

function validateLetter(response) {
  if (response.length !== 1) {
    return false;
  }

  const letter = response[0].toLowerCase();

  return letter >= "a" && letter <= "z";
}

word = new Word(generateWord());
requestGuess();