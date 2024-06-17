import * as THREE from 'three';
//import {OrbitControls} from "three/addons/controls/OrbitControls";
import {lights} from "./light";
import {room} from './room';
import {chandelier} from './chandelier';
import {wall} from './wall';
import {create_svg} from './create-svg';
import {plant} from './plant';
import {stand} from './stand';
import {chair} from './chair';
import {materials} from "./materials";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";

const renderer = new THREE.WebGLRenderer({antialias: true});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,.01,500);
camera.rotation.order = "YXZ";
scene.add(camera);
camera.position.x = 25;
camera.position.y = 1.5;
camera.position.z = 1;
camera.lookAt(0,1,10);

// const fpControls = new OrbitControls(camera,renderer.domElement);
// fpControls.target = new THREE.Vector3(15,1,10);

const all_lights = new lights();
//scene.add(all_lights.directional());
scene.add(all_lights.ambient());
scene.add(all_lights.sun());
all_lights.point(scene,[15,2,11],1,15,0);

const room_mesh = new room(26,3.5,13);
scene.add(room_mesh);

const plantInstance = new plant(scene);

new chandelier(22,7,scene,true);

new chandelier(12,7.5,scene,true);

new chandelier(16,7.5,scene);

new chandelier(16,3,scene);
new chandelier(9,3,scene);

new chandelier(3,9,scene);

scene.add(new chair(16,12.4));
scene.add(new chair(9,12.4));

scene.add(new stand(12,8.5));
scene.add(new stand(16,8.5));

const panelPoints = [
  {x: 20,y: 1 ,z: 7,id: 1},
  {x:16,y: 1 ,z:5.5,id: 2},
  {x:10,y: 1 ,z:5.5,id: 3},
  {x:7.5,y: 1 ,z:7.3,id: 4},
];

const wall_1 = new wall(20,4.8,-90,4.5,2,'textures/panel1.jpg');
scene.add(wall_1);

const wall_2 = new wall(18.5,5.1,180,5,2,'textures/pngtree.jpg');
scene.add(wall_2);

const wall_3 = new wall(12.5,5.1,180,5,2,'textures/0785669.jpg');
scene.add(wall_3);

const wall_4 = new wall(6,5.2,-90,4.5,2,'textures/974048.webp');
scene.add(wall_4);

const panel = (position,photo)=>{
  const geo = new THREE.BoxGeometry(1.1,1.1,0.04);
  const basicMtl = new THREE.MeshBasicMaterial({color: 0x000000,side: THREE.DoubleSide});
  const texture = new materials().panel(photo);
  const mtl = [basicMtl,basicMtl,basicMtl,basicMtl,basicMtl,texture];
  const mesh = new THREE.Mesh(geo,mtl);
  mesh.position.set(position[0],position[1],position[2]);
  mesh.rotation.set(0,Math.PI,0);
  mesh.receiveShadow = true;
  scene.add(mesh);
}

panel([8.5,1.5,0],'textures/974048.webp');
panel([15,1.5,0],'textures/0785669.jpg');
panel([1.5,1.5,0],'textures/pngtree.jpg');



new THREE.TextureLoader().load('textures/env.jpg',function (texture) {
  texture.encoding = THREE.sRGBEncoding;
  const geo = new THREE.CylinderGeometry(20,20,20,6,1,0,.0195 * -56,.0174 * 120);
  const mtl = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide
  });
  const mesh = new THREE.Mesh(geo,mtl);
  mesh.position.set(10,2,4);
  scene.add(mesh);
});
const roadPoints = [
  [250,55],
  [220,60],
  [205,115],
  [165,70],
  [80,70],
];
new create_svg(roadPoints);

let d = 0;
const cameraPosition = [roadPoints[0][0] / 10,roadPoints[0][1] / 10];
const cameraPosition0 = [(roadPoints[0][0] / 10) + 0.1 ,(roadPoints[0][1] / 10) - 0.05];
const roadpath = document.getElementById('roadpath');
const roadpath_length = roadpath.getTotalLength();
function road_update() {
  const pathPos = roadpath.getPointAtLength(roadpath_length * d);
  cameraPosition[0] = pathPos.x / 10;
  cameraPosition[1] = pathPos.y / 10;
  cameraPosition[2] = Math.atan2(cameraPosition0[0] - cameraPosition[0] < 0.005 && cameraPosition0[0] - cameraPosition[0] > -0.01 ? 0.01:cameraPosition0[0] - cameraPosition[0],cameraPosition0[1] - cameraPosition[1]);

  cameraPosition0[0] = cameraPosition[0];
  cameraPosition0[1] = cameraPosition[1];

}
let scrollSpeed = 0.01;
window.addEventListener('wheel',function (event) {
  if(event.deltaY < 0){
    if(d > 0){
      d -= scrollSpeed;
    }
  }else {
    if(roadpath_length * d < roadpath_length){
      d += scrollSpeed;
    }
  }

  road_update();
});
road_update();
const time = new THREE.Clock();

let newCameraPos_Z = cameraPosition[1];
let newCameraPos_X = cameraPosition[0];
let newCameraRotation_Z = 0;
let newCameraRotation_Y = 2.09;

const mouse = {x:0,y:0}
addEventListener('mousemove',()=>{
  mouse.x = ((event.clientY / window.innerHeight) - 0.5) * 0.3;
  mouse.y = ((event.clientX / window.innerWidth) - 0.5) * 0.5;
});
const render = () => {
  requestAnimationFrame(render);

  let ShowingContent = false;
  panelPoints.forEach(function (position) {
    const distance = camera.position.distanceTo(position);
    let layout = document.getElementById('layout-'+position.id);

    if (distance < 2.8 && camera.position.x + 0.5 > position.x) {
      if(layout){
        layout.classList.add('active');
      }
      ShowingContent = true;
      cameraPosition[2] = Math.atan2(camera.position.x - position.x, camera.position.z - position.z);
    }else {
      if(layout){
        layout.classList.remove('active');
      }
    }
  });
  if(ShowingContent){
    scrollSpeed = 0.005;
  }else {
    scrollSpeed = 0.01;
  }

  newCameraPos_Z = newCameraPos_Z + (cameraPosition[1] - newCameraPos_Z) * 0.015;
  newCameraPos_X = newCameraPos_X + (cameraPosition[0] - newCameraPos_X) * 0.025;

  newCameraRotation_Y = newCameraRotation_Y + ((cameraPosition[2] - mouse.y) - newCameraRotation_Y) * 0.03;
  newCameraRotation_Z = newCameraRotation_Z + ((- mouse.x) - newCameraRotation_Z) * 0.04;

  camera.position.set(newCameraPos_X,1.1,newCameraPos_Z);
  camera.rotation.set(newCameraRotation_Z,newCameraRotation_Y,0);

  renderer.render(scene,camera);
}
render();


window.addEventListener('resize', () => {
  const newWidth = window.innerWidth;
  const newHeight = window.innerHeight;

  camera.aspect = newWidth / newHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(newWidth, newHeight);
})