import * as THREE from 'three';
import vertexShader from './vertexShader.js';
import fragmentShader from './fragmentShader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;
camera.lookAt(0,0,0);


const geometry = new THREE.PlaneGeometry(5,5);
const material = new THREE.ShaderMaterial({
    uniforms: {
        time : {value: 0}
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const animate = () => {

    material.uniforms.time.value += 0.002;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
