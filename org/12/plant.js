import * as THREE from 'three';
import {materials} from './materials';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";

class plant {
    constructor(scene) {
        this.scene = scene;
        this.mtls = new materials();
        this.loadPlant();
    }

    loadPlant() {
        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('models/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(dracoLoader);

        const self = this;

        loader.load('models/plant.glb', (model) => {
            model = model.scene;
            const jar = model.getObjectByName('Plant_jar');
            jar.material = self.mtls.jar();
            jar.scale.set(1.7, 1.7, 1.7);
            const leafs = model.getObjectByName('Plant_leafs');
            leafs.material = self.mtls.leafs();
            leafs.scale.set(0.75, 0.75, 0.75);
            leafs.translateZ(0.13);

            model.traverse((child) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            self.createMesh(model);
        });
    }

    createMesh(model) {
        const cloneAndAddToScene = (position) => {
            const plant = model.clone();
            plant.position.copy(position);
            this.scene.add(plant);
        };

        cloneAndAddToScene(new THREE.Vector3(1.3, 0.15, 12.2));
        cloneAndAddToScene(new THREE.Vector3(12.5, 0.15, 12.4));
        cloneAndAddToScene(new THREE.Vector3(25, 0.15, 12.2));
        cloneAndAddToScene(new THREE.Vector3(25, 0.15, 1.2));
    }
}

export { plant };