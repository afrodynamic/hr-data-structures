describe('tree', function() {
  var tree;

  beforeEach(function() {
    tree = Tree();
  });

  it('should have methods named "addChild", "contains", and "traverse", and properties named "value", "parent", and "children"', function() {
    expect(tree.addChild).to.be.a('function');
    expect(tree.contains).to.be.a('function');
    expect(tree.traverse).to.be.a('function');
    expect(tree.hasOwnProperty('value')).to.equal(true);
    expect(tree.hasOwnProperty('parent')).to.equal(true);
    expect(tree.hasOwnProperty('children')).to.equal(true);
  });

  it('should add children to the tree', function() {
    tree.addChild(5);
    expect(tree.children[0].value).to.equal(5);
  });

  it('should return true for a value that the tree contains', function() {
    tree.addChild(5);
    expect(tree.contains(5)).to.equal(true);
  });

  it('should return false for a value that was not added', function() {
    tree.addChild(5);
    expect(tree.contains(6)).to.equal(false);
  });

  it('should be able to add children to a tree\'s child', function() {
    tree.addChild(5);
    tree.children[0].addChild(6);
    expect(tree.children[0].children[0].value).to.equal(6);
  });

  it('should correctly detect nested children', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    expect(tree.contains(7)).to.equal(true);
    expect(tree.contains(8)).to.equal(true);
  });

  it('should correctly remove a node from the parent', function() {
    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.children[0].removeFromParent();
    expect(tree.contains(7)).to.equal(false);
    expect(tree.children[0].value).to.equal(6);
  });

  it('should execute a callback on every value in a tree using "traverse"', function() {
    var array = [];

    var callbackFunc = function(value) {
      array.push(value);
    };

    tree.addChild(5);
    tree.addChild(6);
    tree.children[0].addChild(7);
    tree.children[1].addChild(8);
    tree.traverse(callbackFunc);
    expect(array).to.eql([undefined, 5, 7, 6, 8]);
  });

});
