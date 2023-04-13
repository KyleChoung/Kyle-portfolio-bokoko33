import * as THREE from "three";
import Experience from "./Experience";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"

export default class Camera{
    constructor() {
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        // this.setOrbitControls();
    }

    createPerspectiveCamera(){
        this.perspectivecamera = new THREE.PerspectiveCamera(35,
            this.sizes.aspect,
            0.1,
            1000);
        this.scene.add(this.perspectivecamera)
        this.perspectivecamera.position.x = 18.14;
        this.perspectivecamera.position.y = 8.5;
        this.perspectivecamera.position.z = 11.7;


        this.perspectivecamera.rotation.set(0.047,0.248,-0.011)
    }

    createOrthographicCamera(){
        this.orthographiccamera = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) * 1.5,
            (this.sizes.aspect * this.sizes.frustrum) * 1.5,
            this.sizes.frustrum * 1.5,
            -this.sizes.frustrum * 1.5,
            -10,
            15
        );
        this.orthographiccamera.position.x = 8;
        this.orthographiccamera.position.y = 10;
        this.orthographiccamera.position.z = -4;

        this.scene.add(this.orthographiccamera)

        // this.helper = new THREE.CameraHelper(this.orthographiccamera);
        // this.scene.add(this.helper);

        const size = 20;
        const divisions = 20;

        // const gridHelper = new THREE.GridHelper(size,divisions);
        // this.scene.add(gridHelper);

        // const axesHelper = new THREE.AxesHelper(10);
        // this.scene.add(axesHelper);
    }

    setOrbitControls(){
        this.controls = new OrbitControls(this.perspectivecamera,this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;

    }

    resize(){
        this.perspectivecamera.aspect = this.sizes.aspect;
        this.perspectivecamera.updateProjectionMatrix();

        this.orthographiccamera.left = (-this.sizes.aspect * this.sizes.frustrum) * 1.5;
        this.orthographiccamera.right = (this.sizes.aspect * this.sizes.frustrum) * 1.5 ;
        this.orthographiccamera.top = this.sizes.frustrum * 1.5 ;
        this.orthographiccamera.bottom = -this.sizes.frustrum * 1.5 ;
        this.orthographiccamera.updateProjectionMatrix();
    }

    update(){
        // this.controls.update();
        // console.log(this.perspectivecamera.position,this.perspectivecamera.rotation)

        // this.helper.matrixWorldNeedsUpdate = true;
        // this.helper.update();
        // this.helper.position.copy(this.orthographiccamera.position);
        // this.helper.rotation.copy(this.orthographiccamera.rotation);
    }
}