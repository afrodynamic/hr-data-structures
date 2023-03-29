var Stack = function() {
  var someInstance = {};

  // Use an object with numeric keys to store values
  var storage = {};

  // Implement the methods below
  someInstance.push = function (value) {
    var key = someInstance.size();

    storage[key] = value;
  };

  someInstance.pop = function () {
    var lastValue = storage[someInstance.size() - 1];

    delete storage[someInstance.size() - 1];

    return lastValue;
  };

  someInstance.size = function () {
    return Object.keys(storage).length;
  };

  return someInstance;
};
