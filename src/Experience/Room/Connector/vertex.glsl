uniform float uWaveIntensity;
uniform float uWaveSpeed;
uniform float uWaveFrequency;

uniform float uNoiseIntensity;
uniform float uNoiseSpeed;
uniform float uNoiseFrequency;

uniform float uRandom;

uniform float uTime;
varying vec3 vPosition;
varying vec2 vUv;

void main() {
    vUv = uv;
    vPosition = position;

    float directionPosition = 1. - abs(cos((uTime + uRandom  * 10000.) * uWaveSpeed - vUv.x * uWaveFrequency));

    vPosition += normal * directionPosition * uWaveIntensity;
    vPosition += normal * abs(snoise(vec4(vPosition * uNoiseFrequency, uTime * uNoiseSpeed)) * uNoiseIntensity);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(vPosition, 1.0);
}