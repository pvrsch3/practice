/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

//making the width and height const variables is better to make the game flexible
const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

//makeBoard() function sets the global board variable to be an array of 6 arrays (height), each containing 7 items (width).
function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  //setting the y (board[y][x]) to 0 for an empty array
  for (let y = 0; y < HEIGHT; y++) {
    //make it an array
    board.push(Array.from({ length: WIDTH }));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */
// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
function makeHtmlBoard() {
  //declaring variables
  const htmlBoard = document.getElementById('board');
  // TODO:place you click on (column-top) to drop your piece to board
  // make column tops (clickable area for adding a piece to that column)
  const top = document.createElement("tr");
  //tr is the first row, "title/heading" row
  //make an id called column-top #column-top
  top.setAttribute("id", "column-top");
  //add click for spot to drop your piece
  top.addEventListener("click", handleClick);

  //setting the x (board[y][x]) to 0 for an empty array
  for (let x = 0; x < WIDTH; x++) {
    //declaring variable, the rows
    const headCell = document.createElement("td");
    //id is x #x
    headCell.setAttribute("id", x);
    //append (which means add elements to the end of ()) headCell (the rows below the top) to top (the heading column)
    top.append(headCell);
    // headCell variable is the element that is being added / appended to the end of the top element
  }
  htmlBoard.append(top);
  // top variable (first row) is the element that is being added / appended to the end of the htmlBoard element

  // main part of board
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      //declare variable
      // td are the rows , cell is the rows
      const cell = document.createElement("td");
      // cell variable has an id. template literals. the value of the id attribute is set to the result of vvv
      cell.setAttribute("id", `${y}-${x}`);
      //cell variable is the element that is being added / appended to the end of row element 
      row.append(cell);
    }
    htmlBoard.append(row);
    // row element is being added / appended to the end of the board 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  //finds the lowest empty spot in the game board and returns the y coordinate (or null if the column is filled).
  // starting from bottom row (height -1) working its way up to the top row (represented by 0)
  for (let y = HEIGHT - 1; y >= 0; y--) {
    //loop checks whether the current cell (row) in the board (represented by board[y][x]) is empty or not.
    if (!board[y][x]) {
      //if empty, returns y
      return y;
    }
  }
  //returns this if the column is filled
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  //declared variable , the actual playing pieces
  const piece = document.createElement('div');
  //giving the piece a class called piece
  piece.classList.add('piece');
  //giving the piece a claas of the current player the active player
  piece.classList.add(`p${currPlayer}`);
  // style property gives access to its inline styles.
  // top property is a style property that is used to specify the position of an element relative to its parent container. 
   //when pieces take up a spot on the board ?
  piece.style.top = -50 * (y + 2);

  //declaring variable
  //spot variable has an id. template literals. the value of the id attribute is set to the result of vvv
  const spot = document.getElementById(`${y}-${x}`);
  // piece element is added / appended to the end of spot
  spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  //question, why +evt
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // condition ? valueIfTrue : valueIfFalse format 
  currPlayer = currPlayer === 1 ? 2 : 1;
  // the condition is "currPlayer === 1". If this condition is true, then the value of "currPlayer" will be set to 2. If the condition is false, then the value of "currPlayer" will be set to 1.
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    //every method is used to check every coordinate
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  //empty array
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      //different ways to win
      // get "check list" of 4 cells (starting here) for each of the different
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      
      //find winner using the different ways to win listed above as needed
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
