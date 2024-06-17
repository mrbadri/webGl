import * as THREE from 'three';
import {materials} from './materials';
import { CSG } from 'three-csg-ts';
import {GLTFLoader} from "three/addons/loaders/GLTFLoader";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
class room{
    constructor(width,height,dept){
        this.mtl = new materials();
        this.mtl_wall = this.mtl.blackWall();
        const group = new THREE.Group();
        const geo = new THREE.BoxGeometry(width,height,dept);
        const mesh = new THREE.Mesh(geo,[this.mtl_wall,this.mtl_wall,this.mtl.ground(),this.mtl.ground(),null,this.mtl_wall]);
        mesh.position.set(width/2,height/2,dept/2);
        mesh.receiveShadow = true;
        group.add(mesh);

        const leftWall = this.left_wall(width,height,dept);
        group.add(leftWall);

        const roof = this.roof_lines(width,height,dept);
        group.add(roof);

        const lines = this.wall_lines(width,height,dept);
        group.add(lines);

        const column_1 = this.column(width,height,dept);
        column_1.position.set(18,0,0);
        column_1.materials = this.mtl_wall;
        group.add(column_1);

        const column_2 = this.column(width,height,dept);
        column_2.position.set(12,0,0);
        column_2.materials = this.mtl_wall;
        group.add(column_2);

        const column_3 = this.column(width,height,dept);
        column_3.position.set(6,0,0);
        column_3.materials = this.mtl_wall;
        group.add(column_3);

        return group;
    }
    left_wall(width,height,dept){
        const geo = new THREE.BoxGeometry(width,height * 4,0.3);
        const mesh = new THREE.Mesh(geo,this.mtl_wall);
        mesh.geometry.translate(width/2,height/2,dept);

        const windowHoll = new THREE.Mesh(new THREE.BoxGeometry(5,2.5,1),new THREE.MeshBasicMaterial());
        windowHoll.geometry.translate(16,(height/2) - 0.15,dept);
        const result = CSG.subtract(mesh, windowHoll);

        windowHoll.geometry.translate(-7,0,0);
        let result2 = CSG.subtract(result, windowHoll);

        const H_WindowFrame = new THREE.BoxGeometry(5,0.2,0.2);
        H_WindowFrame.translate(16,(height/2) - 0.15,dept);
        result2 = CSG.union(result2, new THREE.Mesh(H_WindowFrame,null));

        H_WindowFrame.translate(-7,0,0);
        result2 = CSG.union(result2, new THREE.Mesh(H_WindowFrame,null));

        const V_WindowFrame = new THREE.BoxGeometry(0.2,2.5,0.2);

        V_WindowFrame.translate(16,(height/2) - 0.15,dept);
        result2 = CSG.union(result2, new THREE.Mesh(V_WindowFrame,null));

        V_WindowFrame.translate(-7,0,0);
        result2 = CSG.union(result2, new THREE.Mesh(V_WindowFrame,null));
        result2.castShadow = true;
        return result2;
    }
    roof_lines(width,height,dept){
        const geo = new THREE.BoxGeometry(width,0.2,0.15);
        geo.translate(width/2,height - 0.3,0);
        let mesh = new THREE.Mesh(geo,new THREE.MeshLambertMaterial());
        for (let i = 0; i<30;i++){
            geo.translate(0,0,dept/30);
            mesh = CSG.union(mesh,new THREE.Mesh(geo,null));
        }

        const geo2 = new THREE.BoxGeometry(0.2,0.15,dept);
        geo2.translate(0,height - 0.25,dept/2);
        for (let i = 0; i<8;i++){
            geo2.translate(width/7,0,0);
            mesh = CSG.union(mesh,new THREE.Mesh(geo2,null));
        }
        mesh.receiveShadow = true;
        return mesh;
    }
    wall_lines(width,height,dept){
        const group = new THREE.Group();
        const Zline_geo = new THREE.BoxGeometry(width,0.03,dept - 0.2);
        const Down_mesh = new THREE.Mesh(Zline_geo,[this.mtl.wallLine(),this.mtl.wallLine(),null,null,this.mtl.wallLine(),this.mtl.wallLine()]);
        Down_mesh.position.set(width/2,0.2,(dept/2) - 0.05);
        Down_mesh.scale.set(0.999,0.999,0.999);
        group.add(Down_mesh);

        const up_mesh = new THREE.Mesh(Zline_geo,[this.mtl.wallLine(),this.mtl.wallLine(),null,null,this.mtl.wallLine(),this.mtl.wallLine()]);
        up_mesh.position.set(width/2,3,dept/2 - 0.05);
        up_mesh.scale.set(0.999,0.999,0.999);
        group.add(up_mesh);

        return group;
    }
    column(width,height,dept){
        const group = new THREE.Group();
        const column_geo = new THREE.BoxGeometry(1.4,height,0.8);
        column_geo.translate(0.4,height/2,0.4);
        const column_mesh = new THREE.Mesh(column_geo,this.mtl_wall);


        const contain = new THREE.BoxGeometry(1,1.3,1);
        contain.translate(.4,1.8,.6);
        const contain_mesh = new THREE.Mesh(contain,this.mtl_wall);

        const mesh = CSG.subtract(column_mesh,contain_mesh);
        group.add(mesh);

        return group;
    }
}

export {room}