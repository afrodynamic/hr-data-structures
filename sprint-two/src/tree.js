var Tree = function(value) {
  var newTree = {};

  newTree.value = value;

  newTree.parent = null;
  newTree.children = null;

  _.extend(newTree, treeMethods);

  return newTree;
};

var treeMethods = {};

treeMethods.addChild = function(value) {
  var child = Tree(value);

  child.parent = this;

  if (this.children === null) {
    this.children = [child];
  } else {
    this.children.push(child);
  }
};

treeMethods.contains = function(target) {
  var result = false;

  var search = function(node) {
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

treeMethods.removeFromParent = function() {
  var parent = this.parent;
  var index = parent.children.indexOf(this);

  parent.children.splice(index, 1);
  this.parent = null;

  if (parent.children.length === 0) {
    parent.children = null;
  }

  return this;
};

treeMethods.traverse = function(callback) {
  var search = function(node) {
    callback(node.value);

    if (node.children !== null) {
      for (var i = 0; i < node.children.length; i++) {
        search(node.children[i]);
      }
    }
  };

  search(this);
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// addChild: O(1)
// contains: O(n) worst case, O(1) best case
// removeFromParent: O(n)
// traverse: O(n)
