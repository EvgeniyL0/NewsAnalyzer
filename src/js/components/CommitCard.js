import { BaseComponent } from './BaseComponent.js';

export class CommitCard extends BaseComponent{
  constructor(eventHandlers, divElement) {
    super(eventHandlers, divElement);

    this.create = this.create.bind(this);
  }

  create(date, authorPhoto, authorName, authorEmail, commitText) {
    const cardMarkup = 
      `<div class="carousel-cell">
        <p class="commits__date">${this._sanitize(date)}</p>
        <div class="commits__about-author">
          <img src="${this._sanitize(authorPhoto)}" alt="Фото" class="commits__author-photo">
          <div class="commits__header">
            <h3 class="commits__author-name">${this._sanitize(authorName)}</h3>
            <p class="commits__author-email">${this._sanitize(authorEmail)}</p>
          </div>
        </div>
        <p class="commits__text">${this._sanitize(commitText)}</p>
      </div>`;

    return cardMarkup;
  }
}