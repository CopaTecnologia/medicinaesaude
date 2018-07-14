import SlideShow from './libs/slideshow';
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

Array.prototype.forEach.call(
    document.querySelectorAll('.slideshow'),
    parent => {
        const slideshow = new SlideShow({
            parent,
            children: '.slide',
            start: parent.getAttribute('data-start') || 0,
            interval: parent.getAttribute('data-interval') || 3000
        });
        slideshow.play();
        parent.addEventListener('mouseover', () => slideshow.pause());
        parent.addEventListener('mouseout', () => slideshow.play());
    }
);

const slidingBoxes = document.querySelectorAll('.sliding-box');
if (slidingBoxes.length) {
    window.addEventListener('scroll', setSlidingClasses);
    window.addEventListener('resize', setSlidingClasses);
    window.addEventListener('load', setSlidingClasses);
    function setSlidingClasses() {
        Array.prototype.forEach.call(slidingBoxes, item => {
            const vBegin = item.offsetTop - window.innerHeight * .8;
            const vEnd = item.offsetTop + item.offsetHeight * .8;
            if (scrollY < vBegin) {
                item.classList.add('below-screen');
                item.classList.remove('above-screen');
            }
            else if (scrollY > vEnd) {
                item.classList.remove('below-screen');
                item.classList.add('above-screen');
            }
            else {
                item.classList.remove('below-screen');
                item.classList.remove('above-screen');
            };
        });
    }
};
