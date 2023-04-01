var BloomFilter = function(m, k) {
  // initialize size of bit array, m
  this._m = m || 18;

  // initialize number of hash functions to use, k
  this._k = k || 3;

  // create a bit array of size m
  var bitArrayBuffer = new ArrayBuffer(m);
  this.bitArray = new Uint8Array(bitArrayBuffer);
};

BloomFilter.prototype.hash = function(value) {
  var hash = 0;

  for (var i = 0; i < value.length; i++) {
    hash = (hash << 5) + hash + value.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }

  return hash % this._m;
}

BloomFilter.prototype.add = function(value) {
  for (var i = 0; i < this._k; i++) {
    var hashValue = this.hash(value + i);
    this.bitArray[hashValue] = 1;
  }
}

BloomFilter.prototype.check = function(value) {
  for (var i = 0; i < this._k; i++) {
    var hashValue = this.hash(value + i);
    if (this.bitArray[hashValue] === 0) {
      return false;
    }
  }

  return true;
}
