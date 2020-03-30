import '../pages/about.css';
import '../../node_modules/flickity/dist/flickity.pkgd.js';
import '../images/favicon.png';
import '../images/html-icon.svg';
import '../images/css-icon.svg';
import '../images/js-icon.svg';
import '../images/webpack-icon.svg';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { CommitCard } from '../js/modules/CommitCard.js';
import { CommitCardList } from '../js/modules/CommitCardList.js';
import { GithubApi } from '../js/modules/GithubApi.js';

(function () {
  const requestCommits = new GithubApi();
  const commit = new CommitCard();
  const commitsList = new CommitCardList(document.querySelector('.main-carousel'));

  requestCommits.getCommits((data) => {
    commitsList.renderCommitsList(data, (dataElem) => 
    commit.create(dataElem.commit.committer.date, dataElem.author.avatar_url, dataElem.commit.committer.name, dataElem.commit.committer.email, dataElem.commit.message));
  });
})();