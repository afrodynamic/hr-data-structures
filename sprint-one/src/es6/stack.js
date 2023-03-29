class Stack {
  constructor() {
    this.storage = {};
  }

  push(value) {
    var key = this.size();

    this.storage[key] = value;
  }

  pop() {
    var lastValue = this.storage[this.size() - 1];

    delete this.storage[this.size() - 1];

    return lastValue;
  }

  size() {
    return Object.keys(this.storage).length;
  }
}
