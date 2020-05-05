for (var container, camera, scene, renderer, cameraCube, sceneCube, plane, planegeometry, test2, directionalLight, spotLight, clock = new THREE.Clock, debugcube, composer, firstrun = !0, firstanimation = !0, gbiio = !1, qrn = new qrn, X = 0;X < qrn.ueh;X++) {
  qrn.init(X);
}
init();
animate();
function onWindowResize(a) {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  cameraCube.aspect = window.innerWidth / window.innerHeight;
  cameraCube.updateProjectionMatrix();
}
function animate() {
  window.requestAnimationFrame || (window.requestAnimationFrame = function() {
    return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a, b) {
      window.setTimeout(a, 1E3 / 30);
    };
  }());
  requestAnimationFrame(animate);
  render();
  plane.position.copy(camera.position);
  plane.position.setY(1);
  plane.updateMatrix();
  if (.5 < Math.random()) {
    var a = new THREE.Vector3(.3, .5, -1);
    a.applyQuaternion(camera.quaternion);
    directionalLight.position.copy(a);
    a.multiplyScalar(400);
    a.addVectors(a, camera.position);
    spotLight.position.copy(a);
  }
  for (a = 0;a < qrn.ueh;a++) {
    if (.8 < Math.random() || 1 == firstanimation) {
      var b = camera.position.clone(), c = qrn.eia[a].mesh.position.clone(), b = b.distanceTo(c);
      0 > qrn.eia[a].camdist - b && uuueia(a);
      qrn.eia[a].camdist = b;
    }
    Math.abs(qrn.eia[a].camdist / 700 - 1) > Math.random() && (b = camera.position.clone(), c = qrn.eia[a].mesh.position.clone(), b = b.distanceTo(c), qrn.eia[a].camdist = b, 100 > b || 800 < b ? uuueia(a) : 200 > b && 1 == qrn.eia[a].yuio && (qrn.init2(a), qrn.eia[a].geometry.dynamic = !0, qrn.eia[a].ivv.zxcv(a), updateeia(a, !1)), 150 > b && (qrn.eia[a].material.opacity = Math.abs((b - 100) / 50)), 150 <= qrn.eia[a].camdist && 1 >= qrn.eia[a].material.opacity && 
    .8 < Math.random() && (qrn.eia[a].material.opacity += .01));
    1 == firstanimation && (qrn.eia[a].material.opacity = Math.abs(b / 800 - 1));
  }
  firstanimation = !1;
}
function render() {
  var a = clock.getDelta();
  controls.moveState.forward = 1;
  controls.rotationVector.z = 0;
  controls.rotationVector.x = 0;
  controls.updateMovementVector();
  controls.update(a);
  camera.position.setY(30);
  cameraCube.quaternion.copy(camera.quaternion);
  renderer.render(sceneCube, cameraCube);
  renderer.render(scene, camera);
}
function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1E3);
  cameraCube = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3E3);
  controls = new THREE.FlyControls(camera);
  camera.position.set(0, 30, 0);
  controls.movementSpeed = 5;
  controls.domElement = container;
  controls.rollSpeed = Math.PI / 100;
  controls.autoForward = !1;
  controls.dragToLook = !1;
  scene = new THREE.Scene;
  sceneCube = new THREE.Scene;
  scene.fog = new THREE.Fog(16777215, 3500, 15E3);
  scene.fog.color.setHSL(.51, .4, .9);
  for (var a = 0;a < qrn.ueh;a++) {
    uvveia(a), updateeia(a, !0);
  }
  a = new THREE.AmbientLight(16777215);
  a.color.setHSL(.1, .5, .55);
  scene.add(a);
  spotLight = new THREE.SpotLight(16777215, 1.5);
  spotLight.color.setHSL(.6, .5, 1);
  spotLight.position.set(3, 30, -10);
  spotLight.target = camera;
  spotLight.castShadow = !0;
  spotLight.onlyShadow = !0;
  spotLight.shadowMapWidth = 2048;
  spotLight.shadowMapHeight = 2048;
  spotLight.shadowCameraNear = 200;
  spotLight.shadowCameraFar = 1500;
  spotLight.shadowCameraFov = 40;
  spotLight.shadowDarkness = .35;
  scene.add(spotLight);
  directionalLight = new THREE.DirectionalLight(16777215, 1.5);
  directionalLight.position.set(1, 1, -1);
  directionalLight.color.setHSL(.6, .05, 1);
  a = new THREE.Vector3(0, 1, -1);
  a.applyQuaternion(camera.quaternion);
  directionalLight.position.copy(a);
  scene.add(directionalLight);
  directionalLight.position.multiplyScalar(500);
  renderer = new THREE.WebGLRenderer({antialias:!0, clearColor:16777215, clearAlpha:1, alpha:!1});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(scene.fog.color, 1);
  renderer.setClearColor(16777215, 1);
  renderer.sortObjects = !0;
  renderer.setBlending(THREE.AdditiveBlending);
  container.appendChild(renderer.domElement);
  renderer.shadowMapCascade = !0;
  renderer.autoClear = !1;
  renderer.shadowMapEnabled = !0;
  renderer.shadowMapCullFace = THREE.CullFaceBack;
  a = "files/skybox/small/";
  2048 <= renderer.context.getParameter(renderer.context.MAX_TEXTURE_SIZE) && 12288 <= renderer.context.getParameter(renderer.context.MAX_CUBE_MAP_TEXTURE_SIZE) && (a = "files/skybox/large/");
  a = THREE.ImageUtils.loadTextureCube([a + "px.jpg", a + "nx.jpg", a + "py.jpg", a + "ny.jpg", a + "pz.jpg", a + "nz.jpg"]);
  a.format = THREE.RGBFormat;
  var b = THREE.ShaderLib.cube;
  b.uniforms.tCube.value = a;
  a = new THREE.ShaderMaterial({fragmentShader:b.fragmentShader, vertexShader:b.vertexShader, uniforms:b.uniforms, depthWrite:!1, side:THREE.BackSide});
  a = new THREE.Mesh(new THREE.BoxGeometry(800, 200, 800), a);
  a.frustumCulled = !1;
  sceneCube.add(a);
  a = new THREE.MeshLambertMaterial({ambient:3355443, color:16777215, specular:16777215, opacity:100});
  b = new THREE.BoxGeometry(800, 2, 800);
  b.dynamic = !0;
  b.computeFaceNormals();
  b.computeVertexNormals();
  new THREE.MeshBasicMaterial({color:4473924});
  plane = new THREE.Mesh(b, a);
  plane.updateMatrix();
  plane.receiveShadow = !0;
  scene.add(plane);
  window.addEventListener("resize", onWindowResize, !1);
  firstrun = !1;
}
function uuueia(a) {
  scene.remove(qrn.eia[a].mesh);
  qrn.eia[a].geometry.dispose();
  gbiio = !0;
  qrn.init(a);
  uvveia(a);
  qrn.eia[a].material.opacity = 0;
  updateeia(a, !0);
  qrn.eia[a].yuio = !0;
}
function uvveia(a) {
  if (1 >= qrn.eia[a].pivx && .75 <= qrn.eia[a].pivx) {
    qrn.eia[a].material.color.setHSL(.13, 1, 1), qrn.eia[a].type = 1, qrn.eia[a].ivv.iio.length = 0, qrn.eia[a].ivv.zxa("0", "2"), qrn.eia[a].ivv.zxa("1", "]4"), qrn.eia[a].ivv.zxa("2", "]3["), qrn.eia[a].ivv.zxa("3", "2]4]"), qrn.eia[a].ivv.zxa("4", "51"), qrn.eia[a].ivv.zxa("5", "04]"), qrn.eia[a].ivv.zxa("[", "5"), qrn.eia[a].ivv.zxa("]", "[02");
  } else {
    if (.75 > qrn.eia[a].pivx && .65 <= qrn.eia[a].pivx) {
      qrn.eia[a].material.color.setHSL(.1, 1, 1), qrn.eia[a].type = 2, qrn.eia[a].ivv.iio.length = 0, qrn.eia[a].ivv.zxa("0", "2]"), qrn.eia[a].ivv.zxa("1", "4"), qrn.eia[a].ivv.zxa("2", "[3["), qrn.eia[a].ivv.zxa("3", "24]"), qrn.eia[a].ivv.zxa("4", "5]1"), qrn.eia[a].ivv.zxa("5", "4]"), qrn.eia[a].ivv.zxa("[", "5"), qrn.eia[a].ivv.zxa("]", "[02");
    } else {
      if (.55 < qrn.eia[a].pivx && .65 > qrn.eia[a].pivx) {
        qrn.eia[a].material.color.setHSL(.12, 1, 1), qrn.eia[a].type = 3, qrn.eia[a].ivv.iio.length = 0, qrn.eia[a].ivv.zxa("0", "[2]"), qrn.eia[a].ivv.zxa("1", "3"), qrn.eia[a].ivv.zxa("2", "]3["), qrn.eia[a].ivv.zxa("3", "]]0["), qrn.eia[a].ivv.zxa("4", "5]1"), qrn.eia[a].ivv.zxa("5", "]04]"), qrn.eia[a].ivv.zxa("[", "5"), qrn.eia[a].ivv.zxa("]", "[02");
      } else {
        if (0 <= qrn.eia[a].pivx && .25 > qrn.eia[a].pivx) {
          var b = Math.floor(5 * Math.random() + 1).toString() + Math.floor(5 * Math.random() + 1).toString() + Math.floor(5 * Math.random() + 1).toString() + Math.floor(5 * Math.random() + 1).toString() + Math.floor(5 * Math.random() + 1).toString() + Math.floor(5 * Math.random() + 1).toString(), b = b + "[]";
          qrn.eia[a].material.color.setHSL(.12, 1, 1);
          qrn.eia[a].type = 4;
          qrn.eia[a].ivv.iio.length = 0;
          qrn.eia[a].ivv.zxa("0", "[2]");
          qrn.eia[a].ivv.zxa("1", b[Math.floor(7 * Math.random() + 1)]);
          qrn.eia[a].ivv.zxa("2", "]3[");
          qrn.eia[a].ivv.zxa("3", b[Math.floor(7 * Math.random() + 1)]);
          qrn.eia[a].ivv.zxa("4", "5]1");
          qrn.eia[a].ivv.zxa("5", "]04]");
          qrn.eia[a].ivv.zxa("[", "5");
          qrn.eia[a].ivv.zxa("]", "[02");
        } else {
          qrn.eia[a].material.color.setHSL(.35, 1, 1), qrn.eia[a].type = 5, qrn.eia[a].ivv.iio.length = 0, qrn.eia[a].ivv.iio.length = 0, qrn.eia[a].ivv.zxa("0", "01234[2"), qrn.eia[a].ivv.zxa("1", "234"), qrn.eia[a].ivv.zxa("2", "3"), qrn.eia[a].ivv.zxa("3", "51"), qrn.eia[a].ivv.zxa("4", "23]"), qrn.eia[a].ivv.zxa("5", "4"), qrn.eia[a].ivv.zxa("[", "0"), qrn.eia[a].ivv.zxa("]", 
          "302[");
        }
      }
    }
  }
  qrn.eia[a].ivv.ghj.length = 0;
  qrn.eia[a].ivv.rty();
  qrn.eia[a].ivv.rty();
  qrn.eia[a].ivv.rty();
  qrn.eia[a].ivv.rty();
  qrn.eia[a].ivv.rty();
  qrn.eia[a].geometry.dynamic = !0;
  qrn.eia[a].ivv.zxcv(a);
}
function updateeia(a, b) {
  qrn.eia[a].geometry.dynamic = !0;
  qrn.eia[a].geometry.verticesNeedUpdate = !0;
  qrn.eia[a].geometry.elementsNeedUpdate = !0;
  qrn.eia[a].geometry.normalsNeedUpdate = !0;
  qrn.eia[a].geometry.attributes.position.needsUpdate = !0;
  qrn.eia[a].geometry.attributes.index.needsUpdate = !0;
  qrn.eia[a].geometry.attributes.normal.needsUpdate = !0;
  var c = (new THREE.Vector3).copy(qrn.eia[a].mesh.position);
  1 == firstrun && (qrn.eia[a].mesh = new THREE.Mesh(qrn.eia[a].geometry, qrn.eia[a].material), qrn.eia[a].mesh.castShadow = !0);
  if (1 == firstrun) {
    qrn.eia[a].mesh.position.x = 70 * (2 * Math.random() - 1), qrn.eia[a].mesh.position.y = 0, qrn.eia[a].mesh.position.z = 300 * qrn.eia[a].pivx + 200;
  } else {
    if (1 == b) {
      qrn.eia[a].mesh.position = new THREE.Vector3(0, 0, 0);
      c = new THREE.Vector3(0, 0, -1);
      c.applyQuaternion(camera.quaternion);
      var f = (new THREE.Vector3).copy(c);
      f.x *= -1;
      c.multiplyScalar(300 * qrn.eia[a].pivx + 300);
      f.multiplyScalar(200 * (2 * qrn.eia[a].pivx - 1));
      qrn.eia[a].mesh.position.addVectors(qrn.eia[a].mesh.position, camera.position);
      qrn.eia[a].mesh.position.addVectors(qrn.eia[a].mesh.position, c);
      qrn.eia[a].mesh.position.addVectors(qrn.eia[a].mesh.position, f);
      qrn.eia[a].mesh.position.setY(0);
      qrn.eia[a].mesh.position.setX(qrn.eia[a].mesh.position.x + 100 * (2 * Math.random() - 1));
    } else {
      0 == b && qrn.eia[a].mesh.position.copy(c);
    }
  }
  qrn.eia[a].mesh.matrixAutoUpdate = !1;
  qrn.eia[a].mesh.updateMatrix();
  1 == firstrun && scene.add(qrn.eia[a].mesh);
}
function qrn() {
  this.eia = {};
  this.ueh = 40;
  this.gbn = 72;
  this.init = function(a) {
    1 == firstrun && (this.eia[a] = {});
    this.eia[a].type = 0;
    this.eia[a].yuio = !0;
    this.eia[a].nnm = THREE.Math.randInt(0, 6).toString() + THREE.Math.randInt(0, 6).toString() + THREE.Math.randInt(0, 6).toString() + THREE.Math.randInt(0, 6).toString() + THREE.Math.randInt(0, 6).toString() + THREE.Math.randInt(0, 6).toString();
    this.eia[a].eibvk = 1.2;
    this.eia[a].ivv= new Yvv(a);
    this.eia[a].ivv.init(a);
    this.eia[a].fgnz = 90;
    this.eia[a].angle = .01745329251 * (22.6 * Math.random() + 15);
    this.eia[a].camdist = 700;
    this.eia[a].order = a;
    this.eia[a].pivx = a / this.ueh;
    if (1 == firstrun || 1 == gbiio) {
      this.eia[a].geometry = new THREE.BufferGeometry;
      this.eia[a].dynamic = !0;
      var b = 360 / this.gbn * this.eia[a].ivv.eeiox, c = 3 * b;
      this.eia[a].geometry.attributes = {position:{itemSize:3, array:new Float32Array(c), numItems:c}, index:{itemSize:1, array:new Uint32Array(b), numItems:b}, normal:{itemSize:3, array:new Float32Array(c), numItems:c}};
      this.eia[a].material = new THREE.MeshLambertMaterial({ambient:3355443, color:16777215, specular:16777215, opacity:0});
      this.eia[a].material.transparent = !0;
      this.eia[a].mesh = new THREE.Mesh(this.eia[a].geometry, this.eia[a].material);
      this.eia[a].mesh.frustumCulled = !0;
      this.eia[a].mesh.castShadow = !0;
      0 == firstrun && scene.add(this.eia[a].mesh);
      gbiio = 0;
    }
  };
  this.init2 = function(a) {
    this.eia[a].eibvk = 1.2;
    var b = this.eia[a].ivv.ghj, c = this.eia[a].ivv.whg, f = this.eia[a].angle;
    this.eia[a].ivv = new Yvv(a);
    this.eia[a].ivv.init(a);
    this.eia[a].ivv.ghj = b;
    this.eia[a].ivv.whg = c;
    this.eia[a].fgnz = 72;
    this.eia[a].angle = f;
  };
}
function Yvv(a) {
  this.ghj = "0123456";
  this.iio = [];
  this.lli = 0;
  this.ttyx = !1;
  this.ddffi = this.qqpp = 0;
  this.whg = Math.floor(300 * Math.random()) + 5;
  this.eeiox = 1900;
  this.dds = 0;
  this.ilil = new THREE.Vector3(0, 0, 0);
  this.ffll = this.ilil.clone();
  this.robdg = this.ilil.clone();
  this.vilsx = this.ilil.clone();
  this.ffll = this.ilil.clone();
  this.okn = this.edja = this.obnd = 1;
  this.yhbs = .1;
  this.okn = 0;
  this.cpxzr = {};
  this.init = function(a) {
    this.ghj = qrn.eia[a].nnm;
    this.ilil = (new THREE.Vector3(qrn.eia[a].eibvk, qrn.eia[a].eibvk, qrn.eia[a].eibvk)).normalize();
    this.ffll = this.ilil.clone();
    this.robdg = this.ilil.clone();
    this.vilsx = this.ilil.clone();
    this.ffll = this.ilil.clone();
    this.okn = this.edja = this.obnd = 1;
    this.yhbs = .1;
    this.okn = 0;
    this.whg = Math.floor(300 * Math.random()) + 5;
    this.ddffi = this.qqpp = this.dds = 0;
    this.cpxzr[0] = {};
    this.cpxzr[0].ffll = this.ffll.clone();
    this.cpxzr[0].ilil = this.ilil.clone();
    this.cpxzr[0].vilsx = this.vilsx.clone();
    this.cpxzr[0].robdg = this.robdg.clone();
    this.cpxzr[0].yhbs = this.yhbs;
    this.cpxzr[0].obnd = this.obnd;
  };
  this.zxa = function(a, c) {
    this.iio.push([a, c]);
  };
  this.setghj = function(a) {
    this.ghj = a;
  };
  this.rty = function() {
    for (var a = [], c = 0;c < this.ghj.length;c++) {
      for (var f = 0;f < this.iio.length;f++) {
        this.ghj[c] == this.iio[f][0] && a.push(this.iio[f][1]);
      }
    }
    a = a.join("");
    this.ghj = a.slice();
  };
  this.zxcv = function(a) {
    var c = qrn.eia[a].ivv.whg / qrn.eia[a].ivv.eeiox, f = [], e = qrn.eia[a].angle + .07 * c;
    3 == qrn.eia[a].type && (e += .5 * Math.sin(c) + .4);
    var h = qrn.eia[a].fgnz;
    f[0] = new THREE.Matrix3(Math.cos(e), 0, -1 * Math.sin(e), 0, 1, 0, Math.sin(e), 0, Math.cos(e));
    f[1] = new THREE.Matrix3(Math.cos(-1 * e), 0, -1 * Math.sin(-1 * e), 0, 1, 0, Math.sin(-1 * e), 0, Math.cos(-1 * e));
    f[2] = new THREE.Matrix3(Math.cos(e), Math.sin(e), 0, -1 * Math.sin(e), Math.cos(e), 0, 0, 0, 1);
    f[3] = new THREE.Matrix3(Math.cos(-1 * e), Math.sin(-1 * e), 0, -1 * Math.sin(-1 * e), Math.cos(-1 * e), 0, 0, 0, 1);
    f[4] = new THREE.Matrix3(1, 0, 0, 0, Math.cos(e), -1 * Math.sin(e), 0, Math.sin(e), Math.cos(e));
    f[5] = new THREE.Matrix3(1, 0, 0, 0, Math.cos(-1 * e), -1 * Math.sin(-1 * e), 0, Math.sin(-1 * e), Math.cos(-1 * e));
    f[6] = new THREE.Matrix3(1, 0, 0, 0, 1, 0, 0, 0, 1);
    e = [];
    soeihg = h;
    ikhsxfx = 360 / soeihg;
    for (h = 0;360 > h;h += soeihg) {
      var c = (new THREE.Vector3(0, 1, 0)).multiplyScalar(Math.sin(6.2831852 * h / 360)), m = (new THREE.Vector3(1, 0, 0)).multiplyScalar(Math.cos(6.2831852 * h / 360));
      e[h / soeihg] = (new THREE.Vector3).addVectors(c, m);
      (new THREE.Vector3).addVectors(c, m);
    }
    var m = 0, k = 2 * ikhsxfx;
    this.whg += 2;
    this.dds = 0;
    for (c = qrn.eia[a].ivv.whg / qrn.eia[a].ivv.eeiox;this.dds <= this.whg;) {
      for (h = 0;h < this.ghj.length && this.dds <= this.whg;h++) {
        var q = this.ghj[h], d, n = !1;
        if (d != q) {
          if ("[" == q) {
            this.cpxzr[this.okn] = {}, this.cpxzr[this.okn].ffll = this.ffll.clone(), this.cpxzr[this.okn].ilil = this.ilil.clone(), this.cpxzr[this.okn].vilsx = this.vilsx.clone(), this.cpxzr[this.okn].robdg = this.robdg.clone(), this.cpxzr[this.okn].yhbs = this.yhbs, this.cpxzr[this.okn].obnd = 
            this.obnd, this.okn += 1;
          } else {
            if ("]" == q || 1 == this.ttyx) {
              if (this.qqpp >= 20 * ikhsxfx) {
                var g = 1;
                5 != qrn.eia[a].type && (g = ikhsxfx / 2);
                for (var r = 0;r < g;r++) {
                  d = new THREE.Vector3;
                  var l = 3 * (this.qqpp - ikhsxfx - r);
                  d = new THREE.Vector3(qrn.eia[a].geometry.attributes.position.array[l], qrn.eia[a].geometry.attributes.position.array[l + 1], qrn.eia[a].geometry.attributes.position.array[l + 2]);
                  var s = (new THREE.Vector3).copy(this.ilil);
                  s.applyMatrix3(f[m]);
                  qrn.eia[a].geometry.attributes.normal.array[l] = Math.cos(c);
                  qrn.eia[a].geometry.attributes.normal.array[l + 1] = Math.sin(c);
                  var p = qrn.eia[a].geometry.attributes.normal.array[l + 2] = Math.cos(c);
                  5 != qrn.eia[a].type && (0 == r % 2 && (p = .05 * (Math.abs(this.dds / this.whg - 1) + c), s.multiplyScalar(p)), d.addVectors(s, d));
                  qrn.eia[a].geometry.attributes.position.array[l] = d.x + Math.sin(d.x) * c * .5 * qrn.eia[a].type;
                  qrn.eia[a].geometry.attributes.position.array[l + 1] = d.y - Math.cos(d.x) * c * .5 * qrn.eia[a].type;
                  qrn.eia[a].geometry.attributes.position.array[l + 2] = d.z + Math.sin(d.z) * c * .5 * qrn.eia[a].type;
                }
                this.qqpp -= ikhsxfx;
                for (g = 1;g < ikhsxfx - 1;g++) {
                  qrn.eia[a].geometry.attributes.index.array[this.ddffi] = this.qqpp, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 1] = this.qqpp + g, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 2] = this.qqpp + g + 1, this.ddffi += 3;
                }
                this.qqpp += ikhsxfx;
              }
              1 <= this.okn && (this.okn -= 1, this.ffll = this.cpxzr[this.okn].ffll.clone(), this.ilil = this.cpxzr[this.okn].ilil.clone(), this.vilsx = this.cpxzr[this.okn].vilsx.clone(), this.robdg = this.cpxzr[this.okn].robdg.clone(), this.yhbs = this.cpxzr[this.okn].yhbs, this.obnd = this.cpxzr[this.okn].obnd, 
              this.cpxzr[this.okn] = {}, n = !0, this.obnd += 1, this.obnd > this.edja && (this.edja = this.obnd));
            } else {
              m = parseInt(q);
            }
          }
        }
        d = new THREE.Vector3;
        d.subVectors(this.robdg, this.ffll);
        d.normalize();
        this.ilil.addVectors(d, this.ilil);
        this.ilil.normalize();
        p = .5 * (Math.abs(this.dds / this.whg - 1) + Math.abs(this.whg / this.eeiox));
        this.ilil.multiplyScalar(p);
        0 == n && this.ilil.applyMatrix3(f[m]);
        this.ffll.addVectors(this.ffll, this.ilil);
        d = new THREE.Vector3(.2, .4, .2);
        d.multiplyScalar(this.whg / this.eeiox);
        this.ffll.addVectors(this.ffll, d);
        this.ffll.addVectors(this.ffll, new THREE.Vector3(0, .1, 0));
        for (g = 0;g < ikhsxfx;g++) {
          new THREE.Vector3, d = e[g].clone(), 0 == n && d.applyMatrix3(f[m]), qrn.eia[a].geometry.attributes.normal.array[3 * this.qqpp + 3 * g] = d.x + Math.cos(g), qrn.eia[a].geometry.attributes.normal.array[3 * this.qqpp + 3 * g + 1] = d.y, qrn.eia[a].geometry.attributes.normal.array[3 * this.qqpp + 3 * g + 2] = d.z + Math.cos(g), d.multiplyScalar(this.yhbs), d.addVectors(this.ffll, d), qrn.eia[a].geometry.attributes.position.array[3 * this.qqpp + 
          3 * g] = d.x, qrn.eia[a].geometry.attributes.position.array[3 * this.qqpp + 3 * g + 1] = d.y, qrn.eia[a].geometry.attributes.position.array[3 * this.qqpp + 3 * g + 2] = d.z;
        }
        this.qqpp += ikhsxfx;
        this.yhbs = 3 == qrn.eia[a].type ? .4 * Math.abs(this.dds / this.whg - 1) * c + .1 : 4 == qrn.eia[a].type ? .3 * Math.abs(Math.pow(this.dds, this.dds / this.whg) / (.4 * this.whg) - 1) : .5 * (Math.abs(this.dds / this.whg - 1) + Math.abs(this.whg / this.eeiox));
        if (1 <= h && 0 == n) {
          this.qqpp -= k;
          for (n = 0;n < k / 2 - 1;n++) {
            qrn.eia[a].geometry.attributes.index.array[this.ddffi] = this.qqpp, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 1] = this.qqpp + 1, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 2] = this.qqpp + k / 2, this.ddffi += 3, qrn.eia[a].geometry.attributes.index.array[this.ddffi] = this.qqpp + k / 2, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 1] = this.qqpp + 1, qrn.eia[a].geometry.attributes.index.array[this.ddffi + 
            2] = this.qqpp + k / 2 + 1, this.ddffi += 3, this.qqpp += 1;
          }
          qrn.eia[a].geometry.attributes.index.array[this.ddffi] = this.qqpp;
          qrn.eia[a].geometry.attributes.index.array[this.ddffi + 1] = this.qqpp - (k / 2 - 1);
          qrn.eia[a].geometry.attributes.index.array[this.ddffi + 2] = this.qqpp + k / 2;
          this.ddffi += 3;
          qrn.eia[a].geometry.attributes.index.array[this.ddffi] = this.qqpp + 1;
          qrn.eia[a].geometry.attributes.index.array[this.ddffi + 1] = this.qqpp + k / 2;
          qrn.eia[a].geometry.attributes.index.array[this.ddffi + 2] = this.qqpp - (k / 2 - 1);
          this.ddffi += 3;
          this.qqpp += k / 2 + 1;
        }
        this.robdg = this.ffll.clone();
        this.vilsx = this.ilil.clone();
        d = q;
        this.ttyx = !1;
        this.dds += 1;
      }
      this.lli += 1;
      this.ttyx = !0;
    }
    this.whg >= this.eeiox && (qrn.eia[a].yuio = !1);
  };
}
;