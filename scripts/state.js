/*
 * Represents a state in the game
 * @param previousState [State]: previous state to intialize the new state
 */
var State = function(previousState) {
    /*
     * public: configuration of the board
     */
    this.board = [];
    /*
     * public: the player with which symbol has the turn to play ('x' or 'o')
     */
    this.turn = "";
    /*
     * public: the number of moves made by AI 
     */
    this.aiMovesCount = 0;
    /*
     * public: the symbol of the winner, if one of the players wins in this state
     */
    this.winnerSymbol = "";
    
    /* Construction of new state using previous state*/
    if(typeof previousState !== "undefined") {
        var boardLength = previousState.board.length;
        this.board = new Array(boardLength);
        for(var i = 0 ; i < boardLength ; i++) {
            this.board[i] = previousState.board[i];
        }

        this.aiMovesCount = previousState.aiMovesCount;
        this.winnerSymbol = previousState.winnerSymbol;
        this.turn = previousState.turn;
    }

    /*
     * public: changes the turn
     */
    this.changeTurn = function() {
        this.turn = this.turn === "x" ? "o" : "x";
    }

    /*
     * public function that gets empty cells' indices
     * @return [Array]: indices of all empty cells
     */
    this.getEmptyCellsIndices = function() {
        var indices = [];
        for(var i = 0; i < 9 ; i++) {
            if(this.board[i] === "") {
                indices.push(i);
            }
        }
        return indices;
    }

    /*
     * public function that checks if the state is a terminal state or not
     * @returns [Boolean]: true if it's terminal, false otherwise
     */
    this.isTerminal = function() {
        var B = this.board;

        //rows
        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        //columns
        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        //diagonals
        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        var emptyPositions = this.getEmptyCellsIndices();
        if(emptyPositions.length == 0) {
            //draw
            return true;
        }
        else {
            return false;
        }
    }
}   