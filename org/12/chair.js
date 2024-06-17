import * as THREE from 'three';
import {materials} from './materials';
import { CSG } from 'three-csg-ts';

class chair {
    constructor(x,y){
        this.mtl = new materials();
        const group = new  THREE.Group();
        const material = this.mtl.jar();
        const boxGeometry = new THREE.BoxGeometry(2.6, .5, 0.6);
        const cylinderGeometry = new THREE.CylinderGeometry(.25,0.25, 0.6, 16, 16,false, 0,  Math.PI);

        cylinderGeometry.translate(1.3,0,0);
        let cylinderMesh = new THREE.Mesh(cylinderGeometry, material);

        const cylinderGeometryRight = new THREE.CylinderGeometry(.25,.25, 0.6, 16, 16,false, Math.PI,  Math.PI * 1.5);
        cylinderGeometryRight.translate(-1.3,0,0);
        let cylinderMeshRight = new THREE.Mesh(cylinderGeometryRight, material);

        const boxMesh = new THREE.Mesh(boxGeometry, material);

        cylinderMesh.rotation.x = Math.PI / 2;
        cylinderMeshRight.rotation.x = Math.PI / 2;

        group.add(cylinderMesh);
        group.add(boxMesh);
        group.add(cylinderMeshRight);

        group.traverse(function (obj) {
            obj.castShadow = true;
            obj.receiveShadow = true;
        });

        group.position.set(x,0.25,y);
        return group;
    }
}

export {chair}