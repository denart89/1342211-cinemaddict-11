import {ProfileComponent} from './components/profile-component';
import {FilterComponent} from './components/filter-component';
import {FooterStatisticsComponent} from './components/footer-statistics-component';

import {generateFilter} from './data/filter';
import {getRankName} from './data/profile';
import {generateFilms} from "./data/film";

import {render, renderPosition} from './utils/render';

import {PageController} from './controllers/page-controller';
import {FilmsContainerComponent} from "./components/films-container-component";

const films = generateFilms(22);

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const main = body.querySelector(`.main`);
const footerStatistics = body.querySelector(`.footer .footer__statistics`);

render(header, new ProfileComponent(getRankName()), renderPosition.APPEND);

render(main, new FilterComponent(generateFilter()), renderPosition.PREPEND);

const filmContainerComponent = new FilmsContainerComponent();

const pageController = new PageController(filmContainerComponent);
pageController.render(films);

render(footerStatistics, new FooterStatisticsComponent(), renderPosition.APPEND);
