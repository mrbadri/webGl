import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "dat.gui";

// Utills

const getRandomColor = () =>
  new THREE.Color(Math.random(), Math.random(), Math.random());

const getDegree = (degree) => (Math.PI / 180) * degree;

// Initialize renderer
const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth, window.innerHeight);

// active shadow
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.VSMShadowMap;

// Initialize scene
const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0000ff, 3, 15);

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
spotLight.position.set(3, 1, 2);
spotLight.power = 60;
spotLight.distance = 8;
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1000;
spotLight.shadow.mapSize.height = 1000;
scene.add(spotLight);

const AmbientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(AmbientLight);

// Add ground
const planeGeometry = new THREE.PlaneGeometry(6, 8);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xdddddd });
const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
planeMesh.rotation.x = Math.PI * 1.5;
planeMesh.position.y = -0.6;
planeMesh.receiveShadow = true;
scene.add(planeMesh);

// Add box
const boxGeometry = new THREE.BoxGeometry(1, 1);

const boxMaterial1 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
});
const boxMaterial2 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
});
const boxMaterial3 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
});
const boxMaterial4 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
});
const boxMaterial5 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
  transparent: true,
  opacity: 0.5,
});
const boxMaterial6 = new THREE.MeshLambertMaterial({
  color: getRandomColor(),
});

for (let i = 0; i < 3; i++) {
  // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  const boxMesh = new THREE.Mesh(boxGeometry, [
    boxMaterial1,
    boxMaterial2,
    boxMaterial3,
    boxMaterial4,
    boxMaterial5,
    boxMaterial6,
  ]);

  // boxMesh.position.z = i * 1.5 - 1.5;
  boxMesh.position.set(0, 0, i * 1.5 - 1.5);
  // boxMesh.rotation.set(0, getDegree(45), 0);

  // boxMesh.visible = false;

  boxMesh.castShadow = true;
  boxMesh.name = `box${i}`;
  scene.add(boxMesh);
}

// scene.traverse(function (child) {
//   if (child.name) {
//     const color = new THREE.Color(Math.random(), Math.random(), Math.random());
//     child.material.color.set(color);
//     renderer.render(scene, camera);
//   }
// });

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Add dat.GUI
const gui = new GUI();

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
  const boxCenter = scene.getObjectByName("box1");
  boxCenter.position.y = 0.5;
  boxCenter.rotation.y += 0.02;
  boxCenter.rotation.x += 0.01;
  boxCenter.rotation.z += 0.01;

  requestAnimationFrame(animate);
  // controls.update();
  renderer.render(scene, camera);
}

animate();

renderer.render(scene, camera);
