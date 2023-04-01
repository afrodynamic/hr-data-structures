describe('bloomFilter', function() {
  var bloomFilter;

  beforeEach(function() {
    var m = 18;
    var k = 3;
    bloomFilter = new BloomFilter(m, k);
  });

  it('should have methods named "hash", "add", and "check"', function () {
    expect(bloomFilter.hash).to.be.a('function');
    expect(bloomFilter.add).to.be.a('function');
    expect(bloomFilter.check).to.be.a('function');
  });

  it('should have a working "hash" method', function () {
    var hash = bloomFilter.hash('hello');
    expect(hash).to.be.a('number');
    expect(hash).to.be.within(0, 1000);
  });

  it('should have a working "add" method', function () {
    bloomFilter.add('hello');
    expect(bloomFilter.check('hello')).to.equal(true);
  });

  it('should have a working "check" method', function () {
    bloomFilter.add('hello');
    expect(bloomFilter.check('hello')).to.equal(true);
    expect(bloomFilter.check('world')).to.equal(false);
  });

  it('should match approximate rate of false positives', function() {
    var falsePositives = 0;
    var numberOfTests = 10000;

    var m = 18;
    var k = 3;
    // calculate false positive as the general approximation, (1 - e^(-k * n / m))^k
    var falsePositiveRate = Math.pow(1 - Math.exp(-k * numberOfTests / m), k);

    for (var i = 0; i < numberOfTests; i++) {
      bloomFilter.add(i);

      if (bloomFilter.check(i)) {
        falsePositives++;
      }
    }

    var actualFalsePositiveRate = falsePositives / numberOfTests;
    expect(actualFalsePositiveRate).to.be.within(falsePositiveRate - 0.01, falsePositiveRate + 0.01);
  });
});
