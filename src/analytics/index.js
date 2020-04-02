import '../pages/analytics.css';
import '../images/favicon.png';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { Statistics } from '../js/modules/Statistics.js';

(function () {
  const diagram = new Statistics(sessionStorage.getItem('topic'), JSON.parse(sessionStorage.getItem('response')).totalResults, JSON.parse(sessionStorage.getItem('response')).articles);
  
  diagram.build(document.querySelector('.summary'), document.querySelector('.diagram__chart-area'));

})();