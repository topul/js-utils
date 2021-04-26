Function.prototype.mBind = function (oThis) {
  if (typeof this !== "function") {
    throw new TypeError(
      "Function.prototype.bind - what is trying to be bound is not callable"
    );
  }

  var aArgs = Array.prototype.slice.call(arguments, 1);
  var fToBind = this;
  var fNOP = function () {};
  var fBound = function () {
    return fToBind.apply(
      this instanceof fNOP && oThis ? this : oThis,
      aArgs.concat(Array.prototype.slice.call(arguments))
    );
  };
  fNOP.prototype = this.prototype;
  fBound.prototype = new fNOP();

  return fBound;
};

var obj = {};

function foo(something) {
  this.a = something;
}

var bar = foo.mBind(obj);
bar(1);
console.log(obj.a);
