(function (){



			var OBJECT_ARRAY = [];
			var _geo, _mat, _mesh;
			var object = new THREE.Object3D();


		//ITEM CONSTRUCTOR
			function Items(geo, mat, mesh, x, y, z, scale, object3d) {

				this.geo = geo;
				this.mat = mat;
				this.mesh = mesh;
				this.x = x || 0;
				this.y = y || 0;
				this.z = z || 0;
				this.scale = scale || 0;
				this.object3d = object3d;

				return this;
			}


		//SWARM CREATOR
			Items.prototype.Create = function(amount) {

				
				for (var i = 0; i < amount; ++i) {
					OBJECT_ARRAY.push(
						new Items(
							_geo = new THREE.SphereGeometry( 1, 10, 1 ),
							_mat = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ),
							_mesh = new THREE.Mesh( _geo, _mat ),
							_mesh.position.x = Math.random() * (40 * i) + 1000 ,
							_mesh.position.y = Math.random() * (-40 * i) + 2000,
							_mesh.position.z = Math.random() * (40 * i) + 1000,
							_mesh.scale.x = _mesh.scale.y = _mesh.scale.z = Math.random() * (5 * i),
							object.add( _mesh )
							)
					);
				}
			}




		//GLOBAL
		var camera, scene, renderer, composer;
		var object, light;
		var effect;
		var targetRotation = 0;
		var targetRotationOnMouseDown = 0;
		var targetReverse = 0;
		var mouseX = 0;
		var mouseXOnMouseDown = 0;
		var windowHalfX = window.innerWidth / 2;
		var windowHalfY = window.innerHeight / 2;


	//GENERATE SWARM
	Items.prototype.Create(300);


	Items.prototype.Create = Items.prototype = Items;

			init();
			animate();

			function init() {

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
			
				//renderer.setClearColor( 0xffffff, 1.0);
				document.body.appendChild( renderer.domElement );

				
				camera = new THREE.PerspectiveCamera( 170, window.innerWidth / window.innerHeight, 1, 1000 );
				camera.position.z = 450;
				scene = new THREE.Scene();
				scene.fog = new THREE.Fog( 0xffffff, 0.8, 1000 );

				
				scene.add( object );



				_mesh.position.multiplyScalar( Math.random() * 200 );
				_mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );

				var geometry = new THREE.SphereGeometry( 1, 1, 1 );
				var material = new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } );

				//GENERATE CENTER OBJECTS
				for ( var i = 0; i < 40; i ++ ) {

					var mesh = new THREE.Mesh( geometry, material );
					mesh.position.set( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 ).normalize();
					mesh.position.multiplyScalar( Math.random() * 1000 );
					mesh.rotation.set( Math.random() * 2, Math.random() * 2, Math.random() * 2 );
					mesh.scale.x = mesh.scale.y = mesh.scale.z = Math.random() * 100;
					object.add( mesh );

				}


				
				//LIGHT
				scene.add( new THREE.AmbientLight( 0x000000) );
				light = new THREE.DirectionalLight( 0xffffff );
				light.position.set( 1, 1, 1 );
				scene.add( light );

				composer = new THREE.EffectComposer( renderer );
				composer.addPass( new THREE.RenderPass( scene, camera ) );
				effect = new THREE.ShaderPass( THREE.DotScreenShader );
				effect.uniforms[ 'scale' ].value = 4.0;
				composer.addPass( effect );
				effect = new THREE.ShaderPass( THREE.RGBShiftShader );
				effect.uniforms[ 'amount' ].value = 0.002;
				effect.renderToScreen = true;
				composer.addPass( effect );

				document.addEventListener( 'mousedown', onDocumentMouseDown, false );
				document.addEventListener( 'touchstart', onDocumentTouchStart, false );
				document.addEventListener( 'touchmove', onDocumentTouchMove, false );
				window.addEventListener( 'resize', onWindowResize, false );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
				renderer.setSize( window.innerWidth, window.innerHeight );

			}


			//EVENTS
			function onDocumentMouseDown( event ) {

				event.preventDefault();
				document.addEventListener( 'mousemove', onDocumentMouseMove, false );
				document.addEventListener( 'mouseup', onDocumentMouseUp, false );
				document.addEventListener( 'mouseout', onDocumentMouseOut, false );
				mouseXOnMouseDown = event.clientX - windowHalfX;
				targetRotationOnMouseDown = targetRotation;

			}

			function onDocumentMouseMove( event ) {

				mouseX = event.clientX - windowHalfX;
				effect.uniforms[ 'amount' ].value = 0.02 ;
				targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

			}

			function onDocumentMouseUp( event ) {

				effect.uniforms[ 'amount' ].value = 0.002;
				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
				targetRotation = 0;
				console.log("out now");

			}

			function onDocumentMouseOut( event ) {

				document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
				document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
				document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
				effect.uniforms[ 'amount' ].value = 0.002;
				targetRotation = 0;
				console.log("out off window");
			}

			function onDocumentTouchStart( event ) {

				if ( event.touches.length === 1 ) {

					event.preventDefault();
					mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
					targetRotationOnMouseDown = targetRotation;
				}

			}

			function onDocumentTouchMove( event ) {

				if ( event.touches.length === 1 ) {
					event.preventDefault();
					mouseX = event.touches[ 0 ].pageX - windowHalfX;
					targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

				}

			}


			//RENDER
			function animate() {
				requestAnimationFrame( animate );
				object.rotation.x += 0.01;
				object.rotation.y += 0.01;
				render();
				composer.render();
			}


			var counter = 2;
			function render() {

				counter += 2;

				effect.uniforms[ 'amount' ].value = 0.002;
				object.rotation.x += ( targetRotation - object.rotation.x ) * 0.05;
				effect.uniforms[ 'amount' ].value += targetRotation/500 ;


			




			}

	})();