import * as THREE from 'three';
import {FBXLoader} from "three/addons/loaders/FBXLoader";
//import {FirstPersonControls} from "three/addons/controls/FirstPersonControls";
import {OrbitControls} from "three/addons/controls/OrbitControls";
let scene, camera, renderer;
let loader, model, mixer;

scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 7;
camera.position.x = 5;
camera.position.y = 2;
camera.lookAt(0,0,0);

renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const fpControls = new OrbitControls(camera,renderer.domElement);
//fpControls.lookSpeed = 0.4;


const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    metalness: 0.9,
    roughness: .3,
    emissive: 0x000055,
    transparent: true
});



const blackMaterial = new THREE.MeshLambertMaterial({color: 0x333333,side: THREE.DoubleSide});

function easeInOutQuint(x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}
const animatior = function (mesh,action,d,duration) {
    const time = new Date().getTime();
    let firstValue = 0;
    switch (action){
        case 'px' : firstValue = mesh.position.x;break;
    }

    this.update = function () {
        let t = (new Date().getTime() - time)/duration;
        if(t <= 1){
            switch (action){
                case 'px' : mesh.position.x = firstValue + (easeInOutQuint(t) * d);break;
            }
        }
    };
};


loader = new FBXLoader();
loader.load('audi.fbx', (fbx) => {
    model = fbx;
    model.traverse(function (child) {
        if(child.name === 'Plane'){
            child.material = bodyMaterial;
        }else {
            child.material = blackMaterial;
        }
    });
    scene.add(model);
    model.position.set(0, 0, 0);

    const positionTrack = new THREE.VectorKeyframeTrack('.position[y]', [0, 1, 2], [0, -1, 0]);
    const clip = new THREE.AnimationClip('move', 3, [positionTrack]);

    mixer = new THREE.AnimationMixer( model );
    let clipAction = mixer.clipAction( clip );

    //clipAction.play();
    //fisrtAnimate = new animatior(model,'px',2,3000);
});


document.onmousemove = handleMouseMove;
let postionLeft = 0;
let mouseLeft = 0;
function handleMouseMove(event) {
    event = event || window.event;
    mouseLeft = event.pageX / window.innerWidth * 2;
}


// Add lights to the scene
const ambientLight = new THREE.AmbientLight(0x666666,0.3);
scene.add(ambientLight);

const PointLight = new THREE.PointLight(0xffffff,6,17,0.6);
PointLight.position.set(5, 2, 7);
scene.add(PointLight);





const time = new THREE.Clock();

// Animate the scene
const animate = () => {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update( 0.01 );
        //fisrtAnimate.update();
    }
    postionLeft += (mouseLeft - postionLeft) * 0.01;
    if(model){
        //model.position.x = postionLeft;
    }

    fpControls.update(time.getDelta());
    renderer.render(scene, camera);
};

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
});

// Start the animation
animate();

