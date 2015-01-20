(function () {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Snake = Snakey.Snake = function (board) {
    this.dir = "S";
    this.board = board
    //initializes snake as two segments on board
    this.segments = [[3,3], [2,3]];

    //initialize the body on the board
    this.board.grid[2][3] = "s";
    this.score = 0
    this.head = new Coord(this.segments[0]);
    //initialize the head on the board
    this.board.grid[(this.head.x)][(this.head.y)] = this.dir;
  };

  Snake.prototype.move = function () {

    this.board.grid[this.head.x][this.head.y] = "s"

    var add = this.head.plus(this.dir);

    if (this.board.offBoard(add) || this.board.grid[add[0]][add[1]] === "s") {
      alert("You Lose ... Please try again!");
      window.location.reload();
    }

    if (this.board.grid[add[0]][add[1]] !== "A") {
      var erase = this.segments.pop();
      this.board.grid[erase[0]][erase[1]] = ".";
    } else {
      this.score += 1
    }

    this.segments.unshift(add);
    this.board.grid[add[0]][add[1]] = this.dir;
    this.head = new Coord(add);

  };

  Snake.prototype.turn = function (dir) {
    this.dir = dir;
  };

  var Coord = Snakey.Coord = function (pos) {
    this.pos = pos;
    this.x = pos[0]
    this.y = pos[1]
  };

  Coord.prototype.plus = function (dir) {

    if (dir === "N") {
      this.pos = [this.pos[0] - 1, this.pos[1]];
    } else if (dir === "E") {
      this.pos = [this.pos[0], this.pos[1] + 1];
    } else if (dir === "S") {
      this.pos = [this.pos[0] + 1, this.pos[1]];
    } else {
      this.pos = [this.pos[0], this.pos[1] - 1];
    }

    return this.pos;
  };

  var Board = Snakey.Board = function (dim) {

    this.dim = dim
    this.grid = []

    //fill in an empty board
    for (var i = 0; i < dim; i++) {
      this.grid[i] = [];
      for (j = 0; j < dim; j++) {
        this.grid[i][j] = ".";
      }
    }

    this.snake = new Snake(this);
  };

  Board.prototype.offBoard = function(pos) {
    if (pos[0] < 0 || pos[0] > (this.dim - 1)) {
      return true;
    }

    if (pos[1] < 0 || pos[1] > (this.dim - 1)) {
      return true;
    }

    return false;
  };

  Board.prototype.addApple = function () {
    var test = true;
    //loop until a pos has been found that is empty.
    while (test) {
      var x = Math.floor(Math.random()*this.dim);
      var y = Math.floor(Math.random()*this.dim);
      if (this.grid[x][y] !== "s" && this.grid[x][y] !== "S" &&
        this.grid[x][y] !== "W" && this.grid[x][y] !== "N" &&
        this.grid[x][y] !== "E") {
        this.grid[x][y] = "A";
        test = false;
      }
    }
  }

  Board.prototype.render = function () {

    for (var i = 0; i < this.dim; i++) {
      for (var j = 0; j < this.dim; j++) {
        var index = (10 * i) + j;
        $thisLi = $($("li")[index]);
        $thisLi.removeClass();
        if (this.grid[i][j] === "A") {
          $thisLi.addClass("apple");
        } else if (this.grid[i][j] === "s") {
          $thisLi.addClass("snake");
          // below, the direction affect the way the head is turned
        } else if (this.grid[i][j] === "S") {
          $thisLi.addClass("s-snake");
        } else if (this.grid[i][j] === "N") {
          $thisLi.addClass("n-snake");
        } else if (this.grid[i][j] === "E") {
          $thisLi.addClass("e-snake");
        } else if (this.grid[i][j] === "W") {
          $thisLi.addClass("w-snake");
        }
      }
    }
    //update the score
    $("div").html(this.snake.score);
  };

})();
