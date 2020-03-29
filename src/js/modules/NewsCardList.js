export class NewsCardList {
  constructor(cardsContainer, previousElem) {
    this.cardsContainer = cardsContainer;
    this.previousElem = previousElem;
    this.start = 0;
  }

  renderCardList(isFirst, arrayOfArticles, divContainer, downloadMoreButton, createCardMethod) {
    if (isFirst) {
      this.cardsContainer.replaceWith('');
      this.start = 0;
      this.cardsContainer = divContainer;
      this.cardsContainer.classList.add('results__news-cards');
      this.previousElem.after(this.cardsContainer);
      downloadMoreButton.style.display = 'block';
    }
    for (let i = this.start; i < this.start + 3; i++) {;
      if (arrayOfArticles[i] === undefined) {
        break;
      }
      if (arrayOfArticles[i + 1] === undefined) {
        downloadMoreButton.style.display = 'none';
      }
      console.log(arrayOfArticles[i]);
      this.cardsContainer.append((createCardMethod(arrayOfArticles[i])));
    }
    this.start += 3;
  }
}