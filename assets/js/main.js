document.addEventListener("DOMContentLoaded", function () {
  const playerX = "X";
  const playerO = "O";
  let currentPlayer = playerX;
  let gameOver = false;
  let playerXScore = 0;
  let playerOScore = 0;

  drawBoard();

  function drawBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    gameOver = false;
    currentPlayer = playerX;

    document.getElementById("current-player").innerHTML =
      "Current Player: " + currentPlayer;
    document.getElementById(
      "scoreboard"
    ).innerHTML = `Player1 (X): ${playerXScore} | Player2 (O): ${playerOScore}`;

    const rows = [1, 2, 3];
    const cols = [1, 2, 3];
    rows.forEach((row) => {
      cols.forEach((col) => {
        const cell = document.createElement("div");
        cell.className =
          "col-4 border-bottom border-dark d-flex justify-content-center align-items-center";
        if (col < 3) cell.classList.add("border-end");

        const button = document.createElement("button");
        button.id = `${row}-${col}`;
        button.className = "btn w-50 h-50 border border-dark fs-2";
        button.innerText = "Click";
        button.disabled = false;

        button.addEventListener("click", () => {
          if (gameOver) {
            alert("Game is already over");
            return;
          }

          if (button.innerText === "Click") {
            button.innerText = currentPlayer;
            button.disabled = true;

            if (currentPlayer === playerX) {
              currentPlayer = playerO;
              button.style.backgroundColor = "blue";
            } else {
              currentPlayer = playerX;
              button.style.backgroundColor = "red";
            }
            button.style.color = "white";

            document.getElementById("current-player").innerHTML =
              "Current Player: " + currentPlayer;

            checkWinner();
          }
        });

        cell.appendChild(button);
        gameBoard.appendChild(cell);
      });
    });
  }

  function checkWinner() {
    const buttons = document.querySelectorAll("button");
    // winning combinations
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    // Check for winner
    for (let [a, b, c] of winningCombinations) {
      if (
        buttons[a].innerText === buttons[b].innerText &&
        buttons[a].innerText === buttons[c].innerText &&
        buttons[a].innerText !== "Click"
      ) {
        alert(`Winner is ${buttons[a].innerText}`);
        gameOver = true;

        if (buttons[a].innerText === playerX) {
          playerXScore++;
        } else {
          playerOScore++;
        }
        // redraw after 1.5s so the user sees the result
        // and the game board is reset
        setTimeout(drawBoard, 1500); // redraw after 1.5s so the user sees the win
        return;
      }
    }

    // Check for draw
    if ([...buttons].every((button) => button.innerText !== "Click")) {
      alert("It's a draw!");
      gameOver = true;
      // redraw after 1.5s so the user sees the result
      // and the game board is reset
      setTimeout(drawBoard, 1500);
    }
  }
});
