import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 20;
camera.position.y = 5;
camera.position.z = 0;
camera.lookAt(0,0,0);

const r = 4;
const vertices = [];


for (let i = 0; i <= 180; i += 3){
    for (let j = 0; j <= 360; j += 3){
        let rad_i = i * Math.PI / 180;
        let rad_j = j * Math.PI / 180;
        let x = r * Math.cos(rad_i) * Math.sin(rad_j);
        let y = r * Math.sin(rad_i) * Math.sin(rad_j);
        let z = r * Math.cos(rad_j);
        vertices.push(x,y,z);
    }
}

const group = new THREE.Group();

const geo = new THREE.BufferGeometry();
geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(vertices),3));
const mtl = new THREE.PointsMaterial({color: 0xff0000,size: 0.05});
const sphere = new THREE.Points(geo, mtl);
//scene.add(sphere);
group.add(sphere);


const sphere2 = new THREE.Points(geo, mtl);
sphere2.position.y = 10;
//scene.add(sphere2);
group.add(sphere2);

scene.add(group);

const animate = () => {
    requestAnimationFrame(animate);
    group.rotation.y += 0.001;
    renderer.render(scene, camera);
};

animate();
