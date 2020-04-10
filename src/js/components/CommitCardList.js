export class CommitCardList {
  constructor(commitsContainer) {
    this.commitsContainer = commitsContainer;

    this.renderCommitsList = this.renderCommitsList.bind(this);
  }

  renderCommitsList(commitsArray, createCommitMethod) {
    const numberOfCommits = 20;
    let commitsMarkup = '';
    
    for (let i = 0; i < numberOfCommits; i++) {
      commitsMarkup += createCommitMethod(commitsArray[i]);
    }

    this.commitsContainer.insertAdjacentHTML('beforeend', commitsMarkup);
  }
}