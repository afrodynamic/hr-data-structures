window.variant = document.location.search.slice(1);

define([
  'src/' + variant + '/stack.js',
  'src/' + variant + '/queue.js',
  '../lib/jquery/jquery.js'
], function() {
  $(function() {
    $('<h2>The ' + variant + ' pattern</h2>').css({margin: 0}).prependTo(document.body);
  });

  var stackArray = [];
  var numOfStacks = 1000;
  var numOfStackItems = 100;

  $('<h3>Stack</h3>').appendTo(document.body);

  // testing creation of stacks
  $('<p>' + 'creating ' + numOfStacks + ' stacks' + '</p>').appendTo(document.body);
  var startTime = performance.now();
  for (var i = 0; i < numOfStacks; i++) {
    if (variant === 'pseudoclassical' || variant === 'es6') {
      var stack = new Stack();
    } else {
      var stack = Stack();
    }
    stackArray.push(stack);
  }
  var endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing adding items to stacks
  $('<p>' + 'adding ' + numOfStackItems + ' items to ' + numOfStacks + ' stacks' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < stackArray.length; i++) {
    for (var j = 0; j < numOfStackItems; j++) {
      stackArray[i].push(j);
    }
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing getting size of stacks
  $('<p>' + 'getting size of ' + numOfStacks + ' stacks' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < stackArray.length; i++) {
    stackArray[i].size();
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing removing items from stacks
  $('<p>' + 'removing ' + numOfStackItems + ' items from ' + numOfStacks + ' stacks' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < stackArray.length; i++) {
    for (var k = 0; k < numOfStackItems; k++) {
      stackArray[i].pop();
    }
    stackArray[i].size();
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  $('<hr>').appendTo(document.body);

  var queueArray = [];
  var numOfQueues = 1000;
  var numOfQueueItems = 100;

  $('<h3>Queue</h3>').appendTo(document.body);

  // testing creation of queues
  $('<p>' + 'creating ' + numOfQueues + ' queues' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < numOfQueues; i++) {
    if (variant === 'pseudoclassical' || variant === 'es6') {
      var queue = new Queue();
    } else {
      var queue = Queue();
    }
    queueArray.push(queue);
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing adding items to queues
  $('<p>' + 'adding ' + numOfQueueItems + ' items to ' + numOfQueues + ' queues' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < queueArray.length; i++) {
    for (var j = 0; j < numOfQueueItems; j++) {
      queueArray[i].enqueue(j);
    }
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing getting size of queues
  $('<p>' + 'getting size of ' + numOfQueues + ' queues' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < queueArray.length; i++) {
    queueArray[i].size();
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);

  // testing removing items from queues
  $('<p>' + 'removing ' + numOfQueueItems + ' items from ' + numOfQueues + ' queues' + '</p>').appendTo(document.body);
  startTime = performance.now();
  for (var i = 0; i < queueArray.length; i++) {
    for (var k = 0; k < numOfQueueItems; k++) {
      queueArray[i].dequeue();
    }
    queueArray[i].size();
  }
  endTime = performance.now();
  $('<p>' + 'time: ' + (endTime - startTime) + 'ms' + '</p>').appendTo(document.body);
});
