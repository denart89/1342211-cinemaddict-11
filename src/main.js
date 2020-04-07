import {createProfileTemplate} from './components/profile';
import {createMenuTemplate} from './components/menu';
import {createSortTemplate} from './components/sort';
import {createFilmsContainerTemplate} from './components/films-list';
import {createFilmCardTemplate} from './components/film-card';
import {createShowMoreButtonTemplate} from './components/show-more-button';
import {createFooterStatisticsTemplate} from './components/footer-statistics';
import {createFullFilmDetailsTemplate} from './components/full-film-details';

document.addEventListener(`DOMContentLoaded`, () => {
  const body = document.querySelector(`body`);
  const header = document.querySelector(`.header`);
  const main = document.querySelector(`.main`);
  const footerStatistics = document.querySelector(`.footer .footer__statistics`);

  const FILMS_COUNT = 5;
  const EXTRA_FILMS_COUNT = 2;

  renderComponent(header, createProfileTemplate(), `beforeEnd`);
  renderComponent(main, createMenuTemplate(), `beforeEnd`);
  renderComponent(main, createSortTemplate(), `beforeEnd`);
  renderComponent(main, createFilmsContainerTemplate(), `beforeEnd`);

  const filmsList = document.querySelector(`.films-list`);
  const filmsListContainer = filmsList.querySelector(`.films-list__container`);

  const ExtraFilmsList = document.querySelectorAll(`.films-list--extra`);

  for (let i = 0; i < FILMS_COUNT; i++) {
    renderComponent(filmsListContainer, createFilmCardTemplate(), `beforeEnd`);
  }

  renderComponent(filmsList, createShowMoreButtonTemplate(), `beforeEnd`);

  for (let extraFilm of ExtraFilmsList) {
    const ExtraFilmsListContainer = extraFilm.querySelector(`.films-list__container`);

    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderComponent(ExtraFilmsListContainer, createFilmCardTemplate(), `beforeEnd`);
    }
  }

  renderComponent(footerStatistics, createFooterStatisticsTemplate(), `beforeEnd`);
  renderComponent(body, createFullFilmDetailsTemplate(), `beforeEnd`);

  const filmDetails = document.querySelector(`.film-details`);

  if (filmDetails) {
    filmDetails.style = `display: none`;
  }
});

const renderComponent = (container, html, place) => {
  container.insertAdjacentHTML(place, html);
};
