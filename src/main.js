import {ProfileComponent} from './components/profile-component';
import {FilterController} from './controllers/filter-controller';
import {FooterStatisticsComponent} from './components/footer-statistics-component';
import {getRankName} from './data/profile';
import {generateFilms} from "./data/film";
import {render, renderPosition} from './utils/render';
import {PageController} from './controllers/page-controller';
import {FilmsContainerComponent} from "./components/films-container-component";
import FilmsModel from "./models/films-model";
import {MenuComponent} from "./components/menu-component";

const films = generateFilms(22);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const body = document.querySelector(`body`);
const header = body.querySelector(`.header`);
const footerStatistics = body.querySelector(`.footer .footer__statistics`);
const menuComponent = new MenuComponent();

render(header, new ProfileComponent(getRankName()), renderPosition.APPEND);

render(header, menuComponent, renderPosition.AFTER);

const filterController = new FilterController(menuComponent.getElement(), filmsModel);
filterController.render();

const filmContainerComponent = new FilmsContainerComponent();

const pageController = new PageController(filmContainerComponent, filmsModel);
pageController.render();

render(footerStatistics, new FooterStatisticsComponent(), renderPosition.APPEND);
