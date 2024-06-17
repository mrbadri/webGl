import * as THREE from 'three';

const renderer = new THREE.WebGLRenderer();
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

