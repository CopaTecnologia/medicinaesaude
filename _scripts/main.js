import SlideShow from './libs/slideshow';

const sliders = document.querySelectorAll('.slideshow');

Array.prototype.forEach.call(sliders, slider => {
    const start = slider.getAttribute('data-start') || 0;
    const interval = slider.getAttribute('data-interval') || 3000;
    const slideshow = new SlideShow({
        parent: slider,
        children: '.slide',
        start,
        interval
    });
    slideshow.play();
    slider.addEventListener('mouseover', function() {slideshow.pause()});
    slider.addEventListener('mouseout', function() {slideshow.play()});
});
