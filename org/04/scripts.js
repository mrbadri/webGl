import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';
const renderer = new THREE.WebGLRenderer({antialias:true});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
scene.add(camera);
camera.position.x = 7;
camera.position.y = 4;
camera.lookAt(0,0,0);

// const spot_light = new THREE.SpotLight(0xffffff,100);
// spot_light.distance = 15;
// spot_light.position.set(5,1,4);
// scene.add(spot_light);
// spot_light.castShadow = true;
// spot_light.shadow.mapSize.width = 2048;
// spot_light.shadow.mapSize.height = 2048;
// const am_light = new THREE.AmbientLight(0xffffff,0.5);
// scene.add(am_light);



//Add an ambient light
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Color, Intensity
// scene.add(ambientLight);
//
// // Add a point light
// const pointLight = new THREE.PointLight(0xffffff, 5, 100, 0); // Color, Intensity, Distance, Decay
// pointLight.position.set(5, 1, 4);
// scene.add(pointLight);
//
// // Add a spot light
// const spotLight = new THREE.SpotLight(0xffffff, 3, 100, (Math.PI / 180) * 20, 1, 0); // Color, Intensity, Distance, Angle, Penumbra, Decay
// spotLight.position.set(5, 1, 4);
// spotLight.castShadow = true;
// scene.add(spotLight);
//
// // Add a directional light
// const directionalLight = new THREE.DirectionalLight(0x00ff00, 0.5); // Color, Intensity
// directionalLight.position.set(1, 1, 0);
// scene.add(directionalLight);
//
// // Add a hemisphere light
// const hemisphereLight = new THREE.HemisphereLight(0xffff00, 0x0000ff, 1); // SkyColor, GroundColor, Intensity
// scene.add(hemisphereLight);

const arealight = new THREE.RectAreaLight(0xff0000,200,10,20);
arealight.position.set(-1,-0.5,0);
arealight.rotation.y = -Math.PI / 4;
arealight.rotation.x = -Math.PI / 10;
scene.add(arealight);


const areaLightGeo = new THREE.PlaneGeometry(1,2);
const areaLightMtl = new THREE.MeshBasicMaterial({color: 0xff0000});
const reactArea = new THREE.Mesh(areaLightGeo,areaLightMtl);
reactArea.position.set(1,0.5,0);
reactArea.rotation.y = Math.PI / 4;
reactArea.rotation.x = Math.PI / 10;
scene.add(reactArea);

const geometry = new THREE.BoxGeometry(1,1);
const mtl1 = new THREE.MeshLambertMaterial({color : 0xff0044});
const mtl2 = new THREE.MeshLambertMaterial({color : 0xffff44});
const mtl3 = new THREE.MeshLambertMaterial({color : 0x0000ff});
const mtl4 = new THREE.MeshLambertMaterial({color : 0x00ffff});
const mtl5 = new THREE.MeshLambertMaterial({color : 0xffffff,transparent: true,opacity:1});
const mtl6 = new THREE.MeshLambertMaterial({color : 0xff6644});


for(let i = 0;i<3;i++){
    const mtl = new THREE.MeshLambertMaterial({color : 0xff0044});
    const box = new THREE.Mesh(geometry,[mtl1,mtl2,mtl3,mtl4,mtl5,mtl6]);
    // box.position.y = 0.6;
    // box.position.z = (i*1.5) - 1.5;

    box.position.set(0,0.6,(i*1.5) - 1.5);
    box.rotation.set(0,(Math.PI / 180) * 30,0);
    //box.visible = false;
    box.castShadow = true;
    box.name = 'box'+i;
    scene.add(box);
    box.visible = false;
}


// scene.traverse(function (child) {
//     if(child instanceof THREE.Mesh) {
//         child.material.color.setHex(0x6688ff);

//     }
// });



const plane_geo = new THREE.PlaneGeometry(5,5);
const plane_mtl = new THREE.MeshLambertMaterial({color: 0xdddddd,side: THREE.DoubleSide});
const ground = new THREE.Mesh(plane_geo,plane_mtl);
ground.rotation.x = Math.PI / 2;
scene.add(ground);
ground.receiveShadow = true;


console.log("All children in the scene:", scene.children);


let delta = 0;
function run() {

    let centerBox = scene.getObjectByName('box1');
    centerBox.rotation.y += 0.002;

    delta = Date.now() / 1000;
    let leftBox = scene.getObjectByName('box2');
    leftBox.position.y = 1 + (Math.sin(delta) / 2);

    renderer.render(scene,camera);
    requestAnimationFrame(run);
}

run();

