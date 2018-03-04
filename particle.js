function Particle(x,y){
	this.pos = createVector(x,y);
	this.vel = createVector();
	this.acc = createVector();
	this.r = 4;
	this.vel_limit = 5;

	this.update = function(){
		this.vel.add(this.acc);
	    this.vel.limit(this.vel_limit);
   		this.pos.add(this.vel);
   		this.acc.mult(0);

	}

	this.show = function(){
		
		var angle = this.vel.heading() + PI / 2;

	    push();
	    translate(this.pos.x, this.pos.y);
	    rotate(angle);

	   	var col = (210);
	    fill(col);
	    stroke(col);
	    strokeWeight(1);
	    beginShape();
	    vertex(0, -this.r * 2);
	    vertex(-this.r, this.r * 2);
	    vertex(this.r, this.r * 2);
	    endShape(CLOSE);

	    pop();
		//point(this.pos.x, this.pos.y);
	}

	this.attract = function(target){

	    let force = p5.Vector.sub(target, this.pos);
	    let d = force.mag();
	    d = constrain(d, 1, 10);
	    this.vel_limit = d;
	    let G = 500;
	    let strength = G / (d * d);
	    force.setMag(strength);
	    if (d < 5) {
	
	      force.add(p5.Vector.random2D().mult(random(99)));
	      force.mult(-10);
	      this.vel_limit = random(10);
	      this.acc.add(force);
	      		
	      return true;
	      //this.scatter();
	    }
	    this.acc.add(force);
	    return false;
	}

	this.scatter = function(){
		var rando = p5.Vector.random2D();
		rando.mult(99);
		this.acc.add(rando);
		this.vel_limit = random(100);
		//this.acc.mult(9999);

	}

}