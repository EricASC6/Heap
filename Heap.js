const swap = function(data, i, j) {
  let a = data[j];
  data[j] = data[i];
  data[i] = a;
};

const siftUp = function(data, node, i) {
  let parent = Math.floor((i - 1) / 2);
  if (parent < 0) return;

  if (data[parent] < node) {
    swap(data, parent, i);

    i = parent;

    siftUp(data, node, i);
  }
};

const siftDown = function(data, parent, i) {
  let size = data.length - 1;
  if (2 * i + 1 > size) return;

  let left = 2 * i + 1;
  let right = 2 * i + 2;
  let largestChild = right <= size && data[right] > data[left] ? right : left;

  if (data[largestChild] > parent) {
    swap(data, i, largestChild);
    i = largestChild;

    siftDown(data, parent, i);
  }
};

const Heap = {
  createHeap: function(data) {
    let heap = [];
    for (let i = 0; i < data.length; i++) {
      let node = data[i];
      heap.push(node);
      siftUp(heap, node, i);
    }

    return heap;
  },

  delete: function(data) {
    let lastNode = data.pop();
    let root = data[0];

    data[0] = lastNode;
    this.heapify(data);

    return root;
  },

  heapify: function(data) {
    let size = data.length - 1;
    let parent = Math.floor((size - 1) / 2);
    for (let i = parent; i >= 0; i--) {
      siftDown(data, data[i], i);
    }

    return data;
  },

  heapSort: function(data) {
    data = this.heapify(data);
    let sortedArr = [];
    while (data.length > 0) {
      if (data.length === 1) {
        sortedArr.unshift(data.pop());
      } else {
        let lastNum = data.pop();
        sortedArr.unshift(data[0]);
        data[0] = lastNum;
        this.heapify(data);
      }
    }

    return sortedArr;
  },

  isHeap: function(data) {
    let size = data.length - 1;
    let node = Math.floor((size - 1) / 2);

    while (node >= 0) {
      let l = node * 2 + 1;
      let r = node * 2 + 2 <= size ? node * 2 + 2 : node * 2 + 1;

      if (data[node] < data[l] || data[node] < data[r]) {
        return false;
      }

      node--;
    }

    return true;
  }
};
