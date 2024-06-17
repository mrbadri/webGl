import * as THREE from 'three';
import {materials} from './materials';
import { CSG } from 'three-csg-ts';

class wall{
    constructor(x,z,r=0,width = 4,height = 2,photo = null) {
        const group = new THREE.Group();
        this.mtl = new materials().wall();
        const wall_geo = new THREE.BoxGeometry(width,height,0.35);
        wall_geo.translate(width/2,height/2,0.15);
        let wall_mesh = new THREE.Mesh(wall_geo,this.mtl);

        const contain = new THREE.BoxGeometry(1.5,1.5,0.2);
        contain.translate(width/2,1,-0.03);
        const contain_mesh = new THREE.Mesh(contain,null);

        const line_geo = new THREE.BoxGeometry(width,0.1,0.1);
        line_geo.translate(width/2,0.37,-0.04);
        const line_mesh = new THREE.Mesh(line_geo,null);


        wall_mesh = CSG.subtract(wall_mesh,contain_mesh);

        for(let i = 0; i < 5; i++){
            wall_mesh = CSG.subtract(wall_mesh,line_mesh);
            line_mesh.geometry.translate(0,0.3,0);
        }
        // wall_mesh.receiveShadow = true;
        group.add(wall_mesh);
        if(photo) {
            const panel_mesh = this.panel(photo);
            panel_mesh.geometry.translate(width/2,height/2,0.051);
            group.add(panel_mesh);
        }

        group.position.set(x,0,z);
        group.rotation.set(0,r * Math.PI/180,0);
        // group.castShadow = true;

        group.traverse(function (mesh) {
            mesh.receiveShadow = true;
            mesh.castShadow = true;
        });

        return group;
    }
    panel(photo){
        const geo = new THREE.BoxGeometry(1.1,1.1,0.04);
        const basicMtl = new THREE.MeshBasicMaterial({color: 0x000000,side: THREE.DoubleSide});
        const texture = new materials().panel(photo);
        const mtl = [basicMtl,basicMtl,basicMtl,basicMtl,basicMtl,texture];
        const mesh = new THREE.Mesh(geo,mtl);
        return mesh;
    }

}

export {wall}