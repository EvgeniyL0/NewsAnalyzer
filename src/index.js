import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
import './images/not-found.svg';
import './images/sample.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';
import {NewsApi} from './js/modules/NewsApi.js';
import {NewsCard} from './js/modules/NewsCard.js';
import {NewsCardList} from './js/modules/NewsCardList.js';

(function () {
    const searchForm = document.forms.search;
    const requestToApi = new NewsApi('a1a651d59146429db5b30e99c590b996');
    const card = new NewsCard();
    const resultsList = new NewsCardList(document.querySelector('.results__news-cards'), card);

    function searchHandler(event) {
        event.preventDefault();
        document.querySelector('.results').style.display = 'block';
        document.querySelector('.loader').style.display = 'block';
        document.querySelector('.content-subtitle_load').textContent = 'Идёт загрузка...';
        document.querySelector('.content-subtitle_load').style.display = 'block';
        requestToApi.getNews(searchForm.elements.topic.value, '2020-03-24', 
        (data) => {
            data.articles.forEach((item, index) => {
                sessionStorage.setItem(index, item);
            });
            resultsList.renderCardList()
            document.querySelector('.results').style.display = 'none';
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.content-subtitle_load').style.display = 'none';
        });
    }

    searchForm.addEventListener('submit', searchHandler);
})();