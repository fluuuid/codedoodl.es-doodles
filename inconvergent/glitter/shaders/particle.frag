#extension GL_OES_standard_derivatives: enable

uniform float itt;
uniform float mode;
uniform vec2 window;
uniform float pixelRatio;
uniform vec3 mousePos;
uniform float n;

varying vec3 vColor;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vLight;

uniform sampler2D pos;
uniform sampler2D vel;

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 setColor(){
  vec3 v = texture2D(vel, vColor.xy).xyz;
  vec3 p = texture2D(pos, vColor.xy).xyz;
  vec3 df = mousePos-p;
  float hue = clamp(0.4+pow(length(df.xy)*0.0002,0.5),0.0,1.0);

  float s = clamp(length(v.xy)*0.5,0.0,1.0);
  return hsv2rgb(vec3(hue,1.0-s,s*0.7));
}

void main(){

  float vdist = length(vView);
  vec3 I = setColor();

  gl_FragColor = vec4(
    I,
    1.0
  );
}
