import * as THREE from 'three';
import {materials} from './materials';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
class stand {
    constructor(x,y){
        this.mtl = new materials();
        const group = new  THREE.Group();
        const columnGeo = new THREE.CylinderGeometry(0.21,0.1,1.7,32,1,0);
        const columnMesh = new THREE.Mesh(columnGeo,this.mtl.jar());
        group.add(columnMesh);

        const planeGeo = new THREE.BoxGeometry(0.4,0.04,0.4);
        planeGeo.translate(0,.02,0);
        const planeMesh1 = new THREE.Mesh(planeGeo,this.mtl.jar());
        group.add(planeMesh1);

        const planeGeo2 = new THREE.BoxGeometry(0.5,0.04,0.5);
        planeGeo2.translate(0,.85,0);
        const planeMesh2 = new THREE.Mesh(planeGeo2,this.mtl.jar());
        group.add(planeMesh2);

        group.position.set(x,0,y);


        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('models/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);
        loader.load('models/200.glb', (model) => {
            model = model.scene;
            model.scale.set(0.012, 0.012, 0.012);
            model.position.set(0,0.88,0);
            model.rotation.set(0,Math.PI,0);
            model.getObjectByName('ORIGAMI_Chat').material = this.mtl.cat();
            group.add(model);
        });

        group.traverse(function (mesh) {
            mesh.castShadow = true;
            mesh.receiveShadow = true;
        });

        return group;
    }
}

export {stand}