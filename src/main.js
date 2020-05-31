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
import {StatisticsComponent} from "./components/statistic-component";

const films = generateFilms(22);
const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const header = document.querySelector(`.header`);
const footerStatistics = document.querySelector(`.footer .footer__statistics`);
const menuComponent = new MenuComponent();
const statisticComponent = new StatisticsComponent(films);

render(header, new ProfileComponent(getRankName()), renderPosition.APPEND);

render(header, menuComponent, renderPosition.AFTER);

const filterController = new FilterController(menuComponent.getElement(), filmsModel);
filterController.render();

const filmContainerComponent = new FilmsContainerComponent();

const pageController = new PageController(filmContainerComponent, filmsModel);
pageController.render();

menuComponent.setStatisticClickHandler((hash) => {
  switch (hash) {
    case `#stats`:
      statisticComponent.show();
      pageController.hide();
      break;
    default:
      statisticComponent.hide();
      pageController.show();
  }
});

render(menuComponent.getElement(), statisticComponent, renderPosition.AFTER);

render(footerStatistics, new FooterStatisticsComponent(), renderPosition.APPEND);
