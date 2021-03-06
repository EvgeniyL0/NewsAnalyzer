import '../pages/about.css';
import '../images/favicon.png';
import '../images/html-icon.svg';
import '../images/css-icon.svg';
import '../images/js-icon.svg';
import '../images/webpack-icon.svg';
import '../images/author.jpg';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { CommitCard } from '../js/components/CommitCard.js';
import { CommitCardList } from '../js/components/CommitCardList.js';
import { GithubApi } from '../js/modules/GithubApi.js';
import { URL_GITHUB_COMMITS } from '../js/constants/constants.js';
import { dateConversion } from '../js/utils/stringConversion.js';

const errorTitle = document.querySelector('.content-title_commits');
const errorSubtitle = document.querySelector('.content-subtitle_commits');
const requestCommits = new GithubApi(URL_GITHUB_COMMITS);
const commit = new CommitCard([], document.createElement('div'));
const commitsList = new CommitCardList(document.querySelector('.main-carousel'));
const Flickity = require('flickity');
let flkty;

errorTitle.style.display = 'none';
errorSubtitle.style.display = 'none';

function showError(errorText) {
  errorSubtitle.textContent = errorText;
  errorTitle.style.display = 'block';
  errorSubtitle.style.display = 'block';
}

requestCommits.getCommits()
  .then(data => {
    commitsList.renderCommitsList(
      data,
      dataElem => commit.create(
        dateConversion(dataElem.commit.committer.date),
        dataElem.author.avatar_url,
        dataElem.commit.committer.name,
        dataElem.commit.committer.email,
        dataElem.commit.message
      )
    );

    flkty = new Flickity('.main-carousel', {
      cellAlign: 'left',
      contain: true,
      pageDots: false
    })
  })
  .catch(err => {
    showError(err);
  });