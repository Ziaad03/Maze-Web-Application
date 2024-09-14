import React from "react";
import "../styles/mazesolver.css";

export default function MazeSolver({ maze }) {
  const solveMaze = () => {};

  const renderMaze = () => {
    if (maze.length === 0) {
      return <p>Solve the maze here</p>;
    }

    return (
      <div className="maze-grid">
        {maze.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cell, cellIndex) => (
              <div key={cellIndex} className={`cell ${getCellClass(cell)}`}>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const getCellClass = (cell) => {
    switch (cell) {
      case "R":
        return "robot";
      case "T":
        return "treasure";
      case "O":
        return "obstacle";
      default:
        return "empty";
    }
  };

  return (
    <div className="solver-section">
      <button onClick={solveMaze}>Solve Maze</button>
      <div className="maze-container">{renderMaze()}</div>
    </div>
  );
}
