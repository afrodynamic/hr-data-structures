var HashTable = function() {
  this._limit = 8;
  this._storage = LimitedArray(this._limit);
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
    }
  }

  return undefined;
};



/*
 * Complexity: What is the time complexity of the above functions?
 */
// insert: O(n) worst case, O(1) best case,
// retrieve: O(n) worst case,  O(1) best case
// remove: O(n) worst case, O(1) best case


