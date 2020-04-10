import { BaseComponent } from './BaseComponent.js';

export class NewsCard extends BaseComponent {
    constructor(eventHandlers, divElement) {
        super(eventHandlers, divElement);

        this.create = this.create.bind(this);
    }

    create(title, text, data, source, image, url) {
        const cardMarkup =
            `<div class="card">
                <img src="${this._sanitize(image)}" alt="" class="card__image">
                <p class="card__date">${this._sanitize(data)}</p>
                <div class="card__description">
                    <a href="${this._sanitize(url)}" class="card__news-title" target="_blank">${this._sanitize(title)}</a>
                    <p class="card__news-text">${this._sanitize(text)}</p>
                </div>
                <p class="card__source">${this._sanitize(source)}</p>
            </div>`;

        return cardMarkup;
    }
}