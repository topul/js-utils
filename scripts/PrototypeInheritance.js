function Foo(name) {
  this.name = name;
}
Foo.prototype.myName = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

// ES5
// Bar.prototype = Object.create(Foo.prototype);

// ES6
Object.setPrototypeOf(Bar.prototype, Foo.prototype);

/**
 * 现在没有Bar.prototype.constructor了
 */

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar("a", "obj a");

console.log(a.myName());
console.log(a.myLabel());
