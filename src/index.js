import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
import './images/not-found.svg';
import './images/author.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';
import { NewsApi } from './js/modules/NewsApi.js';
import { NewsCard } from './js/components/NewsCard.js';
import { NewsCardList } from './js/components/NewsCardList.js';
import { dateConversion, cutDown } from './js/utils/stringConversion.js';
import { API_KEY } from './js/constants/constants.js';
import { SearchInput } from './js/components/SearchInput';
import { DataStorage } from './js/modules/DataStorage.js';

const resultsSection = document.querySelector('.results');
const loadingSection = document.querySelector('.results__loading');
const notFoundSection = document.querySelector('.results__not-found');
const notFoundTitle = notFoundSection.querySelector('.content-title_loading');
const notFoundSubtitle = notFoundSection.querySelector('.content-subtitle_loading');
const newsCardsSection = document.querySelector('.results__wrapper');
const moreButton = document.querySelector('.button_more');
const upButton = document.querySelector('.button_up');
const searchForm = document.querySelector('.search__form');
const searchFormInput = searchForm.elements.topic;
const searchFormSubmit = searchForm.elements.submit;
const search = new SearchInput(
    [{
        target: searchForm,
        event: 'submit',
        handler: submitSearchFormHandler
    },
    {
        target: upButton,
        event: 'click',
        handler: clickUpButtonHandler
    }],
    document.createElement('div'),
);
const requestNews = new NewsApi(API_KEY);
const card = new NewsCard();
const resultsList = new NewsCardList(
    [{
        target: moreButton,
        event: 'click',
        handler: clickMoreButtonHandler
    }],
    document.createElement('div'),
    document.querySelector('.results__news-cards'),
    document.querySelector('.section-header')
);
const storage = new DataStorage();

function showLoading() {
    notFoundSection.style.display = 'none';
    newsCardsSection.style.display = 'none';
    loadingSection.style.display = 'flex';
    searchFormInput.setAttribute('disabled', '');
    searchFormSubmit.setAttribute('disabled', '');
}

function showResults(isFound) {
    loadingSection.style.display = 'none';
    searchFormInput.removeAttribute('disabled');
    searchFormSubmit.removeAttribute('disabled');
    if (isFound) {
        newsCardsSection.style.display = 'block';
        resultsSection.style.display = 'block';
    } else {
        notFoundTitle.textContent = 'Ничего не найдено';
        notFoundSubtitle.textContent = 'К сожалению по вашему запросу ничего не найдено';
        notFoundSection.style.display = 'flex';
    }
}

function showError(errorText) {
    loadingSection.style.display = 'none';
    searchFormInput.removeAttribute('disabled');
    searchFormSubmit.removeAttribute('disabled');
    notFoundTitle.textContent = 'Что-то пошло не так...';
    notFoundSubtitle.textContent = errorText;
    notFoundSection.style.display = 'flex';
}

function firstBoot() {
    if (storage.read('topic') && storage.read('response')) {
        searchFormInput.value = storage.read('topic');
        resultsList.renderCardList(
            true,
            storage.read('response').articles,
            article => card.create(
                cutDown(article.title, 100),
                cutDown(article.description, 100),
                dateConversion(article.publishedAt),
                article.source.name,
                article.urlToImage,
                article.url
            ),
            moreButton
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
    storage.clear();
    showLoading();
    requestNews.getNews(searchFormInput.value, `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`)
        .then(data => {
            if (typeof data === 'string') {
                showError(data);
            } else {
                if (data.articles.length !== 0) {
                    storage.write('topic', searchFormInput.value);
                    storage.write('response', data);
                    resultsList.renderCardList(
                        true,
                        storage.read('response').articles,
                        article => card.create(
                            cutDown(article.title, 100),
                            cutDown(article.description, 100),
                            dateConversion(article.publishedAt),
                            article.source.name,
                            article.urlToImage,
                            article.url
                        ),
                        moreButton
                    );
                    showResults(true);
                } else {
                    showResults(false);
                }
            }
        })
}

function submitSearchFormHandler(event) {
    event.preventDefault();
    search.checkValidity(searchFormInput, 'blink', searchFormSubmit, sendRequest);
}

function clickMoreButtonHandler(event) {
    resultsList.renderCardList(
        false,
        storage.read('response').articles,
        article => card.create(
            cutDown(article.title, 100),
            cutDown(article.description, 100),
            dateConversion(article.publishedAt),
            article.source.name,
            article.urlToImage,
            article.url
        )
    );
}

function clickUpButtonHandler(event) {
    window.scrollTo(0, 0);
}

search.initialize(firstBoot, searchForm, upButton);

window.addEventListener('scroll', () => {
    if (pageYOffset < document.documentElement.clientHeight) {
        upButton.style.display = 'none';
    } else {
        upButton.style.display = 'block';
    }
});