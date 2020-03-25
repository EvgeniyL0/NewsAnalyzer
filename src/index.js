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

(function () {
    const searchForm = document.forms.search;
    const moreBtn = document.querySelector('.button_more');
    const requestToApi = new NewsApi('a1a651d59146429db5b30e99c590b996');
    const card = new NewsCard();
    const resultsList = new NewsCardList(document.querySelector('.results__news-cards'), document.querySelector('.section-header'));

    function showLoading(isLoad) {
        if (isLoad) {
            document.querySelector('.results').style.display = 'block';
            document.querySelector('.loader').style.display = 'block';
            document.querySelector('.content-subtitle_load').textContent = 'Идёт загрузка...';
            document.querySelector('.content-subtitle_load').style.display = 'block';
            document.querySelector('.results__wrapper').style.display = 'none';
        } else {
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.content-subtitle_load').style.display = 'none';
            document.querySelector('.results__wrapper').style.display = 'block';
        }
    }

    function searchHandler(event) {
        event.preventDefault();
        sessionStorage.clear();
        showLoading(true);
        requestToApi.getNews(searchForm.elements.topic.value, '2020-03-25',
            (data) => {
                data.articles.forEach((item, index) => {
                    sessionStorage.setItem(index, JSON.stringify(item));
                });
                resultsList.renderCardList(true, document.createElement('div'), 
                    (article) => card.create(article.title, article.description, article.publishedAt, article.source.name, article.urlToImage, article.url)
                );
                showLoading(false);
            });
    }

    function moreNewsHandler(event) {
        resultsList.renderCardList(false, document.createElement('div'), 
            (article) => card.create(article.title, article.description, article.publishedAt, article.source.name, article.urlToImage, article.url)
        );
    }

    searchForm.addEventListener('submit', searchHandler);
    moreBtn.addEventListener('click', moreNewsHandler);
})();