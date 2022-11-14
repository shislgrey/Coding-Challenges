// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

var tree = [];
var leaves = [];
let slider;
var count = 0;
let button1;
let button2;

function setup() {
  createCanvas(800, 750);
  slider = createSlider(-5,5,0,0.1)
  button1 = createButton('grow');
  button2 = createButton('reset');
  button1.position(0, 800);
  button1.mousePressed(grow);
  button2.position(0, 850);
  button2.mousePressed(reset);
  
}

function grow() {
  for (var i = tree.length - 1; i >= 0; i--) {
    if (!tree[i].finished) {
      tree.push(tree[i].branchA());
      tree.push(tree[i].branchB());
    }
    tree[i].finished = true;
  }
  count++;

  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        var leaf = tree[i].end.copy();
        leaves.push(leaf);
      }
    }
  }
}

function reset() {
  tree = [];
  // tree[0] = root;
  count = 0;
  // tree[i].finished = false;
}

function draw() {
  background(51);
  speed = slider.value();
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 200);
  var root = new Branch(a, b);

  tree[0] = root;
  for (var i = 0; i < tree.length; i++) {
    tree[i].show();
    //tree[i].jitter();
  }

  for (var i = 0; i < leaves.length; i++) {
    fill(255, 0, 100, 100);
    noStroke();
    ellipse(leaves[i].x, leaves[i].y, 8, 8);
    if (leaves[i].y < height) {
      leaves[i].x += random(0, speed);
      leaves[i].y += random(0, 2);
    } else if (leaves[i].y >= height) {
      leaves[i].y = height;
    }
   }
}


// add breeze effect and leave leaves at the base of the tree
// take away mouseclick and have tree grow [x] levels in [time increment]
// when tree reaches max level show leaves
// .5 sec delay then blow leaves to side and fall and collect
// adjustable sliders for wind direction/force?
// add fruit in [random level] of tree generation
// button to shake tree proportional to level and dislodge fruit
// leaves change color before falling
// reset button OR reset after leaf animation