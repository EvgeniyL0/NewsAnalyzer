import './pages/index.css';
import './images/favicon.png';
import './images/search-back.jpg';
import './images/not-found.svg';
import './images/author.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';
import { NewsApi } from './js/modules/NewsApi.js';
import { NewsCard } from './js/modules/NewsCard.js';
import { NewsCardList } from './js/modules/NewsCardList.js';
import { dateConversion, cutDown } from './js/utils/stringConversion.js';
import { API_KEY } from './js/constants/constants.js';
import { SearchInput } from './js/modules/SearchInput';

(function () {
    const resultsSection = document.querySelector('.results');
    const loadingSection = document.querySelector('.results__loading');
    const notFoundSection = document.querySelector('.results__not-found');
    const newsCardsSection = document.querySelector('.results__wrapper');
    const moreBtn = document.querySelector('.button_more');
    const searchForm = document.forms.search;
    const search = new SearchInput(searchForm, searchForm.elements.topic, searchForm.elements.search, moreBtn, 
        { 'submit': searchHandler, 'click': moreNewsHandler, 'input': checkInputHandler });
    const requestNews = new NewsApi(API_KEY);
    const card = new NewsCard();
    const resultsList = new NewsCardList(document.querySelector('.results__news-cards'), document.querySelector('.section-header'), moreBtn);

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
        } else {
            notFoundSection.style.display = 'flex';
        }
    }

    function searchHandler(event) {
        let startDate = new Date();

        startDate.setDate(startDate.getDate() - 6);
        event.preventDefault();
        sessionStorage.clear();
        showLoading();
        sessionStorage.setItem('topic', searchForm.elements.topic.value);
        requestNews.getNews(searchForm.elements.topic.value, `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
            (data) => {
                if (data.articles.length !== 0) {
                    sessionStorage.setItem('response', JSON.stringify(data));
                    resultsList.renderCardList(true, JSON.parse(sessionStorage.getItem('response')).articles, 
                        (article) => card.create(article.title, cutDown(article.description, 150), dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url));
                    showResults(true);
                } else {
                    showResults(false);
                }
                searchForm.elements.search.removeAttribute('disabled');
            });
    }

    function moreNewsHandler(event) {
        resultsList.renderCardList(false, JSON.parse(sessionStorage.getItem('response')).articles, 
            (article) => card.create(article.title, cutDown(article.description, 150), dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url));
    }

    function checkInputHandler(event) {
        search.checkValidity();
    }

    search.find();

})();