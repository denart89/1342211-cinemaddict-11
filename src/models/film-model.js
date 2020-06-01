export default class FilmModel {
  constructor(film) {
    this.id = film[`id`];
    this.poster = film.film_info[`poster`];
    this.title = film.film_info[`title`];
    this.originalTitle = film.film_info[`alternative_title`];
    this.rating = film.film_info[`total_rating`];
    this.director = film.film_info[`director`];
    this.writers = film.film_info[`writers`];
    this.actors = film.film_info[`actors`];
    this.releaseDate = film.film_info.release[`date`];
    this.runtime = film.film_info[`runtime`];
    this.country = film.film_info.release[`release_country`];
    this.genres = film.film_info[`genre`];
    this.description = film.film_info[`description`];
    this.age = film.film_info[`age_rating`];
    this.watchingDate = film.user_details[`watching_date`];
    this.commentsIds = film[`comments`];
    this.controls = {
      isWatchlist: film.user_details[`watchlist`],
      isWatched: film.user_details[`already_watched`],
      isFavorite: film.user_details[`favorite`],
    };
  }

  toRAW() {
    return {
      "id": this.id,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.rating,
        "poster": this.poster,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate,
          "release_country": this.country,
        },
        "runtime": this.runtime,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.controls.isWatchlist,
        "already_watched": this.controls.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.controls.isFavorite,
      },
      "comments": this.commentsIds,
    };
  }

  static clone(film) {
    return new FilmModel(film.toRAW());
  }

  static parseFilm(film) {
    return new FilmModel(film);
  }

  static parseFilms(films) {
    return films.map(FilmModel.parseFilm);
  }
}
