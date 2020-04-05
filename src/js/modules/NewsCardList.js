import { BaseComponent } from './BaseComponent.js';

export class NewsCardList extends BaseComponent {
  constructor(eventHandlers, cardsContainer, previousElem, showMoreButton) {
    super(eventHandlers);
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this.showMoreButton =showMoreButton;
    this._startPosition = 0;

    this.renderCardList = this.renderCardList.bind(this);
  }

  renderCardList(isFirst, arrayOfArticles, createCardMethod) {
    let copyOfContainer = this.cardsContainer.cloneNode(false);
    let threeCardsMarkup = '';
    
    if (isFirst) {
      this.cardsContainer.replaceWith('');
      this._startPosition = 0;
      this.cardsContainer = copyOfContainer;
      this.previousElem.after(this.cardsContainer);
      this.showMoreButton.style.display = 'block';
      this._setHandlers(this.showMoreButton);
    }
    for (let i = this._startPosition; i < this._startPosition + 3; i++) {;
      if (arrayOfArticles[i] === undefined) {
        break;
      }
      if (arrayOfArticles[i + 1] === undefined) {
        this.showMoreButton.style.display = 'none';
        this._removeHandlers(this.showMoreButton);
      }
      threeCardsMarkup += createCardMethod(arrayOfArticles[i]);
    }
    this.cardsContainer.insertAdjacentHTML('beforeend', threeCardsMarkup);
    this._startPosition += 3;
  }
}