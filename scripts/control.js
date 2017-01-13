var globals = {};

//if Player starts game first
$(".start-first").click(function() {
    var ai = new AI();
    globals.game = new Game(ai, false);
    ai.plays(globals.game);
    globals.game.start();
});

//if AI starts game first
$(".start-second").click(function() {
    var ai = new AI();
    globals.game = new Game(ai, true);
    ai.plays(globals.game);
    globals.game.start();
});

$(".cell").each(function() {
    var $this = $(this);
    $this.click(function() {
        //making a move
        if (globals.game !== undefined && !$this.hasClass('filled') && 
            globals.game.aiSymbol !== globals.game.currentState.turn && globals.game.status !== "ended") {

            var index = parseInt($this.data("index"));
            var newState = new State(globals.game.currentState);
            newState.board[index] = globals.game.humanSymbol;
            ui.insertAt(index, globals.game.humanSymbol);
            newState.changeTurn();
            globals.game.advanceTo(newState);
        }
        //restarting of the game
        else if (globals.game !== undefined && globals.game.status === "ended") {
            ui.switchToStartingMenu();
        }
    })
});