var DoublyLinkedList = function() {
  var list = {};

  list.head = null;
  list.tail = null;

  list.addToHead = function(value) {
    var node = Node(value);

    if (list.head === null) {
      list.head = node;
      list.tail = node;
    } else {
      list.head.previous = node;
      node.next = list.head;
    }

    list.head = node;
  };

  list.addToTail = function(value) {
    var node = Node(value);

    if (list.head === null) {
      list.head = node;
      list.parent = node;
    } else {
      list.tail.next = node;
      node.previous = list.tail;
    }

    list.tail = node;
  };

  list.removeHead = function() {
    var result = list.head.value;

    list.head = list.head.next;

    if (list.head !== null) {
      list.head.previous = null;
    }

    if (list.head === null) {
      list.tail = null;
    }

    return result;
  };

  list.removeTail = function() {
    var result = list.tail.value;

    list.tail = list.tail.previous;

    return result;
  };

  list.contains = function(target) {
    var node = list.head;

    while (node !== null) {
      if (node.value === target) {
        return true;
      }

      node = node.next;
    }

    return false;
  };

  list.removeFromParent = function(target) {
    var node = list.head;

    while (node !== null) {
      if (node.value === target) {
        if (node.previous === null) {
          list.head = node.next;
          list.head.previous = null;
        } else if (node.next === null) {
          list.tail = node.previous;
          list.tail.next = null;
        } else {
          node.previous.next = node.next;
          node.next.previous = node.previous;
        }
      }

      node = node.next;
    }
  };

  return list;
};

var Node = function(value) {
  var node = {};

  node.value = value;
  node.next = null;
  node.previous = null;

  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// addToHead: O(1)
// addToTail: O(1)
// removeHead: O(1)
// contains: O(n) worst case, O(1) best case
