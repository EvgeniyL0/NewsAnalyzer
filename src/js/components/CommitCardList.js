import { BaseComponent } from './BaseComponent.js';

export class CommitCardList extends BaseComponent {
  constructor(eventHandlers, divElement, commitsContainer) {
    super(eventHandlers, divElement);
    this.commitsContainer = commitsContainer;

    this.renderCommitsList = this.renderCommitsList.bind(this);
  }

  renderCommitsList(commitsArray, createCommitMethod) {
    const numberOfCommits = 20;
    let commitsMarkup = '';
    
    for (let i = 0; i < numberOfCommits; i++) {
      commitsMarkup += createCommitMethod(commitsArray[i]);
    }

    this.commitsContainer.insertAdjacentHTML('beforeend', this._sanitize(commitsMarkup));
  }
}