var Stack = function () {
  var someInstance = {};

  someInstance.storage = {};

  _.extend(someInstance, stackMethods);

  return someInstance;
};

var stackMethods = {
  push: function (value) {
    var key = this.size();

    this.storage[key] = value;
  },

  pop: function () {
    var lastValue = this.storage[this.size() - 1];

    delete this.storage[this.size() - 1];

    return lastValue;
  },

  size: function () {
    return Object.keys(this.storage).length;
  },
};
