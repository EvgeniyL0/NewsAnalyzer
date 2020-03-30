import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
import './images/not-found.svg';
import './images/sample.jpg';
import './images/author.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';
import { NewsApi } from './js/modules/NewsApi.js';
import { NewsCard } from './js/modules/NewsCard.js';
import { NewsCardList } from './js/modules/NewsCardList.js';
import { dateConversion } from './js/utils/stringConversion.js';
import { FormValidator } from './js/modules/formValidator.js';

(function () {
    const searchForm = document.forms.search;
    const moreBtn = document.querySelector('.button_more');
    const resultsSection = document.querySelector('.results');
    const loadingSection = document.querySelector('.results__loading');
    const notFoundSection = document.querySelector('.results__not-found');
    const newsCardsSection = document.querySelector('.results__wrapper');
    const requestNews = new NewsApi('a1a651d59146429db5b30e99c590b996');
    const card = new NewsCard();
    const resultsList = new NewsCardList(document.querySelector('.results__news-cards'), document.querySelector('.section-header'));
    const checkFormValidity = new FormValidator();

    function showLoading() {
        newsCardsSection.style.display = 'none';
        notFoundSection.style.display = 'none';
        resultsSection.style.display = 'block';
        loadingSection.style.display = 'flex';
        searchForm.elements.search.setAttribute('disabled', '');
    }

    function showResults(isFound) {
        loadingSection.style.display = 'none';
        if (isFound) {
            newsCardsSection.style.display = 'block';
            moreBtn.addEventListener('click', moreNewsHandler);
        } else {
            notFoundSection.style.display = 'flex';
        }
    }

    function searchHandler(event) {
        let startDate = new Date();

        startDate.setDate(startDate.getDate() - 6);
        event.preventDefault();
        sessionStorage.removeItem('topic');
        sessionStorage.removeItem('response');
        showLoading();
        sessionStorage.setItem('topic', searchForm.elements.topic.value);
        requestNews.getNews(searchForm.elements.topic.value, `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
            (data) => {
                if (data.articles.length !== 0) {
                    sessionStorage.setItem('response', JSON.stringify(data));
                    resultsList.renderCardList(true, JSON.parse(sessionStorage.getItem('response')).articles, document.createElement('div'), moreBtn,
                        (article) => card.create(article.title, article.description, dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url)
                    );
                    showResults(true);
                } else {
                    showResults(false);
                }
                searchForm.elements.search.removeAttribute('disabled');
            });
    }

    function moreNewsHandler(event) {
        resultsList.renderCardList(false, JSON.parse(sessionStorage.getItem('response')).articles, document.createElement('div'), event.target,
            (article) => card.create(article.title, article.description, dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url)
        );
    }

    function checkInputHandler(event) {
        checkFormValidity.checkInput(event.target, searchForm.elements.search);
    }

    searchForm.addEventListener('submit', searchHandler);
    searchForm.addEventListener('input', checkInputHandler);
    
})();