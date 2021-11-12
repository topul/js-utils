class Task {
  constructor(process, pid) {
    this.process = process
    this.status = 'pending'
    this.pid = pid
  }
}

class TaskQueue {
  constructor(taskList, maxProcess) {
    this.queue = taskList.map((task, i) => new Task(task, i))
    this.maxProcess = maxProcess
    this.processPool = []
    this._interval = null
  }

  runTask = () => {
    const { queue, processPool, maxProcess, _interval } = this
    if (queue.length && processPool.length < maxProcess) {
      const task = queue.shift()
      processPool.push(task)
    }
    processPool.forEach(task => {
      if (task.status === 'pending') {
        task.status = 'running'
        const func = task.process()
        if (func && typeof func.then === 'function') {
          func.then(() => {
            task.status = 'done'
            console.log('🚀 ~ file: Untitled-1 ~ line 34 ~ task.process.then ~ task', task.pid)
            processPool.splice(processPool.indexOf(task), 1)
          })
        } else {
          task.status = 'done'
          processPool.splice(processPool.indexOf(task), 1)
        }
      }
    })

    if (!queue.length) {
      clearInterval(_interval)
    }
  }

  run = () => {
    this._interval = setInterval(this.runTask, 10)
  }
}

const taskList = []

const createProcess = () => {
  return new Promise(resolve => {
    setTimeout(resolve, Math.random() * 1000)
  }).then(() => {
    console.log(`micro`)
  })
}

for (let i = 0; i < 50; i++) {
  taskList.push(createProcess)
}
for (let i = 0; i < 50; i++) {
  taskList.push(() => {
    console.log(`macro-${i}`)
  })
}

const taskQueue = new TaskQueue(taskList, 5)
taskQueue.run()
