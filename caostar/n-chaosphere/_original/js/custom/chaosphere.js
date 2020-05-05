var createChaosSphere = function(radius, segments, rings, _material, sphereGeometry, cylinderGeometry, coneGeometry){
					if(!radius)radius = 20;
					if(!segments)segments = 16;
					if(!rings)rings = 16;
					//
					var cilinderHeight = radius*5;
					var cilinderRadius = radius/6;
					//
					var coneRadiusTop = 0.0001;
					var coneRadiusBottom = radius/2;
					var coneHeight = radius/2;
					//
					if(!_material)_material = new THREE.MeshBasicMaterial( { wireframe: true } );
					if(!sphereGeometry)sphereGeometry = new THREE.SphereGeometry(radius, segments, rings);
					if(!cylinderGeometry)cylinderGeometry = new THREE.CylinderGeometry( cilinderRadius, cilinderRadius, cilinderHeight, segments, segments );
					if(!coneGeometry)coneGeometry = new THREE.CylinderGeometry( coneRadiusTop, coneRadiusBottom, coneHeight, segments, segments );
					//
					var newPiece = new THREE.Object3D();				
								
				
					//sphere function ( radius, segments, rings )
					var sphere = new THREE.Mesh(
					  sphereGeometry,				
					  _material);	
					sphere.position.set( 0, 0, 0 );	
					sphere.name = "sphere";		  
					newPiece.add(sphere);
					//
					function createArrow(){
						var arrow = new THREE.Object3D();
						//cilinder function ( radiusTop, radiusBottom, height, segmentsRadius, segmentsHeight, openEnded )
						
						var cilinder = new THREE.Mesh(
						  cylinderGeometry,				
						  _material);
						cilinder.position.set( 0, 0, 0 );				  
						arrow.add(cilinder);
						
						var cone1 = new THREE.Mesh(
						  coneGeometry,				
						  _material);
						cone1.position.set( 0, (cylinderGeometry.boundingSphere.radius + coneGeometry.boundingSphere.radius/2), 0 );				  
						arrow.add(cone1);
						
						var cone2 = new THREE.Mesh(
						  coneGeometry,				
						  _material);
						cone2.position.set( 0, -(cylinderGeometry.boundingSphere.radius + coneGeometry.boundingSphere.radius/2), 0 );
						cone2.rotation.x = (Math.PI / 180) * 180;				  
						arrow.add(cone2);
						
						return arrow
					
					}
					   var baseAngleX = 45;
					   var baseAngleZ = 35.26438968275465;
					 
					  var anglesX = [baseAngleX,-baseAngleX,baseAngleX,-baseAngleX];
					  var anglesZ = [baseAngleZ,baseAngleZ,-baseAngleZ,-baseAngleZ];
					 
					 for (var i = 0; i < 4; i++) {
						  var arrow = createArrow();
						  arrow.rotation.x = (Math.PI / 180) * anglesX[i];
						  arrow.rotation.z = ((Math.PI / 180) * anglesZ[i]);
						  arrow.name = "arrow_" + (i+1);
						  newPiece.add(arrow);
					}
					
					
					//final return
					return newPiece
					
					
//end of createcaostar function					
}