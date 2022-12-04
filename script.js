function buildTree(array) {
  const end = array.length - 1;
  if (0 > end) {
    return null;
  }
  const mid = Math.floor(end / 2);
  const node = new Node(
    array[mid],
    buildTree(array.slice(0, mid)),
    buildTree(array.slice(mid + 1))
  );
  return node;
}

function insertRec(value, pointer) {
  if (pointer === null) {
    return new Node(value);
  }
  if (value === pointer.data) {
    return null;
  }
  if (value < pointer.data) {
    pointer.left = insertRec(value, pointer.left);
  } else if (value > pointer.data) {
    pointer.right = insertRec(value, pointer.right);
  }
  return pointer;
}

function minValue(pointer) {
  if (pointer.left === null) {
    return pointer.data;
  }
  return minValue(pointer.left);
}

function deleteRec(value, pointer) {
  if (pointer === null) {
    return pointer;
  }

  if (value < pointer.data) {
    pointer.left = deleteRec(value, pointer.left);
  } else if (value > pointer.data) {
    pointer.right = deleteRec(value, pointer.right);
  } else {
    if (pointer.left === null) {
      return pointer.right;
    } else if (pointer.right === null) {
      return pointer.left;
    }
    pointer.data = minValue(pointer.right);
    pointer.right = deleteRec(pointer.data, pointer.right);
  }

  return pointer;
}

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    const newArray = arr
      .sort((a, b) => a - b)
      .reduce((x, y) => (x.includes(y) ? x : [...x, y]), []);
    this.root = buildTree(newArray);
  }

  insert(value) {
    this.root = insertRec(value, this.root);
  }

  delete(value) {
    this.root = deleteRec(value, this.root);
  }

  find(value, pointer = this.root) {
    return pointer === null
      ? null
      : value === pointer.data
      ? pointer
      : value > pointer.data
      ? this.find(value, pointer.right)
      : this.find(value.pointer.left);
  }
}

const theArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const easyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const tree = new Tree(easyArray);

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};
