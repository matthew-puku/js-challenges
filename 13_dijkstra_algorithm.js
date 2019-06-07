/*
Strongly recommend to attempt this in pairs or groups.

Consider the graph stored as 'problem'. Write a method (and helper
methods) that will show the distance and shortest path between
two nodes in the graph.

If there is no path, the distance returned should be Infinity, 
and the path should be an empty array.

If the start and end node are the same, the distance should be 0 and
the path should only contain the start/end node. 

Dijkstra’s algorithm:
Note the initial cost to get to all nodes from the start node as
Infinity, except for the start node itself, for which the cost is 0.

In each round:
A. Pick the unvisited node with the smallest current cost noted
B. From that node, update the cost to every child node of that node, 
   indicating the parent node for the cost.
C. Mark that node as done

You are done when all nodes have been visited. The cost is the
final one noted on the finish node, and the path can be taken
from the parents recorded.

Test your solution: mocha 15_dijkstra_algorithm.js

Hints:
If you are having trouble making a start try drawing
a layout of the diagram and thinking about how you could move around
the object.

Using Google will also help a lot for coming up with ideas.
*/

const problem = {
  A: {
    B: 2,
    C: 7
  },
  B: {
    D: 1,
    E: 8
  },
  C: {
    B: 3,
    E: 12
  },
  D: {
    E: 4,
    F: 9
  },
  E: {
    F: 4
  },
  F: {}
};

function getCheapestUnvisitedNode(graph) {
  let winningNode = false
  let lowestCost = Infinity

  for (let node in graph) {
    if (
      graph[node].dijkstraData.cost < lowestCost
      && graph[node].dijkstraData.visited === false
    ) {
      winningNode = node
      lowestCost = graph[node].dijkstraData.cost
    }
  }

  return winningNode
}

const dijkstra = (graph, start, end) => {
  // Start by attaching helpful properties to each node of the graph.
  for (let node in graph) {
    if (graph.hasOwnProperty(node)) {
      graph[node].dijkstraData = {
        cost: Infinity,
        cheapestParent: null,
        visited: false
      }
    }
  }
  graph[start].dijkstraData.cost = 0
  
  let workingNode = getCheapestUnvisitedNode(graph)
  while (workingNode) {
    for (let connectedNode in graph[workingNode]) {
      if (connectedNode != "dijkstraData") {
        // If it's cheaper to get to the connected node via this node, update its dijkstraData
        let currentCost = graph[connectedNode].dijkstraData.cost
        let proposedCost = graph[workingNode][connectedNode] + graph[workingNode].dijkstraData.cost
        if (proposedCost < currentCost) {
          graph[connectedNode].dijkstraData.cost = proposedCost
          graph[connectedNode].dijkstraData.cheapestParent = workingNode
        }
      }
    }
    graph[workingNode].dijkstraData.visited = true
    
    workingNode = getCheapestUnvisitedNode(graph)
  }
  
  let distance = graph[end].dijkstraData.cost
  let path = []
  // Fill path if a path exists
  if (distance < Infinity) {
    path.unshift(end)
    while (graph[path[0]].dijkstraData.cheapestParent) {
      path.unshift(graph[path[0]].dijkstraData.cheapestParent)
    }
  }

  return { distance, path }
};

var assert = require('assert');

describe('Find shortest path', function () {
  context('When there is a valid path and start is different from end', function () {
    it('Should return the distance 11 from A to F with path A,B,D,E,F', function () {
      assert.deepEqual({
        distance: 11,
        path: ['A', 'B', 'D', 'E', 'F']
      }, dijkstra(problem, 'A', 'F'))
    })
    it('Should return the distance 9 from B to F with path B,D,E,F', function () {
      assert.deepEqual({
        distance: 9,
        path: ['B', 'D', 'E', 'F']
      }, dijkstra(problem, 'B', 'F'))
    })

  })

  context('When there is no path between the start and end', function () {
    it('Should return the distance Infinity if there is no path', function () {
      assert.deepEqual({
        distance: Infinity,
        path: []
      }, dijkstra(problem, 'B', 'A'));
    })
  })
  context('When the start and end are the same', function () {
    it('Should return a distance of 0 from B to B with path B', function () {
      assert.deepEqual({
        distance: 0,
        path: ['B']
      }, dijkstra(problem, 'B', 'B'));
    })
  })
})