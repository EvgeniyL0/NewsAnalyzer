class NewsApi {
    constructor(keyword, date) {
        this.keyword = keyword;
        this.date = date;
    }

    getNews() {
        return fetch('http://newsapi.org/v2/everything?' +
            `q=${this.keyword}&` +
            `from=${this.date}&` +
            'sortBy=popularity&' +
            'apiKey=a1a651d59146429db5b30e99c590b996')
        .then()
        .then()
        .catch()
    }
}