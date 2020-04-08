export class GithubApi {
  constructor(url) { 
    this.url = url;

    this.getCommits = this.getCommits.bind(this);
  }

  getCommits() {
    return fetch(this.url)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
      .catch(err => err)
  }
}