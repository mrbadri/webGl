export default `

uniform float time;
float blue = 0.0;
varying vec2 vUV;

void main() {
    if(vUV.x > (sin(time + vUV.y * 10.0) / 4.0) + 0.5){
        blue = clamp(time , 0.0, 1.0);
    }else{
        blue = 0.0;
    }
    gl_FragColor = vec4(1.0, 0.0, blue, 1.0);
}
`;