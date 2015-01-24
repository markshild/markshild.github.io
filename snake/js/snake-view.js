(function () {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var View = Snakey.View = function ($el) {
    this.$el = $el;
    this.board = new Snakey.Board(10, $el);
  };

  View.prototype.start = function () {
    window.setInterval(function () {
      this.board.snake.move();
      this.board.render();
    }.bind(this), 200); //sets speed of game
    window.setInterval(function() {
      this.board.addApple();
    }.bind(this), 5000); // sets how often new apples render
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    $(window).on("keydown", this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function (event) {
    var dir = "";
    //binds direction pressed on keyboard to dir in game.
    if (event.keyCode === 37) {
      dir = "W";
    } else if (event.keyCode === 38) {
      dir = "N";
    } else if (event.keyCode === 39) {
      dir = "E";
    } else if (event.keyCode === 40) {
      dir = "S";
    } else {
      return;
    }

    this.board.snake.turn(dir);
  };

})();
