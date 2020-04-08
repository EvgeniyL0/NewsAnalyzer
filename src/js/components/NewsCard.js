export class NewsCard {
    constructor() {
        this.create = this.create.bind(this);
    }

    create(title, text, data, source, image, url) {
        const cardMarkup =
            `<div class="card">
                <img src="${image}" alt="" class="card__image">
                <div class="card__description">
                <p class="card__date">${data}</p>
                <a href="${url}" class="card__news-title" target="_blank">${title}</a>
                <p class="card__news-text">${text}</p>
                <p class="card__source">${source}</p>
                </div>
            </div>`;

        return cardMarkup;
    }
}