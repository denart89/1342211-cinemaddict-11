import API from "./api/index.js";
import Provider from "./api/provider.js";
import {AUTHORIZATION, END_POINT} from "./constants";
import ProfileComponent from './components/profile-component';
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
const profileComponent = new ProfileComponent(filmsModel);
const footerStatisticsComponent = new FooterStatisticsComponent(filmsModel);

render(header, profileComponent, renderPosition.APPEND);
render(footerStatistics, footerStatisticsComponent, renderPosition.APPEND);

const filterController = new FilterController(menuComponent.getElement(), filmsModel);
const filmContainerComponent = new FilmsContainerComponent();
const pageController = new PageController(filmContainerComponent, filmsModel, apiProvider);
const statisticsComponent = new StatisticsComponent(filmsModel);

menuComponent.setStatisticClickHandler((hash) => {
  switch (hash) {
    case `#stats`:
      filterController._rerender();
      menuComponent.setActiveClass();
      statisticsComponent.show();
      pageController.hide();
      break;
    default:
      if (menuComponent.getStatisticActiveClass()) {
        menuComponent.setRemoveActiveClass();
      }
      statisticsComponent.hide();
      pageController.show();
  }
});

apiProvider.getFilms()
  .then((films) => {
    filmsModel.setFilms(films);
    profileComponent.rerender();
    footerStatisticsComponent.rerender();
    render(header, menuComponent, renderPosition.AFTER);
    pageController.render();
    filterController.render();
    render(footerStatistics.parentNode, statisticsComponent, renderPosition.BEFORE);
    statisticsComponent.hide();
  })
  .catch((err) => {
    throw new Error(err);
  });
