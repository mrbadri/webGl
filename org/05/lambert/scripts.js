import * as THREE from 'three';
import {FBXLoader} from "three/addons/loaders/FBXLoader";

let scene, camera, renderer;
let loader, model, animationMixer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.x = 5;
camera.position.y = 2;
camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);





const bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    map: null,
    transparent: true,
    opacity: 1,

    // emissive: 0x000088,
});



const blackMaterial = new THREE.MeshLambertMaterial({color: 0x333333,side: THREE.DoubleSide});





loader = new FBXLoader();
loader.load('../audi.fbx', (fbx) => {
    model = fbx;
    model.traverse(function (child) {
        if(child.name === 'Plane'){
            child.material = bodyMaterial;
        }else {
            child.material = blackMaterial;
        }
    });
    scene.add(model);
    model.position.set(0, 0, 0);
});
// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0x666666,0.3);
scene.add(ambientLight);

const PointLight = new THREE.PointLight(0xffffff,5,15,0.6);
PointLight.position.set(5, 2, 7);
scene.add(PointLight);

// Animate the scene
const animate = () => {
    requestAnimationFrame(animate);
    if (animationMixer) {
        animationMixer.update(0.01);
    }
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Start the animation
animate();

