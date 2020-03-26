export class NewsCardList {
  constructor(cardsContainer, previousElem) {
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this.start = 0;
  }

  renderCardList(isFirst, divContainer, downloadMoreButton, createCardMethod) {
    if (isFirst) {
      this.cardsContainer.replaceWith('');
      this.start = 0;
      this.cardsContainer = divContainer;
      this.cardsContainer.classList.add('results__news-cards');
      this.previousElem.after(this.cardsContainer);
      downloadMoreButton.style.display = 'block';
    }
    for (let i = this.start; i < this.start + 3; i++) {;
      if (sessionStorage.getItem(i) === null) {
        break;
      }
      if (sessionStorage.getItem(i + 1) === null) {
        downloadMoreButton.style.display = 'none';
      }
      this.cardsContainer.append((createCardMethod(JSON.parse(sessionStorage.getItem(i)))));
    }
    this.start += 3;
  }
}