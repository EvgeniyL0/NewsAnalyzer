export class CommitCardList {
  constructor() {
  }

  renderCommitsList(commitsArray, commitsContainer, createCommitMethod) {
    for (let i = 0; i < 20; i++) {
      commitsContainer.insertAdjacentHTML('beforeend', createCommitMethod(commitsArray[i]));
    }
  }
}