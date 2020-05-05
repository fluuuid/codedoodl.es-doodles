function Particles(){

  this.init = function init(
      parameters,
      camera, scene, renderer,
      shaders,
      gridShaders){

    this.n = parameters.n;
    this.size = parameters.size;
    this.particleWidth = parameters.particleWidth;
    this.particleHeight = parameters.particleHeight;
    this.particleBottom = parameters.particleBottom;
    this.pixelRatio = parameters.pixelRatio;

    this.shaders = shaders;
    this.renderer = renderer;

    this.camera = camera;
    this.scene = scene;

    this.grid = new Grid();
    this.grid.init(this.n, this.size, renderer, gridShaders);
    this.grid.setInitialConditions();

    this._makeMaterial();
    this._makeParticles();
  };

  this._makeMaterial = function _makeMaterial(){

    this.uniforms = {
      itt: {
        type: 'f',
        value:  0
      },
      height: {
        type: 'f',
        value: this.particleHeight
      },
      n: {
        type: 'f',
        value: this.n
      },
      pixelRatio: {
        type: 'f',
        value: this.pixelRatio
      },
      light: {
        type: '4f',
        value: [0.0, 2000, 1000, 0.7]
      },
      mousePos: {
        type: "3f",
        value: [100000,100000,100000]
      },
      pos: {
        type: "t",
        value: this.grid.texPos1
      },
      vel: {
        type: "t",
        value: this.grid.texVel1
      }
    };

    this.mat = new THREE.ShaderMaterial({
        vertexShader: this.shaders.vert,
        fragmentShader: this.shaders.frag,
        uniforms: this.uniforms
    });
    //this.mat.side = THREE.DoubleSide;
    //this.mat.side = THREE.FrontSide;
    //this.mat.blending = THREE.DarkenBlending;
    //this.mat.blending = THREE.AdditiveBlending;
    //this.mat.blending = THREE.SubtractiveBlending;
    //this.mat.blending = THREE.MultiplyBlending;

  };

  this._initGeometry = function _initGeometry(tnum, vnum){

    index = new Uint16Array(tnum*3);
    position = new Float32Array(vnum*3);
    color = new Float32Array(vnum*3);
    normal = new Float32Array(vnum*3);

    ndindex = Ndarray(index,[tnum,3]);
    ndposition = Ndarray(position,[vnum,3]);
    ndcolor = Ndarray(color,[vnum,3]);
    ndnormal = Ndarray(normal,[vnum,3]);

    geometry = new THREE.BufferGeometry();

    geometry.addAttribute('index', new THREE.BufferAttribute(index, 1));
    geometry.addAttribute('position', new THREE.BufferAttribute(position, 3));
    geometry.addAttribute('normal', new THREE.BufferAttribute(normal, 3));
    geometry.addAttribute('color', new THREE.BufferAttribute(color, 3));

    var t;
    var v;
    for (t=0; t<this.tnum; t++){
      ndindex.set(t,0,0);
      ndindex.set(t,1,0);
      ndindex.set(t,2,0);
    }

    for (v=0; v<this.vnum; v++){
      ndposition.set(v,0,0);
      ndposition.set(v,1,0);
      ndposition.set(v,2,0);

      ndcolor.set(v,0,0);
      ndcolor.set(v,1,0);
      ndcolor.set(v,2,0);

      ndnormal.set(v,0,0);
      ndnormal.set(v,1,0);
      ndnormal.set(v,2,0);
    }

    geometry.attributes.index.needsUpdate = true;
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.normal.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;

    return {
      geometry: geometry,
      ndindex: ndindex,
      ndposition: ndposition,
      ndcolor: ndcolor,
      ndnormal: ndnormal,
      nvert: 0,
      ntri: 0
    };

  };

  this._makeParticles = function _makeParticles(){
    var n = this.n;
    var size = this.size;
    for (var i=0;i<n;i++){
      var geom = this._initGeometry(4*n,4*n);
      for (var j=0;j<n;j++){
        //var x = size*(0.5-j/n);
        //var y = size*(0.5-i/n);
        var x = 0;
        var y = 0;
        var px = j/n;
        var py = i/n;
        var h = this.particleHeight;
        var w = this.particleWidth;
        var b = this.particleBottom;
        this._addParticle(geom,x,y,w,px,py);
      }
      this._makeMesh(geom);
    }
  };

  this._makeMesh = function _makeMesh(geom){
    geom.geometry.computeFaceNormals();
    geom.geometry.computeVertexNormals();

    var mesh = new THREE.Mesh(geom.geometry, this.mat);
    mesh.frustumCulled = false;

    //this.camera.add(mesh);
    this.scene.add(mesh);
  };

  this._addParticle = function _addParticle(geom,x,y,w,px,py){

    nvert = geom.nvert;
    ntri = geom.ntri;
    var shift = Math.random()*Math.PI*2;
    var i, theta, xx, yy;

    for (i=0;i<3;i++){
      theta = shift + i*Math.PI/3.0*2.0;
      xx = x + Math.cos(theta)*w;
      yy = y + Math.sin(theta)*w;
      geom.ndposition.set(nvert,0,xx);
      geom.ndposition.set(nvert,1,yy);
      geom.ndposition.set(nvert,2,0);

      geom.ndcolor.set(nvert,0,px);
      geom.ndcolor.set(nvert,1,py);
      geom.ndcolor.set(nvert,2,0);
      nvert++;
    }

      geom.ndposition.set(nvert,0,x);
      geom.ndposition.set(nvert,1,y);
      geom.ndposition.set(nvert,2,1);

      geom.ndcolor.set(nvert,0,px);
      geom.ndcolor.set(nvert,1,py);
      geom.ndcolor.set(nvert,2,1);
      nvert++;

    geom.geometry.attributes.position.needsUpdate = true;
    geom.geometry.attributes.color.needsUpdate = true;

    geom.ndindex.set(ntri,0,nvert-4);
    geom.ndindex.set(ntri,1,nvert-3);
    geom.ndindex.set(ntri,2,nvert-2);
    ntri++;

    geom.ndindex.set(ntri,0,nvert-4);
    geom.ndindex.set(ntri,1,nvert-3);
    geom.ndindex.set(ntri,2,nvert-1);
    ntri++;

    geom.ndindex.set(ntri,0,nvert-3);
    geom.ndindex.set(ntri,1,nvert-2);
    geom.ndindex.set(ntri,2,nvert-1);
    ntri++;

    geom.ndindex.set(ntri,0,nvert-2);
    geom.ndindex.set(ntri,1,nvert-4);
    geom.ndindex.set(ntri,2,nvert-1);
    ntri++;

    geom.ntri = ntri;
    geom.nvert = nvert;

    geom.geometry.attributes.index.needsUpdate = true;
  };

  this.setMousePos = function setMousePos(v, s){

    var p = [v.x,v.y,100000.0];
    this.grid.uniforms.mousePos.value = p;
    this.grid.uniforms.mouseScale.value = s;

    this.uniforms.mousePos.value = p;

  };

  this.step = function step(){

    this.grid.step();

    if (this.grid.itt%2===0){
      this.uniforms.pos.value = this.grid.texPos2;
      this.uniforms.vel.value = this.grid.texVel2;
    }
    else{
      this.uniforms.pos.value = this.grid.texPos1;
      this.uniforms.vel.value = this.grid.texVel1;
    }
  };

}
