import * as THREE from "three";

import Sizes from "./Utiles/Sizes";
import Time from "./Utiles/Time"
import Resources from "./Utiles/Resources";
import assets from "./Utiles/assets";

import Camera from "./Camera";
import Renderer from "./Renderer";
import Theme from "./Theme"
import Preloader from '/Experience/preloader';

import World from "./World/World";

export default class Experience{
    static instance
    constructor(canvas) {
        if(Experience.instance){
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resource = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();

        this.time.on('update',()=>{
            this.update();
        })
        this.sizes.on('resize',()=>{
            this.resize();
        })
    }

    update(){
        this.camera.update();
        this.world.update();
        this.renderer.update();
    }

    resize(){
        this.camera.resize();
        this.world.resize();
        this.renderer.resize();
    }
}