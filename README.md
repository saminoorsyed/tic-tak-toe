# Tic Tac Toe Game

This repository contains a simple Tic Tac Toe game implemented using HTML, CSS, and JavaScript. The game allows two players to take turns and provides a user-friendly interface for playing.

## Live Demo

You can play the game online by visiting the [Tic Tac Toe Game](https://saminoorsyed.github.io/tic-tac-toe) GitHub Pages.

## Files

The repository includes the following files:

- `index.html`: The main HTML file that defines the structure and content of the game interface.
- `style.css`: The CSS file that provides the styling and layout for the game interface.
- `aiVersion1.js`: The JavaScript file that contains the game logic and functionality.

## Usage

To use or modify the Tic Tac Toe game, follow these steps:

1. Clone the repository to your local machine:
   ```shell
   git clone https://github.com/your-username/tic-tac-toe-game.git

2. Open the index.html file in your web browser to play the game locally.

3. If you want to make any changes to the game, you can edit the style.css and aiVersion1.js files as needed.

4. To host the game on GitHub Pages, push the repository to your GitHub account and enable GitHub Pages for the main branch in the repository's settings.

5. Once GitHub Pages is enabled, you can access the game online using the provided URL.

## Contributing
Contributions to the Tic Tac Toe game are welcome! If you find any bugs, have suggestions for improvements, or would like to add new features, feel free to open an issue or submit a pull request.

Please make sure to follow the Contributing Guidelines when contributing to this project.

## extras

This was one of the first projects I ever coded. I recently came back to it so that I could experiment with a rudimentary Ai algorithm, in this case, the Minimax algorithm.

The easy mode here just chooses a random move from the remaining spaces on the board, and the hard mode chooses the best move. This makes it unbeatable (let me know if you manage to win against the hard computer).

I very much enjoyed the process of learning how some computer decision making works, especially in relation to formulating decision trees and then rating the outcomes of each tree. Of course the back-tracking and exponential number of possibilities needed to make a "best decision" require a lot of computer processing, so I was particularly fascinated by the implementation of some simple alpha beta pruning on top of my minimax algorithm.

please reach out to me if you have any questions.

I hope you enjoy my project!
