export class NewsCardList {
  constructor(cardsContainer, previousElem) {
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this.start = 0;
  }

  renderCardList(firstRender, divContainer, createCardMethod) {
    if (firstRender) {
      this.cardsContainer.replaceWith('');
      this.start = 0;
      this.cardsContainer = divContainer;
      this.cardsContainer.classList.add('results__news-cards');
      this.previousElem.after(this.cardsContainer);
    }
    for (let i = this.start; i < this.start + 3; i++) {
      this.cardsContainer.append((createCardMethod(JSON.parse(sessionStorage.getItem(i)))));
    }
    this.start += 3;
  }
}