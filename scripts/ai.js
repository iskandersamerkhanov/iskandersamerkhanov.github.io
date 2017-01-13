/*
 * Constructs an AI player
 */
var AI = function() {
    //private: the game the player is playing
    var currentGame = {};

    /*
     * private: function that recursively computes the minimax value of the state
     * @param state [State]: the state to calculate its minimax value
     * @returns [Number]: the minimax value of the state
     */
    function getMinimaxValue(state) {
        if(state.isTerminal()) {
            //a terminal game state is the base case
            return currentGame.getScore(state);
        }

        var stateScore;

        if(state.turn === currentGame.aiSymbol)
        // AI minimizes - initialize to a value larger than any possible score
            stateScore = 1000;
        else
        // Player maximizes - initialize to a value smaller than any possible score
            stateScore = -1000;

        var emptyPositions = state.getEmptyCellsIndices();

        var availableNextStates = emptyPositions.map(function(emptyPosition) {
            var aiAction = new AIAction(emptyPosition, state.turn === currentGame.aiSymbol);
            var nextState = aiAction.applyTo(state);
            return nextState;
        });

        /* calculate the minimax value for all available next states
         * and evaluate the current state's value */
        availableNextStates.forEach(function(nextState) {
            var nextStateScore = getMinimaxValue(nextState);
            if(state.turn === currentGame.aiSymbol) {
                // AI wants to minimize - update stateScore if nextScore is smaller
                if(nextStateScore <= stateScore) {
                    stateScore = nextStateScore;
                }
            }
            else {
                // Player wants to maximize - update stateScore if nextScore is larger
                if(nextStateScore > stateScore) {
                    stateScore = nextStateScore;
                }
            }
        });

        return stateScore;
    }

    /*
     * public: make the ai player take a move
     * @param turn [String]: the symbol that us AI to play ('x' or 'o')
     */
    this.makeAMove = function(turn) {
        //if it is first move in the game AI can move anythere(to speed up game)
        if (currentGame.currentState.aiMovesCount === 0 && turn === "x") {
            var randomPosition = Math.floor(Math.random()*9);
            var aiAction =  new AIAction(randomPosition, true);
            var nextState = aiAction.applyTo(currentGame.currentState);

            ui.insertAt(aiAction.movePosition, turn);
            currentGame.advanceTo(nextState);

            return;
        }

        var emptyPositions = currentGame.currentState.getEmptyCellsIndices();

        //enumerate and calculate the score for each avaialable actions to the AI
        var availableActions = emptyPositions.map(function(emptyPosition) {
            var aiAction =  new AIAction(emptyPosition, true);
            var nextState = aiAction.applyTo(currentGame.currentState);
            aiAction.minimaxValue = getMinimaxValue(nextState);
            return aiAction;
        });

        //sort the enumerated actions list by score
        availableActions.sort(sortInAscendingOfMinimaxValue);

        //take the first action as it's the optimal
        var chosenAction = availableActions[0];
        nextState = chosenAction.applyTo(currentGame.currentState);

        ui.insertAt(chosenAction.movePosition, turn);
        currentGame.advanceTo(nextState);
    }

    /*
     * public: link AI and the game
     * @param game [Game]: current game
     */
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