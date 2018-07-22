import SlideShow from './libs/slideshow';
import slidingBoxes from './libs/slidingBoxes';
import loadGoogleMaps from './libs/loadGoogleMaps';
import bindGoogleAnalyticsEvents from './libs/bindGoogleAnalyticsEvents';
import parallax from './libs/parallax';

document.body.addEventListener('touchstart', () => {});

const sliderOptions = {
    autoplay: {
        'wait-img-load': function(slider) {
            const image = slider.children[0].querySelector('.slide-image');
            if (!image) return;
            const src = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
            if (!src) return;
            const img = new Image();
            img.onload = slider.play;
            img.src = src;
            slider.pause();
        }
    }
};

Array.prototype.map.call(
    document.querySelectorAll('.slideshow'),
    parent => {
        const slideshow = new SlideShow({
            parent,
            children: parent.getAttribute('data-children') || '.slide',
            start: parent.getAttribute('data-start') || 0,
            interval: parent.getAttribute('data-interval') || 3000
        });
        slideshow.setAttr('data-autoplay', options => {
            slideshow.play();
            parent.addEventListener('mouseover', () => slideshow.pause());
            parent.addEventListener('mouseout', () => slideshow.play());
            if (options.length) options.forEach(o => {
                const callbacks = sliderOptions['autoplay'];
                const fn = callbacks && callbacks[o];
                if (!(fn instanceof Function)) console.log('slider[autoplay]:', o, typeof fn, fn);
                else fn(slideshow);
            });
        });
        return slideshow;
    }
);

slidingBoxes('.sliding-box');

loadGoogleMaps();

parallax(
    '.parallax-container', [{
            element: '.parallax-content',
            amount: .5
        },
        {
            element: document.querySelector('.site-header'),
            amount: .75
        }
    ]
);

bindGoogleAnalyticsEvents();