export default `

uniform sampler2D earth;
vec4 color;
float intensity;
vec3 blue = vec3(0.2,0.4,0.8);

varying vec2 vUV;
varying vec3 vNormal;

void main() {
    color = texture2D(earth,vUV);
    intensity = pow(1.0 - vNormal.z,1.5) * 3.0;
    
    blue = blue * intensity;
    
    gl_FragColor = vec4(vec3(color.xyz) + blue, 1.0);
}
`;