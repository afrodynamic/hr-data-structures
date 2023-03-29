// Instantiate a new graph
var Graph = function() {
  this.adjList = new Map();
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  this.adjList.set(node, []);
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return this.adjList.has(node);
};

// Removes a node from the graph.
Graph.prototype.removeNode = function(node) {
  var edges = this.adjList.get(node);

  for (var i = 0; i < edges.length; i++) {
    this.removeEdge(node, edges[i]);
  }

  this.adjList.delete(node);
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  var result = false;

  for (var i = 0; i < this.adjList.get(fromNode).length; i++) {
    if (this.adjList.get(fromNode)[i] === toNode) {
      result = true;
    }
  }

  return result;
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  this.adjList.get(fromNode).push(toNode);

  this.adjList.get(toNode).push(fromNode);
};

// Remove an edge between any two specified (by value) nodes.
Graph.prototype.removeEdge = function(fromNode, toNode) {
  var fromNodeEdges = this.adjList.get(fromNode);
  var toNodeEdges = this.adjList.get(toNode);

  for (var i = 0; i < fromNodeEdges.length; i++) {
    if (fromNodeEdges[i] === toNode) {
      fromNodeEdges.splice(i, 1);
    }
  }

  for (var j = 0; j < toNodeEdges.length; j++) {
    if (toNodeEdges[j] === fromNode) {
      toNodeEdges.splice(j, 1);
    }
  }
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (var key of this.adjList.keys()) {
    cb(key);
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// addNode: O(1)
// contains: O(1)
// removeNode: O(e) [# of edges] worst case, O(1) best case
// hasEdge: O(e) [# of edges] worst case, O(1) best case
// addEdge: O(1)
// removeEdge: O(n)
// forEachNode: O(n)
