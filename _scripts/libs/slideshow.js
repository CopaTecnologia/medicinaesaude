export default class SlideShow {

    constructor({parent, children, start, interval}) {
        this.parent = parent instanceof HTMLElement ? parent : document.querySelector(parent);
        this.children = children instanceof NodeList ? children : document.querySelectorAll(children);
        this.interval = interval || 3000;
        this.render(start);
    }

    static initAll(parents) {
        if (typeof parents === 'string') parents = document.querySelectorAll(parents);
        return Array.prototype.map.call(parents, this.create);
    }

    static create(parent) {
        const slideshow = new SlideShow({
            parent,
            children: parent.getAttribute('data-children') || '.slide',
            start: parent.getAttribute('data-start') || 0,
            interval: parent.getAttribute('data-interval') || 3000
        });
        slideshow.play();
        parent.addEventListener('mouseover', () => slideshow.pause());
        parent.addEventListener('mouseout', () => slideshow.play());
        return slideshow;
    }

    render(i) {
        i = this.setIndex(i);
        const current = this.children[i];
        const prev = this.children[i - 1] || this.children[this.children.length - 1];
        const next = this.children[i + 1] || this.children[0];
        this.forEach(slide => {
            const state = 
                slide === current ? 'current' :
                slide === prev    ? 'prev' :
                slide === next    ? 'next' :
                                    'idle';
            this.setState(slide, state);
        });
    }

    setState(slide, state) {
        if (!(slide instanceof HTMLElement)) return console.log(`SlideShow.setState: ${slide} is not an HTMLElement!`, slide);
        ['idle', 'prev', 'current', 'next'].forEach(name => {
            if (name === state) slide.classList.add(name);
            else slide.classList.remove(name);
        });
    }

    setIndex(i) {
        this.index = 
            isNaN(i) || !isFinite(i) ? 0 :
            i >= this.children.length ? 0 :
            i < 0 ? this.children.length - 1 :
            i;
        return this.index;
    }

    goTo(index) {
        this.render(index);
    }

    goPrev() {
        this.render(this.index - 1);
    }

    goNext() {
        this.render(this.index + 1);
    }

    play() {
        this.timeoutId = setInterval(() => {this.goNext()}, this.interval);
    }

    pause() {
        if (this.timeoutId) clearInterval(this.timeoutId);
    }

    forEach(fn) {
        if (!fn instanceof Function) return;
        Array.prototype.forEach.call(this.children, fn);
    }

}