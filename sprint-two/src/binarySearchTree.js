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

    if (this.maxDepth() > 2 * this.minDepth()) {
      this.rebalance();
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

  breadthFirstLog: function(callback) {
    var queue = [this];

    while (queue.length > 0) {
      var node = queue.shift();

      callback(node.value);

      if (node.left !== null) {
        queue.push(node.left);
      }

      if (node.right !== null) {
        queue.push(node.right);
      }
    }
  },

  minDepth: function() {
    if (this.left === null && this.right === null) {
      return 1;
    } else if (this.left === null) {
      return 1 + this.right.minDepth();
    } else if (this.right === null) {
      return 1 + this.left.minDepth();
    } else {
      return 1 + Math.min(this.left.minDepth(), this.right.minDepth());
    }
  },

  maxDepth: function() {
    if (this.left === null && this.right === null) {
      return 1;
    } else if (this.left === null) {
      return 1 + this.right.maxDepth();
    } else if (this.right === null) {
      return 1 + this.left.maxDepth();
    } else {
      return 1 + Math.max(this.left.maxDepth(), this.right.maxDepth());
    }
  },

  rebalance: function() {
    var values = [];

    var inOrder = function (node) {
      if (node.left !== null) {
        inOrder(node.left);
      }

      values.push(node.value);

      if (node.right !== null) {
        inOrder(node.right);
      }
    }

    inOrder(this);

    var createTree = function(values) {
      if (values.length === 0) {
        return null;
      }

      var middle = Math.floor(values.length / 2);
      var node = new BinarySearchTree(values[middle]);

      node.left = createTree(values.slice(0, middle));
      node.right = createTree(values.slice(middle + 1));

      return node;
    }

    var newTree = createTree(values);

    this.value = newTree.value;
    this.left = newTree.left;
    this.right = newTree.right;

    return this;
  }
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// insert: O(log n)
// contains: O(log n)
// depthFirstLog: O(n)
