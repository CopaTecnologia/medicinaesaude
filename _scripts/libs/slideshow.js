export default function(conf) {

    function SlideShow({parent, children, start, interval}) {
        this.parent = parent instanceof HTMLElement ? parent : document.querySelector(parent);
        this.children = children instanceof NodeList ? children : document.querySelectorAll(children);
        this.interval = interval || 3000;
        this.setIndex(start || 0);
    }

    SlideShow.prototype = {

        render: function() {
            const slides = Array.prototype.slice.call(this.children);
            let i = isNaN(this.index) ? 0 :
            this.index >= slides.length ? 0 :
            this.index < 0 ? slides.length - 1 :
            this.index;
            const current = slides[i];
            const prev = slides[i - 1] || slides[slides.length - 1];
            const next = slides[i + 1] || slides[0];
            slides.forEach(slide => {
                const state = 
                    slide === current ? 'current' :
                    slide === prev    ? 'prev' :
                    slide === next    ? 'next' :
                                        'idle';
                this.setState(slide, state);
            });
        },

        setState: function(slide, state) {
            if (!(slide instanceof HTMLElement)) return console.log(`SlideShow.setState: ${slide} is not an HTMLElement!`);
            ['idle', 'prev', 'current', 'next'].forEach(name => {
                if (name === state) slide.classList.add(name);
                else slide.classList.remove(name);
            });
        },

        setIndex: function(index) {
            index = isNaN(index) || !isFinite(index) ? 0 : index;
            this.index = 
                index >= this.children.length ? 0 :
                index < 0 ? this.children.length - 1 : 
                index;
            this.render();
        },

        goPrev: function() {
            this.setIndex(this.index - 1);
        },

        goNext: function() {
            this.setIndex(this.index + 1);
        },

        play: function() {
            this.timeoutId = setInterval(() => this.goNext(), this.interval);
        },

        pause: function() {
            const timeoutId = this.timeoutId;
            if (timeoutId) clearInterval(timeoutId);
        }
    
    };

    return new SlideShow(conf);

};