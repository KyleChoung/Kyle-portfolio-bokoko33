import * as THREE from "three";
import Experience from "../Experience";
import {RectAreaLightHelper} from 'three/examples/jsm/helpers/RectAreaLightHelper';
import GSAP from "gsap";
import {color} from "three/examples/jsm/nodes/shadernode/ShaderNode";

export default class Room{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resource;

        this.room = this.resources.items.room;
        this.actualroom = this.room.scene;

        this.iphone = this.resources.items.iphone;
        this.actualiphone = this.iphone.scene;

        this.setModel();
    }

    setModel(){
        // this.actualroom.children.forEach((child) => {
        //     child.castShadow = true;
        //     child.receiveShadow = true;
        //
        //     if(child instanceof THREE.Group){
        //         child.children.forEach((groupchild) => {
        //             groupchild.castShadow = true;
        //             groupchild.receiveShadow = true;
        //         })
        //     }
        // })
        //light
        this.pointLight = new THREE.PointLight( 0xffffff, 0, 0 );
        this.pointLight.position.set( -73,120,73 );
        this.actualroom.add( this.pointLight );

        //ME
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshLambertMaterial({
            map: loader.load('/textures/ME2.png'),
            transparent: true,
            color: new THREE.Color(0.3,0.3,0.3),
    });
        var geometry = new THREE.PlaneGeometry(100, 100);
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(-69,49.5,80)
        this.mesh.rotation.set(0,85,0);

        //iphone
        this.actualiphone.position.set(30,42,45)
        this.actualiphone.rotation.set(-39.28,0,-20)
        this.actualiphone.scale.set(100,100,100)

        //video
        let video = document.getElementById("video");
        let videoTexture = new THREE.VideoTexture(video);

        // videoTexture.minFilter = THREE.LinearFilter;
        // videoTexture.magFilter = THREE.LinearFilter;

        var movieMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
            side: THREE.FrontSide,
            toneMapped: false
        })

        var videogeometry = new THREE.PlaneGeometry(59.5, 34);
        this.videomesh = new THREE.Mesh(videogeometry,movieMaterial);
        this.videomesh.position.set(-99,110.5,-151.1)
        this.videomesh.rotation.set(-0.092,0,0);

        //room
        this.actualroom.add(this.mesh,this.actualiphone,this.videomesh);
        this.scene.add(this.actualroom);
        this.actualroom.scale.set(0.1,0.1,0.1);
        this.actualroom.rotation.y = Math.PI;

    }

    switchThemeR(theme) {
        if (theme === "dark") {
            this.pointLight.intensity = 150;
            this.pointLight.distance = 100;
        }else{
            this.pointLight.intensity = 0;
            this.pointLight.distance = 0;
        }
    }

    resize(){

    }

    update(){
    }
}