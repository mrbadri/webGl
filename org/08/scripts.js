import * as THREE from 'three';
import {FBXLoader} from "three/addons/loaders/FBXLoader";
import {MTLLoader} from "three/addons/loaders/MTLLoader";
import {OBJLoader} from "three/addons/loaders/OBJLoader";

import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 0;
camera.position.y = 4;
camera.position.z = 8;
camera.lookAt(0,0,0);


scene.add(new THREE.DirectionalLight());


const bodyMtl = new THREE.MeshStandardMaterial({
    color: 0xff0000,
});
const Mtl = new THREE.MeshStandardMaterial({
    color: 0x113355,
    side: THREE.DoubleSide
});

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( 'model/' );

// let wheel1 = {
//     rotation: {
//         x: 0
//     }
// };
// let wheel2 = {
//     rotation: {
//         x: 0
//     }
// };
// let wheel3 = {
//     rotation: {
//         x: 0
//     }
// };
// let wheel4 = {
//     rotation: {
//         x: 0
//     }
// };

// const loader = new GLTFLoader();
// loader.setDRACOLoader( dracoLoader );
// loader.load( 'model/gltf.glb', function (model) {
//
//     model.scene.traverse(function (part) {
//         part.material = Mtl;
//     })
//
//     const body = model.scene.getObjectByName('Plane');
//     body.traverse(function (part) {
//         part.material = bodyMtl;
//     });
//
//     scene.add(model.scene);
// });

const loader = new GLTFLoader();
loader.setDRACOLoader( dracoLoader );
loader.load( 'model/mirror.glb', function (model) {

    const models = model.scene;
    const group = new THREE.Group();
    group.add(models);
    const box = models.getObjectByName('Cube').clone();
    box.rotation.y = Math.PI;
    box.position.x = -2.2
    group.add(box);
    scene.add(group);
});

// loader.load( 'gltf.obj', function (carGeo) {
//
//     const carMesh = new THREE.Mesh(carGeo,new THREE.MeshStandardMaterial());
//     scene.add(carMesh);
// });


const animate = () => {
    requestAnimationFrame(animate);
    // wheel1.rotation.x += 0.01;
    // wheel2.rotation.x += 0.01;
    // wheel3.rotation.x += 0.01;
    // wheel4.rotation.x += 0.01;
    renderer.render(scene, camera);
};

animate();
