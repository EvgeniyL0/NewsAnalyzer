import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
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
    const moreButton = document.querySelector('.button_more');
    const searchForm = document.forms.search;
    const searchFormInput = searchForm.elements.topic;
    const searchFormSubmit = searchForm.elements.submit;

    const search = new SearchInput(
        [{
            target: searchForm, 
            event: 'submit', 
            handler: searchHandler
        }], 
        searchForm, 
        searchFormInput, 
        searchFormSubmit
    );

    const requestNews = new NewsApi(API_KEY);

    const card = new NewsCard();

    const resultsList = new NewsCardList(
        [{
            target: moreButton,
            event: 'click',
            handler: showMoreHandler
        }], 
        document.querySelector('.results__news-cards'), 
        document.querySelector('.section-header'), 
        moreButton
    );

    function showLoading() {
        newsCardsSection.style.display = 'none';
        notFoundSection.style.display = 'none';
        resultsSection.style.display = 'block';
        loadingSection.style.display = 'flex';
        searchFormSubmit.setAttribute('disabled', '');
    }

    function showResults(isFound) {
        loadingSection.style.display = 'none';
        if (isFound) {
            newsCardsSection.style.display = 'block';
        } else {
            notFoundSection.style.display = 'flex';
        }
    }

    function sendRequest() {
        let startDate = new Date();

        startDate.setDate(startDate.getDate() - 6);
        sessionStorage.clear();
        showLoading();
        sessionStorage.setItem('topic', searchFormInput.value);
        requestNews.getNews(searchFormInput.value, `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
            (data) => {
                if (data.articles.length !== 0) {
                    sessionStorage.setItem('response', JSON.stringify(data));
                    resultsList.renderCardList(true, JSON.parse(sessionStorage.getItem('response')).articles, 
                        (article) => card.create(cutDown(article.title, 60), cutDown(article.description, 150), dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url));
                    showResults(true);
                } else {
                    showResults(false);
                }
                searchFormSubmit.removeAttribute('disabled');
            }
        );
    }

    function searchHandler(event) {
        event.preventDefault();
        search.checkValidity(sendRequest);
    }

    function showMoreHandler(event) {
        resultsList.renderCardList(false, JSON.parse(sessionStorage.getItem('response')).articles, 
            (article) => card.create(cutDown(article.title, 60), cutDown(article.description, 150), dateConversion(article.publishedAt), article.source.name, article.urlToImage, article.url));
    }

    search.find();

})();