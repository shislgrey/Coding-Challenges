// Coding Rainbow
// Daniel Shiffman
// http://patreon.com/codingtrain
// Code for: https://youtu.be/fcdNSZ9IzJM

var tree = [];
var leaves = [];
var slider;
var count = 0;

function setup() {
  createCanvas(800, 750);
  slider = createSlider(-5,5,0,0.1)
  var a = createVector(width / 2, height);
  var b = createVector(width / 2, height - 200);
  var root = new Branch(a, b);

  tree[0] = root;
}

function mousePressed() {
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

function draw() {
  background(51);
  speed = slider.value();
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