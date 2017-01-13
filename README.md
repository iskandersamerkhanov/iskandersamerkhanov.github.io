# Tic-Tac-Toe game with AI
https://iskandersamerkhanov.github.io/

#Gameplay
##First move
User can play as the first player(using "x") or as the second player(using "o").

##Restart
To restart game click at the board.

#AI
##Description
AI never loses, only wins or reduces to draw. Uses minimax algorithm.

##Minimax algorithm
AI at each its turn calculates minimax value of each possible sequence of players' moves and making best decision to win or not to lose.
AI always wants to minimize score of the game's terminal state, Player always wants to maximize score of the last game's state.

##Score function
Algorithm has score function that evaluates score of the game's terminal state. If value is negative - AI wins, if positive - Player wins, if zero - it is a draw.
This is because Tic-Tac-Toe is zero-sum game.
