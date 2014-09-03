var Game = {};

Game.initialize = function(container, score, letters, letterWidth, containerWidth) {
  this.letterWidth = letterWidth || 0;
  this.containerWidth = containerWidth || 0;
  this.$container = container;
  this.$score = score;
  this.letters = letters;
  this.score = 0;
  this.currentLetters = [];
  this.timerID = null; // set by startTimer()
  this.startTimer();

  return this;
};

Game.startTimer = function() {
  var that = this;
  this.timerID = setInterval(function(){
    that.appendLetter();
    that.lettersHTML();
    that.checkIfAtEnd();

    that.render();
  }, 1000);
};

Game.lettersHTML = function() {
  var html = "";
  $.each(this.currentLetters, function(k,v) {
    html += "<div class='letter'>" + v.toUpperCase() + "</div>";
  });
  return html;
};

Game.randomLetter = function() {
  var numberLimit = this.letters.length;
  var index = Math.floor((Math.random() * numberLimit) + 1);
  return this.letters[index - 1];
};

Game.render = function() {
  this.$container.html(this.lettersHTML());
  this.$score.html(this.score);
};

Game.appendLetter = function() {
  this.currentLetters.push(this.randomLetter());
};

Game.increaseScore = function() {
  this.score = this.score + 1;
};

Game.decreaseScore = function() {
  this.score = this.score - 1;
};

Game.stop = function() {
  clearInterval(this.timerID);
};

Game.checkIfAtEnd = function() {
  if (this.letterWidth != 0 && this.containerWidth != 0) {
    if (this.currentLetters.length * this.letterWidth >= this.containerWidth) {
      console.log("AT END");
      this.stop();
    }
  }
};

Game.removeFromCurrentLetters = function(character) {
  var letterIndex = $.inArray(character, this.currentLetters);
  if (letterIndex > -1) {
    this.currentLetters.splice(letterIndex, 1);
  }
};

Game.checkKey = function(key) {
  var character = String.fromCharCode(key.which).toLowerCase();
  console.log(character, this.currentLetters, $.inArray(character, this.currentLetters));
  if ($.inArray(character, this.currentLetters) > -1) {
    this.removeFromCurrentLetters(character);
    this.increaseScore();
  } else if ($.inArray(character, this.letters) > -1) {
    this.decreaseScore();
  } else {
    // noop
  }
};


// DOM READY

$(document).ready(function() {
  var lettersArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "u", "v", "x", "y", "z"];

  // START
  var game = Game.initialize($("#container"), $("#score"), lettersArray);

  $(window).on("keyup", function(event) {

    game.checkKey(event);

    if (event.which == 27)
      game.stop();
  });

  // DEBUG
  console.log(game.$container);
});
