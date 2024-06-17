import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.x = 5;
camera.position.y = 0;
camera.position.z = 5;
camera.lookAt(0,0,0);


const width = 10;
const height = 10;
const segments = 100;

const vertices = [];

for (let w = 0; w <= segments; w++){
    for (let h = 0; h <= segments; h++){
        let x = width * (w / segments) - (width / 2);
        let y = height * (h / segments) - (height / 2);
        let z = 0;
        vertices.push(x,y,z);
    }
}

const indices = [];

for (let w = 0; w < segments; w++) {
    for (let h = 0; h < segments; h++) {
        let a = w * (segments + 1) + h;
        let b = (w + 1 ) * (segments + 1) + h;
        let c = (w + 1 ) * (segments + 1) + h + 1;
        let d = w * (segments + 1) + h + 1;
        indices.push(a,b,c);
        indices.push(a,c,d);
    }
}


const geo = new THREE.BufferGeometry();
geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(vertices),3));
geo.setIndex(indices);

const mtl = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe:true});
const mesh = new THREE.Mesh(geo,mtl);
scene.add(mesh);

const animate = () => {
    requestAnimationFrame(animate);

    const position = geo.attributes.position;
    const time = Date.now() * 0.001;

    for (let i = 0; i < position.array.length; i += 3){
        const x = position.array[i];
        const y = position.array[i + 1];
        position.array[i+2] = Math.sin(x * 0.5 + time) + Math.cos(y * 0.5 + time);
    }
    position.needsUpdate = true;

    renderer.render(scene, camera);
};

animate();
