import * as THREE from 'three';

class lights{
    directional(){
        const light = new THREE.DirectionalLight(0xffffff,1);
        light.position.set(1,1,2);
        return light;
    }
    ambient(){
        return new THREE.AmbientLight('0xfffffa',0.7);
    }
    sun(){
        const light = new THREE.SpotLight(0xffffff,4000,0);
        light.position.set(18,8,20);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadowCameraFov = 20;
        light.shadow.mapSize.width = 512 * 3;
        light.shadow.mapSize.height = 512 * 3;
        light.shadow.autoUpdate = true;
        light.shadow.focus = 1;
        return light;
    }
    point(scene,position,intensity,distance,decay){
        const light = new THREE.PointLight(0xfffff4,intensity,distance,decay);
        light.position.set(position[0],position[1],position[2]);
        scene.add(light);
    }
}

export {lights}