import {Profile} from './components/profile';
import {Filter} from './components/filter';
import {Sort} from './components/sort';
import {FooterStatistics} from './components/footer-statistics';

import {generateSort} from './data/sort';
import {generateFilter} from './data/filter';
import {getRankName} from './data/profile';
import {generateFilms} from "./data/film";

import {render, renderPosition} from './utils/render';

import {PageController} from './controllers/PageController';

const films = generateFilms(22);

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const footerStatistics = body.querySelector(`.footer .footer__statistics`);

render(header, new Profile(getRankName()), renderPosition.APPEND);

render(main, new Filter(generateFilter()), renderPosition.PREPEND);

const navigation = document.querySelector(`.main-navigation`);

render(navigation, new Sort(generateSort()), renderPosition.AFTER);

const pageController = new PageController();
pageController.render(films);

render(footerStatistics, new FooterStatistics(), renderPosition.APPEND);
