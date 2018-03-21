'use strict';

(function () {
    'use strict';

    var $ = function $(selector) {
        return document.querySelectorAll(selector);
    };
    Element.prototype.prependChild = function (child) {
        this.insertBefore(child, this.firstChild);
    };

    function displaySearchResults(results, store) {
        var searchResults = $('#search-results')[0];
        if (!results.length) {
            var message = document.createElement('p');
            message.innerHTML = 'Nenhum resultado encontrado para <strong>' + searchTerm + '</strong>.';
            searchResults.prependChild(message);
            return false;
        }
        var resultsArr = results.map(function (result) {
            var item = store[result.ref];
            var img = item.img ? '<div data-cell="1of4">' + item.img + '</div>' : '';
            return '<article class="card">\n            <div data-grid="center spacing">\n                ' + img + '\n                <div data-cell="2of3">\n                    <h4>\n                        <a href="' + window.baseurl + item.url + '" class="post-title">' + item.title + '</a>\n                    </h4>\n                    <p>\n                        ' + item.content.substring(0, 150) + '... \n                        <a href="' + window.baseurl + item.url + '" data-cell="shrink">Saiba mais</a>\n                    </p>\n                </div>\n            </div>\n        </article>';
        });
        searchResults.innerHTML = '\n        <p>Resultados para <strong>' + searchTerm + '</strong></p>\n        ' + resultsArr.join('') + '\n    ';
    }

    function _query(v) {
        var t = window.location.search.substring(1).split('&');
        var pattern = /\+/g;
        for (var i = 0, l = t.length; i < l; i++) {
            var p = t[i].split('=');
            if (p[0] === v) return decodeURIComponent(p[1].replace(pattern, '%20'));
        }
    }
    var searchTerm = _query('q');

    if (searchTerm) {
        var index = window.lunr(function () {
            this.field('id');
            this.field('title', {
                boost: 10
            });
            this.field('category');
            this.field('content');
            this.field('url');
        });
        for (var id in window.store) {
            var item = window.store[id];
            index.add({
                id: id,
                title: item.title,
                category: item.category,
                content: item.content,
                url: item.url
            });
        }
        var results = index.search(searchTerm);
        displaySearchResults(results, window.store);
    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJFbGVtZW50IiwicHJvdG90eXBlIiwicHJlcGVuZENoaWxkIiwiY2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiZGlzcGxheVNlYXJjaFJlc3VsdHMiLCJyZXN1bHRzIiwic3RvcmUiLCJzZWFyY2hSZXN1bHRzIiwibGVuZ3RoIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzZWFyY2hUZXJtIiwicmVzdWx0c0FyciIsIm1hcCIsInJlc3VsdCIsIml0ZW0iLCJyZWYiLCJpbWciLCJ3aW5kb3ciLCJiYXNldXJsIiwidXJsIiwidGl0bGUiLCJjb250ZW50Iiwic3Vic3RyaW5nIiwiam9pbiIsIl9xdWVyeSIsInYiLCJ0IiwibG9jYXRpb24iLCJzZWFyY2giLCJzcGxpdCIsInBhdHRlcm4iLCJpIiwibCIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJyZXBsYWNlIiwiaW5kZXgiLCJsdW5yIiwiZmllbGQiLCJib29zdCIsImlkIiwiYWRkIiwiY2F0ZWdvcnkiXSwibWFwcGluZ3MiOiI7O0FBQUMsYUFBWTtBQUNiOztBQUVBLFFBQU1BLElBQUksU0FBSkEsQ0FBSSxDQUFDQyxRQUFEO0FBQUEsZUFBY0MsU0FBU0MsZ0JBQVQsQ0FBMEJGLFFBQTFCLENBQWQ7QUFBQSxLQUFWO0FBQ0FHLFlBQVFDLFNBQVIsQ0FBa0JDLFlBQWxCLEdBQWlDLFVBQVVDLEtBQVYsRUFBaUI7QUFDOUMsYUFBS0MsWUFBTCxDQUFrQkQsS0FBbEIsRUFBeUIsS0FBS0UsVUFBOUI7QUFDSCxLQUZEOztBQUlBLGFBQVNDLG9CQUFULENBQThCQyxPQUE5QixFQUF1Q0MsS0FBdkMsRUFBOEM7QUFDMUMsWUFBTUMsZ0JBQWdCYixFQUFFLGlCQUFGLEVBQXFCLENBQXJCLENBQXRCO0FBQ0EsWUFBSSxDQUFDVyxRQUFRRyxNQUFiLEVBQXFCO0FBQ2pCLGdCQUFNQyxVQUFVYixTQUFTYyxhQUFULENBQXVCLEdBQXZCLENBQWhCO0FBQ0FELG9CQUFRRSxTQUFSLEdBQW9CLDhDQUE4Q0MsVUFBOUMsR0FBMkQsWUFBL0U7QUFDQUwsMEJBQWNQLFlBQWQsQ0FBMkJTLE9BQTNCO0FBQ0EsbUJBQU8sS0FBUDtBQUNIO0FBQ0QsWUFBTUksYUFBYVIsUUFBUVMsR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBWTtBQUN2QyxnQkFBTUMsT0FBT1YsTUFBTVMsT0FBT0UsR0FBYixDQUFiO0FBQ0EsZ0JBQU1DLE1BQU1GLEtBQUtFLEdBQUwsR0FBVywyQkFBMkJGLEtBQUtFLEdBQWhDLEdBQXNDLFFBQWpELEdBQTRELEVBQXhFO0FBQ0EsOEdBRVVBLEdBRlYsNkdBSzJCQyxPQUFPQyxPQUxsQyxHQUs0Q0osS0FBS0ssR0FMakQsNkJBSzRFTCxLQUFLTSxLQUxqRiwwRkFRa0JOLEtBQUtPLE9BQUwsQ0FBYUMsU0FBYixDQUF1QixDQUF2QixFQUEwQixHQUExQixDQVJsQiwrQ0FTMkJMLE9BQU9DLE9BVGxDLEdBUzRDSixLQUFLSyxHQVRqRDtBQWNILFNBakJrQixDQUFuQjtBQWtCQWQsc0JBQWNJLFNBQWQsNkNBQ2lDQyxVQURqQywrQkFFTUMsV0FBV1ksSUFBWCxDQUFpQixFQUFqQixDQUZOO0FBSUg7O0FBRUQsYUFBU0MsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUI7QUFDZixZQUFNQyxJQUFJVCxPQUFPVSxRQUFQLENBQWdCQyxNQUFoQixDQUF1Qk4sU0FBdkIsQ0FBaUMsQ0FBakMsRUFBb0NPLEtBQXBDLENBQTBDLEdBQTFDLENBQVY7QUFDQSxZQUFNQyxVQUFVLEtBQWhCO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSU4sRUFBRXBCLE1BQXRCLEVBQThCeUIsSUFBSUMsQ0FBbEMsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3RDLGdCQUFNRSxJQUFJUCxFQUFFSyxDQUFGLEVBQUtGLEtBQUwsQ0FBVyxHQUFYLENBQVY7QUFDQSxnQkFBSUksRUFBRSxDQUFGLE1BQVNSLENBQWIsRUFBZ0IsT0FBT1MsbUJBQW1CRCxFQUFFLENBQUYsRUFBS0UsT0FBTCxDQUFhTCxPQUFiLEVBQXNCLEtBQXRCLENBQW5CLENBQVA7QUFDbkI7QUFDSjtBQUNELFFBQU1wQixhQUFhYyxPQUFPLEdBQVAsQ0FBbkI7O0FBRUEsUUFBSWQsVUFBSixFQUFnQjtBQUNaLFlBQU0wQixRQUFRbkIsT0FBT29CLElBQVAsQ0FBWSxZQUFZO0FBQ2xDLGlCQUFLQyxLQUFMLENBQVcsSUFBWDtBQUNBLGlCQUFLQSxLQUFMLENBQVcsT0FBWCxFQUFvQjtBQUNoQkMsdUJBQU87QUFEUyxhQUFwQjtBQUdBLGlCQUFLRCxLQUFMLENBQVcsVUFBWDtBQUNBLGlCQUFLQSxLQUFMLENBQVcsU0FBWDtBQUNBLGlCQUFLQSxLQUFMLENBQVcsS0FBWDtBQUNILFNBUmEsQ0FBZDtBQVNBLGFBQUssSUFBTUUsRUFBWCxJQUFpQnZCLE9BQU9iLEtBQXhCLEVBQStCO0FBQzNCLGdCQUFNVSxPQUFPRyxPQUFPYixLQUFQLENBQWFvQyxFQUFiLENBQWI7QUFDQUosa0JBQU1LLEdBQU4sQ0FBVTtBQUNORCxvQkFBSUEsRUFERTtBQUVOcEIsdUJBQU9OLEtBQUtNLEtBRk47QUFHTnNCLDBCQUFVNUIsS0FBSzRCLFFBSFQ7QUFJTnJCLHlCQUFTUCxLQUFLTyxPQUpSO0FBS05GLHFCQUFLTCxLQUFLSztBQUxKLGFBQVY7QUFPSDtBQUNELFlBQU1oQixVQUFVaUMsTUFBTVIsTUFBTixDQUFhbEIsVUFBYixDQUFoQjtBQUNBUiw2QkFBcUJDLE9BQXJCLEVBQThCYyxPQUFPYixLQUFyQztBQUNIO0FBRUEsQ0ExRUEsR0FBRCIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuRWxlbWVudC5wcm90b3R5cGUucHJlcGVuZENoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICB0aGlzLmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5maXJzdENoaWxkKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlTZWFyY2hSZXN1bHRzKHJlc3VsdHMsIHN0b3JlKSB7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gJCgnI3NlYXJjaC1yZXN1bHRzJylbMF07XHJcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdOZW5odW0gcmVzdWx0YWRvIGVuY29udHJhZG8gcGFyYSA8c3Ryb25nPicgKyBzZWFyY2hUZXJtICsgJzwvc3Ryb25nPi4nO1xyXG4gICAgICAgIHNlYXJjaFJlc3VsdHMucHJlcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdHNBcnIgPSByZXN1bHRzLm1hcCgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHN0b3JlW3Jlc3VsdC5yZWZdO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGl0ZW0uaW1nID8gJzxkaXYgZGF0YS1jZWxsPVwiMW9mNFwiPicgKyBpdGVtLmltZyArICc8L2Rpdj4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGA8YXJ0aWNsZSBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiBkYXRhLWdyaWQ9XCJjZW50ZXIgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICAgICAgJHtpbWd9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtY2VsbD1cIjJvZjNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3dpbmRvdy5iYXNldXJsfSR7aXRlbS51cmx9XCIgY2xhc3M9XCJwb3N0LXRpdGxlXCI+JHtpdGVtLnRpdGxlfTwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2g0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2l0ZW0uY29udGVudC5zdWJzdHJpbmcoMCwgMTUwKX0uLi4gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3dpbmRvdy5iYXNldXJsfSR7aXRlbS51cmx9XCIgZGF0YS1jZWxsPVwic2hyaW5rXCI+U2FpYmEgbWFpczwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9hcnRpY2xlPmA7XHJcbiAgICB9KTtcclxuICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxwPlJlc3VsdGFkb3MgcGFyYSA8c3Ryb25nPiR7c2VhcmNoVGVybX08L3N0cm9uZz48L3A+XHJcbiAgICAgICAgJHtyZXN1bHRzQXJyLmpvaW4gKCcnKX1cclxuICAgIGA7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9xdWVyeSh2KSB7XHJcbiAgICBjb25zdCB0ID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcclxuICAgIGNvbnN0IHBhdHRlcm4gPSAvXFwrL2c7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XHJcbiAgICAgICAgY29uc3QgcCA9IHRbaV0uc3BsaXQoJz0nKTtcclxuICAgICAgICBpZiAocFswXSA9PT0gdikgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UocGF0dGVybiwgJyUyMCcpKTtcclxuICAgIH1cclxufVxyXG5jb25zdCBzZWFyY2hUZXJtID0gX3F1ZXJ5KCdxJyk7XHJcblxyXG5pZiAoc2VhcmNoVGVybSkge1xyXG4gICAgY29uc3QgaW5kZXggPSB3aW5kb3cubHVucihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZCgnaWQnKTtcclxuICAgICAgICB0aGlzLmZpZWxkKCd0aXRsZScsIHtcclxuICAgICAgICAgICAgYm9vc3Q6IDEwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5maWVsZCgnY2F0ZWdvcnknKTtcclxuICAgICAgICB0aGlzLmZpZWxkKCdjb250ZW50Jyk7XHJcbiAgICAgICAgdGhpcy5maWVsZCgndXJsJyk7XHJcbiAgICB9KTtcclxuICAgIGZvciAoY29uc3QgaWQgaW4gd2luZG93LnN0b3JlKSB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHdpbmRvdy5zdG9yZVtpZF07XHJcbiAgICAgICAgaW5kZXguYWRkKHtcclxuICAgICAgICAgICAgaWQ6IGlkLFxyXG4gICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcclxuICAgICAgICAgICAgY2F0ZWdvcnk6IGl0ZW0uY2F0ZWdvcnksXHJcbiAgICAgICAgICAgIGNvbnRlbnQ6IGl0ZW0uY29udGVudCxcclxuICAgICAgICAgICAgdXJsOiBpdGVtLnVybCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdHMgPSBpbmRleC5zZWFyY2goc2VhcmNoVGVybSk7XHJcbiAgICBkaXNwbGF5U2VhcmNoUmVzdWx0cyhyZXN1bHRzLCB3aW5kb3cuc3RvcmUpO1xyXG59XG5cbn0oKSk7XG4iXX0=
