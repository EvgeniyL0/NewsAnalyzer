export class Statistics {
  constructor(topic, numberOfNews, articles) {
    this.topic = topic;
    this.numberOfNews = numberOfNews;
    this.articles = articles;

    this.build = this.build.bind(this);
  }

  _get() {
    let refTotal = 0;
    let dailyResults = {};

    for (let i = 0; i < this.articles.length; i++) {
      let publishDate = new Date(Date.parse(this.articles[i].publishedAt));
      let publishDay = publishDate.getDate();

      if (this.articles[i].title.toLowerCase().includes(this.topic)) {
        refTotal += 1;
      }
  
      if (this.articles[i].title.toLowerCase().includes(this.topic) || this.articles[i].description.toLowerCase().includes(this.topic)) {
        dailyResults[publishDay] = (dailyResults[publishDay] || 0) + 1;
      }
    }

    return { refTotal, dailyResults };
  }

  build(summaryElem, diagramContainer) {
    let currDate = new Date();
    let stat = this._get();
    let refCurrentDay = 0;
    let diagramMarkup = '';

    currDate.setDate(currDate.getDate() - 6);

    summaryElem.querySelector('.section-content').insertAdjacentHTML('beforeend', 
      `<h1 class="content-title content-title_summary">Вы спросили: &laquo;${this.topic}&raquo;</h1>
      <p class="summary__number-of-news">Новостей за неделю: <span class="text-accent">${this.numberOfNews}</span></p>
      <p class="summary__number-of-references">Упоминаний в заголовках: <span class="text-accent">${stat.refTotal}</span></p>`);

    for (let i = 0; i < 7; i++) {    
      refCurrentDay = (stat.dailyResults[currDate.getDate()] || 0);

      diagramMarkup += `<div class="diagram__row">
          <p class="diagram__row-name">${currDate.toLocaleString('ru', { weekday: 'short', month: '2-digit', day: 'numeric' })}</p>
          <div class="diagram__bar" style="width: ${refCurrentDay}%;">
            <p>${refCurrentDay}</p>
          </div>
        </div>`
    
      currDate.setDate(currDate.getDate() + 1);
    }
    
    diagramContainer.insertAdjacentHTML('afterend', diagramMarkup);
  }
  
}