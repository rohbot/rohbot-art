
var cnv;
var bg_color;

function setup(){
  cnv = createCanvas(900,380);
  cnv.parent('canvas');
  bg_color = color(20,34,51)
  //rect(100,100,100,100);
}

function draw(){

}

function mouseMoved(){
    background(bg_color);
    ellipse(mouseX, mouseY, 10);
}