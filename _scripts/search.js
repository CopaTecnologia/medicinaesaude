const $ = (selector) => document.querySelectorAll(selector);
Element.prototype.prependChild = function (child) {
    this.insertBefore(child, this.firstChild);
};

function displaySearchResults(results, store) {
    const searchResults = $('#search-results')[0];
    if (!results.length) {
        const message = document.createElement('p');
        message.innerHTML = 'Nenhum resultado encontrado para <strong>' + searchTerm + '</strong>.';
        searchResults.prependChild(message);
        return false;
    }
    const resultsArr = results.map((result) => {
        const item = store[result.ref];
        const img = item.img ? '<div data-cell="1of4">' + item.img + '</div>' : '';
        return `<article class="card">
            <div data-grid="center spacing">
                ${img}
                <div data-cell="2of3">
                    <h4>
                        <a href="${window.baseurl}${item.url}" class="post-title">${item.title}</a>
                    </h4>
                    <p>
                        ${item.content.substring(0, 150)}... 
                        <a href="${window.baseurl}${item.url}" data-cell="shrink">Saiba mais</a>
                    </p>
                </div>
            </div>
        </article>`;
    });
    searchResults.innerHTML = `
        <p>Resultados para <strong>${searchTerm}</strong></p>
        ${resultsArr.join ('')}
    `;
}

function _query(v) {
    const t = window.location.search.substring(1).split('&');
    const pattern = /\+/g;
    for (let i = 0, l = t.length; i < l; i++) {
        const p = t[i].split('=');
        if (p[0] === v) return decodeURIComponent(p[1].replace(pattern, '%20'));
    }
}
const searchTerm = _query('q');

if (searchTerm) {
    const index = window.lunr(function () {
        this.field('id');
        this.field('title', {
            boost: 10
        });
        this.field('category');
        this.field('content');
        this.field('url');
    });
    for (const id in window.store) {
        const item = window.store[id];
        index.add({
            id: id,
            title: item.title,
            category: item.category,
            content: item.content,
            url: item.url,
        });
    }
    const results = index.search(searchTerm);
    displaySearchResults(results, window.store);
}