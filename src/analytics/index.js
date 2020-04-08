import '../pages/analytics.css';
import '../images/favicon.png';
import '../images/fb-icon.svg';
import '../images/github-icon.svg';
import { Statistics } from '../js/components/Statistics.js';
import { DataStorage } from '../js/modules/DataStorage.js';

const storage = new DataStorage();

const diagram = new Statistics(
  [],
  document.createElement('div'),
  storage.read('topic'),
  storage.read('response').totalResults,
  storage.read('response').articles
);

diagram.build(document.querySelector('.summary'), document.querySelector('.diagram__chart-area'));