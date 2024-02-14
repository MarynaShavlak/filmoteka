import axios from 'axios';

export default class TmdbAPI {
  static media_type = {
    ALL: 'all',
    MOVIE: 'movie',
    TV: 'tv',
    PERSON: 'person',
  };
  static time_window = {
    DAY: 'day',
    WEEK: 'week',
  };
  static watch_monetization_types = {
    BUY: 'buy',
    RENT: 'rent',
    ADS: 'ads',
    FREE: 'free',
    FLATRATE: 'flatrate',
  };
  static sort_by_types = {
    POPULARITY_ASC: 'popularity ▲',
    POPULARITY_DESC: 'popularity ▼',
    PRIMARY_RELEASE_DATE_ASC: 'primary_release_date ▲',
    PRIMARY_RELEASE_DATE_DESC: 'primary_release_date ▼',
    VOTE_AVERAGE_ASC: 'vote_average ▲',
    VOTE_AVERAGE_DESC: 'vote_average ▼',
  };
  static BASE_URL = 'https://api.themoviedb.org/3';
  static IMG_BASE_URL = 'https://image.tmdb.org/t/p';
  static genres = {}; //obj {genre_id: genre_name}
  static genreIDs = {}; //obj {genre_name: genre_id}

  static getGenresString(genre_ids) {
    if (TmdbAPI.genres[genre_ids[0]] === undefined) {
      TmdbAPI.genres[genre_ids[0]] = '';
    }
    if (TmdbAPI.genres[genre_ids[1]] === undefined) {
      TmdbAPI.genres[genre_ids[1]] = '';
    }
    switch (genre_ids.length) {
      case 0:
        return '';
        break;
      case 1:
        return `${TmdbAPI.genres[genre_ids[0]]}`;
        break;
      case 2:
        return `${TmdbAPI.genres[genre_ids[0]]}, ${
          TmdbAPI.genres[genre_ids[1]]
        }`;
        break;
      default:
        return `${TmdbAPI.genres[genre_ids[0]]}, ${
          TmdbAPI.genres[genre_ids[1]]
        }, Other`;
        break;
    }
    if (genre_ids.length > 2) {
      return `${TmdbAPI.genres[genre_ids[0]]}, `;
    }
  }

  static getGenresStringWithSearchedGenre(genre_ids, genre) {
    const genreID = TmdbAPI.genreIDs[genre.toLowerCase()];
    const genreIndex = genre_ids.indexOf(genreID);

    genre_ids.splice(genreIndex, 1);
    if (genre_ids.length > 2) {
      return `${TmdbAPI.genres[genre_ids[0]]}, `;
    }
    switch (genre_ids.length) {
      case 1:
        return `${genre}`;
        break;
      case 2:
        return `${genre}, ${TmdbAPI.genres[genre_ids[0]]}`;
        break;
      default:
        return `${genre}, ${TmdbAPI.genres[genre_ids[0]]}, Other`;
        break;
    }
  }

  #API_KEY = '5c476485a2355f460fe2a5a523d9d1d5';
  #searchResource = '/search/movie';
  #trendingResource = '/trending';
  #findByIdResource = '/movie';
  #findByMovieResource = '/discover/movie';
  #genreMovieListResource = '/genre/movie/list';
  #findTrailersByIdResource = '/videos';

  #fetchGenreMoviesList() {
    return axios.get(
      `${TmdbAPI.BASE_URL}${this.#genreMovieListResource}?api_key=${
        this.#API_KEY
      }`
    );
  }

  #createGenresObj() {
    //if TmdbAPI.genres already has data - do not fetch again
    if (Object.keys(TmdbAPI.genres).length !== 0) return;

    this.#fetchGenreMoviesList().then(response => {
      const genrArr = response.data.genres;

      genrArr.forEach(el => {
        TmdbAPI.genres[el.id] = el.name.toLowerCase();
        TmdbAPI.genreIDs[el.name.toLowerCase()] = el.id;
      });
    });
  }

  #buildSearchUrl(paramsString) {
    return (
      `${TmdbAPI.BASE_URL}${this.#findByMovieResource}?api_key=${
        this.#API_KEY
      }` + `${paramsString}`
    );
  }

  constructor(page = 1) {
    this.page = page;
  }

  fetchGenres() {
    this.#createGenresObj();
  }

  fetchFilmsByQuery(query) {
    const searchParams = new URLSearchParams({
      api_key: this.#API_KEY,
      page: this.page,
      query: query,
      include_adult: false,
    });
    return axios.get(
      `${TmdbAPI.BASE_URL}${this.#searchResource}?${searchParams}`
    );
  }

  fetchTrending(media_type, time_window) {
    return axios.get(
      `${TmdbAPI.BASE_URL}${
        this.#trendingResource
      }/${media_type}/${time_window}?api_key=${this.#API_KEY}`
    );
  }

  fetchFilmByID(id) {
    return axios.get(
      `${TmdbAPI.BASE_URL}${this.#findByIdResource}/${id}?api_key=${
        this.#API_KEY
      }`
    );
  }

  fetchTrailersByID(id) {
    return axios.get(
      `${TmdbAPI.BASE_URL}${this.#findByIdResource}/${id}${
        this.#findTrailersByIdResource
      }?api_key=${this.#API_KEY}`
    );
  }

  fetchMoviesByGenre(genre) {
    const paramsString = `&page=${this.page}&sort_by=popularity.desc&with_genres=${genre}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesByYear(year) {
    const paramsString = `&page=${this.page}&sort_by=popularity.desc&primary_release_year=${year}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesByOnlyGenre(page, with_genres, include_adult = false) {
    const paramsString = `&page=${page}&include_adult=${include_adult}&with_genres=${with_genres}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesWithoutGenre(page, without_genres_str, include_adult = false) {
    const paramsString = `&page=${page}&include_adult=${include_adult}${without_genres_str}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesByMonetizationType(
    page,
    with_watch_monetization_types_str,
    include_adult = false
  ) {
    const paramsString = `&page=${page}&include_adult=${include_adult}${with_watch_monetization_types_str}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesBySortType(page, sort_by, include_adult = false) {
    const paramsString = `&page=${page}&include_adult=${include_adult}&sort_by=${sort_by}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }

  fetchMoviesByFewParams(paramsObj) {
    const {
      page,
      sort_by,
      primary_release_year_str,
      with_genres,
      with_watch_monetization_types_str,
      without_genres_str,
      include_adult,
    } = paramsObj;
    const paramsString = `&page=${page}&sort_by=${sort_by}${primary_release_year_str}&with_genres=${with_genres}&include_adult=${include_adult}${with_watch_monetization_types_str}${without_genres_str}`;
    const url = this.#buildSearchUrl(paramsString);
    return axios.get(url);
  }
  fetchAdvancedMovieSearch({
    primary_release_year,
    with_genres,
    sort_by = TmdbAPI.sort_by_types.POPULARITY_DESC,
    include_adult = false,
    page = this.page,
    with_watch_monetization_types,
    without_genres = null,
  }) {
    const with_watch_monetization_types_str = with_watch_monetization_types
      ? `&with_watch_monetization_types=${with_watch_monetization_types}`
      : '';
    const primary_release_year_str = primary_release_year
      ? `&primary_release_year=${primary_release_year}`
      : '';
    const without_genres_str = without_genres
      ? `&without_genres=${without_genres}`
      : '';

    const isSearchOnlyByYear = !!(
      primary_release_year &&
      !with_genres &&
      !without_genres &&
      !with_watch_monetization_types
    );

    if (isSearchOnlyByYear) {
      return this.fetchMoviesByYear(primary_release_year);
    }

    const isSearchOnlyByWithGenres = !!(
      with_genres &&
      !primary_release_year &&
      !without_genres &&
      !with_watch_monetization_types
    );

    if (isSearchOnlyByWithGenres) {
      return this.fetchMoviesByOnlyGenre(page, with_genres);
    }

    const isSearchOnlyByWithoutGenres = !!(
      without_genres &&
      !primary_release_year &&
      !with_genres &&
      !with_watch_monetization_types
    );

    if (isSearchOnlyByWithoutGenres) {
      return this.fetchMoviesWithoutGenre(page, without_genres_str);
    }

    const isSearchOnlyByMonetType = !!(
      with_watch_monetization_types &&
      !without_genres &&
      !primary_release_year &&
      !with_genres
    );

    if (isSearchOnlyByMonetType) {
      return this.fetchMoviesByMonetizationType(
        page,
        with_watch_monetization_types_str
      );
    }

    const isSearchOnlyBySortParam = !!(
      !with_watch_monetization_types &&
      !without_genres &&
      !primary_release_year &&
      !with_genres
    );
    if (isSearchOnlyBySortParam) {
      return this.fetchMoviesBySortType(page, sort_by);
    }
    const fewParamsObj = {
      page,
      sort_by,
      primary_release_year_str,
      with_genres,
      with_watch_monetization_types_str,
      without_genres_str,
      include_adult,
    };
    return this.fetchMoviesByFewParams(fewParamsObj);
  }
}
