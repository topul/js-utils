const { v4: uuidv4 } = require('uuid');

class Process {
  statusMapping = {
    pending: "pending",
    running: "running",
    stopped: "stopped",
    suspended: "suspended",
    restarted: "restarted",
  };

  constructor(queue) {
    this.id = uuidv4();
    // 默认状态为pending
    this.status = this.statusMapping.pending;
    // 要拉取的任务列表
    this.queue = queue;
  }

  run() {
    if (
      this.status === this.statusMapping.pending ||
      this.status === this.statusMapping.stopped
    ) {
      this.status = this.statusMapping.running;
      this.loop();
    } else {
      console.log(`Process ${this.id} is already running`);
    }
  }

  stop() {
    if (this.status !== this.statusMapping.stopped) {
      console.log(`Process ${this.id} is stopped`);
      this.status = this.statusMapping.stopped;
    } else {
      console.log(`Process ${this.id} is already stopped`);
    }
  }

  restart() {
    this.stop();
    this.run();
    console.log(`Process ${this.id} is restarted`);
  }

  dequeue() {
    if (this.queue.size() > 0) {
      return this.queue.dequeue();
    }
    return null;
  }

  loop() {
    const task = this.dequeue();
    if (task) {
      console.log(`Process ${this.id} is running task`);
      const taskInstance = task();
      if (taskInstance && typeof taskInstance.then === "function") {
        taskInstance.then(() => {
          this.loop();
        });
      } else {
        this.loop();
      }
    } else {
      console.log(`Process ${this.id} is stopped`);
      this.status = this.statusMapping.stopped;
    }
  }
}

module.exports = Process;
