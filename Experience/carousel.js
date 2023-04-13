'use strict';

import ASScroll from "@ashthornton/asscroll";
import GSAP from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

class Carousel {
    constructor(el) {
        this.el = el;
        this.carouselOptions = ['previous', 'next'];
        this.carouselData = [
            {
                'id': '1',
                'src': '/textures/game.png',
                'name': 'Unity3D恐怖遊戲',
                'video': '/textures/horrorgame.mp4',
                'text': '市場上目前的遊戲種類眾多，而隨著科技進步，畫面從2D漸漸轉向3D，讓玩家們更加身歷其境，玩家們也開始追求更高的樂趣，尋求刺激與新鮮感，我們製作的3D恐怖遊戲，讓玩家們體驗平常生活不會遇到的驚悚刺激和益智解謎，增加遊戲趣味。而依照我所就讀的文化大學和場景，製作出有關其學校傳聞的鬼故事以及經歷，改編並且加入遊戲中。',
                'skill': '<div class="skill-text">Unity3D</div><div class="skill-text">C#</div>'
            },
            {
                'id': '2',
                'src': '/textures/holoLense.png',
                'name': 'HoloLens顯示3D模型',
                'video': '/textures/AR.mp4',
                'text':'利用Microsoft開發和製造的一對混合現實智能眼鏡HoloLens結合QRcode，能夠掃出模型出來，進而對那些模型進行互動及操作比如顯示模型該相關訊息。對於醫院比較昂貴的器材或是設備，對於新進人員的操作或是維修時的意外出錯，這項功能能夠在使用者戴上HoloLens之後對每個設備上QRcode顯示出來的虛擬模型進行操作練習或是顯示相關說明，來減少意外或是失誤的發生。',
                'skill': '<p class="skill-text">Unity3D</p><p class="skill-text">C#</p>'
            },
            {
                'id': '3',
                'src': '/textures/exhibition.png',
                'name': '網頁版虛擬藝展空間',
                'video': '',
                'text':'疫情爆發後，人們待在家的時間也變長，面對的藝術產業也面臨衝擊，在Web框架下建立3D和VR藝展場景，提供有需要的人使用。給從以前蒐集很多作品或是一些畫家想展示自己的作品，所提供的一個虛擬藝展空間，能夠上傳自己的作品擺到自己的理想位置提供觀賞，也能按下詳細資訊了解作品內容甚至是購買。',
                'skill': '<p class="skill-text">HTML</p><p class="skill-text">CSS</p><p class="skill-text">A-Frame</p><p class="skill-text">JavaScript</p>'
            },
            // {
            //     'id': '4',
            //     'src': 'http://fakeimg.pl/300/?text=4',
            // },
            // {
            //     'id': '5',
            //     'src': 'http://fakeimg.pl/300/?text=5',
            // }
        ];
        this.carouselInView = [1,2,3];
        this.carouselContainer;
        this.carouselPlayState;
        this.teste = true;

        GSAP.registerPlugin(ScrollTrigger)
        if (
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        ) {
            this.setSmoothScroll();
        }
    }

    mounted() {
        this.setupCarousel();
    }

    // Build carousel html
    setupCarousel() {
        const container = document.createElement('div');
        const controls = document.createElement('div');

        // Add container for carousel items and controls
        this.el.append(container, controls);
        container.className = 'carousel-container';
        controls.className = 'carousel-controls';

        // Take dataset array and append items to container
        this.carouselData.forEach((item, index) => {
            const carouselItem = item.src ? document.createElement('h1') : document.createElement('div');

            container.append(carouselItem);
            // Add item attributes
            carouselItem.className = `carousel-item carousel-item-${index + 1} carousel-background-${index + 1}`;
            // carouselItem.src = item.src;
            carouselItem.innerText = item.name;
            carouselItem.setAttribute('loading', 'lazy');
            carouselItem.setAttribute("src",item.src);
            carouselItem.setAttribute('video',item.video);
            carouselItem.setAttribute('text',item.text);
            carouselItem.setAttribute('skill',item.skill);

            // Used to keep track of carousel items, infinite items possible in carousel however min 5 items required
            carouselItem.setAttribute('data-index', `${index + 1}`);

        });
        //creat iframe
        let infoModal=document.querySelector("#infoModal");
        let source = document.getElementById('videosource')
        let close=document.querySelector("#close");
        let video = document.getElementById("dialogVideo");
        document.addEventListener('click', function (event) {

            // If the clicked element doesn't have the right selector, bail
            if (!event.target.matches('.carousel-item-2')) return;

            // Don't follow the link
            event.preventDefault();

            infoModal.firstElementChild.innerHTML = event.target.innerHTML;
            video.setAttribute("poster",event.target.getAttribute("src"));
            source.setAttribute("src",event.target.getAttribute("video"));
            video.load();
            infoModal.children[2].innerHTML = event.target.getAttribute("text");
            infoModal.children[3].innerHTML = event.target.getAttribute("skill");

            // Log the clicked element in the console
            infoModal.showModal();
        }, false);
        close.addEventListener("click", function(){
            infoModal.close();
            video.pause();
        })




        this.carouselOptions.forEach((option) => {
            const btn = document.createElement('button');
            const axSpan = document.createElement('span');

            // Add accessibilty spans to button
            axSpan.innerText = option;
            axSpan.className = 'ax-hidden';
            btn.append(axSpan);

            // Add button attributes
            btn.className = `carousel-control carousel-control-${option}`;
            btn.setAttribute('data-name', option);

            // Add carousel control options
            controls.append(btn);
        });

        // After rendering carousel to our DOM, setup carousel controls' event listeners
        this.setControls([...controls.children]);

        // Set container property
        this.carouselContainer = container;
    }

    setSmoothScroll() {
        this.asscroll = this.setupASScroll();
    };


    setupASScroll() {
        // https://github.com/ashthornton/asscroll
        const asscroll = new ASScroll({
            ease: 0.1,
            disableRaf: true,
        });

        GSAP.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);
        let infoModal=document.querySelector("#infoModal");

        function ani(){

            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
            if(infoModal.hasAttribute("open")){
                asscroll.disable();
            }else{
                asscroll.enable();

            }
            requestAnimationFrame(ani)
        }
        ani();
        // requestAnimationFrame(() => {
        //     asscroll.enable({
        //         newScrollElements: document.querySelectorAll(
        //             ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        //         ),
        //     });
        // });
        return asscroll;
    }

    setControls(controls) {
        controls.forEach(control => {
            control.onclick = (event) => {
                event.preventDefault();

                // Manage control actions, update our carousel data first then with a callback update our DOM
                this.controlManager(control.dataset.name);
            };
        });
    }

    controlManager(control) {
        if (control === 'previous') return this.previous();
        if (control === 'next') return this.next();
        if (control === 'add') return this.add();
        if (control === 'play') return this.play();

        return;
    }

    previous() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.unshift(this.carouselData.pop());

        // Push the first item to the end of the array so that the previous item is front and center
        this.carouselInView.push(this.carouselInView.shift());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel-item carousel-item-${item} carousel-background-${index + 1}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 5).forEach((data, index) => {
            document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
        });
    }

    next() {
        // Update order of items in data array to be shown in carousel
        this.carouselData.push(this.carouselData.shift());

        // Take the last item and add it to the beginning of the array so that the next item is front and center
        this.carouselInView.unshift(this.carouselInView.pop());

        // Update the css class for each carousel item in view
        this.carouselInView.forEach((item, index) => {
            this.carouselContainer.children[index].className = `carousel-item carousel-item-${item} carousel-background-${index + 1}`;
        });

        // Using the first 5 items in data array update content of carousel items in view
        this.carouselData.slice(0, 5).forEach((data, index) => {
            document.querySelector(`.carousel-item-${index + 1}`).src = data.src;
        });
    }

    add() {
        const newItem = {
            'id': '',
            'src': '',
        };
        const lastItem = this.carouselData.length;
        const lastIndex = this.carouselData.findIndex(item => item.id == lastItem);

        // Assign properties for new carousel item
        Object.assign(newItem, {
            id: `${lastItem + 1}`,
            src: `http://fakeimg.pl/300/?text=${lastItem + 1}`
        });

        // Then add it to the "last" item in our carouselData
        this.carouselData.splice(lastIndex + 1, 0, newItem);

        // Shift carousel to display new item
        this.next();
    }

    play() {
        const playBtn = document.querySelector('.carousel-control-play');
        const startPlaying = () => this.next();

        if (playBtn.classList.contains('playing')) {
            // Remove class to return to play button state/appearance
            playBtn.classList.remove('playing');

            // Remove setInterval
            clearInterval(this.carouselPlayState);
            this.carouselPlayState = null;
        } else {
            // Add class to change to pause button state/appearance
            playBtn.classList.add('playing');

            // First run initial next method
            this.next();

            // Use play state prop to store interval ID and run next method on a 1.5 second interval
            this.carouselPlayState = setInterval(startPlaying, 1500);
        };
    }

}

// Refers to the carousel root element you want to target, use specific class selectors if using multiple carousels
const el = document.querySelector('.carousel');
// Create a new carousel object
const exampleCarousel = new Carousel(el);
// Setup carousel and methods
exampleCarousel.mounted();
