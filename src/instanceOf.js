function instanceOf(dest, type) {
  if (typeof dest !== "object" || dest === null) return false;
  let prop = Object.getPrototypeOf(dest);
  const prototype = type.prototype;
  while (true) {
    if (prop === null) return false;
    if (prop === prototype) return true;
    prop = Object.getPrototypeOf(prop);
  }
}

function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}
const auto = new Car("Honda", "Accord", 1998);

console.log(instanceOf(auto, Car));
console.log(instanceOf(auto, Object));
console.log(instanceOf(auto, Number));
