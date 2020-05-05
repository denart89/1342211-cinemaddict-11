import {ProfileComponent} from './components/profile';
import {FilterComponent} from './components/filter';
import {FooterStatisticsComponent} from './components/footer-statistics';

import {generateFilter} from './data/filter';
import {getRankName} from './data/profile';
import {generateFilms} from "./data/film";

import {render, renderPosition} from './utils/render';

import {Page} from './controllers/page';

const films = generateFilms(22);

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const footerStatistics = body.querySelector(`.footer .footer__statistics`);

render(header, new ProfileComponent(getRankName()), renderPosition.APPEND);

render(main, new FilterComponent(generateFilter()), renderPosition.PREPEND);

const pageController = new Page();
pageController.render(films);

render(footerStatistics, new FooterStatisticsComponent(), renderPosition.APPEND);
