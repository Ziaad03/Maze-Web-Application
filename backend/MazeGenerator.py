import random
class MazeGenerator:
    def __init__(self, row, col):
        self.row = row
        self.col = col
        self.maze = [['E' for _ in range(row)] for _ in range(col)]

    def generateMaze(self, numObstacles):

        self.maze[0][0] = "R"
        self.maze[self.row - 1][self.col - 1] = "T"
        obstaclesNumber = 0
        while obstaclesNumber < numObstacles:
            x = random.randint(0, self.row - 1)
            y = random.randint(0, self.col - 1)
            if self.maze[x][y] == "E":
                self.maze[x][y] = "X"
                obstaclesNumber += 1
        return self.maze, (0, 0), (self.row - 1, self.col - 1)
    
    def printMaze(self):
        for row in self.maze:
            print(' '.join(row))