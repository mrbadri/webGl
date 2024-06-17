import * as THREE from 'three';
import {materials} from './materials';
class chandelier{np
    constructor(x,z,scene,shadow = false) {
        const group = new THREE.Group();
        const mtl = new materials();
        const basic_mtl = new THREE.MeshBasicMaterial(0xffffff);
        const lights_geo = new THREE.ConeGeometry(0.23,0.35,16);
        const mesh = new THREE.Mesh(lights_geo,[mtl.silver(),null,basic_mtl]);
        group.add(mesh);

        const wire_geo = new THREE.BoxGeometry(0.01,1,0.01);
        wire_geo.translate(0,0.5,0);
        const wire_mesh = new THREE.Mesh(wire_geo,new THREE.MeshBasicMaterial({color:0x555555}));
        group.add(wire_mesh);

        group.position.set(x,2.5,z);
        const light = this.light();
        light.position.set(x,2.5,z+0.5);
        light.castShadow = shadow;
        light.shadow.bias = -0.002;
        light.shadow.mapSize.width = 512 * 2;
        light.shadow.mapSize.height = 512 * 2;
        scene.add(group);
        scene.add(light);
    }
    light(){
        return new THREE.PointLight(0xfffff4,2.3,15,1);
    }
}

export {chandelier}