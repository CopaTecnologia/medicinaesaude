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
            return '<article class="card">\n            <div data-grid="center spacing">\n                ' + img + '\n                <div data-cell="2of3">\n                    <h4>\n                        <a href="{{ site.baseurl }}' + item.url + '" class="post-title">' + item.title + '</a>\n                    </h4>\n                    <p>\n                        ' + item.content.substring(0, 150) + '... \n                        <a href="{{ site.baseurl }}' + item.url + '" data-cell="shrink">Saiba mais</a>\n                    </p>\n                </div>\n            </div>\n        </article>';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlYXJjaC5qcyJdLCJuYW1lcyI6WyIkIiwic2VsZWN0b3IiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJFbGVtZW50IiwicHJvdG90eXBlIiwicHJlcGVuZENoaWxkIiwiY2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJmaXJzdENoaWxkIiwiZGlzcGxheVNlYXJjaFJlc3VsdHMiLCJyZXN1bHRzIiwic3RvcmUiLCJzZWFyY2hSZXN1bHRzIiwibGVuZ3RoIiwibWVzc2FnZSIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJzZWFyY2hUZXJtIiwicmVzdWx0c0FyciIsIm1hcCIsInJlc3VsdCIsIml0ZW0iLCJyZWYiLCJpbWciLCJ1cmwiLCJ0aXRsZSIsImNvbnRlbnQiLCJzdWJzdHJpbmciLCJqb2luIiwiX3F1ZXJ5IiwidiIsInQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInNwbGl0IiwicGF0dGVybiIsImkiLCJsIiwicCIsImRlY29kZVVSSUNvbXBvbmVudCIsInJlcGxhY2UiLCJpbmRleCIsImx1bnIiLCJmaWVsZCIsImJvb3N0IiwiaWQiLCJhZGQiLCJjYXRlZ29yeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQyxhQUFZO0FBQ2I7O0FBRUEsUUFBTUEsSUFBSSxTQUFKQSxDQUFJLENBQUNDLFFBQUQ7QUFBQSxlQUFjQyxTQUFTQyxnQkFBVCxDQUEwQkYsUUFBMUIsQ0FBZDtBQUFBLEtBQVY7QUFDQUcsWUFBUUMsU0FBUixDQUFrQkMsWUFBbEIsR0FBaUMsVUFBVUMsS0FBVixFQUFpQjtBQUM5QyxhQUFLQyxZQUFMLENBQWtCRCxLQUFsQixFQUF5QixLQUFLRSxVQUE5QjtBQUNILEtBRkQ7O0FBSUEsYUFBU0Msb0JBQVQsQ0FBOEJDLE9BQTlCLEVBQXVDQyxLQUF2QyxFQUE4QztBQUMxQyxZQUFNQyxnQkFBZ0JiLEVBQUUsaUJBQUYsRUFBcUIsQ0FBckIsQ0FBdEI7QUFDQSxZQUFJLENBQUNXLFFBQVFHLE1BQWIsRUFBcUI7QUFDakIsZ0JBQU1DLFVBQVViLFNBQVNjLGFBQVQsQ0FBdUIsR0FBdkIsQ0FBaEI7QUFDQUQsb0JBQVFFLFNBQVIsR0FBb0IsOENBQThDQyxVQUE5QyxHQUEyRCxZQUEvRTtBQUNBTCwwQkFBY1AsWUFBZCxDQUEyQlMsT0FBM0I7QUFDQSxtQkFBTyxLQUFQO0FBQ0g7QUFDRCxZQUFNSSxhQUFhUixRQUFRUyxHQUFSLENBQVksVUFBQ0MsTUFBRCxFQUFZO0FBQ3ZDLGdCQUFNQyxPQUFPVixNQUFNUyxPQUFPRSxHQUFiLENBQWI7QUFDQSxnQkFBTUMsTUFBTUYsS0FBS0UsR0FBTCxHQUFXLDJCQUEyQkYsS0FBS0UsR0FBaEMsR0FBc0MsUUFBakQsR0FBNEQsRUFBeEU7QUFDQSw4R0FFVUEsR0FGViwrSEFLNkNGLEtBQUtHLEdBTGxELDZCQUs2RUgsS0FBS0ksS0FMbEYsMEZBUWtCSixLQUFLSyxPQUFMLENBQWFDLFNBQWIsQ0FBdUIsQ0FBdkIsRUFBMEIsR0FBMUIsQ0FSbEIsaUVBUzZDTixLQUFLRyxHQVRsRDtBQWNILFNBakJrQixDQUFuQjtBQWtCQVosc0JBQWNJLFNBQWQsNkNBQ2lDQyxVQURqQywrQkFFTUMsV0FBV1UsSUFBWCxDQUFpQixFQUFqQixDQUZOO0FBSUg7O0FBRUQsYUFBU0MsTUFBVCxDQUFnQkMsQ0FBaEIsRUFBbUI7QUFDZixZQUFNQyxJQUFJQyxPQUFPQyxRQUFQLENBQWdCQyxNQUFoQixDQUF1QlAsU0FBdkIsQ0FBaUMsQ0FBakMsRUFBb0NRLEtBQXBDLENBQTBDLEdBQTFDLENBQVY7QUFDQSxZQUFNQyxVQUFVLEtBQWhCO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsSUFBSVAsRUFBRWxCLE1BQXRCLEVBQThCd0IsSUFBSUMsQ0FBbEMsRUFBcUNELEdBQXJDLEVBQTBDO0FBQ3RDLGdCQUFNRSxJQUFJUixFQUFFTSxDQUFGLEVBQUtGLEtBQUwsQ0FBVyxHQUFYLENBQVY7QUFDQSxnQkFBSUksRUFBRSxDQUFGLE1BQVNULENBQWIsRUFBZ0IsT0FBT1UsbUJBQW1CRCxFQUFFLENBQUYsRUFBS0UsT0FBTCxDQUFhTCxPQUFiLEVBQXNCLEtBQXRCLENBQW5CLENBQVA7QUFDbkI7QUFDSjtBQUNELFFBQU1uQixhQUFhWSxPQUFPLEdBQVAsQ0FBbkI7O0FBRUEsUUFBSVosVUFBSixFQUFnQjtBQUNaLFlBQU15QixRQUFRVixPQUFPVyxJQUFQLENBQVksWUFBWTtBQUNsQyxpQkFBS0MsS0FBTCxDQUFXLElBQVg7QUFDQSxpQkFBS0EsS0FBTCxDQUFXLE9BQVgsRUFBb0I7QUFDaEJDLHVCQUFPO0FBRFMsYUFBcEI7QUFHQSxpQkFBS0QsS0FBTCxDQUFXLFVBQVg7QUFDQSxpQkFBS0EsS0FBTCxDQUFXLFNBQVg7QUFDQSxpQkFBS0EsS0FBTCxDQUFXLEtBQVg7QUFDSCxTQVJhLENBQWQ7QUFTQSxhQUFLLElBQU1FLEVBQVgsSUFBaUJkLE9BQU9yQixLQUF4QixFQUErQjtBQUMzQixnQkFBTVUsT0FBT1csT0FBT3JCLEtBQVAsQ0FBYW1DLEVBQWIsQ0FBYjtBQUNBSixrQkFBTUssR0FBTixDQUFVO0FBQ05ELG9CQUFJQSxFQURFO0FBRU5yQix1QkFBT0osS0FBS0ksS0FGTjtBQUdOdUIsMEJBQVUzQixLQUFLMkIsUUFIVDtBQUlOdEIseUJBQVNMLEtBQUtLLE9BSlI7QUFLTkYscUJBQUtILEtBQUtHO0FBTEosYUFBVjtBQU9IO0FBQ0QsWUFBTWQsVUFBVWdDLE1BQU1SLE1BQU4sQ0FBYWpCLFVBQWIsQ0FBaEI7QUFDQVIsNkJBQXFCQyxPQUFyQixFQUE4QnNCLE9BQU9yQixLQUFyQztBQUNIO0FBRUEsQ0ExRUEsR0FBRCIsImZpbGUiOiJzZWFyY2guanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCAkID0gKHNlbGVjdG9yKSA9PiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuRWxlbWVudC5wcm90b3R5cGUucHJlcGVuZENoaWxkID0gZnVuY3Rpb24gKGNoaWxkKSB7XHJcbiAgICB0aGlzLmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5maXJzdENoaWxkKTtcclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlTZWFyY2hSZXN1bHRzKHJlc3VsdHMsIHN0b3JlKSB7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gJCgnI3NlYXJjaC1yZXN1bHRzJylbMF07XHJcbiAgICBpZiAoIXJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBtZXNzYWdlLmlubmVySFRNTCA9ICdOZW5odW0gcmVzdWx0YWRvIGVuY29udHJhZG8gcGFyYSA8c3Ryb25nPicgKyBzZWFyY2hUZXJtICsgJzwvc3Ryb25nPi4nO1xyXG4gICAgICAgIHNlYXJjaFJlc3VsdHMucHJlcGVuZENoaWxkKG1lc3NhZ2UpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlc3VsdHNBcnIgPSByZXN1bHRzLm1hcCgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXRlbSA9IHN0b3JlW3Jlc3VsdC5yZWZdO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGl0ZW0uaW1nID8gJzxkaXYgZGF0YS1jZWxsPVwiMW9mNFwiPicgKyBpdGVtLmltZyArICc8L2Rpdj4nIDogJyc7XHJcbiAgICAgICAgcmV0dXJuIGA8YXJ0aWNsZSBjbGFzcz1cImNhcmRcIj5cclxuICAgICAgICAgICAgPGRpdiBkYXRhLWdyaWQ9XCJjZW50ZXIgc3BhY2luZ1wiPlxyXG4gICAgICAgICAgICAgICAgJHtpbWd9XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtY2VsbD1cIjJvZjNcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJ7eyBzaXRlLmJhc2V1cmwgfX0ke2l0ZW0udXJsfVwiIGNsYXNzPVwicG9zdC10aXRsZVwiPiR7aXRlbS50aXRsZX08L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oND5cclxuICAgICAgICAgICAgICAgICAgICA8cD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpdGVtLmNvbnRlbnQuc3Vic3RyaW5nKDAsIDE1MCl9Li4uIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwie3sgc2l0ZS5iYXNldXJsIH19JHtpdGVtLnVybH1cIiBkYXRhLWNlbGw9XCJzaHJpbmtcIj5TYWliYSBtYWlzPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2FydGljbGU+YDtcclxuICAgIH0pO1xyXG4gICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPHA+UmVzdWx0YWRvcyBwYXJhIDxzdHJvbmc+JHtzZWFyY2hUZXJtfTwvc3Ryb25nPjwvcD5cclxuICAgICAgICAke3Jlc3VsdHNBcnIuam9pbiAoJycpfVxyXG4gICAgYDtcclxufVxyXG5cclxuZnVuY3Rpb24gX3F1ZXJ5KHYpIHtcclxuICAgIGNvbnN0IHQgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xyXG4gICAgY29uc3QgcGF0dGVybiA9IC9cXCsvZztcclxuICAgIGZvciAobGV0IGkgPSAwLCBsID0gdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcclxuICAgICAgICBjb25zdCBwID0gdFtpXS5zcGxpdCgnPScpO1xyXG4gICAgICAgIGlmIChwWzBdID09PSB2KSByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZShwYXR0ZXJuLCAnJTIwJykpO1xyXG4gICAgfVxyXG59XHJcbmNvbnN0IHNlYXJjaFRlcm0gPSBfcXVlcnkoJ3EnKTtcclxuXHJcbmlmIChzZWFyY2hUZXJtKSB7XHJcbiAgICBjb25zdCBpbmRleCA9IHdpbmRvdy5sdW5yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB0aGlzLmZpZWxkKCdpZCcpO1xyXG4gICAgICAgIHRoaXMuZmllbGQoJ3RpdGxlJywge1xyXG4gICAgICAgICAgICBib29zdDogMTBcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmZpZWxkKCdjYXRlZ29yeScpO1xyXG4gICAgICAgIHRoaXMuZmllbGQoJ2NvbnRlbnQnKTtcclxuICAgICAgICB0aGlzLmZpZWxkKCd1cmwnKTtcclxuICAgIH0pO1xyXG4gICAgZm9yIChjb25zdCBpZCBpbiB3aW5kb3cuc3RvcmUpIHtcclxuICAgICAgICBjb25zdCBpdGVtID0gd2luZG93LnN0b3JlW2lkXTtcclxuICAgICAgICBpbmRleC5hZGQoe1xyXG4gICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgIHRpdGxlOiBpdGVtLnRpdGxlLFxyXG4gICAgICAgICAgICBjYXRlZ29yeTogaXRlbS5jYXRlZ29yeSxcclxuICAgICAgICAgICAgY29udGVudDogaXRlbS5jb250ZW50LFxyXG4gICAgICAgICAgICB1cmw6IGl0ZW0udXJsLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVzdWx0cyA9IGluZGV4LnNlYXJjaChzZWFyY2hUZXJtKTtcclxuICAgIGRpc3BsYXlTZWFyY2hSZXN1bHRzKHJlc3VsdHMsIHdpbmRvdy5zdG9yZSk7XHJcbn1cblxufSgpKTtcbiJdfQ==
