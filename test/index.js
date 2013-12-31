var assert = require('assert');
var load = require('../')

var last_msg = undefined;
log = function(msg) {
  last_msg = msg;
}

test('success', function(done) {
  load('test/hello.js', function (err) {
    assert.ifError(err);
    assert.equal(last_msg, 'Hello world');
    last_msg = undefined;
    done();
  })
});

test('no exist', function(done) {
  load('unexistent.js', function (err, legacy) {
    if (!legacy) {
      assert.ok(err);
    }

    var tid = setTimeout(function() {
      done();
    }, 200);

    // some browsers will also throw as well as report erro
    var old = window.onerror;
    window.onerror = function(msg, file, line) {
      if (msg !== 'Error loading script') {
        assert(false);
      }
      window.onerror = old;
      clearTimeout(tid);
      done();
    };
  })
});

test('throw', function(done) {
  var old = window.onerror;
  // silence the script error
  window.onerror = function() {};
  load('test/throw.js', function (err) {
    assert.ifError(err);
    window.onerror = old;
    done();
  })
});

