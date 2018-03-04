let attractors = [];
let particles = [];
let num_p = 100;
let atr_max = 1;


var attackLevel = 1.0;

var releaseLevel = 0;
var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

var last_touched = 0;

var fs = false;

function Sound(key,freq, box){
  this._freq = freq;
  this._key = key;
  this.box = box;
  this.env = new p5.Env();
  this.env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  this.env.setRange(attackLevel, releaseLevel);
  this.osc = new p5.Oscillator('triangle');
  this.osc.amp(this.env); // set amplitude
  this.osc.freq(this._freq); // set frequency
  this.osc.start(); // start oscillating

  this.check_key = function(msg){
    var key = msg[0];
    if(key == this._key){
      this.env.play();
    }
  };

  this.play = function(){
    this.env.play();
  };

}

var selected_box = -1;

let sounds = [];
let keys = ['q', 'w','e','r','t','y','u','i','o','p',
            'a','s','d','f','g','h','j','k','l',
            'z','x','c','v','b','n','m'];

let key_data = [];
for(var i = 0; i < keys.length; i++){
  var key = keys[i];//String.fromCharCode(97+i);
  var freq = 440 * Math.pow(1.059463,i-12);
  key_data.push({'key': key, 'freq': freq});
}
console.log(key_data);
var num_keys = key_data.length;

var socket;

let boxes = [];

var cnv;
function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.touchEnded(nextPoint);
  attractors.push(createVector(width/2, height/2));

  for(let i = 0; i < num_p; i++){
    particles.push(new Particle(random(width),random(height)));
  
  }

  for(var x = 0; x < num_keys; x++){
    var box = {'start': {'x':(width / num_keys) * x,'y':0}, 
                'end': { 'x':(width / num_keys) * (x +1),'y': height }
              };
    boxes.push(box);
  }



  for(var i = 0; i < key_data.length; i++){
    var key = key_data[i].key;
    var freq = key_data[i].freq;
    console.log(key, freq);
    sounds.push(new Sound(key, freq, boxes[i]));
  }

  //last_touched = millis();
  socket = io();

  socket.on('singing-things', function(msg){
    console.log(msg);
    scatter();
    var key = msg[0];
      sounds.forEach(function(sound) {
        sound.check_key(key);
    });
    last_touched = millis();  

  }); 
  
  

}
function windowResized() {
  cnv = resizeCanvas(windowWidth, windowHeight);

}

document.ontouchmove = function(event) {
    event.preventDefault();
};
function touchStarted(){
  var fs = fullscreen();
  if (!fs) {
    fullscreen(true);
  }
}


function drawText(){
  textSize(40);
  fill(200);
  stroke(200);
  textAlign(CENTER);
  var x = width / 2;
  var y = height /2;
  var gap = 80;
  text('merekabot', x, y );
  // text('Machine Learning', x, y); 
  // text('IoT', x, y  + gap); 
  // text('Data Analytics', x, y + (gap * 2)); 
  // text('Electronics', x, y + (gap * 3)); 
  // text('Wireless Electricity', x, y + (gap * 4)); 
  // text('Industry 4.0', x, y + (gap * 5));
  // text('Automation', x, y + (gap * 6));
}


function keyPressed(){
  socket.emit('singing-things', key.toLowerCase());
  key = key.toLowerCase();
  //console.log(keyCode);
  console.log(key);
  sounds.forEach(function(sound) {
      sound.check_key(key);
  });

  scatter();  
  last_touched = millis();
}

function nextPoint(){
   scatter();
   attractors[0].x = random(width);
   attractors[0].y = random(height);
   
}

function scatter(){
  // attractors.push(createVector(random(width),random(height)));  
  // if(attractors.length > atr_max){
  //   attractors.splice(0, 1);
  // }
  
  for(let i = 0; i < num_p; i++){
      particles[i].scatter();
      particles[i].update();
      particles[i].show();
    }

}

function boxCheck(x,y){
  for(var i = 0; i < boxes.length; i++){
    var box = boxes[i];
    var startX = box.start.x;
    var endX = box.end.x;
   
    if(x > startX && x < endX ){

      if(selected_box != i){
        sounds[i].play();
        selected_box = i;
        console.log(i, x,y, startX, endX );
        //rect(startX, startY, width/4, height/2);
        //scatter();
      }
    
    }
  }
}


function mouseMoved(){
  
  
  boxCheck(mouseX, mouseY);

  attractors[0].x = mouseX;
  attractors[0].y = mouseY;
  last_touched = millis();
  //scatter();
} 

function drawTouches(){
  noStroke();
  fill(255, 192);
  
  for (var i = 0; i < touches.length; i++) {
    ellipse(touches[i].x, touches[i].y,
      10+sin(i+frameCount*0.1)*5,
      10+sin(i+frameCount*0.1)*5);
    attractors[0].x = touches[i].x;
    attractors[0].y = touches[i].y;
    boxCheck(attractors[0].x, attractors[0].y);
    last_touched = millis();
    //scatter();

  }

} 


function mousePressed() {
  //attractors.push(createVector(mouseX, mouseY));
  //scatter(); 
  if(!fs){
    fs = fullscreen()
    //alert('fullscreen');
  }
  
}

function draw() {
  background(51);

  if(touches.length > 0){
    drawTouches();
  }

  stroke(255);
  strokeWeight(4);
    stroke(0, 255, 0);

    
  
  for(let i = 0; i < attractors.length; i++){
    point(attractors[i].x, attractors[i].y);

  }
  var hit_count = 0;
  for(let i = 0; i < num_p; i++){
    for(let j = 0; j < attractors.length; j++){
      if(particles[i].attract(attractors[j])){
        hit_count++;
      }  
    } 
    particles[i].update();


    particles[i].show();
  }
  if(hit_count > 10){
    if(millis() - last_touched > 5000){
      boxCheck(attractors[0].x, attractors[0].y);  
    } 
    
    nextPoint();
  }

  drawText();


}
