Function.prototype.softBind = function (obj) {
  var fn = this;
  var curried = [].slice.call(arguments, 1);
  var bound = function () {
    return fn.apply(
      !this || this === (window || global) ? obj : this,
      curried.concat.apply(curried, arguments)
    );
  };
  bound.prototype = Object.create(fn.prototype);
  return bound;
};

function foo() {
  console.log("name: " + this.name);
}

var obj = { name: "obj" };
var obj2 = { name: "obj2" };
var obj3 = { name: "obj3" };

var fooOBJ = foo.softBind(obj);

fooOBJ();

obj2.foo = foo.softBind(obj);
obj2.foo();

fooOBJ.call(obj3);

setTimeout(obj2.foo, 10);
