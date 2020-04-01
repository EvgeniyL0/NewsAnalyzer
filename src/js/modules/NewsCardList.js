export class NewsCardList {
  constructor(cardsContainer, previousElem, showMoreButton) {
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this.showMoreButton =showMoreButton;
    this.start = 0;

    this.renderCardList = this.renderCardList.bind(this);
  }

  renderCardList(isFirst, arrayOfArticles, createCardMethod) {
    let copyOfContainer = this.cardsContainer.cloneNode(false);
    let threeCardsMarkup = '';
    
    if (isFirst) {
      this.cardsContainer.replaceWith('');
      this.start = 0;
      this.cardsContainer = copyOfContainer;
      this.previousElem.after(this.cardsContainer);
      this.showMoreButton.style.display = 'block';
    }
    for (let i = this.start; i < this.start + 3; i++) {;
      if (arrayOfArticles[i] === undefined) {
        break;
      }
      if (arrayOfArticles[i + 1] === undefined) {
        this.showMoreButton.style.display = 'none';
      }
      threeCardsMarkup += createCardMethod(arrayOfArticles[i]);
    }
    this.cardsContainer.insertAdjacentHTML('beforeend', threeCardsMarkup);
    this.start += 3;
  }
} 