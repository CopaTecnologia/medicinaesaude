import SlideShow from './libs/slideshow';
import slidingBoxes from './libs/slidingBoxes';
import {requestAnimFrame} from './libs/util';

document.body.addEventListener('touchstart', () => {});

const parallaxContainer = document.querySelector('.parallax-container');
if (parallaxContainer) {
    const siteHeader = document.querySelector('.site-header');
    const parallaxContent = parallaxContainer.querySelector('.parallax-content');
    const maxScrollOffset = parallaxContainer.offsetTop + parallaxContainer.offsetHeight;

    if (parallaxContent) {
        window.addEventListener('gesturechange', handleScroll, {passive: true});
        window.addEventListener('touchmove', handleScroll, {passive: true});
        window.addEventListener('scroll', handleScroll);
    }

    function handleScroll() {
        if (scrollY > maxScrollOffset) return false;
        requestAnimFrame(() => {
            parallaxContent.style.webkitTransform = `translateY(${scrollY * .5}px)`;
            parallaxContent.style.transform = `translateY(${scrollY * .5}px)`;
            siteHeader.style.webkitTransform = `translateY(${scrollY * .75}px)`;
            siteHeader.style.transform = `translateY(${scrollY * .75}px)`;
        });
    };
};

slidingBoxes('.sliding-box');

SlideShow.initAll('.slideshow');
