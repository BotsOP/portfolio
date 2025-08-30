uniform float uTime;
varying vec2 vUv;

void main() {
    float r = 0.5 + 0.5 * sin(uTime + vUv.x * 5.0);
    float g = 0.5 + 0.5 * sin(uTime + vUv.y * 5.0);
    float b = 0.5 + 0.5 * sin(uTime);
    gl_FragColor = vec4(r, g, b, 1.0);
}