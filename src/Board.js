import React, { useState } from "react";
import Cell from "./Cell";
import WinScreen from "./WinScreen";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn, test }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for(let i = 0; i < nrows; i++){
      initialBoard.push([])
      for(let j = 0; j < ncols; j++){
        const isOn = Math.random() < chanceLightStartsOn ? true : false;
        initialBoard[i].push(isOn)
      }
    }
    if(test){
      initialBoard=[[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[false,false,false,false,false],[true,true,false,true,true]]
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    const check = board.every((r) => r.every(c => !c))
    return check
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {

      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(r => r.map(c => c))

      // TODO: in the copy, flip this cell and the cells around it
      const cellsToFlip = [[y,x],[y+1, x], [y-1, x], [y, x-1], [y, x+1]]
      for(let cell of cellsToFlip){
        const [y, x] = cell
        flipCell(y, x, boardCopy)
      }

      // TODO: return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if(hasWon()){
    return <WinScreen />
  }
  // TODO
  // make table board
    return(
      <table >
      <tbody className="Board">
      {
      board.map((r,y) => <tc className="rows" key={[r,y]}>{r.map((c,x) => <Cell flipCellsAroundMe={flipCellsAround} isLit={c} key={`${y}-${x}`} coord={`${y}-${x}`} />)}</tc>)
      }
    
      </tbody>
      </table>
    )

  // TODO
}


export default Board;
