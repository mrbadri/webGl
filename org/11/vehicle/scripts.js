import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import {OrbitControls} from "three/addons/controls/OrbitControls";
//import CannonDebugger from 'cannon-es-debugger';

const renderer = new THREE.WebGLRenderer({antialias:true});
document.body.appendChild(renderer.domElement);
renderer.setSize(window.innerWidth,window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000,50,100);
const camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight,1,100);
scene.add(camera);
camera.position.set(15,4,0);
camera.lookAt(0,1,0);

const fpControls = new OrbitControls(camera,renderer.domElement);

const spot_light = new THREE.PointLight(0xffffff,6,100,0.2);
spot_light.position.set(0,20,4);
scene.add(spot_light);
spot_light.castShadow = true;
spot_light.shadow.mapSize.width = 2048;
spot_light.shadow.mapSize.height = 2048;
const am_light = new THREE.AmbientLight(0xffffff,0.1);
scene.add(am_light);

const sincObjects = [];

const world = new CANNON.World();
world.gravity.set(0,-9.8,0);

//const CannonDebug = new CannonDebugger(scene,world);

const groundX = 64;
const groundZ = 64;

const groundGeo = new THREE.PlaneGeometry(groundX,groundZ,groundX-1,groundZ-1);
const groundMTL = new THREE.MeshLambertMaterial({color: 0x888888});

const HeightFieldArray = [];

let jCounter = 0;
let jArray = [];
for (let i=0;i<=groundGeo.attributes.position.array.length;i += 3){
    jCounter++;
    const x = groundGeo.attributes.position.array[i];
    const y = groundGeo.attributes.position.array[i+1];
    const z = Math.sin(x/3) * Math.sin(y/3) * 0.6;
    groundGeo.attributes.position.array[i+2] = z;
    jArray.push(-z+0.1);
    if(jCounter === 64){
        jCounter = 0;
        HeightFieldArray.push(jArray);
        jArray = [];
    }
}

const groundMesh = new THREE.Mesh(groundGeo,groundMTL);
groundMesh.rotation.set(-Math.PI/2,0,0);
scene.add(groundMesh);


const groundShape = new CANNON.Heightfield(HeightFieldArray,{
    elementSize: 1.015
});
const groundBody = new CANNON.Body({mass: 0});
groundBody.addShape(groundShape);
groundBody.quaternion.setFromEuler(-Math.PI/2,0,0);
//groundBody.position.set(-groundX * groundShape.elementSize / 2,0,-groundZ * groundShape.elementSize / 2);
groundBody.position.set(-32,0,32);

world.addBody(groundBody);


const CarShape = new CANNON.Box(new CANNON.Vec3(1,0.5,2));
const carBody = new CANNON.Body({mass: 100,shape:CarShape});
carBody.position.set(0,2,0);
world.addBody(carBody);

const carGeo = new THREE.BoxGeometry(2,1,4);
const carMTL = new THREE.MeshLambertMaterial({color: 0xaa44ff})
const carMesh = new  THREE.Mesh(carGeo,carMTL);
scene.add(carMesh);

sincObjects.push([carMesh,carBody]);
const hinges = [];
const pivots = [
    new CANNON.Vec3(1,-0.6,-1.2),
    new CANNON.Vec3(1,-0.6,1.2),
    new CANNON.Vec3(-1,-0.6,-1.2),
    new CANNON.Vec3(-1,-0.6,1.2),
];

for (let i=0;i<=4;i++){
    const wheelShape = new CANNON.Cylinder(0.2,0.2,0.1,32);
    const wheelBody = new CANNON.Body({mass: 10,shape: wheelShape});
    wheelBody.quaternion.setFromEuler(-Math.PI/2,0,0);
    world.addBody(wheelBody);

    const options = {
        pivotA : pivots[i],
        axisA : new CANNON.Vec3(1,0,0),
        pivotB : new CANNON.Vec3(0,0,0),
        axisB : new CANNON.Vec3(0,-1,0),
        motorTargetVelocity: 5,
        motorMaxForce: 100,
    };
    const hinge = new CANNON.HingeConstraint(carBody,wheelBody,options);
    world.addConstraint(hinge);
    hinges.push(hinge);
    const wheelGeo = new THREE.CylinderGeometry(0.4,0.4,0.2,32);
    const wheelMTL = new THREE.MeshLambertMaterial({color: 0.335599})
    const wheelMesh = new THREE.Mesh(wheelGeo,wheelMTL);
    scene.add(wheelMesh);

    sincObjects.push([wheelMesh,wheelBody]);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "w" || event.key === "W") {
        hinges[0].enableMotor();
        hinges[0].setMotorSpeed(-40);
        hinges[2].enableMotor();
        hinges[2].setMotorSpeed(-40);
    }
    if (event.key === "s" || event.key === "W") {
        hinges[0].enableMotor();
        hinges[0].setMotorSpeed(30);
        hinges[2].enableMotor();
        hinges[2].setMotorSpeed(30);
    }
    if (event.key === "a" || event.key === "A") {
        hinges[0].axisA = new CANNON.Vec3(1,0,-0.5);
        hinges[2].axisA = new CANNON.Vec3(1,0,-0.5);
    }
    if (event.key === "d" || event.key === "D") {
        hinges[0].axisA = new CANNON.Vec3(1,0,0.5);
        hinges[2].axisA = new CANNON.Vec3(1,0,0.5);
    }
});

// Listen for the "keyup" event
document.addEventListener("keyup", (event) => {
    if (event.key === "w" || event.key === "W" || event.key === "s" || event.key === "S") {
        hinges[0].disableMotor();
        hinges[2].disableMotor();
    }
    if (event.key === "a" || event.key === "A" || event.key === "d" || event.key === "D") {
        hinges[0].axisA = new CANNON.Vec3(1,0,0);
        hinges[2].axisA = new CANNON.Vec3(1,0,0);
    }
});

const time = new THREE.Clock();
let frameRate = 60;
let frameRateCounter = 0;
setInterval(function () {
    frameRate = frameRateCounter * 2;
    frameRateCounter = 0;
},500);
const render = () => {
    requestAnimationFrame(render);
    frameRateCounter++;
    sincObjects.forEach(function (obj) {
        obj[0].position.copy(obj[1].position);
        obj[0].quaternion.copy(obj[1].quaternion);
    });
    fpControls.update(time.getDelta());
    renderer.render(scene, camera);
    world.step(1/frameRate);
    //CannonDebug.update();
};
render();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});
