import '../pages/about.css';
import '../images/favicon.png';
import '../images/html-icon.svg';
import '../images/css-icon.svg';
import '../images/js-icon.svg';
import '../images/webpack-icon.svg';
import '../images/author.jpg';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { CommitCard } from '../js/modules/CommitCard.js';
import { CommitCardList } from '../js/modules/CommitCardList.js';
import { GithubApi } from '../js/modules/GithubApi.js';
import { dateConversion } from '../js/utils/stringConversion.js';

(function () {
  const sliderElem = document.querySelector('.main-carousel');
  const requestCommits = new GithubApi();
  const commit = new CommitCard();
  const commitsList = new CommitCardList();
  const Flickity = require('flickity');
  let flkty;
  
  requestCommits.getCommits((data) => {
    commitsList.renderCommitsList(data, sliderElem, (dataElem) => 
      commit.create(dateConversion(dataElem.commit.committer.date), dataElem.author.avatar_url, dataElem.commit.committer.name, dataElem.commit.committer.email, dataElem.commit.message));
    flkty = new Flickity( '.main-carousel', {
      cellAlign: 'left',
      contain: true
    });    
  });
})();