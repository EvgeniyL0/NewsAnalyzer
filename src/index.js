import './pages/index.css';
import './images/favicon.png';
import './images/search-back.png';
import './images/not-found.svg';
import './images/sample.jpg';
import './images/fb-icon.svg';
import './images/github-icon.svg';

(function () {
    const searhBtn = document.querySelector('.button_search');
    const searchForm = document.forms.search;
    const requestToApi = new NewsApi();

    function searchHandler(event) {
        event.preventDefault();
        requestToApi.getNews();
    }

    searchForm.addEventListener('submit', searchHandler);
})();