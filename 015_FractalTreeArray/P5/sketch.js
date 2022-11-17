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
let leafcolor;
let spring;
let autumn;

function Leaf() {

}


function setup() {
  createCanvas(800, 700);
  slider = createSlider(-5, 5, 0, 0.1)
  button1 = createButton('grow');
  button2 = createButton('reset');
  button1.position(150, 705);
  button1.mousePressed(grow);
  button2.position(200, 705);
  button2.mousePressed(reset);
  spring = color(16, 145, 44, 100);
  autumn = color(112, 27, 6, 100);

}

function grow() {
  count++;
  colorMode(RGB);
  if (count <= 5) {
    for (var i = tree.length - 1; i >= 0; i--) {
      if (!tree[i].finished) {
        tree.push(tree[i].branchA());
        tree.push(tree[i].branchB());
      }
      tree[i].finished = true;
    }
  }


  if (count === 6) {
    for (var i = 0; i < tree.length; i++) {
      if (!tree[i].finished) {
        // TODO: make leaf objects part of tree object
        // or make leaves another type of object posessing a fall() function
        var leaf = tree[i].end.copy();
        leafcolor = spring;
        leaves.push(leaf);
      }
    }
  }
  if (count === 7) {
    leafcolor = lerpColor(spring, autumn, 0.33);
  }
  if (count === 8) {
    leafcolor = lerpColor(spring, autumn, 0.67);
  }
  if (count >= 9) {
    leafcolor = autumn;
  }
  if (count >= 10) {
    for (var i = 0; i < leaves.length; i++) {
      tree[i].fall();
    }
  }
}


function reset() {
  tree = [];
  count = 0;
}

function draw() {
  background(151);
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
    noStroke();
    fill(leafcolor);
    ellipse(leaves[i].x, leaves[i].y, 10, 10);

  }
}

// v/ add breeze effect and leave leaves at the base of the tree
//    take away mouseclick and have tree grow [x] levels in [time increment]
//    when tree reaches max level show leaves
//    .5 sec delay then blow leaves to side and fall and collect
// v/ adjustable sliders for wind direction/force?
//    add fruit in [random level] of tree generation
//    button to shake tree proportional to level and dislodge fruit
//    leaves change color before falling
// v/ reset button OR reset after leaf animation