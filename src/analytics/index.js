import '../pages/analytics.css';
import '../images/favicon.png';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';

(function () {
  const summarySection = document.querySelector('.summary');
  const detailsSection = document.querySelector('.details');
  const scaleElem = detailsSection.querySelector('.diagram__scale');
  const topicOfNews = sessionStorage.getItem('topic');
  const numberOfNews = JSON.parse(sessionStorage.getItem('response')).totalResults;
  const articles = JSON.parse(sessionStorage.getItem('response')).articles;
  let refTotal = 0;
  let dailyResults = {};

  for (let i = 0; i < articles.length; i++) {
    let publishDate = new Date(Date.parse(articles[i].publishedAt));
    let publishDay = publishDate.getDate();

    if (articles[i].title.toLowerCase().includes(topicOfNews)) {
      refTotal += 1;
    }

    if (articles[i].title.toLowerCase().includes(topicOfNews) || articles[i].description.toLowerCase().includes(topicOfNews)) {
      dailyResults[publishDay] = (dailyResults[publishDay] || 0) + 1;
    }
  }

  for (let i = 0; i < 7; i++) {
    let currDate = new Date();
    let refCurrentDay = 0;

    currDate.setDate(currDate.getDate() - i);
    refCurrentDay = (dailyResults[currDate.getDate()] || 0);

    scaleElem.insertAdjacentHTML('afterend',
      `<div class="diagram__row">
        <p class="diagram__row-name">${currDate.toLocaleString('ru', { weekday: 'short', month: '2-digit', day: 'numeric' })}</p>
        <div class="diagram__bar diagram__bar_number_${7 - i}">
          <p>${refCurrentDay}</p>
        </div>
      </div>`);

    document.querySelector(`.diagram__bar_number_${7 - i}`).style.width = `${refCurrentDay}%`;
  }

  summarySection.querySelector('.section-content').insertAdjacentHTML('beforeend', 
    `<h1 class="content-title content-title_summary">Вы спросили: &laquo;${topicOfNews}&raquo;</h1>
    <p class="summary__number-of-news">Новостей за неделю: <span class="text-accent">${numberOfNews}</span></p>
    <p class="summary__number-of-references">Упоминаний в заголовках: <span class="text-accent">${refTotal}</span></p>`);

})();