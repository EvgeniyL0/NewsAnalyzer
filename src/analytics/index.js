import '../pages/analytics.css';
import '../images/favicon.png';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { Statistics } from '../js/modules/Statistics.js';

const diagram = new Statistics(
  [],
  document.createElement('div'),
  localStorage.getItem('topic'),
  JSON.parse(localStorage.getItem('response')).totalResults,
  JSON.parse(localStorage.getItem('response')).articles
);

diagram.build(document.querySelector('.summary'), document.querySelector('.diagram__chart-area'));