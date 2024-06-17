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
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 2;
camera.lookAt(0,0,2.5);

const spot_light = new THREE.PointLight(0xffffff,3,30,0);
spot_light.distance = 15;
spot_light.position.set(10,4.5,0);
scene.add(spot_light);
spot_light.castShadow = true;
spot_light.shadow.mapSize.width = 2048;
spot_light.shadow.mapSize.height = 2048;
const am_light = new THREE.AmbientLight(0xffffff,0.3);
scene.add(am_light);

const cubeCameraRender = new THREE.WebGLCubeRenderTarget(512,{
    generateMipmaps: true,
    minFilter: THREE.LinearMipmapLinearFilter
});
const cubeCamera = new THREE.CubeCamera(0.5,100,cubeCameraRender);
cubeCamera.position.set(0,0,0);


const geometry = new THREE.SphereGeometry(0.55,32,32);

const textureLoader = new THREE.TextureLoader();
textureLoader.load('frontend-large.jpg',function (texture) {

    const mtls = [];

    mtls[0] = new THREE.MeshLambertMaterial({
        color : 0xffffff,
        map: texture,
    });
    mtls[1] = new THREE.MeshLambertMaterial({
        color : 0xffffff,
        map: texture,
        // bumpMap: texture,
        // bumpScale: 0.3,
        normalMap: texture
    });

    mtls[2] = new THREE.MeshStandardMaterial({
        color : 0xffffff,
        map: texture,
        metalness: 0.7,
        roughness: 0.5,
    });

    textureLoader.load('abstract-art-trend-368x245.png',function (metalnessmap) {
        mtls[2].roughnessMap = metalnessmap;
        mtls[2].needsUpdate = true;
    });

    mtls[3] = new THREE.MeshStandardMaterial({
        color : 0xff0000,
        map: texture,
        transparent: true,
    });

    textureLoader.load('stripes.jpg',function (alfamap) {
        mtls[3].alphaMap = alfamap;
        mtls[3].needsUpdate = true;
    });



    mtls[4] = new THREE.MeshStandardMaterial({
        color : 0xffffff,
        map : texture,
        // map: texture,
        envMap: cubeCameraRender.texture,
        metalness: .8,
        roughness: 0.05,
        envMapIntensity: 1,
    });

    for(let i = 0;i<5;i++){
        const box = new THREE.Mesh(geometry,mtls[i] ? mtls[i] : new THREE.MeshBasicMaterial({color: 0xffffff}));
        box.position.set(.5,0.6,(i*1.2) - 2.4);
        box.rotation.set(0,(Math.PI / 180) * 30,0);
        box.castShadow = true;
        box.name = 'sphere';
        scene.add(box);
    }

});


const plane_geo = new THREE.PlaneGeometry(5,8);
const plane_mtl = new THREE.MeshLambertMaterial({color: 0xdddddd,side: THREE.DoubleSide});
const ground = new THREE.Mesh(plane_geo,plane_mtl);
ground.rotation.x = Math.PI / 2;
//scene.add(ground);
ground.receiveShadow = true;


const worldGeo = new THREE.SphereGeometry(20,64,64);
const worldMtl = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.BackSide,
});
const worldMesh = new THREE.Mesh(worldGeo,worldMtl);
scene.add(worldMesh);
textureLoader.load('d03acb0-Shperical_o_panoramic.png',function (world) {
    world.repeat.set(1,1.2);
    worldMtl.map = world;
    worldMtl.needsUpdate = true;
});


let delta = 0;
function run() {
    cubeCamera.update(renderer,scene);
    scene.traverse(function (child) {
        if(child.name === 'sphere'){
            child.rotation.y += 0.003;
        }
    });
    worldMesh.rotation.y += 0.0005;
    renderer.render(scene,camera);
    requestAnimationFrame(run);
}

run();

