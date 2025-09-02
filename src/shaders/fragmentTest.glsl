uniform float uTime;
uniform sampler2D uHexNormal;
uniform sampler2D uHexPosition;
uniform vec3 uHitPoint;

varying vec2 vUv;
varying vec3 vCenter;

void main() {
    vec2 uv = vec2(mod(vUv.x, 64.0) / 64.0, vUv.x / 64.0 / 64.0);
    vec3 hexNormal = texture2D(uHexNormal, uv).rgb;
    vec3 hexPosition = texture2D(uHexPosition, uv).rgb;
    hexPosition.x *= -1.0;
//    if(distance(hexPosition, uHitPoint) < 1)
//    {
//
//    }

//    gl_FragColor = vec4(hexPosition, 1.0);
//    gl_FragColor = vec4(uHitPoint, 1.0);
    gl_FragColor = vec4(1.0, 0.0, 1.0, (1.0 - distance(hexPosition, uHitPoint)) * (1.0 - vUv.y));

//    gl_FragColor.rgb = gl_FrontFacing ? vec3( 0.9, 0.9, 1.0 ) : vec3( 0.4, 0.4, 0.5 );
//    gl_FragColor = vec4(edge, edge, edge, 1.0);
//    gl_FragColor.a = edge;

//    float r = 0.5 + 0.5 * sin(uTime + vUv.x * 5.0);
//    float g = 0.5 + 0.5 * sin(uTime + vUv.y * 5.0);
//    float b = 0.5 + 0.5 * sin(uTime);
//    gl_FragColor = vec4(r, g, b, 1.0);
}