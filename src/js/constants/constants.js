const API_KEY = 'a1a651d59146429db5b30e99c590b996';
const URL_NEWS = NODE_ENV === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://praktikum.tk/news/v2/everything?';
const URL_GITHUB_COMMITS = 'https://api.github.com/repos/EvgeniyL0/NewsAnalyzer/commits';

export {
  API_KEY,
  URL_NEWS,
  URL_GITHUB_COMMITS
}
