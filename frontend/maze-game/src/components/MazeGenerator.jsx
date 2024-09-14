import React from "react";
import { useState } from "react";
import "../styles/mazegenerator.css";

export default function MazeGenerator({ maze, setMaze }) {
  const [difficulty, setDifficulty] = useState("easy");

  const generateMaze = () => {
    // Create a new unique 10x10 maze array where each row is a unique array
    maze = Array.from({ length: 10 }, () => new Array(10).fill("E"));

    // set the robot position
    maze[0][0] = "R";
    // set the treasure (goal) position
    maze[9][9] = "T";

    // set obstacles in random positions
    if (difficulty === "easy") {
      generateObstacles(maze, 10);
    }
    if (difficulty === "medium") {
      generateObstacles(maze, 20);
    }
    if (difficulty === "hard") {
      generateObstacles(maze, 30);
    }

    setMaze(maze);
  };

  const generateObstacles = (maze, numObstacles) => {
    while (numObstacles > 0) {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      if (maze[x][y] === "E") {
        maze[x][y] = "O";
        numObstacles--;
      }
    }
  };

  const renderMaze = () => {
    if (maze.length === 0) {
      return <p>Generate a maze here</p>;
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
    <div className="generation-section">
      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </label>
      <button onClick={generateMaze}>Generate Maze</button>
      <div className="maze-container">{renderMaze()}</div>
    </div>
  );
}
