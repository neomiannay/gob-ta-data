uniform vec3 color;
varying vec3 vPosition;
varying vec2 vUv;

uniform float uTime;
uniform float uWaveSpeed;
uniform float uWaveFrequency;
uniform float uRandom;

void main() {
    float directionColor = abs(cos((uTime + uRandom * 10000.) * uWaveSpeed - vUv.x * uWaveFrequency));

    gl_FragColor = vec4(
    color * directionColor,
    1.0);
}