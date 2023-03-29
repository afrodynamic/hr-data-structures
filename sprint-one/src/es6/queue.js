class Queue {
  constructor() {
    this.storage = {};
  }

  enqueue(value) {
    var key = this.size();

    this.storage[key] = value;
  }

  dequeue() {
    var firstValue = this.storage[0];

    delete this.storage[0];

    for (var key in this.storage) {
      this.storage[key - 1] = this.storage[key];

      delete this.storage[key];
    }

    return firstValue;
  }

  size() {
    return Object.keys(this.storage).length;
  }
}
