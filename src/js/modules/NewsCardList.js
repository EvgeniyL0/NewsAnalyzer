export class NewsCardList {
  constructor (container) {
    this.container = container;
  }

  renderCardList(index, createCardMethod) {
    for (let i = index; i < index + 3; i++) {
      this.container.appendChild((createCardMethod(JSON.parse(sessionStorage.getItem(i)))));
    }
  }
}