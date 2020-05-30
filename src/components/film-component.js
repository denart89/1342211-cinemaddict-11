import {AbstractComponent} from "./abstract-component";

const createFilmCardControlButton = (name, isActive = false) => {
  return `<button class="film-card__controls-item button film-card__controls-item--${name} ${isActive ? `film-card__controls-item--active` : ``}">${name}</button>`;
};

const createFilmCardTemplate = (film, comments) => {
  const {name, description, image, rating, releaseDate, runtime, genre} = film;

  const watchlistButton = createFilmCardControlButton(`add-to-watchlist`, film.isWatchlist);
  const watchedButton = createFilmCardControlButton(`mark-as-watched`, film.isHistory);
  const favoriteButton = createFilmCardControlButton(`favorite`, film.isFavorites);

  const commentsCount = comments.length;

  return `<article class="film-card">
          <h3 class="film-card__title">${name}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${releaseDate.year}</span>
            <span class="film-card__duration">${runtime.hours}h ${runtime.minutes}m</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${image}" alt="" class="film-card__poster">
          <p class="film-card__description">${description}</p>
          <a class="film-card__comments">${commentsCount} comments</a>
          <form class="film-card__controls">
            ${watchlistButton}
            ${watchedButton}
            ${favoriteButton}
          </form>
        </article>`;
};

class FilmComponent extends AbstractComponent {
  constructor(film, comments) {
    super();

    this._film = film;
    this._comments = comments;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film, this._comments.getComments());
  }

  setClickHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }

  setWatchListButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, handler);
  }

  setFavoriteButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, handler);
  }
}

export {FilmComponent};
