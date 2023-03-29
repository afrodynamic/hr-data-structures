var Queue = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  someInstance.enqueue = function (value) {
    var key = someInstance.size();

    storage[key] = value;
  };

  someInstance.dequeue = function () {
    var firstValue = storage[0];

    delete storage[0];

    for (var key in storage) {
      storage[key - 1] = storage[key];

      delete storage[key];
    }

    return firstValue;
  };

  someInstance.size = function () {
    return Object.keys(storage).length;
  };

  return someInstance;
};
