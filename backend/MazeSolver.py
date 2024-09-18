import heapq
class MazeSolver:
    
    def manhattanHeuristic(self,a, b):
        return abs(a[0] - b[0]) + abs(a[1] - b[1])
    
    def aStarSolution(self,graph,start,goal):
        # Priority queue to store the node with the lowest cost + heuristic value
        frontier = []
        heapq.heappush(frontier, (0, start))

        # Dictionary to store the each node in the path and the previous node in the path
        cameFrom = {}
        cameFrom[start] = None
        # Dictionary to store the cost to reach a node
        costOfThePath = {}
        costOfThePath[start] = 0

        while frontier:
            # Pop the node with the f(n) value from the frontier
            currentCost, current = heapq.heappop(frontier)

            # If we've reached the goal, reconstruct the path and return it
            if current == goal:
                path = []
                while current:
                    path.append(current)
                    current = cameFrom[current]
                path.reverse()
                return path

            for neighbor in graph[current]:
                # consider that the cost of moving from one node to another is 1
                gOfTheNode = costOfThePath[current] + 1  
                if neighbor not in costOfThePath or gOfTheNode < costOfThePath[neighbor]:
                    costOfThePath[neighbor] = gOfTheNode
                    fOfTheNode = gOfTheNode + self.manhattanHeuristic(neighbor, goal)
                    heapq.heappush(frontier, (fOfTheNode, neighbor))
                    cameFrom[neighbor] = current
        return None