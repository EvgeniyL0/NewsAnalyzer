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

const resultsSection = document.querySelector('.results');
const loadingSection = document.querySelector('.results__loading');
const notFoundSection = document.querySelector('.results__not-found');
const notFoundTitle = notFoundSection.querySelector('.content-title_loading');
const notFoundSubtitle = notFoundSection.querySelector('.content-subtitle_loading');
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
    document.createElement('div'),
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
    document.createElement('div'),
    document.querySelector('.results__news-cards'),
    document.querySelector('.section-header'),
    moreButton
);

function showLoading() {
    newsCardsSection.style.display = 'none';
    notFoundSection.style.display = 'none';
    loadingSection.style.display = 'flex';
    searchFormSubmit.setAttribute('disabled', '');
}

function showResults(isFound) {
    resultsSection.style.display = 'block';
    loadingSection.style.display = 'none';
    if (isFound) {
        newsCardsSection.style.display = 'block';
    } else {
        notFoundTitle.textContent = 'Ничего не найдено';
        notFoundSubtitle.textContent = 'К сожалению по вашему запросу ничего не найдено';
        notFoundSection.style.display = 'flex';
    }
}

function showError(errorText) {
    notFoundTitle.textContent = 'Что-то пошло не так...';
    notFoundSubtitle.textContent = errorText;
    loadingSection.style.display = 'none';
    notFoundSection.style.display = 'flex';
}

function checkStorage() {
    if (localStorage.getItem('topic') && localStorage.getItem('response')) {
        searchFormInput.value = localStorage.getItem('topic');
        resultsList.renderCardList(
            true,
            JSON.parse(localStorage.getItem('response')).articles,
            (article) => card.create(
                cutDown(article.title, 100),
                cutDown(article.description, 100),
                dateConversion(article.publishedAt),
                article.source.name,
                article.urlToImage,
                article.url
            )
        );
        showResults(true);
    } else {
        searchFormInput.value = '';
    }
}

function sendRequest() {
    const startDate = new Date();
    const period = 7;

    startDate.setDate(startDate.getDate() - period + 1);
    localStorage.clear();
    showLoading();
    requestNews.getNews(
        searchFormInput.value,
        `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`,
        (data) => {
            if (data.articles.length !== 0) {
                localStorage.setItem('topic', searchFormInput.value);
                localStorage.setItem('response', JSON.stringify(data));
                resultsList.renderCardList(
                    true,
                    JSON.parse(localStorage.getItem('response')).articles,
                    (article) => card.create(
                        cutDown(article.title, 100),
                        cutDown(article.description, 100),
                        dateConversion(article.publishedAt),
                        article.source.name,
                        article.urlToImage,
                        article.url
                    )
                );
                showResults(true);
            } else {
                showResults(false);
            }
            searchFormSubmit.removeAttribute('disabled');
        },
        (err) => {
            showError(err);
        }
    );
}

function searchHandler(event) {
    event.preventDefault();
    search.checkValidity(sendRequest);
}

function showMoreHandler(event) {
    resultsList.renderCardList(
        false,
        JSON.parse(localStorage.getItem('response')).articles,
        (article) => card.create(
            cutDown(article.title, 100),
            cutDown(article.description, 100),
            dateConversion(article.publishedAt),
            article.source.name,
            article.urlToImage,
            article.url
        )
    );
}

search.initialize(checkStorage);