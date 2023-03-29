var Queue = function () {
  this.storage = {};
};

Queue.prototype.enqueue = function (value) {
  var key = this.size();

  this.storage[key] = value;
};

Queue.prototype.dequeue = function () {
  var firstValue = this.storage[0];

  delete this.storage[0];

  for (var key in this.storage) {
    this.storage[key - 1] = this.storage[key];

    delete this.storage[key];
  }

  return firstValue;
};

Queue.prototype.size = function () {
  return Object.keys(this.storage).length;
};
