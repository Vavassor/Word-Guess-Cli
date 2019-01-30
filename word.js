const Letter = require("./letter.js");

function addConsoleUnderline(string) {
  return "\x1b[4m" + string + "\x1b[0m";
}

function Word(contents) {
  let letters = [];
  for (const character of contents) {
    letters.push(new Letter(character));
  }

  this.letters = letters;

  this.guess = function(character) {
    for (const letter of this.letters) {
      letter.guess(character);
    }
  };

  this.isGuessed = function() {
    return this.letters.reduce((allGuessed, letter) => allGuessed && letter.guessed, true);
  }
}

Word.prototype.toString = function() {
  return this.letters
    .map(letter => addConsoleUnderline(letter))
    .join(" ");
};

module.exports = Word;