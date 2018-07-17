import SlideShow from './libs/slideshow';
import slidingBoxes from './libs/slidingBoxes';
import loadGoogleMaps from './libs/loadGoogleMaps';
import bindGoogleAnalyticsEvents from './libs/bindGoogleAnalyticsEvents';
import parallax from './libs/parallax';

document.body.addEventListener('touchstart', () => {});

SlideShow.initAll('.slideshow');

slidingBoxes('.sliding-box');

loadGoogleMaps();

parallax(
    '.parallax-container',
    [
        {
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
