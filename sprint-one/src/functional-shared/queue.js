var Queue = function () {
  var someInstance = {};

  someInstance.storage = {};

  _.extend(someInstance, queueMethods);

  return someInstance;
};

var queueMethods = {
  enqueue: function (value) {
    var key = this.size();

    this.storage[key] = value;
  },

  dequeue: function () {
    var firstValue = this.storage[0];

    delete this.storage[0];

    for (var key in this.storage) {
      this.storage[key - 1] = this.storage[key];

      delete this.storage[key];
    }

    return firstValue;
  },

  size: function () {
    return Object.keys(this.storage).length;
  },
};
