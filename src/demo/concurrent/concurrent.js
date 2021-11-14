const Process = require("./process");
const Queue = require("../../queue");

// 生成100条Promise任务函数
var tasks = [];
for (let i = 0; i < 100; i++) {
  tasks.push(function () {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        console.log("task " + i);
        resolve(i);
      }, Math.random() * 1000);
    });
  });
}

// 任务加入队列
var queue = new Queue();
for (var i = 0; i < tasks.length; i++) {
  queue.enqueue(tasks[i]);
}

console.log(queue.size());

// 实例化5个进程
var processes = [];
for (var i = 0; i < 5; i++) {
  processes.push(new Process(queue));
}

// 启动进程执行任务
for (var i = 0; i < processes.length; i++) {
  processes[i].run();
}
