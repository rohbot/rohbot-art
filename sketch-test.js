

let START_R = 400;
let x = 0;
let y = 0;

let a;
let b;
let c;

let colours = [];

let deg = -120;

let R3 = Math.sqrt(3);

let THETA = 0.0443823947535;
let R_RATIO = 0.975961064797;

let centre;

let ix = 2.5;
let iy = 2.5;

function setup() {
 createCanvas(windowWidth,windowHeight);
 START_R = width / 1.4;
 r = START_R;
 
 x = width / 2 - (r/2);
 y = height / 2 -(r/2);

 //angleMode(DEGREES);
 //console.log(R3);
  background(50);
  
  //drawSq(x,y, THETA, R_RATIO, r);
  //console.log(R_DATA);
  centre = createVector(width/2, height /2);
}

function drawSq(startX,startY, theta, rRatio, r){
  c = createVector(0,0);
  b = createVector(r,0);
  a = createVector(r/2, r * -Math.sin(4 *PI / 3));
  //r = START_R;
  stroke(200);
  push();
  //console.log(a,b,c);
  translate(startX,startY);
  
  line(a.x, a.y, b.x, b.y);
  line(b.x, b.y, c.x, c.y);
  line(c.x, c.y, a.x, a.y);
  for(var i = 0; i < 80; i++){
  
  rotate(theta);
  r *= rRatio;
  line(0,0, r, 0);
  translate(r,0);
  rotate( 2* PI /3 - 0.006);
  r *= rRatio;
  r *= rRatio;

    line(0,0, r , 0);
    translate(r,0);
    rotate( 2* PI /3 - 0.006);
    line(0,0, r , 0);
     
  }

  pop();
}


function draw() {
  background(50);
  var step = radians(frameCount % 360);
  
  var xStep = width / ix * Math.cos(step) + width / 2;
  var yStep = height / iy * Math.sin(step) + height /2;
  //console.log(step, xStep,yStep );
  ellipse(xStep, yStep, 5, 5);

  var i = int(map(xStep, 0, width, 0, 149));
  var j = int(map(yStep, 0, height, 0, 149));


  var theta = R_DATA[i].theta;
  var ratio = R_DATA[j].ratio;
  
  //console.log(i, theta, j, ratio);
  drawSq(x, y, theta, ratio, START_R);


}

function mouseMoved(){

 //background(50);
  
  ix = map(mouseX, 0, width, 10, 2);
  iy = map(mouseY, 0, height, 10, 2);
  console.log("ix", ix, "iy", iy);
  //var theta = R_DATA[i].theta;
  //var ratio = R_DATA[j].ratio;
  
 // drawSq(x, y, theta, ratio, START_R);

  
 // var data = R_DATA[i];
  //console.log(data);
}
