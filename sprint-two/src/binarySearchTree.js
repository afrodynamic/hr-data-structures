var BinarySearchTree = function(value) {
  var tree = {};

  tree.value = value;

  tree.left = null;
  tree.right = null;

  _.extend(tree, binarySearchTreeMethods);

  return tree;
};

var binarySearchTreeMethods = {
  insert: function(value) {
    if (value < this.value) {
      if (this.left === null) {
        this.left = new BinarySearchTree(value);
      } else {
        this.left.insert(value);
      }
    } else if (value > this.value) {
      if (this.right === null) {
        this.right = new BinarySearchTree(value);
      } else {
        this.right.insert(value);
      }
    }
  },

  contains: function(value) {
    if (value === this.value) {
      return true;
    } else if (value < this.value) {
      if (this.left === null) {
        return false;
      } else {
        return this.left.contains(value);
      }
    } else if (value > this.value) {
      if (this.right === null) {
        return false;
      } else {
        return this.right.contains(value);
      }
    }
  },

  depthFirstLog: function(callback) {
    callback(this.value);

    if (this.left !== null) {
      this.left.depthFirstLog(callback);
    }

    if (this.right !== null) {
      this.right.depthFirstLog(callback);
    }
  },
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// insert: O(log n)
// contains: O(log n)
// depthFirstLog: O(n)
