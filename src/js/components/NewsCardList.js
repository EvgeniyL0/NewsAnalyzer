import { BaseComponent } from './BaseComponent.js';

export class NewsCardList extends BaseComponent {
  constructor(eventHandlers, divElement, cardsContainer, previousElem) {
    super(eventHandlers, divElement);
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this._startPosition = 0;

    this.renderCardList = this.renderCardList.bind(this);
  }

  renderCardList(isFirst, arrayOfArticles, createCardMethod, showMoreButton) {
    const copyOfContainer = this.cardsContainer.cloneNode(false);
    let threeCardsMarkup = '';
    
    if (isFirst) {
      this.cardsContainer.replaceWith('');
      this._startPosition = 0;
      this.cardsContainer = copyOfContainer;
      this.previousElem.after(this.cardsContainer);
      showMoreButton.style.display = 'block';
      this._setHandlers(showMoreButton);
    }
    for (let i = this._startPosition; i < this._startPosition + 3; i++) {;
      if (arrayOfArticles[i] === undefined) {
        break;
      }
      if (arrayOfArticles[i + 1] === undefined) {
        showMoreButton.style.display = 'none';
        this._removeHandlers(showMoreButton);
      }
      threeCardsMarkup += createCardMethod(arrayOfArticles[i]);
    }
    this.cardsContainer.insertAdjacentHTML('beforeend', this._sanitize(threeCardsMarkup));
    this._startPosition += 3;
  }
}