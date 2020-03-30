export class GithubApi {
  constructor() { }

  getCommits(callbackFunc) {
    return fetch('https://api.github.com/repos/EvgeniyL0/NewsAnalyzer/commits')
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