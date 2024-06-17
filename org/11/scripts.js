import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {OrbitControls} from "three/addons/controls/OrbitControls";

const renderer = new THREE.WebGLRenderer({antialias:true});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000,50,100);
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
scene.add(camera);
camera.position.set(15,4,13);
camera.lookAt(0,1,0);

const fpControls = new OrbitControls(camera,renderer.domElement);

const spot_light = new THREE.PointLight(0xffffff,10,100,0.8);
spot_light.distance = 15;
spot_light.position.set(0,10,4);
scene.add(spot_light);
spot_light.castShadow = true;
spot_light.shadow.mapSize.width = 2048;
spot_light.shadow.mapSize.height = 2048;
const am_light = new THREE.AmbientLight(0xffffff,0.1);
scene.add(am_light);


const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

const bodyGround = new CANNON.Body({type: CANNON.Body.STATIC}); //CANNON.Body.DYNAMIC //CANNON.Body.KINEMATIC
bodyGround.addShape(new CANNON.Plane());
bodyGround.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(bodyGround);

const plane_geo = new THREE.PlaneGeometry(200,200);
const plane_mtl = new THREE.MeshLambertMaterial({color: 0xdddddd,side: THREE.DoubleSide});
const ground = new THREE.Mesh(plane_geo,plane_mtl);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);
ground.receiveShadow = true;
renderer.render(scene,camera);

const bodyMTL = new CANNON.Material({
    friction: 5,
    restitution: 0
});

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshLambertMaterial({ color: 0xeeff00 });

const boxes = [];
for (var i = -5; i < 5; i++) {
    for (var j = 0.5; j < 6; j++) {
        var box = new THREE.Mesh(geometry, material);
        box.position.set(i, j, 0);
        box.castShadow = true;
        scene.add(box);

        const bodyShape = new CANNON.Box(new CANNON.Vec3(.5,.5,.5));
        const body = new CANNON.Body({mass: 1,shape: bodyShape});
        body.position.set(i, j, 0);
        body.material = bodyMTL;
        world.addBody(body);

        boxes.push({
            mesh: box,
            body: body
        });
    }
}

const time = new THREE.Clock();


const bullGeo = new THREE.SphereGeometry(0.2,6,6);
const bullMTL = new THREE.MeshLambertMaterial(0xff0033);

const bolls = [];
function shoot() {
    const bollMesh = new THREE.Mesh(bullGeo,bullMTL);
    bollMesh.position.copy(camera.position);
    scene.add(bollMesh);

    const SphereShape = new CANNON.Sphere(0.2);
    const bollBody = new CANNON.Body({mass: 1,shape:SphereShape});
    bollBody.position.set(camera.position.x,camera.position.y,camera.position.z);
    world.addBody(bollBody);

    const cameraPosition = camera.position.clone();
    cameraPosition.multiplyScalar(-3);
    bollBody.velocity.set(cameraPosition.x,cameraPosition.y+8,cameraPosition.z);

    bolls.push({
        mesh: bollMesh,
        body: bollBody
    });
}

document.addEventListener('click',shoot);

let frameRate = 60;
let frameRateCounter = 0;
setInterval(function () {
    frameRate = frameRateCounter * 2;
    frameRateCounter = 0;
},500);
const render = () => {
    requestAnimationFrame(render);
    frameRateCounter++;
    boxes.forEach(function (box) {
        box.mesh.position.copy(box.body.position);
        box.mesh.quaternion.copy(box.body.quaternion);
    });

    bolls.forEach(function (box) {
       box.mesh.position.copy(box.body.position);
    });

    fpControls.update(time.getDelta());
    renderer.render(scene, camera);
    world.step(1/frameRate);
};
render();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});
