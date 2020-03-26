import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
import './images/not-found.svg';
import './images/sample.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';
import { NewsApi } from './js/modules/NewsApi.js';
import { NewsCard } from './js/modules/NewsCard.js';
import { NewsCardList } from './js/modules/NewsCardList.js';
import { conversionDate } from './js/utils/stringConversion.js';

(function () {
    const searchForm = document.forms.search;
    const resultsSection = document.querySelector('.results');
    const loadingSection = document.querySelector('.results__loading');
    const notFoundSection = document.querySelector('.results__not-found');
    const newsCardsSection = document.querySelector('.results__wrapper');
    const requestToApi = new NewsApi('a1a651d59146429db5b30e99c590b996');
    const card = new NewsCard();
    const resultsList = new NewsCardList(document.querySelector('.results__news-cards'), document.querySelector('.section-header'));

    function showLoading() {
        newsCardsSection.style.display = 'none';
        notFoundSection.style.display = 'none';
        resultsSection.style.display = 'block';
        loadingSection.style.display = 'flex';
    }

    function showResults(isFound) {
        loadingSection.style.display = 'none';
        if (isFound) {
            newsCardsSection.style.display = 'block';
            document.querySelector('.button_more').addEventListener('click', moreNewsHandler);
        } else {
            notFoundSection.style.display = 'flex';
        }
    }

    function searchHandler(event) {
        event.preventDefault();
        sessionStorage.clear();
        showLoading();
        requestToApi.getNews(searchForm.elements.topic.value, '2020-03-25',
            (data) => {
                if (data.articles.length !== 0) {
                    data.articles.forEach((item, index) => {
                        sessionStorage.setItem(index, JSON.stringify(item));
                    });
                    resultsList.renderCardList(true, document.createElement('div'), document.querySelector('.button_more'),
                        (article) => card.create(article.title, article.description, conversionDate(article.publishedAt), article.source.name, article.urlToImage, article.url)
                    );
                    showResults(true);
                } else {
                    showResults(false);
                }
            });
    }

    function moreNewsHandler(event) {
        resultsList.renderCardList(false, document.createElement('div'), event.target,
            (article) => card.create(article.title, article.description, conversionDate(article.publishedAt), article.source.name, article.urlToImage, article.url)
        );
    }

    searchForm.addEventListener('submit', searchHandler);
})();