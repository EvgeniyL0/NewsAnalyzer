export class CommitCardList {
  constructor(commitsContainer) {
    this.commitsContainer = commitsContainer;

    this.renderCommitsList = this.renderCommitsList.bind(this);
  }

  renderCommitsList(commitsArray, createCommitMethod) {
    let commitsMarkup = '';
    
    for (let i = 0; i < 20; i++) {
      commitsMarkup += createCommitMethod(commitsArray[i]);
    }
    this.commitsContainer.insertAdjacentHTML('beforeend', commitsMarkup);
  }
}