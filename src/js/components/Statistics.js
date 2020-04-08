import { BaseComponent } from './BaseComponent.js';

export class Statistics extends BaseComponent {
  constructor(eventHandlers, divElement, topic, numberOfNews, articles) {
    super(eventHandlers, divElement);
    this.topic = topic;
    this.numberOfNews = numberOfNews;
    this.articles = articles;

    this.build = this.build.bind(this);
  }

  _get() {
    let refTotal = 0;
    let dailyResults = {};

    this.articles.forEach(item => {
      let publishDate = new Date(Date.parse(item.publishedAt));
      let publishDay = publishDate.getDate();

      if (item.title.toLowerCase().includes(this.topic)) {
        refTotal += 1;
      }
  
      if (item.title.toLowerCase().includes(this.topic) || item.description.toLowerCase().includes(this.topic)) {
        dailyResults[publishDay] = (dailyResults[publishDay] || 0) + 1;
      }
    });

    return { refTotal, dailyResults };
  }

  build(summaryElem, diagramContainer) {
    const currDate = new Date();
    const stat = this._get();
    const period = 7;
    const summaryMarkup = 
      `<h1 class="content-title content-title_summary">Вы спросили: &laquo;${this.topic}&raquo;</h1>
      <p class="summary__number-of-news">Новостей за неделю: <span class="text-accent">${this.numberOfNews}</span></p>
      <p class="summary__number-of-references">Упоминаний в заголовках: <span class="text-accent">${stat.refTotal}</span></p>`;
    
    let refCurrentDay = 0;
    let rowsMarkup = '';

    currDate.setDate(currDate.getDate() - period + 1);

    summaryElem.querySelector('.section-content').insertAdjacentHTML('beforeend', this._sanitize(summaryMarkup));

    for (let i = 0; i < period; i++) {    
      refCurrentDay = (stat.dailyResults[currDate.getDate()] || 0);

      rowsMarkup += 
        `<div class="diagram__row">
          <p class="diagram__row-name">${currDate.toLocaleString('ru', { weekday: 'short', month: '2-digit', day: 'numeric' })}</p>
          <div class="diagram__row-content">
            <div class="diagram__bar" style="width: ${refCurrentDay}%"></div>
            <p>${refCurrentDay}</p>
          </div>
        </div>`
    
      currDate.setDate(currDate.getDate() + 1);
    }
    
    diagramContainer.insertAdjacentHTML('beforeend', this._sanitize(rowsMarkup));
  }
  
}