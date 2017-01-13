var State = function(previousState) {
    this.turn = "";
    this.aiMovesCount = 0;
    this.winnerSymbol = "";
    this.board = [];

    if(typeof previousState !== "undefined") {
        var len = previousState.board.length;
        this.board = new Array(len);
        for(var itr = 0 ; itr < len ; itr++) {
            this.board[itr] = previousState.board[itr];
        }

        this.aiMovesCount = previousState.aiMovesCount;
        this.winnerSymbol = previousState.winnerSymbol;
        this.turn = previousState.turn;
    }

    this.advanceTurn = function() {
        this.turn = this.turn === "x" ? "o" : "x";
    }

    this.getEmptyCellsIndices = function() {
        var indices = [];
        for(var i = 0; i < 9 ; i++) {
            if(this.board[i] === "") {
                indices.push(i);
            }
        }
        return indices;
    }

    this.isTerminal = function() {
        var B = this.board;

        for(var i = 0; i <= 6; i = i + 3) {
            if(B[i] !== "" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        for(var i = 0; i <= 2 ; i++) {
            if(B[i] !== "" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        for(var i = 0, j = 4; i <= 2 ; i = i + 2, j = j - 2) {
            if(B[i] !== "" && B[i] == B[i + j] && B[i + j] === B[i + 2*j]) {
                this.winnerSymbol = B[i];
                return true;
            }
        }

        var emptyPositions = this.getEmptyCellsIndices();
        if(emptyPositions.length == 0) {
            return true;
        }
        else {
            return false;
        }
    }
}   