export class NewsApi {
  constructor(apiToken) {
      this.apiToken = apiToken;
      
      this.getNews = this.getNews.bind(this);
  }

  getNews(keyword, date) {
      return fetch('https://newsapi.org/v2/everything?' +
          `q=${keyword}&` +
          `from=${date}&` +
          'sortBy=publishedAt&' +
          'pageSize=100&' +
          `apiKey=${this.apiToken}`)
      .then(res => {
          if (res.ok) {
              return res.json();
          }
          return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }
}