import { makeHMTLStringWithGenre } from './film_gallery_template';
import {
  searchRefs,
  tmdbAPI,
  TmdbAPI,
  scrollToTop,
  Notify,
} from './search-refs';
import {
  renderPaginationInterface,
  paginationSettings,
  deletePaginationInterface,
  tooglePagination,
} from '../trending-search-main/trending-search.js';
import { CLIENT_RENEG_LIMIT } from 'tls';
import { userSearchObj } from './search-by-keyword';
import { showAdvacedSearchMenu } from './advanced-search.js';

// export let userGenreForPagination = '';

//find movies by genre
searchRefs.galleryEl.addEventListener('click', findMoviesByGenre);
let genreID;
function findMoviesByGenre(event) {
  if (tooglePagination.isFilmsByAdvancedSearchShown) {
    searchRefs.advancedSearchEl.reset();
  }
  if (![...event.target.classList].includes('find-by-genre-js'))
    //if not find-by-genre-js link - return
    return;

  let genre = event.target.innerText.trim();
  if (genre[genre.length - 1] === ',') {
    genre = genre.slice(0, -1);
  }

  if (
    genreID === TmdbAPI.genreIDs[genre.toLowerCase()] &&
    tooglePagination.isFilmsByGenreShown === true
  ) {
    Notify.info('Movies of this genre are already shown');
    return;
  }

  genreID = TmdbAPI.genreIDs[genre.toLowerCase()];

  deletePaginationInterface();
  userSearchObj.userGenreForPagination = genreID;
  tmdbAPI.page = 1;

  tmdbAPI
    .fetchMoviesByGenre(`${TmdbAPI.genreIDs[genre.toLowerCase()]}`)
    .then(response => {
      const { data } = response;

      if (data.total_results === 0) {
        Notify.failure('Search result not successful.');
      }
      scrollToTop();

      //form search params window
      searchRefs.advancedSearchChosenWindowEl.classList.remove(
        'visually-hidden'
      );
      searchRefs.advancedSearchChosenEl.innerHTML = `<div class='advanced-search__chosen-option'><span class='advanced-search__search-key'>genre: </span>${genre.toLowerCase()}</div>`;
      showAdvacedSearchMenu();
      updateSelectGenreOption(genre);

      //form img gallery
      searchRefs.galleryEl.innerHTML = makeHMTLStringWithGenre(data, genre);
      tooglePagination.isTrendingFilmsShown = false;
      tooglePagination.isFilmsByQueryShown = false;
      tooglePagination.isFilmsByAdvancedSearchShown = false;
      tooglePagination.isFilmsByYearShown = false;
      tooglePagination.isFilmsByGenreShown = true;

      if (data.total_pages > 500) {
        paginationSettings.totalPages = 500;
      } else {
        paginationSettings.totalPages = data.total_pages;
      }
      //inserting images into gallery

      renderPaginationInterface(tmdbAPI.page, paginationSettings.totalPages);
    })
    .catch(error => {
      console.error(error);
      Notify.failure('No films with such genre found!');
    });
}

function updateSelectGenreOption(genre) {
  const advacedSearchGenreSelect = document.querySelector(
    '.advanced-search__genre'
  );
  advacedSearchGenreSelect.value = genre;
  const options = Array.from(advacedSearchGenreSelect.options);
  const optionToSelect = options.find(
    item => item.label === genre.toLowerCase()
  );
  optionToSelect.selected = true;
}
