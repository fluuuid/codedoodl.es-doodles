

			var mouseX = 100, mouseY = 100,

			windowHalfX = window.innerWidth / 2,
			windowHalfY = window.innerHeight / 2,

			SEPARATION = 200,
			AMOUNTX = 10,
			AMOUNTY = 10,

			camera, light, scene, renderer, particle, lines, line, asteroides, shape, darkMaterial;

			scene = new THREE.Scene();

			var body = document.getElementById("body");
			var keyboard= new THREEx.KeyboardState();

			init();
			animate();

			function init() {

				var container, separation = 1000, amountX = 500, amountY = 500,
				particles;

				// Main color, base of each material's color shade 

				// It's not dynamic yet, each material is different (darkMaterial, lineMaterial) so 
				// the sript should re-load each material when changing the main color values
				// didn't find a solution yet.
				// Though, the scene's light color can change shades' perception, so i used it.
				// -Fred

				/* Red and purple
				red:233 green:37 blue:81

				Red-orange dark
				red:183 green:0 blue:12

				Red-orange ocre
				red:158 green:1 blue:16

				green fluo - blue
				red:11 green:205 blue:132 

				dark purple
				red:58 green:54 blue:215 */

				randomRed = 253;
				randomGreen = 37;
				randomBlue = 81;

				/* Real random (ugly)
				randomRed = getRandomInt(0, 255);
				randomGreen = getRandomInt(0, 255);
				randomBlue = getRandomInt(0, 255); */

				container = document.createElement('div');
				document.body.appendChild(container);

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );


				renderer = new THREE.CanvasRenderer({ alpha: true, antialias: false });
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );


				window.addEventListener( 'resize', onWindowResize, false );

				light = new THREE.AmbientLight( 0x0000ff );
				scene.add( light );


				camera.position.z = 0;
				camera.position.y = 0;


				// Shapes and objects ---------------------------------------------------

				// pyramid geometry, used everywhere
				var geometry =  new THREE.TetrahedronGeometry( 2, 0 );
		        //geometry.colorsNeedUpdate = true;

		        // Asteroids, particles ---------------------------------------
		        asteroides = new THREE.Object3D();
		        scene.add( asteroides );

				shapes = [];

		        wireframeMaterial = new THREE.MeshLambertMaterial( { 
		        	color: 0xffffff, 
		        	wireframe: true, 
		        	transparent: true, 
		        	opacity: 0.1 
		        } );

		        for ( var i = 0; i < 500; i ++ ) {
					var re = getRandomInt(0, randomRed);
					var gr = getRandomInt(0, randomGreen);
					var bl = getRandomInt(0, randomBlue);
					var resultColor = rgbToHex(re, gr, bl);
					var color = new THREE.Color( resultColor );
					darkMaterial = new THREE.MeshBasicMaterial( { color: color, wireframe: true, transparent: true, opacity: 0.4} );
					multiMaterial = [ darkMaterial, wireframeMaterial ];
		           // tetrahedron
		        	shape = THREE.SceneUtils.createMultiMaterialObject( geometry, multiMaterial );
		        	if(i<=125){
		          		shape.position.x = Math.random()*1000 - 500;
		          		shape.position.y = Math.random()*500 - 250;
		          		shape.position.z = i*7;
		          	}
		          	if(i>125 && i<=250){
		          		shape.position.x = Math.random()*1000 - 500;
		          		shape.position.y = Math.random()*500 - 250;
		          		shape.position.z = i*6;
		          	}
		          	if(i>250 && i<=375){
		          		shape.position.x = Math.random()*1000 - 500;
		          		shape.position.y = Math.random()*500 - 250;
		          		shape.position.z = i*5;
		          	}
		          	if(i>375){
		          		shape.position.x = Math.random()*1000 - 500;
		          		shape.position.y = Math.random()*500 - 250;
		          		shape.position.z = i*4;
		          	}
		            shape.rotation.x = Math.random() * Math.PI;
		            shape.rotation.y = Math.random() * Math.PI;
		            shape.rotation.z = Math.random() * Math.PI;

		            //scene.add( shape );
					shapes.push( shape );
		            asteroides.add( shape );

		        }
				/*multiMaterial.needsUpdate = true;
				darkMaterial.needsUpdate = true;
				wireframeMaterial.needsUpdate = true;*/
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener('mousedown', onMouseDown, false);

    	lines = 0;
			renderer.autoClear = false;
		} 

		

			// ENDINIT //////////////////

			function onWindowResize() {

				windowHalfX = window.innerWidth / 2;
				windowHalfY = window.innerHeight / 2;

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function onDocumentMouseMove(event, particle) {
				
				mouseX = event.clientX - windowHalfX;
				mouseY = event.clientY - windowHalfY;

			}

			function onMouseDown(e) {
				
				if (renderer.autoClear) {
					renderer.autoClear = false;
				} else {
					renderer.autoClear = true;
				}
				
			}

			function createLine(){
				var positionShape1 = shapes[ getRandomInt(1,499) ].position;
				var positionShape2 = shapes[ getRandomInt(1,499) ].position;
				var positionShape3 = shapes[ getRandomInt(1,499) ].position;

				SUBDIVISIONS = 20;
				geometry = new THREE.Geometry();
				curve = new THREE.QuadraticBezierCurve3();
				curve.v0 = positionShape1;
				curve.v1 = positionShape2;
				curve.v2 = positionShape3;
				for (j = 0; j < SUBDIVISIONS; j++) {
					geometry.vertices.push( curve.getPoint(j / SUBDIVISIONS) )
				}

				var re = getRandomInt(0, randomRed);
				var gr = getRandomInt(0, randomGreen);
				var bl = getRandomInt(0, randomBlue);
				var resultColor = rgbToHex(re, gr, bl);
				var color = new THREE.Color( resultColor );
				var lineMaterial = new THREE.LineBasicMaterial({color:color, opacity: 0.4, linewidth: 1 });

				var line = new THREE.Line(geometry, lineMaterial );

				scene.add(line);
				lines += 1;
			}

			function animate() {

				requestAnimationFrame( animate );
				render();

			}

			// random and color functions
			function getRandomArbitrary(min, max) {
			    return Math.random() * (max - min) + min;
			}
			function getRandomInt(min, max) {
			    return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			function componentToHex(c) {
			    var hex = c.toString(16);
			    return hex.length == 1 ? "0" + hex : hex;
			}
			function rgbToHex(r, g, b) {
			    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
			}


			function render() {

				

				if(keyboard.pressed("left")){
					camera.rotation.z += 0.007;
				} else if(keyboard.pressed("right")){
					camera.rotation.z -= 0.007;
				} else {
					camera.rotation.z -= 0.005;
				}
				if(keyboard.pressed("down")){
					camera.position.z += 1.3 ;
				} else if(keyboard.pressed("up")){
					camera.position.z -= 1.3 ;
				} else {
					camera.position.z += 0.8;
				}
				if(keyboard.pressed("r")){
					camera.position.z = 0;
					camera.position.y = 0;
					camera.rotation.z = 0;
				}

				if (renderer.autoClear) {
					camera.position.x += ( mouseX*0.1 - camera.position.x ) * 0.07;
					camera.position.y += ( - mouseY*0.04 - camera.position.y ) * 0.1;
				}

				// change light color
				light.color = new THREE.Color( mouseY/200, 0, -mouseY/200 );

				renderer.render( scene, camera );

				if(getRandomInt(0,100) > 98 && lines < 30){
					createLine();
				}

			}