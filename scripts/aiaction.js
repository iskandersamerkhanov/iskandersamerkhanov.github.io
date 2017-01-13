var AIAction = function(position, aiMove) {
    this.movePosition = position;

    this.minimaxValue = 0;

    this.applyTo = function(previousState) {
        var newState = new State(previousState);
        newState.board[this.movePosition] = previousState.turn;
        if (aiMove) {
            newState.aiMovesCount++;
        }
        newState.advanceTurn();
        return newState;
    }
};