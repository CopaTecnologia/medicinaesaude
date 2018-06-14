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