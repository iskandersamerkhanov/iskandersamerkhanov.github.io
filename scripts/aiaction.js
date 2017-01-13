/*
 * Constructs an action that the AI could make
 * @param position [Number]: the cell position the AI would make its action in
 * @param aiMove [Boolean]: true if it is the AI move, false if it is the player move (this parameter used by AI to think about future possible moves of both players)
 * made that action
 */
var AIAction = function(position, aiMove) {
    // public: the position on the board that the action would put the letter on
    this.movePosition = position;
    // public: the minimax value of the state that the action leads to when applied
    this.minimaxValue = 0;

    /*
     * public: applies the action to a state to get the next state
     * @param previousState [State]: the state to apply the action to
     * @return [State]: the next state
     */
    this.applyTo = function(previousState) {
        var newState = new State(previousState);
        newState.board[this.movePosition] = previousState.turn;
        if (aiMove) {
            newState.aiMovesCount++;
        }
        newState.changeTurn();
        return newState;
    }
};