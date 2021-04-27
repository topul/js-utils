/**
 * 寄生继承
 */
function Vehicle() {
  this.engines = 1;
}
Vehicle.prototype.ignition = function () {
  console.log("Turning on my engine.");
};
Vehicle.prototype.drive = function () {
  this.ignition();
  console.log("Steering and moving forward!");
};

// 寄生类
function Car() {
  // 首先，car是一个vehicle
  var car = new Vehicle();

  // 对car进行定制
  car.wheels = 4;

  // 保存特殊引用
  var vehDrive = car.drive;

  // 重写drive
  car.drive = function () {
    vehDrive.call(this);
    console.log("Rolling on all " + this.wheels + " wheels!");
  };

  return car;
}

var myCar = new Car();
myCar.drive();
