import * as THREE from 'three';

class materials{
    cat(){
            const mtl = new THREE.MeshStandardMaterial({
            color: 0x333333,
            metalness: 0.5,
            roughness: 0.05,
            side: THREE.DoubleSide
        });
        return mtl;
    }
    wall(){
        // const mtl = new THREE.MeshLambertMaterial({
        //     color: 0x333333,
        //     side: THREE.DoubleSide
        // });
        const mtl = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0,
            roughness: 0.3,
            side: THREE.DoubleSide
        });
        return mtl;
    }
    blackWall(){
        const mtl = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide
        });
        // const mtl = new THREE.MeshStandardMaterial({
        //     color: 0x333333,
        //     metalness: 0.1,
        //     roughness: 0.05,
        //     side: THREE.DoubleSide
        // });
        return mtl;
    }

    cream(){
        const mtl = new THREE.MeshLambertMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            specular: 0xff00ff
        });
        return mtl;
    }
    ground(color = 0xffffff){
        const mtl = new THREE.MeshPhongMaterial({
            shininess: 60,
            specular: 0x000000,
            color: color,
            side: THREE.DoubleSide,
        });
        new THREE.TextureLoader().load('textures/gnd5.jpg',function (texture) {
            texture.encoding = THREE.sRGBEncoding;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10,5);
            mtl.map = texture;
            mtl.needsUpdate = true;
        });
        return mtl;
    }
    silver(){
        const mtl = new THREE.MeshMatcapMaterial({
            matcap: new THREE.TextureLoader().load('textures/12719.jpg', function () {
                mtl.needsUpdate = true;
            }),
            side: THREE.DoubleSide
        });
        return mtl;
    }
    panel(url){
        const mtl = new THREE.MeshLambertMaterial({
            side: THREE.DoubleSide
        });
        new THREE.TextureLoader().load(url, function (texture) {
            texture.encoding = THREE.sRGBEncoding;
            mtl.map= texture;
            mtl.needsUpdate = true;
        });
        return mtl;
    }
    wallLine(){
        const mtl = new THREE.MeshLambertMaterial({
            color: 0x623f2e,
            side: THREE.DoubleSide
        });
        return mtl;
    }
    leafs(){
        const mtl = new THREE.MeshLambertMaterial({
            color: 0x666699,
            side: THREE.DoubleSide
        });
        new THREE.TextureLoader().load('textures/green-leaf.jpg', function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(10,3);
            mtl.map= texture;
            mtl.needsUpdate = true;
        });
        return mtl;
    }
    jar(){
        // const mtl = new THREE.MeshMatcapMaterial({
        //     matcap: new THREE.TextureLoader().load('textures/jar.jpg', function () {
        //         mtl.needsUpdate = true;
        //     }),
        //     side: THREE.DoubleSide
        // });
        // return mtl;
        const mtl = new THREE.MeshPhongMaterial({
            color: 0xfffdf9,
            specular: 0x555555,
            side: THREE.DoubleSide
        });
        new THREE.TextureLoader().load('textures/abstract-organic-lines-background_1017-26669.jpg',function (texture) {
            texture.encoding = THREE.sRGBEncoding;
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3,4);
            mtl.map = texture;
            mtl.bumpMap = texture;
            mtl.bumpScale = 0.005;
            mtl.needsUpdate = true;
        });
        return mtl;
    }
}

export {materials}