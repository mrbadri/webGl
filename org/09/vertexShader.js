export default `

varying vec2 vUV;

void main() {
    vUV = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// Math Functions:
//     abs(x): Returns the absolute value of x.
//     sin(x), cos(x), tan(x): Trigonometric functions.
//     sqrt(x): Returns the square root of x.
//     pow(x, y): Returns x raised to the power of y.
//     exp(x): Returns the exponential value of x.
//     log(x): Returns the natural logarithm of x.
//     min(x, y): Returns the minimum of x and y.
//     max(x, y): Returns the maximum of x and y.
//     clamp(x, minVal, maxVal): Clamps x to the range [minVal, maxVal].
//     mix(x, y, a): Linear interpolation between x and y using the parameter a.
//
//
// Vector Functions:
//     length(x): Returns the length of vector x.
//     normalize(x): Returns a normalized version of vector x.
//     dot(x, y): Returns the dot product of vectors x and y.
//     cross(x, y): Returns the cross product of vectors x and y.
//
//
// Matrix Functions:
//     mat4, mat3, mat2: Data types for 4x4, 3x3, and 2x2 matrices.
//     matrixCompMult(x, y): Component-wise multiplication of matrices x and y.
//     transpose(x): Returns the transpose of matrix x.
//
//
// Texture Sampling Functions:
//     texture2D(sampler, coord): Samples a 2D texture using a sampler and 2D texture coordinates.
//     textureCube(sampler, coord): Samples a cube map texture using a sampler and 3D texture coordinates.
//
// Fragment Position:
//
//     Color Conversion Functions:
//
//     rgbToHsv(color): Converts RGB color to HSV color.
//     hsvToRgb(color): Converts HSV color to RGB color.
//
//
// Noise Functions:
//     noise(vec2 x): Generates 2D Perlin noise.
//     noise(vec3 x): Generates 3D Perlin noise.
//     Geometric Functions:
//
//
//     smoothstep(x, y, a): => 0 ~ 1
//     step(edge, x): Returns 0.0 if x is less than edge, else 1.0.