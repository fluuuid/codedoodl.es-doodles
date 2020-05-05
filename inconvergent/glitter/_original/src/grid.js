function Grid(){

  this.init = function init(n, size, renderer, gridShaders){

    console.log('making grid', n);

    this.n = n;
    this.size = size;
    this.itt = 0;

    this.renderer = renderer;
    this.gridShaders = gridShaders;

    this.camera = new THREE.OrthographicCamera(
      -n*0.5,
      n*0.5,
      n*0.5,
      -n*0.5,
      0,
      500
    );
    this.camera.position.z = 100;

    this.scene = new THREE.Scene();
    this.scene.add(this.camera);

    this.texPos1 = new THREE.WebGLRenderTarget(
      n, n, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType}
    );
    this.texPos2 = new THREE.WebGLRenderTarget(
      n, n, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType}
    );

    this.texVel1 = new THREE.WebGLRenderTarget(
      n, n, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType}
    );
    this.texVel2 = new THREE.WebGLRenderTarget(
      n, n, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        type: THREE.FloatType}
    );


    this.uniforms = {
      itt: {
        type: 'f',
        value:  0
      },
      mode: {
        type: 'f',
        value: 0.0
      },
      n: {
        type: 'f',
        value: n
      },
      size: {
        type: 'f',
        value: size
      },
      scale: {
        type: 'f',
        value: 0.99
      },
      mousePos: {
        type: "3f",
        value: [100000,100000,100000]
      },
      mouseScale: {
        type: "f",
        value: 0.5
      },
      pos: {
        type: "t",
        value: null
      },
      vel: {
        type: "t",
        value: null
      }
    };

    this.matGrid = new THREE.ShaderMaterial({
        vertexShader: this.gridShaders.vert,
        fragmentShader: this.gridShaders.frag,
        uniforms: this.uniforms,
        transparent: false
    });

    this.plane = new THREE.PlaneBufferGeometry(n, n);
    this.quad = new THREE.Mesh(this.plane, this.matGrid);
    this.scene.add(this.quad);

  };
  this.setInitialConditions = function setInitialConditions(){
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.n,this.n);

    this.uniforms.mode.value = -2.0;
    this.renderer.render(this.scene, this.camera, this.texVel1, true);
    this.renderer.render(this.scene, this.camera, this.texVel2, true);

    this.uniforms.mode.value = -1.0;
    this.renderer.render(this.scene, this.camera, this.texPos1, true);
    this.renderer.render(this.scene, this.camera, this.texPos2, true);
  };

  this.step = function step(){
    this.uniforms.itt.value = this.itt;
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.n,this.n);


    if (this.itt%2===0){
      this.uniforms.vel.value = this.texVel1;
      this.uniforms.pos.value = this.texPos1;
      this.uniforms.mode.value = 0.0;
      this.renderer.render(this.scene, this.camera, this.texVel2, true);
      this.uniforms.mode.value = 1.0;
      this.renderer.render(this.scene, this.camera, this.texPos2, true);
    }
    else{
      this.uniforms.vel.value = this.texVel2;
      this.uniforms.pos.value = this.texPos2;
      this.uniforms.mode.value = 0.0;
      this.renderer.render(this.scene, this.camera, this.texVel1, true);
      this.uniforms.mode.value = 1.0;
      this.renderer.render(this.scene, this.camera, this.texPos1, true);
    }

    this.itt += 1;
  };


}
