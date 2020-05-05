attribute vec3 color;

varying vec3 vPosition;
varying vec3 vColor;
varying vec3 vNormal;
varying vec3 vView;
varying vec3 vLight;

uniform float itt;
uniform vec4 light;
uniform float height;
uniform sampler2D pos;


float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main(){

  vec3 newPosition = position;

  vec4 h = texture2D(pos, color.xy);

  newPosition.xyz += h.xyz;

  vPosition = vec3(modelMatrix * vec4(newPosition,1.));
  vNormal = vec3(modelMatrix * vec4(normal,1.));
  vView = vPosition - cameraPosition;
  vLight = vPosition - light.xyz;
  vColor = color;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition,1.0);
}
