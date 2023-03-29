var Tree = function(value) {
  var newTree = {};

  newTree.value = value;

  newTree.children = null;

  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);

  if (this.children === null) {
    this.children = [];
  }

  this.children.push(child);
};

treeMethods.contains = function(target) {
  var result = false;

  var search = function (node) {
    if (node.value === target) {
      result = true;
    } else if (node.children !== null) {
      for (var i = 0; i < node.children.length; i++) {
        search(node.children[i]);
      }
    }
  };

  search(this);

  return result;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// addChild: O(1)
// contains: O(n) worst case, O(1) best case
