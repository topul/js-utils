class Queue {
  constructor() {
    this.items = []
  }

  enqueue(item) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift()
  }

  isEmpty() {
    return this.items.length === 0
  }

  size() {
    return this.items.length
  }

  peek() {
    return this.items[0]
  }

  toString() {
    return this.items.toString()
  }
}

module.exports = Queue