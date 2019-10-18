# TicTacToeGame

To play click: 
https://agreenwoodmelb.github.io/TicTacToeGame/

## Starting Screen:

The First input box allows each player can enter a custom name that will displayed during their game play. If the player chooses not to use a custom name a default name will be assigned.

The second input box allows players to specify which css color option they wish to use. This color will be used to indicate the spaces on the board which belong to them. It is also used to highlight their name when it's their turn.


(*The code for validating that the input color is usuable comes from:* https://stackoverflow.com/questions/48484767/javascript-check-if-string-is-valid-css-color)



## Game Screen:

The game screen presents the player with a board (the html of which is generated when the player presses "New Game" button) and highlights the active player's name to indicate it is their turn.

Clicking on an available board space marks it as belonging to the player whose turn it is when clicking.

Upon owning a combination of 3 squares in a row, a column or one of the diagonals the game is ended and a  Game Over display informs the players which one of them has won.

If no spaces are left available and no player has won the Game Over display informs players that the game has ended in a draw.

The Game Over display has a restart button which returns players to the Starting Screen allowing them to make changes to the custom names and colors.


## The Bot (Inoperational):

An attempt was made to create a Tic Tac Toe from from scratch without looking at potential solution. (<--This was a mistake)

At the start of a game the bot generates all possible outcomes following the first move.

It then sorts these according to who wins each game storing games where the bot Wins or Draws in respective arrays.

It sorts the Winning Games array by how many moves it will take for the bot to win. 

It selects the first move in the Winning Game with the least number of moves. It uses this move to play its turn.

After the player has made their next move the Bot culls any of the Winning Games that do not include the players move at that turn.

From the remaining Winning Games it selects the one with the shortest path and plays its next move.

This pattern repeat until the bot has won or there are no remaining options in the Winning Game Array.

It then searches the Drawing Games array and plays its moves from there following the same process of elimination of non-viable games.

### Bot Issues:

There is currently a flaw in how the above is coded leading to the bot not eliminating non-viable games correctly.

The bot also does not account for losing games yet but this will be done by selecting any available spot at random.




