export class GithubApi {
  constructor(url) { 
    this.url = url;

    this.getCommits = this.getCommits.bind(this);
  }

  getCommits(callbackFunc, errorFunc) {
    return fetch(this.url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
      .then(data => {
        callbackFunc(data);
      })
      .catch(err => {
        errorFunc(err);
      })
  }
}