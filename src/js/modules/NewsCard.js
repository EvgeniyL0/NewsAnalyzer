export class NewsCard {
    constructor () {}

    create(title, text, data, source, image, url) {
        const wrapper = document.createElement('div');

        wrapper.classList.add('card');
        wrapper.insertAdjacentHTML('afterbegin',
            `<img src="${image}" alt="" class="card__image">
            <div class="card__description">
              <p class="card__date">${data}</p>
              <a href="${url}" class="card__news-title" target="_blank">${title}</a>
              <p class="card__news-text">${text}</p>
              <p class="card__source">${source}</p>
            </div>`);

        return wrapper;
    }
}