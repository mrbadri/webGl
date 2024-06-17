import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x0055ff,3,5);

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
scene.add(camera);
camera.position.x = 5;
camera.position.y = 3;
camera.lookAt(0,0,0);

const spot_light = new THREE.SpotLight(0xffffff,100);
spot_light.distance = 15;
spot_light.position.set(5,1,4);
scene.add(spot_light);
spot_light.castShadow = true;
spot_light.shadow.mapSize.width = 2048;
spot_light.shadow.mapSize.height = 2048;
const am_light = new THREE.AmbientLight(0xffffff,0.5);
scene.add(am_light);


const geometry = new THREE.BoxGeometry(1,1);
//const mtl = new THREE.MeshBasicMaterial({color : 0xff0044});
const mtl = new THREE.MeshLambertMaterial({color : 0xff0044});
const box = new THREE.Mesh(geometry,mtl);
box.position.y = 0.6;
box.castShadow = true;
scene.add(box);

const plane_geo = new THREE.PlaneGeometry(5,5);
const plane_mtl = new THREE.MeshLambertMaterial({color: 0xdddddd,side: THREE.DoubleSide});
const ground = new THREE.Mesh(plane_geo,plane_mtl);
ground.rotation.x = Math.PI / 2;
scene.add(ground);
ground.receiveShadow = true;
renderer.render(scene,camera);