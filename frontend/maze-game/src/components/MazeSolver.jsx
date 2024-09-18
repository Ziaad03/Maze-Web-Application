import "../styles/mazesolver.css";
import React, { useState, useEffect, useRef } from 'react';

export default function MazeSolver({ maze }) {
  const [solvedMaze, setSolvedMaze] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = useRef(null);

  let path = []
  const solveMaze = async () => {

    async function fetchData() {
      try {
        const response = await fetch('http://127.0.0.1:5000/solveMaze', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ maze }),
        });
         if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
            const data = await response.json();
          // Parse the JSON response
            if (data.success) {
              console.log('Found path:');
              path = data.answer
             
            } else {
              console.log('Path not found.');
              
            }
            
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
          }
    
    }
  
  
  await fetchData()
  // console.log(path)
   // Mark the cells that define in the path
   if (path.length === 0){
      setShowDialog(true);
    }
   else {
   const updatedMaze = maze.map((row, rowIndex) =>
     row.map((cell, cellIndex) => {
       let pathFlag = false;
       for (let i = 0; i < path.length; i++) {
         if (path[i][0] === rowIndex && path[i][1] === cellIndex) {
           pathFlag = true;
           break;
         }
       }
       return {
         cell,
         isPath: pathFlag, // Add a flag to indicate if it's part of the path
       };
     })
   );
  
    // Set the solved maze into the state
    setSolvedMaze(updatedMaze);
  }

  };

  const renderMaze = (mazeToRender) => {
    return (
      <div className="maze-grid">
        {mazeToRender.map((row, rowIndex) => (
          <div key={rowIndex} className="maze-row">
            {row.map((cellObj, cellIndex) => {
              const { cell, isPath } = cellObj; // Extract cell and isPath
              return (
                <div
                  key={cellIndex}
                  className={`cell ${getCellClass(cell)} ${
                    isPath ? "path" : "notpath"
                  }`}
                >
                  {cell}
                </div>
              );
            })}
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
      case "X":
        return "obstacle";
      default:
        return "empty";
    }
  };

  function handleClickOutside(event) {
    if (dialogRef.current && !dialogRef.current.contains(event.target)) {
      setShowDialog(false);  // Close the dialog if clicked outside
    }
  }

  useEffect(() => {
    // Attach the event listener when the dialog is open
    if (showDialog) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener on component unmount or dialog close
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDialog]);

  
  return (
    <div className="solver-section">
      <button onClick={solveMaze}>Solve Maze</button>
      <div className="maze-container">
        {solvedMaze ? renderMaze(solvedMaze) : renderMaze(maze)}
     
    </div>
   <div>
   {showDialog && (
     <div className="dialog-overlay">
       <div className="dialog-box">
         <p>Path not found because Maze cannot be solved.<br></br></p>
         <button onClick={() => setShowDialog(false)}>Close</button>
       </div>
     </div>
   )}
 </div>
 </div>
);



}
