describe('doublyLinkedList', function() {
  var doublyLinkedList;

  beforeEach(function() {
    doublyLinkedList = DoublyLinkedList();
  });

  it('should have a head, tail', function() {
    expect(doublyLinkedList).to.have.property('head');
    expect(doublyLinkedList).to.have.property('tail');
  });

  it('should have methods named "addToHead", "addToTail", "removeHead", "removeTail", and "contains"', function () {
    expect(doublyLinkedList.addToHead).to.be.a('function');
    expect(doublyLinkedList.addToTail).to.be.a('function');
    expect(doublyLinkedList.removeHead).to.be.a('function');
    expect(doublyLinkedList.removeTail).to.be.a('function');
    expect(doublyLinkedList.contains).to.be.a('function');
    expect(doublyLinkedList.removeFromParent).to.be.a('function');
  });

  it('should have a .previous property for nodes', function() {
    // test single node = head
    doublyLinkedList.addToHead(5);
    expect(doublyLinkedList.head.previous).to.equal(null);

    // test added adjacent node
    doublyLinkedList.addToHead(4);
    expect(doublyLinkedList.head.next.previous.value).to.equal(4);

    // test added node to tail
    doublyLinkedList.addToTail(6);
    expect(doublyLinkedList.tail.previous.value).to.equal(5);

    // test removed head
    var headChild = doublyLinkedList.head.next;
    doublyLinkedList.removeHead();
    expect(headChild.previous).to.equal(null);
  });

  it('should add a node to the front of the list when addToHead is called', function() {
    // test empty linked list
    doublyLinkedList.addToHead(3);
    expect(doublyLinkedList.head.value).to.equal(3);

    // test single node = head
    doublyLinkedList.addToHead(4);
    expect(doublyLinkedList.head.value).to.equal(4);

    // test multiple node list
    doublyLinkedList.addToHead(5);
    expect(doublyLinkedList.head.value).to.equal(5);
  })

  it('should designate a new tail when new nodes are added', function() {
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.tail.value).to.equal(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.value).to.equal(5);
  });

  it('should remove the head from the list when removeHead is called', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.head.value).to.equal(4);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.head.value).to.equal(5);
  });

  it('should remove the tail from the list when removeTail is called', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.tail.value).to.equal(5);
    doublyLinkedList.removeTail();
    expect(doublyLinkedList.tail.value).to.equal(4);
  });

  it('should return the value of the former head when removeHead is called', function() {
    doublyLinkedList.addToTail(4);
    expect(doublyLinkedList.removeHead()).to.equal(4);
  });

  it('should contain a value that was added', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    expect(doublyLinkedList.contains(4)).to.equal(true);
    expect(doublyLinkedList.contains(5)).to.equal(true);
    expect(doublyLinkedList.contains(6)).to.equal(false);
  });

  it('should not contain a value that was removed', function() {
    doublyLinkedList.addToTail(4);
    doublyLinkedList.addToTail(5);
    doublyLinkedList.removeHead();
    expect(doublyLinkedList.contains(4)).to.equal(false);
  });
});
