class View {
  constructor(game, $el) {
    this.$el = $el;
    this.game = game;
  }

  bindEvents() {
    const $cell = $('.cell');
    $cell.on("click", event => {
      let $target = $(event.currentTarget);
      if ($target.attr('class').includes('cell-click')) {
        alert("Invalid Move, try again");
      } else {
        this.makeMove($target);
        if (this.game.isOver()) {
          let $h1 = $('<h1>');
          let msg = "you win, " + this.game.currentPlayer;
          $h1.text(msg);
          $('body').append($h1);
          $cell.off("click");
        }

      }
    });
  }

  makeMove($square) {
    this.game.playMove($square.data('pos'));
    if (this.turn) {
      $square.text(this.game.currentPlayer);
      this.turn = false;
    } else {
      $square.text(this.game.currentPlayer);
      this.turn = true;
    }
    $square.addClass('cell-click');

  }

  setupBoard() {
    const $boardGrid = $('<ul class="boardGrid">');
    this.$el.append($boardGrid);
    for (let i = 0; i < 9; i++) {
      let $cell = $('<li class="cell">');
      $cell.data('pos', [Math.floor(i / 3), i % 3]);
      $boardGrid.append($cell);
    }
  }
}

module.exports = View;
