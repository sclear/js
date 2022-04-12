// 单链表简单实现
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class SingleList {
  constructor() {
    this.size = 0;
    this.head = new Node("head");
    this.currentNode = "";
  }
  // find Node
  find(item) {
    let current = this.head;
    while (current && current.data !== item) {
      current = current.next;
    }
    return current;
  }
  // find Pre Node
  findPre(item) {
    let preNode = this.head;
    while (preNode.next.data !== item) {
      if (!preNode.next) return;
      preNode = preNode.next;
    }
    return preNode;
  }
  // find last Node
  findLast() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }
  // remove node
  remove(item) {
    // has target
    const removeTarget = this.find(item);
    if (!removeTarget) return;

    // item === head？ clear list
    if (item === "head") {
      this.head.next = null;
      return;
    }

    const preNode = this.findPre(item);
    preNode.next = removeTarget.next;
  }
  // push Node
  push(el) {
    const lastNode = this.findLast();

    lastNode.next = new Node(el);
    this.size++;
  }
  // insert to target
  insert(item, el) {
    // find target
    const itemNode = this.find(item);
    // has target ?
    if (!itemNode) return;
    // new Node
    const newNode = new Node(el);
    // target next => newNode next
    newNode.next = itemNode.next;
    // newNode to target next
    itemNode.next = newNode;
    // size
    this.size++;
  }
  // traverse SingleList
  forEach(callback) {
    let cureent = this.head;
    let index = 0;
    while (cureent.next) {
      cureent = cureent.next;
      callback && callback(cureent, index);
      index++;
    }
  }
  // display single
  display() {
    let result = "head";
    this.forEach((item) => {
      result += ` -> ${item.data}`;
    });
    return result;
  }
  // length
  length() {
    return this.size;
  }
}

const singleList = new SingleList();

singleList.push("123");

singleList.forEach((node, index) => {
  console.log(node);
  console.log(index);
});

singleList.display();
