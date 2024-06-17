export default `


vec4 color;
float intensity;
vec3 blue = vec3(0.2,0.4,0.8);

varying vec2 vUV;
varying vec3 vNormal;

void main() {
    intensity = pow(1.0 - vNormal.z,5.0) * 1.0;
    blue = blue * intensity;
    
    gl_FragColor = vec4(vec3(color.xyz) + blue, 1.0);
}
`;