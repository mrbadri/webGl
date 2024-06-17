import * as THREE from 'three';
import vertexShader from './vertexShader.js';
import fragmentShader from './fragmentShader.js';

import airVertexShader from './airVertexShader.js';
import airFragmentShader from './airFragmentShader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 8;
camera.lookAt(0,0,0);


const geometry = new THREE.SphereGeometry(3.5,32,32);
const material = new THREE.ShaderMaterial({
    uniforms: {
        earth : { value: new THREE.TextureLoader().load('map.jpg')}
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);



const airMaterial = new THREE.ShaderMaterial({
    vertexShader: airVertexShader,
    fragmentShader: airFragmentShader,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
});
const airCube = new THREE.Mesh(geometry, airMaterial);
airCube.scale.set(1.1,1.1,1.1);
scene.add(airCube);

const animate = () => {
    sphere.rotation.y += 0.001;
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();
