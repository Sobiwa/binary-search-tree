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
    throw new Error('value already in tree');
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
      : this.find(value, pointer.left);
  }

  levelOrder(fn) {
    let queue = [this.root];
    let dequeue = []
    let pointer;
    while (queue.length) {
      pointer = queue.shift();
      if (pointer.left !== null) {
      queue.push(pointer.left);
      }
      if (pointer.right !== null) {
      queue.push(pointer.right);
      }
      if (fn) {
        fn(pointer);
      } else {
        dequeue.push(pointer);
      }
    }
    return fn ? 'process complete' : dequeue;
  }

  inOrder(fn) {
    if (!fn) {
      return inOrderQ(this.root);
    }
    inOrderTraversal(this.root, fn);
  }

  preOrder(fn) {
    if (!fn) {
      return preOrderQ(this.root);
    }
    preOrderTraversal(this.root, fn);
  }

  postOrder(fn) {
    if (!fn) {
      return postOrderQ(this.root);
    }
    postOrderTraversal(this.root, fn);
  }

  height = () => heightArray(this.root).sort((a, b) => b - a)[0];

  depth(node, pointer = this.root, depth = 0) {
    return pointer === null
      ? null
      : node === pointer
      ? depth
      : node.data < pointer.data
      ? this.depth(node, pointer.left, depth + 1)
      : this.depth(node, pointer.right, depth + 1);
  }

  isBalanced() {
    const sortedHeights = heightArray(this.root).sort((a, b) => a - b);
    return sortedHeights[sortedHeights.length - 1] - sortedHeights[0] <= 1;
  }

  reBalance() {
    let array = [];
    this.inOrder((node) => array.push(node.data));
    this.root = buildTree(array);
  }
}

function heightArray(pointer, level = 0) {
  return pointer === null
    ? []
    : pointer.left === null && pointer.right === null
    ? [level]
    : [
        ...heightArray(pointer.left, level + 1),
        ...heightArray(pointer.right, level + 1),
      ];
}

function log(node) {
  console.log(node.data);
}

function inOrderQ(pointer) {
  if (pointer === null) return [];
  array = [...inOrderQ(pointer.left), pointer, ...inOrderQ(pointer.right)];
  return array;
}

function inOrderTraversal(pointer, fn) {
  if (pointer === null) return;
  inOrderTraversal(pointer.left, fn);
  fn(pointer);
  inOrderTraversal(pointer.right, fn);
}

function preOrderQ(pointer) {
  return pointer === null
    ? []
    : [pointer, ...preOrderQ(pointer.left), ...preOrderQ(pointer.right)];
}

function preOrderTraversal(pointer, fn) {
  if (pointer === null) return;
  fn(pointer);
  preOrderTraversal(pointer.left, fn);
  preOrderTraversal(pointer.right, fn);
}

function postOrderQ(pointer) {
  return pointer === null
    ? []
    : [...postOrderQ(pointer.left), ...postOrderQ(pointer.right), pointer];
}

function postOrderTraversal(pointer, fn) {
  if (pointer === null) return;
  postOrderTraversal(pointer.left, fn);
  postOrderTraversal(pointer.right, fn);
  fn(pointer);
}

const theArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const easyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

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

function generateRandomArray(size) {
  array = [];
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }
  return array;
}

function driver(arrayLength) {
  let array = generateRandomArray(arrayLength);
  const tree = new Tree(array);
  console.log('Binary Search Tree created...');
  console.log(tree.isBalanced() ? 'BST is balanced...' : 'Error, BST unbalanced.');
  console.log('Data in level order:')
  tree.levelOrder(node => console.log(node.data));
  console.log('Data in order:')
  tree.inOrder(node => console.log(node.data));
  console.log('Data in preOrder:');
  tree.preOrder(node => console.log(node.data));
  console.log('Data in postOrder:');
  tree.postOrder(node => console.log(node.data));
  console.log('adding "200" to tree...');
  tree.insert(200);
  console.log('adding "300" to tree...')
  tree.insert(300);
  console.log('adding "400" to tree...');
  tree.insert(400);
  console.log(tree.isBalanced() ? 'Error: BST is still balanced' : 'BST is unbalanced, as according to plan...');
  console.log('Re-balancing Tree...');
  tree.reBalance();
  console.log(tree.isBalanced() ? 'BST is once again balanced.' : 'Error: BST is still off balance.')
  console.log('Data in level order:')
  tree.levelOrder(node => console.log(node.data));
  console.log('Data in order:')
  tree.inOrder(node => console.log(node.data));
  console.log('Data in preOrder:');
  tree.preOrder(node => console.log(node.data));
  console.log('Data in postOrder:');
  tree.postOrder(node => console.log(node.data));
}
