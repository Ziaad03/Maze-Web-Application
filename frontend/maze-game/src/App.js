import React from "react";
import Header from "./components/Header";
import MazeGenerator from "./components/MazeGenerator";
import MazeSolver from "./components/MazeSolver";
import { useState } from "react";
import "./App.css";

function App() {
  const [maze, setMaze] = useState([]);
  return (
    <div className="App">
      <Header />
      <div className="main">
        <MazeGenerator maze={maze} setMaze={setMaze} />
        <MazeSolver maze={maze} />
      </div>
    </div>
  );
}

export default App;
