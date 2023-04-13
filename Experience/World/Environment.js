import * as THREE from "three";
import Experience from "../Experience";
import renderer from "three/examples/jsm/libs/lottie_canvas.module";
import GSAP from "gsap";

export default class Environment{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resource;

        // this.gui = new GUI();
        // this.obj = {
        //     colorObj:{r: 0,g: 0, b: 0},
        //     intensity: 3,
        // }

        this.setSunlight();
        // this.setGUI();
    }

    // setGUI(){
    //     this.gui.addColor(this.obj,"colorObj").onChange(()=>{
    //         this.sunLight.color.copy(this.obj.colorObj);
    //         this.ambitionlight.color.copy(this.obj.colorObj);
    //     });
    //     this.gui.add(this.obj,"intensity", 0 ,10).onChange(()=>{
    //         this.sunLight.intensity = this.obj.intensity;
    //         this.ambitionlight.intensity = this.obj.intensity;
    //     })
    // }

    setSunlight(){
        this.sunLight = new THREE.DirectionalLight("#ffffff",1);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        // const helper = new THREE.CameraHelper(this.sunLight.shadow.camera);
        // this.scene.add(helper);
        this.sunLight.position.set(1.5,7,3);
        this.scene.add(this.sunLight);
        this.ambitionlight = new THREE.AmbientLight("#ffffff",1);
        this.scene.add(this.ambitionlight);
    }

    switchTheme(theme){
        if(theme === "dark"){
            GSAP.to(this.sunLight.color,{
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216 ,
            });
            GSAP.to(this.ambitionlight.color,{
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216 ,
            });
            GSAP.to(this.sunLight,{
                intensity: 0.78,
            });
            GSAP.to(this.ambitionlight,{
                intensity: 0.78,
            });
        }else{
            GSAP.to(this.sunLight.color,{
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.ambitionlight.color,{
                r: 1,
                g: 1,
                b: 1,
            });
            GSAP.to(this.sunLight,{
                intensity: 1,
            });
        }
    }

    resize(){

    }

    update(){
    }
}