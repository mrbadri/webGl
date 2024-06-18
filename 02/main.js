import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// active shadow
renderer.shadowMap.enabled = true;

// Initialize scene
const scene = new THREE.Scene();

// Initialize camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

scene.add(camera);
camera.position.x = 5;
camera.position.y = 3;
camera.lookAt(0, 0, 0);

// Add lighting
const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(5, 1, 4);
spotLight.power = 60;
spotLight.distance = 8;
spotLight.castShadow = true;
scene.add(spotLight);

const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(AmbientLight);

// Add ground
const planeGeometry = new THREE.PlaneGeometry(5, 4);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = Math.PI * 1.5;
planeMesh.position.y = -0.6;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// Add box
const boxGeometry = new THREE.BoxGeometry(1, 1);
const boxMaterial = new THREE.MeshLambertMaterial({ color: 0xff0044 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.castShadow = true;
scene.add(boxMesh);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Add dat.GUI
const gui = new GUI();

const boxFolder = gui.addFolder("Box");
boxFolder.add(boxMesh.position, "x", -10, 10).name("Position X");
boxFolder.add(boxMesh.position, "y", -10, 10).name("Position Y");
boxFolder.add(boxMesh.position, "z", -10, 10).name("Position Z");
boxFolder.add(boxMesh.rotation, "x", 0, Math.PI * 2).name("Rotation X");
boxFolder.add(boxMesh.rotation, "y", 0, Math.PI * 2).name("Rotation Y");
boxFolder.add(boxMesh.rotation, "z", 0, Math.PI * 2).name("Rotation Z");
boxFolder
  .addColor({ color: 0xff0044 }, "color")
  .onChange((value) => {
    boxMesh.material.color.set(value);
  })
  .name("Color");

const planeFolder = gui.addFolder("Plane");
planeFolder.add(planeMesh.position, "x", -10, 10).name("Position X");
planeFolder.add(planeMesh.position, "y", -10, 10).name("Position Y");
planeFolder.add(planeMesh.position, "z", -10, 10).name("Position Z");
planeFolder.add(planeMesh.rotation, "x", 0, Math.PI * 2).name("Rotation X");
planeFolder.add(planeMesh.rotation, "y", 0, Math.PI * 2).name("Rotation Y");
planeFolder.add(planeMesh.rotation, "z", 0, Math.PI * 2).name("Rotation Z");
planeFolder
  .addColor({ color: 0xff0044 }, "color")
  .onChange((value) => {
    planeMesh.material.color.set(value);
  })
  .name("Color");

const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "x", -10, 10).name("Position X");
cameraFolder.add(camera.position, "y", -10, 10).name("Position Y");
cameraFolder.add(camera.position, "z", -10, 10).name("Position Z");

const spitLightFolder = gui.addFolder("spot light");
spitLightFolder.add(spotLight.position, "x", -10, 10).name("Position X");
spitLightFolder.add(spotLight.position, "y", -10, 10).name("Position Y");
spitLightFolder.add(spotLight.position, "z", -10, 10).name("Position Z");
spitLightFolder.add(spotLight, "power", 0, 1000).name("Power");
spitLightFolder.add(spotLight, "distance", -100, 100).name("Distance");
spitLightFolder.open();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
