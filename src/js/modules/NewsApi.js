export class NewsApi {
  constructor(apiToken, newsUrl) {
      this.apiToken = apiToken;
      this.newsUrl = newsUrl;
      
      this.getNews = this.getNews.bind(this);
  }

  getNews(keyword, date) {
      return fetch(`${this.newsUrl}` +
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