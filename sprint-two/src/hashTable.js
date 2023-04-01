var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
  this._size = 0;
};

HashTable.prototype.insert = function(k, v) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  if (bucket === undefined) {
    bucket = [];
    this._storage.set(index, bucket);
  }

  var found = false;

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];

    if (tuple[0] === k) {
      tuple[1] = v;
      found = true;
    }
  }

  if (!found) {
    bucket.push([k, v]);

    this._size++;
  }

  if (this.needsResize()) {
    var size = this._size;

    this.resize();

    this._size = size;
  }
};

HashTable.prototype.retrieve = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  if (bucket === undefined) {
    return undefined;
  }

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];

    if (tuple[0] === k) {
      return tuple[1];
    }
  }

  return undefined;
};

HashTable.prototype.remove = function(k) {
  var index = getIndexBelowMaxForKey(k, this._limit);
  var bucket = this._storage.get(index);

  if (bucket === undefined) {
    return undefined;
  }

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i];

    if (tuple[0] === k) {
      bucket.splice(i, 1);

      this._size--;
    }
  }

  if (this.needsResize()) {
    this.resize();
  }

  return undefined;
};

HashTable.prototype.resize = function() {
  var newLimit = this._limit;

  if (this._size / this._limit < 0.25) {
    newLimit = Math.floor(this._limit / 2);
  } else if (this._size / this._limit > 0.75) {
    newLimit = this._limit * 2;
  }

  if (newLimit === this._limit) {
    return;
  }

  var oldStorage = this._storage;
  this._limit = newLimit;
  this._storage = LimitedArray(this._limit);

  var self = this;

  oldStorage.each(function(bucket) {
    if (bucket !== undefined) {
      for (var i = 0; i < bucket.length; i++) {
        var tuple = bucket[i];

        self.insert(tuple[0], tuple[1]);
      }
    }
  });
};

HashTable.prototype.needsResize = function() {
  return this._size / this._limit > 0.75 || this._size / this._limit < 0.25;
};

/*
 * Complexity: What is the time complexity of the above functions?
 */
// insert: O(n) worst case, O(1) best case,
// retrieve: O(n) worst case,  O(1) best case
// remove: O(n) worst case, O(1) best case
// resize: O(n)
// needsResize: O(1)
