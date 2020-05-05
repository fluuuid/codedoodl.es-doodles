#extension GL_OES_standard_derivatives: enable

uniform float itt;
uniform float mode;
uniform sampler2D vel;
uniform sampler2D pos;
uniform float n;
uniform float size;
uniform vec3 mousePos;
uniform float mouseScale;

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec3 initialVel(){
  vec2 here = gl_FragCoord.xy/n;
  vec3 v = vec3(
    rand(here.xy),
    rand(here.yx),
    rand(here.xy+here.yx)
  );
  return vec3(0.0);
}

vec3 initialPos(vec2 here){
  vec3 p = vec3(
    rand(here.xy),
    rand(here.yx),
    rand(here.xy+here.yx)
  );

  //p.z = 0.5;
  p = (0.5-p)*size;
  p.z *= 0.1;
  return p;
}

vec3 nextVel(){

  float limit = 6.0;
  float slowdown = 0.9;
  float stp = 50.0;

  vec2 here = gl_FragCoord.xy/n;
  vec3 initial = initialPos(here);
  vec3 v = texture2D(vel, here).xyz;
  vec3 p = texture2D(pos, here).xyz;

  vec2 dv1 = p.xy - mousePos.xy;
  vec2 dv2 = initial.xy - p.xy;

  float dd = length(dv1);
  float dd2 = length(dv2);

  dv1 = clamp(dv1/dd/dd,-limit,limit);

  if (dd2<5.0){
    dv2 = vec2(0.0);
  }
  else{
    dv2 = 0.1*normalize(dv2);
  }

  v.xy = slowdown*v.xy + 
         stp*dv1*mouseScale + 
         dv2;

  return v;
}

vec3 nextPos(){
  vec2 here = gl_FragCoord.xy/n;
  vec3 p = texture2D(pos, here).xyz;
  vec3 v = texture2D(vel, here).xyz;
  return p+v;
}

void main(){

  vec3 v = vec3(0.0);

  if (mode < -1.0){
    v = initialVel();
  }
  else if (mode < 0.0){
    vec2 here = gl_FragCoord.xy/n;
    v = initialPos(here);
  }

  else if (mode < 1.0){
    v = nextVel();
  }

  else if (mode < 2.0){
    v = nextPos();
  }

  gl_FragColor = vec4(v,1.0);
}
