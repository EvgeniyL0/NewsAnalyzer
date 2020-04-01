export class GithubApi {
  constructor(url) { 
    this.url = url;

    this.getCommits = this.getCommits.bind(this);
  }

  getCommits(callbackFunc) {
    return fetch(this.url)
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