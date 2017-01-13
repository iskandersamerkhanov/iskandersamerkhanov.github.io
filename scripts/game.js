/*
 * Constructs a game object to be played
 * @param ai [AI]: the AI to be play the game with
 * @param aiIsFirstPlayer [Boolean]: true if AI starts the game, false if Player starts
 */
var Game = function(ai, aiIsFirstPlayer) {
    // public: initialize the AI for this game
    this.ai = ai;

    // public: initialize symbol that AI uses in game
    this.aiSymbol = aiIsFirstPlayer ? "x" : "o";

    // public: initialize symbol that Player uses in game
    this.humanSymbol = aiIsFirstPlayer ? "o" : "x";

    // public: initialize the game current state to empty board configuration
    this.currentState = new State();

    this.currentState.board = ["", "", "",
                               "", "", "",
                               "", "", ""];
    //'x' always plays first                              
    this.currentState.turn = "x";

    // public: status of the game
    this.status = "beginning";

    /*
     * public: function that advances the game to a new state
     * @param newState [State]: the new state to advance the game to
     */
    this.advanceTo = function(newState) {
        this.currentState = newState;
        if(this.currentState.isTerminal()) {
            this.status = "ended";

            if(this.currentState.winnerSymbol === this.humanSymbol){
                ui.switchViewTo("win");
            }             
            else if(this.currentState.winnerSymbol === this.aiSymbol){
                ui.switchViewTo("loss");
            }
            else {
                ui.switchViewTo("draw");
            }
        }
        else {
            if (this.currentState.turn === this.aiSymbol) {
                this.ai.makeAMove(this.aiSymbol);
            }
        }
    };

    /*
     * public: starts the game
     */
    this.start = function() {
        ui.clearBoard();
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
        ui.hideStartingMenu();
    }

    /*
     * public: score function
     * @param newState [State]: the state that is evaluated
     * return [Number]: the score of the state
     */
    this.getScore = function(state) {
        if(state.winnerSymbol === this.humanSymbol){
            return 10 - state.aiMovesCount;
        }
        else if(state.winnerSymbol === this.aiSymbol) {
            return -10 + state.aiMovesCount;
        }
        else {
            return 0;
        }
    }
};