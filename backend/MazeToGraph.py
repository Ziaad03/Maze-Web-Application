class MazeToGraph:
    def __init__(self):
        self.graph = {}
    def convertMazeToGraph(self, maze):
        for i in range(len(maze)):
            for j in range(len(maze[i])):
                neighbors = []
                if i > 0 and maze[i - 1][j] != "X":
                    neighbors.append((i - 1, j))
                if i < len(maze) - 1 and maze[i + 1][j] != "X":
                    neighbors.append((i + 1, j))
                if j > 0 and maze[i][j - 1] != "X":
                    neighbors.append((i, j - 1))
                if j < len(maze[i]) - 1 and maze[i][j + 1] != "X":
                    neighbors.append((i, j + 1))
                self.graph[(i, j)] = neighbors
        return self.graph