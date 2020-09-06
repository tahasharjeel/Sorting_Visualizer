let arr = [];
let marr = [];

let key;
let keyColor;

let w = 5;
let maxHeight = 500;
let arraySize = 300;
let mrrSize = 300;
let scale = 0;

let mSpeed = 1000;

function setSize(s) {

  scale = (300 - s) * 2.4;

  arr = [];
  marr = [];

  for (let i = 0; i < mrrSize; i++) {
    marr[i] = new bar(i);
  }

  for (let i = 0; i < arraySize; i++) {
    arr[i] = new bar(i);
  }

  arraySize = s;
  mrrSize = s;
}


let x = 0;
let y = 0;

let bubbleSort = false;

let qSort = false;

let insertionSort = false;

let mSort = false;

let completed = false;


function reset() {
  bubbleSort = false;
  qSort = false;
  insertionSort = false;
  mSort = false;
  completed = false;
  marr = [];

  for (let i = 0; i < arraySize; i++) {
    marr[i] = new bar(i);
  }

  for (let i = 0; i < arraySize; i++) {
    arr[i] = new bar(i);
  }

  x = 0;
  y = 0;

  loop();
}


function barColor(h) {

  if (h > ((maxHeight / 100) * ((100 / 7) * 6))) {
    let color = "#ff0000";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 5))) {
    let color = "#ffa500";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 4))) {
    let color = "#ffff00";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 3))) {
    let color = "#008000";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 2))) {
    let color = "#0000ff";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 1))) {
    let color = "indigo";
    return color;
  } else if (h > ((maxHeight / 100) * ((100 / 7) * 0))) {
    let color = "#ee82ee";
    return color;
  }
}

function bar(i) {
  this.i = i * w;
  this.j = 0;
  this.w = w;
  this.h = random(maxHeight);
  this.color = barColor(this.h);

  this.show = function() {
    fill(this.color);
    stroke("white");
    rect(this.i + scale, this.j, this.w, this.h);
  }
}

function setup() {
  createCanvas(1500, 500);

  for (let i = 0; i < arraySize; i++) {
    arr[i] = new bar(i);
    marr[i] = new bar(i);
  }

  if (arr.length > 0) {
    key = arr[x + 1].h;
    keyColor = arr[x + 1].color;

  }
}

function draw() {

  background("white");

  let slider = document.getElementById("myRange");
  slider.oninput = function() {
  output.innerHTML = this.value;
  frameRate(parseInt(this.value));
  }

  let sliderSize = document.getElementById("size");
  sliderSize.oninput = function() {
    outputSize.innerHTML = this.value;
    setSize(parseInt(this.value));
  }

if (insertionSort) {
  if (x + 1 < arr.length) {
    if (y >= 0 && arr[y].h <= key) {
      arr[y + 1].color = arr[y].color;
      arr[y + 1].h = arr[y].h;
      y = y - 1;
    } else {
      arr[y + 1].color = keyColor;
      arr[y + 1].h = key;

      if (x + 1 != arr.length - 1) {
        x++;
      }
      keyColor = arr[x + 1].color;
      key = arr[x + 1].h;
      y = x;
    }
  }
}

if (qSort) {
  quickSort(arr, 0, arr.length - 1);
}

if (bubbleSort) {
  if (x < arr.length) {
    if (y < (arr.length - x - 1)) {
      if (arr[y].h < arr[y + 1].h) {
        tempC = arr[y].color;
        temp = arr[y].h;
        arr[y].color = arr[y + 1].color;
        arr[y].h = arr[y + 1].h;
        arr[y + 1].color = tempC;
        arr[y + 1].h = temp;
      }
      y++;
    } else {
      y = 0;
      x++;
    }
  }
}

if (mSort) {
  mergeSort(marr, 0, marr.length - 1);
}

if (mSort) {
  for (let i = 0; i < marr.length; i++) {
    marr[i].show();
  }
} else {
  for (let i = 0; i < arr.length; i++) {
    arr[i].show();
  }
}

}

function quickSort(arr, low, high) {
  if (low < high) {
    let piv = partition(arr, low, high);

    quickSort(arr, low, piv - 1);
    quickSort(arr, piv + 1, high);

  }
}

function partition(arr, low, high) {
  let pivot = arr[high];

  let i = low;
  let j = high - 1;

  while (arr[i].h > pivot.h) {
    i++;
  }

  while (arr[j].h <= pivot.h && j > 0) {
    j--;
  }


  if (i >= j) {
    let tempC = arr[i].color;
    let temp = arr[i].h;
    arr[i].color = pivot.color;
    arr[i].h = pivot.h;
    arr[high].color = tempC;
    arr[high].h = temp;
    return i;
  }

  let tempC = arr[i].color;
  let temp = arr[i].h;
  arr[i].color = arr[j].color;
  arr[i].h = arr[j].h;
  arr[j].color = tempC;
  arr[j].h = temp;
}

function merge(marr, l, m, r) {
  let i, j, k;
  let n1 = m - l + 1;
  let n2 = r - m;

  let left = [n1];
  let leftC = [n1];
  let right = [n2];
  let rightC = [n2];

  for (let i = 0; i < n1; i++) {
    leftC[i] = marr[l + i].color;
    left[i] = marr[l + i].h;
  }

  for (let i = 0; i < n2; i++) {
    rightC[i] = marr[m + i + 1].color;
    right[i] = marr[m + i + 1].h;
  }

  i = 0;
  j = 0;
  k = l;

  while (i < n1 && j < n2) {
    if (left[i] >= right[j]) {
      marr[k].color = leftC[i];
      marr[k].h = left[i];
      i++;
    } else {
      marr[k].color = rightC[j];
      marr[k].h = right[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    marr[k].color = leftC[i];
    marr[k].h = left[i];
    i++;
    k++;
  }

  while (j < n2) {
    marr[k].color = rightC[j];
    marr[k].h = right[j];
    j++;
    k++;
  }

}

async function mergeSort(marr, l, r) {
  if (l < r) {
    let m = floor((l + r) / 2);
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(mergeSort(marr, l, m)), 300)
    });
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(mergeSort(marr, m + 1, r)), 300)
    });
    var promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(merge(marr, l, m, r)), 300)
    });

  }
}

