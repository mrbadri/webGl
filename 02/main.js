import * as THREE from "three";

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  100
);

scene.add(camera);

camera.position.x = 5;
camera.position.y = 3;
camera.position.z = 3;
camera.lookAt(0, 0, 0);

const spotLight = new THREE.SpotLight(0xffffff, 100);

spotLight.position.set(5, 1, 4);
scene.add(spotLight);

// GROUND
const planeGeometry = new THREE.PlaneGeometry(5, 4);

// // -- material
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xff0044 });

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);

planeMesh.rotation.x = Math.PI / 5;

scene.add(planeMesh);

// BOX
const boxGeometry = new THREE.BoxGeometry(1, 1);

// -- material
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0044 });
// const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0044 });

const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

scene.add(boxMesh);

renderer.render(scene, camera);
