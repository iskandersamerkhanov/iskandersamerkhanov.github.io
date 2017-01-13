var AI = function() {
    var currentGame = {};

    function getMinimaxValue(state) {
        if(state.isTerminal()) {
            return currentGame.getScore(state);
        }

        var stateScore;

        if(state.turn === currentGame.aiSymbol)
            stateScore = 1000;
        else
            stateScore = -1000;

        var emptyPositions = state.getEmptyCellsIndices();

        var availableNextStates = emptyPositions.map(function(emptyPosition) {
            var aiAction = new AIAction(emptyPosition, state.turn === currentGame.aiSymbol);
            var nextState = aiAction.applyTo(state);
            return nextState;
        });

        availableNextStates.forEach(function(nextState) {
            var nextStateScore = getMinimaxValue(nextState);
            if(state.turn === currentGame.aiSymbol) {
                if(nextStateScore <= stateScore) {
                    stateScore = nextStateScore;
                }
            }
            else {
                if(nextStateScore > stateScore) {
                    stateScore = nextStateScore;
                }
            }
        });

        return stateScore;
    }

    this.makeAMove = function(turn) {
        var emptyPositions = currentGame.currentState.getEmptyCellsIndices();

        var availableActions = emptyPositions.map(function(emptyPosition) {
            var aiAction =  new AIAction(emptyPosition, true);
            var nextState = aiAction.applyTo(currentGame.currentState);
            aiAction.minimaxValue = getMinimaxValue(nextState);
            return aiAction;
        });

        availableActions.sort(sortInAscendingOfMinimaxValue);

        var chosenAction = availableActions[0];
        var nextState = chosenAction.applyTo(currentGame.currentState);

        ui.insertAt(chosenAction.movePosition, turn);
        currentGame.advanceTo(nextState);
    }

    this.plays = function(game){
        currentGame = game;
    };

    function sortInAscendingOfMinimaxValue(firstAction, secondAction) {
        if(firstAction.minimaxValue < secondAction.minimaxValue)
            return -1;
        else if(firstAction.minimaxValue > secondAction.minimaxValue)
            return 1; 
        else
            return 0;
    }
};