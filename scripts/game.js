var Game = function(ai, aiIsFirstPlayer) {
    this.ai = ai;
    this.aiSymbol = aiIsFirstPlayer ? "x" : "o";
    this.humanSymbol = aiIsFirstPlayer ? "o" : "x";
    this.currentState = new State();
    this.currentState.board = ["", "", "",
                               "", "", "",
                               "", "", ""];
    this.currentState.turn = "x";
    this.status = "beginning";

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
            if(this.currentState.turn === this.humanSymbol) {
                ui.switchViewTo("human");
            }
            else if (this.currentState.turn === this.aiSymbol) {
                ui.switchViewTo("ai");
                this.ai.makeAMove(this.aiSymbol);
            }
        }
    };

    this.start = function() {
        if(this.status = "beginning") {
            this.advanceTo(this.currentState);
            this.status = "running";
        }
    }

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