

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    let $towers = $('.tower');
    this.clickTower($towers);
  }

  clickTower($towers) {
    $towers.on('click', event => {
      let $target = $(event.currentTarget);
      if (!this.firstTower) {
        this.firstTower = $target.attr('id');
      } else {
        let startidx = parseInt(this.firstTower.slice(5)) - 1;
        let endidx = parseInt($target.attr('id').slice(5)) - 1;
        if (this.game.isValidMove(startidx, endidx)){
          $('#' + $target.attr('id')).prepend($("#" + this.firstTower + "> li:first-child").detach());
          this.game.move(startidx, endidx);
          if (this.game.isWon()){
            let $h1 = $('<h1 class="win">');
            $h1.text("Congratulations you won!");
            $h1.attr("style", "text-align: center");
            $('body').append($h1);
            $target.addClass("victory");
            $towers.off("click");
          }
        } else {
          alert("invalid move, make another");
        }
        this.firstTower = null;
      }
    });
  }

  setupTowers() {
    const $div = $('<div class="towers group">');
    const $tower1 = $("<ul id='tower1' class='tower'>");
    const $tower2 = $("<ul id='tower2' class='tower'>");
    const $tower3 = $("<ul id='tower3' class='tower'>");
    for (let i = 1; i < 4; i++) {
      let $li = $('<li>');
      $li.attr("id", 'disk' + i);
      $tower1.append($li);
    }
    $div.append($tower1);
    $div.append($tower2);
    $div.append($tower3);
    this.$el.append($div);
  }

  render() {

  }

}

module.exports = View;
