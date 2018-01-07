'use strict';

(function () {
    'use strict';

    var SlideShow = function SlideShow(conf) {

        function SlideShow(_ref) {
            var parent = _ref.parent,
                children = _ref.children,
                start = _ref.start,
                interval = _ref.interval;

            this.parent = parent instanceof HTMLElement ? parent : document.querySelector(parent);
            this.children = children instanceof NodeList ? children : document.querySelectorAll(children);
            this.interval = interval || 3000;
            this.setIndex(start || 0);
        }

        SlideShow.prototype = {

            render: function render() {
                var _this = this;

                var slides = Array.prototype.slice.call(this.children);
                var i = isNaN(this.index) ? 0 : this.index >= slides.length ? 0 : this.index < 0 ? slides.length - 1 : this.index;
                var current = slides[i];
                var prev = slides[i - 1] || slides[slides.length - 1];
                var next = slides[i + 1] || slides[0];
                slides.forEach(function (slide) {
                    var state = slide === current ? 'current' : slide === prev ? 'prev' : slide === next ? 'next' : 'idle';
                    _this.setState(slide, state);
                });
            },

            setState: function setState(slide, state) {
                if (!(slide instanceof HTMLElement)) return console.log('SlideShow.setState: ' + slide + ' is not an HTMLElement!');
                ['idle', 'prev', 'current', 'next'].forEach(function (name) {
                    if (name === state) slide.classList.add(name);else slide.classList.remove(name);
                });
            },

            setIndex: function setIndex(index) {
                index = isNaN(index) || !isFinite(index) ? 0 : index;
                this.index = index >= this.children.length ? 0 : index < 0 ? this.children.length - 1 : index;
                this.render();
            },

            goPrev: function goPrev() {
                this.setIndex(this.index - 1);
            },

            goNext: function goNext() {
                this.setIndex(this.index + 1);
            },

            play: function play() {
                var _this2 = this;

                this.timeoutId = setInterval(function () {
                    return _this2.goNext();
                }, this.interval);
            },

            pause: function pause() {
                var timeoutId = this.timeoutId;
                if (timeoutId) clearInterval(timeoutId);
            }

        };

        return new SlideShow(conf);
    };

    var sliders = document.querySelectorAll('.slideshow');

    Array.prototype.forEach.call(sliders, function (slider) {
        var start = slider.getAttribute('data-start') || 0;
        var interval = slider.getAttribute('data-interval') || 3000;
        var slideshow = new SlideShow({
            parent: slider,
            children: '.slide',
            start: start,
            interval: interval
        });
        slideshow.play();
        slider.addEventListener('mouseover', function () {
            slideshow.pause();
        });
        slider.addEventListener('mouseout', function () {
            slideshow.play();
        });
    });
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiU2xpZGVTaG93IiwiY29uZiIsInBhcmVudCIsImNoaWxkcmVuIiwic3RhcnQiLCJpbnRlcnZhbCIsIkhUTUxFbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiTm9kZUxpc3QiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0SW5kZXgiLCJwcm90b3R5cGUiLCJyZW5kZXIiLCJzbGlkZXMiLCJBcnJheSIsInNsaWNlIiwiY2FsbCIsImkiLCJpc05hTiIsImluZGV4IiwibGVuZ3RoIiwiY3VycmVudCIsInByZXYiLCJuZXh0IiwiZm9yRWFjaCIsInN0YXRlIiwic2xpZGUiLCJzZXRTdGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJuYW1lIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiaXNGaW5pdGUiLCJnb1ByZXYiLCJnb05leHQiLCJwbGF5IiwidGltZW91dElkIiwic2V0SW50ZXJ2YWwiLCJwYXVzZSIsImNsZWFySW50ZXJ2YWwiLCJzbGlkZXJzIiwic2xpZGVyIiwiZ2V0QXR0cmlidXRlIiwic2xpZGVzaG93IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJtYXBwaW5ncyI6Ijs7QUFBQyxhQUFZO0FBQ2I7O0FBRUEsUUFBSUEsWUFBWSxtQkFBU0MsSUFBVCxFQUFlOztBQUUzQixpQkFBU0QsU0FBVCxPQUF3RDtBQUFBLGdCQUFwQ0UsTUFBb0MsUUFBcENBLE1BQW9DO0FBQUEsZ0JBQTVCQyxRQUE0QixRQUE1QkEsUUFBNEI7QUFBQSxnQkFBbEJDLEtBQWtCLFFBQWxCQSxLQUFrQjtBQUFBLGdCQUFYQyxRQUFXLFFBQVhBLFFBQVc7O0FBQ3BELGlCQUFLSCxNQUFMLEdBQWNBLGtCQUFrQkksV0FBbEIsR0FBZ0NKLE1BQWhDLEdBQXlDSyxTQUFTQyxhQUFULENBQXVCTixNQUF2QixDQUF2RDtBQUNBLGlCQUFLQyxRQUFMLEdBQWdCQSxvQkFBb0JNLFFBQXBCLEdBQStCTixRQUEvQixHQUEwQ0ksU0FBU0csZ0JBQVQs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Y0MsSUFBZCxDQUFQO0FBRUgsS0FwRUQ7O0FBc0VBLFFBQU0wQyxVQUFVcEMsU0FBU0csZ0JBQVQsQ0FBMEIsWUFBMUIsQ0FBaEI7O0FBRUFLLFVBQU1ILFNBQU4sQ0FBZ0JhLE9BQWhCLENBQXdCUixJQUF4QixDQUE2QjBCLE9BQTdCLEVBQXNDLGtCQUFVO0FBQzVDLFlBQU12QyxRQUFRd0MsT0FBT0MsWUFBUCxDQUFvQixZQUFwQixLQUFxQyxDQUFuRDtBQUNBLFlBQU14QyxXQUFXdUMsT0FBT0MsWUFBUCxDQUFvQixlQUFwQixLQUF3QyxJQUF6RDtBQUNBLFlBQU1DLFlBQVksSUFBSTlDLFNBQUosQ0FBYztBQUM1QkUsb0JBQVEwQyxNQURvQjtBQUU1QnpDLHNCQUFVLFFBRmtCO0FBRzVCQyx3QkFINEI7QUFJNUJDO0FBSjRCLFNBQWQsQ0FBbEI7QUFNQXlDLGtCQUFVUixJQUFWO0FBQ0FNLGVBQU9HLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDLFlBQVc7QUFBQ0Qsc0JBQVVMLEtBQVY7QUFBbUIsU0FBcEU7QUFDQUcsZUFBT0csZ0JBQVAsQ0FBd0IsVUFBeEIsRUFBb0MsWUFBVztBQUFDRCxzQkFBVVIsSUFBVjtBQUFrQixTQUFsRTtBQUNILEtBWkQ7QUFjQyxDQXpGQSxHQUFEIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgU2xpZGVTaG93ID0gZnVuY3Rpb24oY29uZikge1xyXG5cclxuICAgIGZ1bmN0aW9uIFNsaWRlU2hvdyh7cGFyZW50LCBjaGlsZHJlbiwgc3RhcnQsIGludGVydmFsfSkge1xyXG4gICAgICAgIHRoaXMucGFyZW50ID0gcGFyZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBwYXJlbnQgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmVudCk7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IGNoaWxkcmVuIGluc3RhbmNlb2YgTm9kZUxpc3QgPyBjaGlsZHJlbiA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoY2hpbGRyZW4pO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBpbnRlcnZhbCB8fCAzMDAwO1xyXG4gICAgICAgIHRoaXMuc2V0SW5kZXgoc3RhcnQgfHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgU2xpZGVTaG93LnByb3RvdHlwZSA9IHtcclxuXHJcbiAgICAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc3Qgc2xpZGVzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgIGxldCBpID0gaXNOYU4odGhpcy5pbmRleCkgPyAwIDpcclxuICAgICAgICAgICAgdGhpcy5pbmRleCA+PSBzbGlkZXMubGVuZ3RoID8gMCA6XHJcbiAgICAgICAgICAgIHRoaXMuaW5kZXggPCAwID8gc2xpZGVzLmxlbmd0aCAtIDEgOlxyXG4gICAgICAgICAgICB0aGlzLmluZGV4O1xyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50ID0gc2xpZGVzW2ldO1xyXG4gICAgICAgICAgICBjb25zdCBwcmV2ID0gc2xpZGVzW2kgLSAxXSB8fCBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICBjb25zdCBuZXh0ID0gc2xpZGVzW2kgKyAxXSB8fCBzbGlkZXNbMF07XHJcbiAgICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRlID0gXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUgPT09IGN1cnJlbnQgPyAnY3VycmVudCcgOlxyXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlID09PSBwcmV2ICAgID8gJ3ByZXYnIDpcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZSA9PT0gbmV4dCAgICA/ICduZXh0JyA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnaWRsZSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHNsaWRlLCBzdGF0ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldFN0YXRlOiBmdW5jdGlvbihzbGlkZSwgc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCEoc2xpZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkpIHJldHVybiBjb25zb2xlLmxvZyhgU2xpZGVTaG93LnNldFN0YXRlOiAke3NsaWRlfSBpcyBub3QgYW4gSFRNTEVsZW1lbnQhYCk7XHJcbiAgICAgICAgICAgIFsnaWRsZScsICdwcmV2JywgJ2N1cnJlbnQnLCAnbmV4dCddLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gc3RhdGUpIHNsaWRlLmNsYXNzTGlzdC5hZGQobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBlbHNlIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUobmFtZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIHNldEluZGV4OiBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICBpbmRleCA9IGlzTmFOKGluZGV4KSB8fCAhaXNGaW5pdGUoaW5kZXgpID8gMCA6IGluZGV4O1xyXG4gICAgICAgICAgICB0aGlzLmluZGV4ID0gXHJcbiAgICAgICAgICAgICAgICBpbmRleCA+PSB0aGlzLmNoaWxkcmVuLmxlbmd0aCA/IDAgOlxyXG4gICAgICAgICAgICAgICAgaW5kZXggPCAwID8gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxIDogXHJcbiAgICAgICAgICAgICAgICBpbmRleDtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnb1ByZXY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEluZGV4KHRoaXMuaW5kZXggLSAxKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnb05leHQ6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB0aGlzLnNldEluZGV4KHRoaXMuaW5kZXggKyAxKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwbGF5OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdGhpcy50aW1lb3V0SWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLmdvTmV4dCgpLCB0aGlzLmludGVydmFsKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBwYXVzZTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXRJZCA9IHRoaXMudGltZW91dElkO1xyXG4gICAgICAgICAgICBpZiAodGltZW91dElkKSBjbGVhckludGVydmFsKHRpbWVvdXRJZCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICB9O1xyXG5cclxuICAgIHJldHVybiBuZXcgU2xpZGVTaG93KGNvbmYpO1xyXG5cclxufTtcblxuY29uc3Qgc2xpZGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zbGlkZXNob3cnKTtcclxuXHJcbkFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoc2xpZGVycywgc2xpZGVyID0+IHtcclxuICAgIGNvbnN0IHN0YXJ0ID0gc2xpZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydCcpIHx8IDA7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNsaWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtaW50ZXJ2YWwnKSB8fCAzMDAwO1xyXG4gICAgY29uc3Qgc2xpZGVzaG93ID0gbmV3IFNsaWRlU2hvdyh7XHJcbiAgICAgICAgcGFyZW50OiBzbGlkZXIsXHJcbiAgICAgICAgY2hpbGRyZW46ICcuc2xpZGUnLFxyXG4gICAgICAgIHN0YXJ0LFxyXG4gICAgICAgIGludGVydmFsXHJcbiAgICB9KTtcclxuICAgIHNsaWRlc2hvdy5wbGF5KCk7XHJcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgZnVuY3Rpb24oKSB7c2xpZGVzaG93LnBhdXNlKCk7fSk7XHJcbiAgICBzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtzbGlkZXNob3cucGxheSgpO30pO1xyXG59KTtcblxufSgpKTtcbiJdfQ==
