from flask import Flask, send_from_directory, send_file, request, jsonify, render_template, redirect, url_for
import os
from MazeGenerator import MazeGenerator
from MazeToGraph import MazeToGraph
from MazeSolver import MazeSolver
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/generateMaze', methods=['POST'])
def generateMaze():
    data = request.get_json()
    obstacles = data.get('obstacles')
    mazeGenerator = MazeGenerator(10, 10)
    maze,start,goal = mazeGenerator.generateMaze(obstacles)
    if maze:
        return jsonify({"answer": maze, "success": True})
    else:
        return jsonify({"error": "Cant generate Maze", "success": False})
    

@app.route('/solveMaze', methods=['POST'])
def solveMaze():
    data = request.get_json()
    maze = data.get('maze')
    mazeToGraph = MazeToGraph()
    graph = mazeToGraph.convertMazeToGraph(maze)
    mazeSolver = MazeSolver()
    # Solve the maze using A* algorithm
    path = mazeSolver.aStarSolution(graph, (0, 0), (9,9) )
    if path is None:
        return jsonify({"error": "Missing path. or Path not created", "success": False})
    else:
        return jsonify({"answer": path , "success":True})




app.run(debug = True)