/**
 * 创建执行单元
 * @param {function} task 任务
 * @param {string|number} pid 任务id
 * @returns
 */
function createUnit(task, pid) {
  return {
    task,
    status: "pending",
    pid,
  };
}

/**
 * 初始化进程池
 * @param {array} taskList 任务列表
 * @param {number} maxTask 最大任务数
 * @returns {array} 进程池
 */
function initProcessPool(taskList, maxTask = 5) {
  const pool = [];
  for (let i = 0; i < maxTask; i++) {
    const task = taskList.shift();
    pool.push(createUnit(task, i));
  }
  return pool;
}

/**
 * 执行任务
 * @param {array} taskList 任务列表
 * @param {number} maxTask 最大任务数
 * @returns object 进程方法
 */
function useQueue(taskList, maxTask = 5) {
  const pool = initProcessPool(taskList, maxTask);
  // 任务执行状态
  const status = {
    pending: "pending",
    running: "running",
    done: "done",
    stopped: "stopped",
    paused: "paused",
  };
  // 当前任务执行状态
  let currentStatus = status.pending;
  const result = [];
  // 循环执行任务
  const loop = () => {
    // 当前任务执行状态
    if (currentStatus === status.stopped) {
      return;
    }
    if (currentStatus !== status.paused) {
      // 当前任务数小于最大任务数
      if (pool.length < maxTask) {
        const task = taskList.shift();
        if (task) {
          const pid = pool.length;
          pool.push(createUnit(task, pid));
        }
      }
      pool.forEach((unit) => {
        if (unit.status === status.pending) {
          unit.status = status.running;
          // 判断任务是否Promise
          const func = unit.task();
          if (func && typeof func.then === "function") {
            func.then((res) => {
              unit.status = status.done;
              result.push(res);
              pool.splice(pool.indexOf(unit), 1);
            });
          } else {
            unit.status = status.done;
            result.push(func);
            pool.splice(pool.indexOf(unit), 1);
          }
        }
      });
    }
    // 当任务列表为空时，停止循环
    if (taskList.length === 0) {
      return;
    }
    // 循环执行任务
    setTimeout(loop, 0);
  };

  return {
    push(task) {
      taskList.push(createUnit(task, taskList.length));
    },
    getQueue() {
      return taskList;
    },
    getPool() {
      return pool;
    },
    getResult() {
      return result;
    },
    start() {
      console.log("任务开始执行，可以通过getPool获取实时状态，通过getQueue获取待执行任务列表")
      currentStatus = status.running;
      loop();
    },
    stop() {
      console.log("任务停止执行，进程池当前状态：", pool);
      currentStatus = "stopped";
    },
    restart() {
      console.log("任务重新执行，进程池当前状态：", pool);
      currentStatus = status.running;
      this.start();
    },
    pause() {
      console.log("任务暂停执行，进程池当前状态：", pool);
      currentStatus = status.paused;
    },
    clear() {
      taskList.length = 0;
      pool.length = 0;
    }
  };
}

const taskList = [];

const task = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random() * 1000);
  }).then(() => {
    console.log(`micro`);
  });
};

for (let i = 0; i < 50; i++) {
  taskList.push(task);
}
for (let i = 0; i < 50; i++) {
  taskList.push(() => {
    console.log(`macro-${i}`);
  });
}

const queue = useQueue(taskList, 5);
queue.start();
setTimeout(() => {
  queue.pause();
  setTimeout(() => {
    queue.restart();

    setTimeout(() => {
      queue.stop();
      console.log(queue.getResult());
    }, 2000);
  }, 5000);
}, 1000);
