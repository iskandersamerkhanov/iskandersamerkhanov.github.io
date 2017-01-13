var globals = {};

$(".start-first").click(function() {
    var ai = new AI();
    globals.game = new Game(ai, false);
    ai.plays(globals.game);
    globals.game.start();
});

$(".start-second").click(function() {
    var ai = new AI();
    globals.game = new Game(ai, true);
    ai.plays(globals.game);
    globals.game.start();
});

$(".cell").each(function() {
    var $this = $(this);
    $this.click(function() {
        if (globals.game !== undefined && !$this.hasClass('filled') && globals.game.aiSymbol !== globals.game.currentState.turn) {
            var index = parseInt($this.data("index"));
            var newState = new State(globals.game.currentState);
            newState.board[index] = globals.game.humanSymbol;
            ui.insertAt(index, globals.game.humanSymbol);
            newState.advanceTurn();
            globals.game.advanceTo(newState);
        }
    })
});

$(".restart-button").click(function() {
    ui.switchToStartingMenu();
});