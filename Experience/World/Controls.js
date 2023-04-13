import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
// import ASScroll from '@ashthornton/asscroll'

export default class Controls{
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resource;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.room = this.experience.world.room.actualroom;
        // GSAP.registerPlugin(ScrollTrigger)


        document.querySelector(".page").style.overflow = "visible";

        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            // this.setSmoothScroll();
            // const body = document.body,
            //     jsScroll = document.getElementsByClassName('page-wrapper')[0],
            //     height  = jsScroll.getBoundingClientRect().height - 1,
            //     speed = 0.05
            //
            // var offset = 0;
            //
            // body.style.height = Math.floor(height) + "px";
            // //
            // function smoothScroll(){
            //     offset += (window.pageYOffset - offset) * speed
            //     var scroll = "translateY(-"+offset+"px) translateZ(0) "
            //     jsScroll.style.transform = scroll;
            //
            //     requestAnimationFrame(smoothScroll);
            // }
            //
            // smoothScroll();
        }
        this.setPath();
    }

    setPath(){
        ScrollTrigger.matchMedia({
            //Desktop
            "(min-width: 969px)": () => {

                //first section--------------------------------------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: "0.6",
                        invalidateOnRefresh: true
                    }
                });
                this.firstMoveTimeline.to(this.camera.perspectivecamera.position,{
                    x: () => {
                        return 15;
                    },
                    y: () => {
                        return 8;
                    },
                    z: () => {
                        return 6;
                    },
                },"same1");
                this.firstMoveTimeline.to(this.camera.perspectivecamera,{
                    x: () => {
                        return -0.07;
                    },
                    y: () => {
                        return 0.17;
                    },
                    z: () => {
                        return 0.012;
                    },
                },"same1");

                //second section-------------------------------------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: "2",
                        invalidateOnRefresh: true,
                    }
                });
                this.secondMoveTimeline.to(this.camera.perspectivecamera.position,{
                    x: () => {
                        return 11.5;
                    },
                    y: () => {
                        return 12;
                    },
                    z: () => {
                        return 0
                    }
                },);
                this.secondMoveTimeline.to(this.camera.perspectivecamera.rotation,{
                    y: () => {
                        return  3.3;
                    },
                },);

                //third section-------------------------------------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: "2",
                        invalidateOnRefresh: true
                    }
                });
                this.thirdMoveTimeline.to(this.camera.perspectivecamera.position,{
                    x: () => {
                        return 5.8;
                    },
                    y: () => {
                        return 18.5;
                    },
                    z: () => {
                        return -0.07
                    }
                },);
                this.thirdMoveTimeline.to(this.camera.perspectivecamera.rotation,{
                    y: () => {
                        return  1.55;
                    },
                    z: () =>{
                        return -0.05
                    }
                },);
                //four section-------------------------------------------------------------------
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: "0.6",
                        invalidateOnRefresh: true
                    }
                });
                this.fourthMoveTimeline.to(this.camera.perspectivecamera.rotation,{
                    x: () => {
                        return -1.5;
                    },
                    y: () => {
                        return 0;
                    },
                    z: () =>{
                        return 2.2;
                    }
                },'same2');
                this.fourthMoveTimeline.to(this.camera.perspectivecamera.position,{
                    x: () => {
                        return -4;
                    },
                    y: () => {
                        return 8.7;
                    },
                    z: () => {
                        return -5;
                    }
                },'same2');
                //five section-------------------------------------------------------------------
                this.fiveMoveTimeline = new GSAP.timeline({
                    scrollTrigger:{
                        trigger: ".five-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: "0.6",
                        invalidateOnRefresh: true
                    }
                });
                this.fiveMoveTimeline.to(this.camera.perspectivecamera.rotation,{
                    x: () => {
                        return -0.07;
                    },
                    y: () => {
                        return 0.17;
                    },
                    z: () => {
                        return 0.012;
                    },
                },);
                this.fiveMoveTimeline.to(this.camera.perspectivecamera.position,{
                    x: () => {
                        return 6;
                    },
                    y: () => {
                        return 8;
                    },
                    z: () => {
                        return 6;
                    },
                },);
            },
            // Mobile
            "(max-width: 968px)": () => {
                this.camera.perspectivecamera.position.set( 10.14, 8.5,7)

                // First section -----------------------------------------
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        // invalidateOnRefresh: true,
                    },
                })
                // this.firstMoveTimeline.to(this.camera.perspectivecamera.position,{
                //     x: () => {
                //         return 10;
                //     },
                //     y: () => {
                //         return 8;
                //     },
                //     z: () => {
                //         return 6;
                //     },
                // },);

                // Second section -----------------------------------------
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })

                // Third section -----------------------------------------
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.6,
                        invalidateOnRefresh: true,
                    },
                })
            },

            // // all
            all: () => {
                this.sections = document.querySelectorAll(".section");
                this.sections.forEach((section) => {
                    this.progressWrapper =
                        section.querySelector(".progress-wrapper");
                    this.progressBar = section.querySelector(".progress-bar");
            //
                    if (section.classList.contains("right")) {
                        GSAP.to(section, {
                            borderTopLeftRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomLeftRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    } else {
                        GSAP.to(section, {
                            borderTopRightRadius: 10,
                            scrollTrigger: {
                                trigger: section,
                                start: "top bottom",
                                end: "top top",
                                scrub: 0.6,
                            },
                        });
                        GSAP.to(section, {
                            borderBottomRightRadius: 700,
                            scrollTrigger: {
                                trigger: section,
                                start: "bottom bottom",
                                end: "bottom top",
                                scrub: 0.6,
                            },
                        });
                    }
                    GSAP.from(this.progressBar, {
                        scaleY: 0,
                        scrollTrigger: {
                            trigger: section,
                            start: "top top",
                            end: "bottom bottom",
                            scrub: 0.4,
                            pin: this.progressWrapper,
                            pinSpacing: false,
                        },
                    });
                });
            },
        })
    }

    resize(){

    };

    update(){
    };
}