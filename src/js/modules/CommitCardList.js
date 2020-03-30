export class CommitCardList {
  constructor(commitsContainer) {
    this.commitsContainer = commitsContainer;
  }

  renderCommitsList(commitsArray, commitCreateMethod) {
    for (let i = 0; i < 20; i++) {
      this.commitsContainer.insertAdjacentHTML('beforeend', commitCreateMethod(commitsArray[i]));
    }
  }
}