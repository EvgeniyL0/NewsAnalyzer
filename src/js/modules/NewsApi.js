export class NewsApi {
    constructor(apiToken) {
        this.apiToken = apiToken;
    }

    getNews(keyword, date, callbackFunc) {
        return fetch('http://newsapi.org/v2/everything?' +
            `q=${keyword}&` +
            `from=${date}&` +
            'sortBy=popularity&' +
            `apiKey=${this.apiToken}`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка ${res.status}`);
        })
        .then(data => {
            callbackFunc(data);
        })
        .catch(err => {
            console.log(err);
        })
    }
}