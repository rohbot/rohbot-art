let numP = 100;
let R = 200;
let maxPoints = 200;
let points = [];
let times = 1;

let sliderP, sliderT;

function setup() {

  createCanvas(720,480);

  R = 200;
  
  sliderP = createSlider(10,300,50,10);  

  sliderT = createSlider(2,100,2,1);  
  
  sliderP.position(10, 10);
  sliderT.position(10, 50);


  dr();
  
}

function dr(){
  
  numP = sliderP.value();
  times = sliderT.value();
  background(255);
  text(numP, 150, 25);
  text(times, 150, 65);

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
  
  for (let i = 0; i < numP; i++) {
  	let p2 = (i * times) % numP;
    line(points[i].x, points[i].y, points[p2].x, points[p2].y);
    //console.log(p2);
  }
  
}  

function mousePressed(){
  //times++;
  dr();
  
  
}

function mouseMoved(){
	//ellipse(mouseX, mouseY, 5, 5);
	//times = int(map(mouseX, 0, width, 0, 50));
  //numP = int(map(mouseY, 0, height, 0, 200));
  
	//dr();
  // prevent default
  return false;

}  

function keyPressed(){
	//console.log(value);
  //numP = 10;
  dr();
}  

function draw() {
  dr();
  //background(220);
}