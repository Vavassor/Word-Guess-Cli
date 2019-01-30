function Letter(character) {
  this.character = character;
  this.guessed = false;

  this.guess = function(character) {
    if (!this.guessed) {
      this.guessed = character === this.character;
    }
  };
}

Letter.prototype.toString = function() {
  if (this.guessed) {
    return this.character;
  } else {
    return " ";
  }
};

module.exports = Letter;