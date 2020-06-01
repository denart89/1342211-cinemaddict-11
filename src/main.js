import API from "./api/index.js";
import Provider from "./api/provider.js";
import {AUTHORIZATION, END_POINT} from "./constants";
import {ProfileComponent} from './components/profile-component';
import FilterController from './controllers/filter-controller';
import PageController from './controllers/page-controller';
import FooterStatisticsComponent from './components/footer-statistics-component';
import {render, renderPosition} from './utils/render';
import FilmsContainerComponent from "./components/films-container-component";
import FilmsModel from "./models/films-model";
import MenuComponent from "./components/menu-component";
import StatisticsComponent from "./components/statistic-component";

const filmsModel = new FilmsModel();
const api = new API(AUTHORIZATION, END_POINT);
const apiProvider = new Provider(api, filmsModel);
const header = document.querySelector(`.header`);
const footerStatistics = document.querySelector(`.footer .footer__statistics`);
const menuComponent = new MenuComponent();

render(header, menuComponent, renderPosition.AFTER);

const filterController = new FilterController(menuComponent.getElement(), filmsModel);
const filmContainerComponent = new FilmsContainerComponent();
const pageController = new PageController(filmContainerComponent, filmsModel, apiProvider);
const statisticsComponent = new StatisticsComponent(filmsModel);

menuComponent.setStatisticClickHandler((hash) => {
  switch (hash) {
    case `#stats`:
      statisticsComponent.show();
      pageController.hide();
      break;
    default:
      statisticsComponent.hide();
      pageController.show();
  }
});

apiProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    pageController.render();
    filterController.render();

    render(header, new ProfileComponent(films), renderPosition.APPEND);
    render(menuComponent.getElement(), statisticsComponent, renderPosition.AFTER);
    render(footerStatistics, new FooterStatisticsComponent(films), renderPosition.APPEND);
    statisticsComponent.hide();
  })
  .catch((err) => {
    throw new Error(err);
  });
