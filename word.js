function Word(contents) {
  this.contents = contents;
    
  this.guess = function(letter) {
    console.log("Guessed " + letter);
  }
}

module.exports = Word;