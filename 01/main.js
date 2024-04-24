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
camera.position.y = 5;
camera.position.z = 5;
camera.lookAt(0, 0, 0);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0044 });

const box = new THREE.Mesh(geometry, material);

scene.add(box);

renderer.render(scene, camera);
