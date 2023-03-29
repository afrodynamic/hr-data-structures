var Stack = function () {
  this.storage = {};
};

Stack.prototype.push = function (value) {
  var key = this.size();

  this.storage[key] = value;
};

Stack.prototype.pop = function () {
  var lastValue = this.storage[this.size() - 1];

  delete this.storage[this.size() - 1];

  return lastValue;
};

Stack.prototype.size = function () {
  return Object.keys(this.storage).length;
};
