# Tic-Tac-Toe game with AI
Play game: https://iskandersamerkhanov.github.io/

## Overview

Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a game for two players, X and O,
who take turns marking the spaces in a 3×3 grid.
The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.
In my realization of this game as a second player plays computer (AI).

## Running Locally

1. Clone this repository
2. Open the root directory of your cloned repository as the project root
3. Open index.html in browser.

## Technologies

Written using JS, JQuery, HTML, CSS

# Gameplay
## First move
User can play as the first player(using "x") or as the second player(using "o").

## Restart
To restart game click at the restart button or at the board after finishing a game.

# AI
## Description
AI never loses, only wins or reduces to draw. Uses minimax algorithm.

## Minimax algorithm
AI at each its turn calculates minimax value of each possible sequence of players' moves and making best decision to win or not to lose.
AI always wants to minimize score of the game's terminal state, Player always wants to maximize score of the last game's state.

## Score function
Algorithm has score function that evaluates score of the game's terminal state. If value is negative - AI wins, if positive - Player wins, if zero - it is a draw.
This is because Tic-Tac-Toe is zero-sum game.
