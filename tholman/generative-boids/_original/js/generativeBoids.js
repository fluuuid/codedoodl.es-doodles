BRUSH_SIZE = 1;
BRUSH_PRESSURE = 1;
COLOR = [0, 0, 0];
BACKGROUND_COLOR = [250, 250, 250];

// shim layer with setTimeout fallback
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Boids(){


	//Prepare canvas
	var width = window.innerWidth,
		height = window.innerHeight,
		timerID = 0,
		canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d');
		
	canvas.width = width;
	canvas.height = height;
	
	speed = 10;     //Boid speeds
	sight = 50;  //How close a boid needs to be to react to its neighbour.
	seperationDistance = 12;  //How far boids sit from each other
	this.shareBrush = true; //Should boids have their own brush, or share one (each provide different effects)

	brushes = ['web', 'sketchy', 'chrome', 'shaded', 'fur'];
	
	this.size = 8;
	this.alignment = 500;
	
	var boids = [];
	var totalBoids = 30;
	var brushName = 'shaded';
	
	var _this = this;
	
	this.init = function(){
		
		
		clearCanvas();
		createBoids();
		
		setBrushFromString();
		
		// Delegate events
		canvas.onclick = function() {
			onClick();
		}

		//Initiate the main loop
		loop();
	}

	var createBoids = function() {

		boids = [];
		for (var i = 0; i < totalBoids; i++) {
		
			//Create boids
			boids.push({
				x: Math.random() * width,
				y: Math.random() * height,
				
				//Random start direction
				v: {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1
				},
				b: null
			});
		}

	}
	
	//Loops and updates!
	var loop = function() {

	    requestAnimationFrame(loop);
	    update();
	}

	var onClick = function() {
		randomizeProperties();
		clearCanvas();
		createBoids();
		setBrushFromString();
	}

	var randomizeProperties = function() {

		boids = [];

		totalBoids = 10 + ( Math.floor( Math.random() * 50 ) );
		speed = 6 + ( Math.floor( Math.random() * 20 ) );
		sight = 40 + ( Math.floor( Math.random() * 50 ) );
		seperationDistance = 15 + ( Math.floor( Math.random() * 50 ) );

		brushName = brushes[ Math.floor( Math.random() * brushes.length ) ];

		console.log( brushName );

	}

	
	var calculateDistance = function(v1, v2){
		x = Math.abs(v1.x - v2.x);
		y = Math.abs(v1.y - v2.y);
		
		return Math.sqrt((x * x) + (y * y));
	}
	
	//Allows boids to go through walls to the other side of the canvas
	var checkWallCollisions = function(index){
		if (boids[index].x > width) {
			boids[index].x = 0;
		}
		else 
			if (boids[index].x < 0) {
				boids[index].x = width;
			}
		
		if (boids[index].y > height) {
			boids[index].y = 0;
		}
		else 
			if (boids[index].y < 0) {
				boids[index].y = height;
			}
	}
	
	//Add forces to boids and then normalize
	var addForce = function(index, force){
	
		boids[index].v.x += force.x;
		boids[index].v.y += force.y;
		
		magnitude = calculateDistance({
			x: 0,
			y: 0
		}, {
			x: boids[index].v.x,
			y: boids[index].v.y
		});
		
		boids[index].v.x = boids[index].v.x / magnitude;
		boids[index].v.y = boids[index].v.y / magnitude;
	}
	
	//Calculates and applys forces to boids
	//Seperation, allignment and cohesion are grouped to save calulation time
	var applyForces = function(index){
		percievedCenter = {
			x: 0,
			y: 0
		};
		flockCenter = {
			x: 0,
			y: 0
		};
		percievedVelocity = {
			x: 0,
			y: 0
		};
		count = 0;
		for (var i = 0; i < boids.length; i++) {
			
			if (i != index) {
			
				//Allignment
				dist = calculateDistance(boids[index], boids[i]);
				
				//If another boid is within its sight (influence distance)
				if (dist > 0 && dist < sight) {
					count++;
					
					//Alignment
					percievedCenter.x += boids[i].x;
					percievedCenter.y += boids[i].y;
					
					//Cohesion
					percievedVelocity.x += boids[i].v.x;
					percievedVelocity.y += boids[i].v.y;
					
					//Seperation
					if (calculateDistance(boids[i], boids[index]) < seperationDistance) {
						flockCenter.x -= (boids[i].x - boids[index].x);
						flockCenter.y -= (boids[i].y - boids[index].y);
					}
				}
			}
		}
		if (count > 0) {
			percievedCenter.x = percievedCenter.x / count;
			percievedCenter.y = percievedCenter.y / count;
			
			percievedCenter.x = (percievedCenter.x - boids[index].x) / _this.alignment;
			percievedCenter.y = (percievedCenter.y - boids[index].y) / _this.alignment;
			
			percievedVelocity.x = percievedVelocity.x / count;
			percievedVelocity.y = percievedVelocity.y / count;
			
			flockCenter.x /= count;
			flockCenter.y /= count;
		}
		
		addForce(index, percievedCenter);
		
		addForce(index, percievedVelocity);
		
		addForce(index, flockCenter);
	}
	
	var setBrushFromString = function(){
		//Set global brush
		brush = eval("new " + brushName + "(context)");
		
		//Set boid single brushes
		for (var i = 0; i < boids.length; i++) {
			boids[i].b = eval("new " + brushName + "(context)");
		}
	}
	
	var update = function(){
		
		for (var i = 0; i < boids.length; i++) {
		
			
			//Draw using global brush, or boid specifics
			if (_this.shareBrush){
				brush.strokeStart(boids[i].x, boids[i].y);
			} else {		
				boids[i].b.strokeStart(boids[i].x, boids[i].y);
			}
					
			boids[i].x += boids[i].v.x * speed;
			boids[i].y += boids[i].v.y * speed;
			applyForces(i);
			
			//Stroke using global brush, or boid specifics
			if (_this.shareBrush){
				brush.stroke(boids[i].x, boids[i].y);
			} else {		
				boids[i].b.stroke(boids[i].x, boids[i].y);
			}
			
			
			checkWallCollisions(i);			
		}
	}
	
	//Gui uses this to clear the canvas
	var clearCanvas = function(){
		  context.fillStyle = '#ffffff';
		  context.beginPath();
		  context.rect(0, 0, width, height);
		  context.closePath();
		  context.fill();
	}
	
	//Clear the canvas and reset the brush
	 this.clear = function(){
		//Reset brushes
		setBrushFromString();
		clearCanvas();
	}
	
	this.save = function(){
		var image = canvas.toDataURL('image/png');
		window.open(image ,'mywindow');
	}
}