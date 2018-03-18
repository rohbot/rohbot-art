
let cnv;
let bg_color;

let numP = 100;
let R = 200;
let maxPoints = 200;
let points = [];
let times = 2;



function setup(){
    cnv = createCanvas(windowWidth,380);
    cnv.parent('canvas');
    bg_color = color(20,34,51);
    dr();
}   

function draw(){

}

function dr(){
  
  //numP = sliderP.value();
  //times = sliderT.value();
  background(bg_color);
  //text(numP, 150, 25);
  //text(times, 150, 65);

    var phi = (2 * PI) / numP ;
    //console.log(phi);
  for (let i = 0; i < numP; i++) {
    //console.log(phi * i);
    let x = R * cos(phi * i) + (width / 2);
    let y = R * sin(phi * i)  + (height / 2);
    points[i] = createVector(x, y);
     //console.log(points[i]);
    //ellipse(x,y, 2,2);
  }
  stroke(110);
  for (let i = 0; i < numP; i++) {
    let p2 = (i * times) % numP;
    line(points[i].x, points[i].y, points[p2].x, points[p2].y);
    //console.log(p2);
  }
  
}  


function mouseMoved(){
    times = int(map(mouseX, 0, width, 1, 20));
    numP = int(map(mouseY, 0, height, 1, 200));

    dr();
    return false;

  
}