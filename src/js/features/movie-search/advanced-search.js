import makeHMTLString from './film_gallery_template';
import {
  searchRefs,
  tmdbAPI,
  TmdbAPI,
  scrollToTop,
  emptyStingRegEx,
  Notify,
} from './search-refs';

import renderPopularFilms, {
  renderPaginationInterface,
  paginationSettings,
  deletePaginationInterface,
  tooglePagination,
} from '../trending-search-main/trending-search.js';
import { canvasAnimation } from '../../components/header/canvas-header.js';

export let userAdvancedSearchForPagination = {
  primary_release_year: '',
  with_genres: '',
  sort_by: '',
  page: '',
  with_watch_monetization_types: '',
  without_genres: '',
};
let areOptionsGenerated = false;

searchRefs.searchForm.addEventListener('click', showAdvancedSearch);
searchRefs.searchForm.addEventListener('click', hideAdvancedSearch);
searchRefs.advancedSearchEl.addEventListener(
  'submit',
  onAdvancedSearchElSubmit
);
searchRefs.resetAdvancedSearchBtn.addEventListener(
  'click',
  onResetAdvancedSearch
);

export function showAdvancedSearch(event) {
  if (!event.target.classList.value.includes('show-advanced-search-js')) return;
  toggleAdvacedSearchMenu();
}

export function toggleAdvacedSearchMenu() {
  setTimeout(() => toggleAdvancedSearch(), 100);
  if (areOptionsGenerated) return;
  generateSelectOptions(searchRefs.advancedSearchWrap);
}
export function showAdvacedSearchMenu() {
  setTimeout(() => {
    searchRefs.advancedSearchEl.classList.remove('visually');
    searchRefs.showAdvancedSearchEl.parentNode.classList.add('visually-hidden');
    searchRefs.hideAdvancedSearchEl.parentNode.classList.remove(
      'visually-hidden'
    );
  }, 100);

  if (areOptionsGenerated) return;
  generateSelectOptions(searchRefs.advancedSearchWrap);
}

function hideAdvancedSearch(event) {
  if (!event.target.classList.value.includes('hide-advanced-search-js')) return;
  toggleAdvancedSearch();
}

export function toggleAdvancedSearch() {
  searchRefs.advancedSearchEl.classList.toggle('visually');
  searchRefs.showAdvancedSearchEl.parentNode.classList.toggle(
    'visually-hidden'
  );
  searchRefs.hideAdvancedSearchEl.parentNode.classList.toggle(
    'visually-hidden'
  );
}

function generateSelectOptions(form) {
  const genreOptionsHtmlStr = Object.values(TmdbAPI.genres)
    .map(
      genre =>
        `<option value="${genre}" class="advanced-search__option">${genre}</option>`
    )
    .join('');
  const selectGenreHtmlStr = `
		<select name="genre"  class="advanced-search__genre advanced-search__select">
			<option value="" class="advanced-search__option--main">Choose genre to find</option>
			${genreOptionsHtmlStr}
		</select>`;
  //forming exlude genre select HTML
  const excludeGenreHtmlStr = `
		<select name="excludeGenre"
			class="advanced-search__exlude-genre advanced-search__select">
			<option value="" class="advanced-search__option--main">Choose genre to exlude</option>
			${genreOptionsHtmlStr}
		</select>`;
  //forming sort parameters select HTML
  const sortParamsStr = `
		<select name="sortParams" 		class="advanced-search__sort-buy advanced-search__select">
			<option value="" class="advanced-search__option--main">Choose sorting parameter</option>
			${Object.keys(TmdbAPI.sort_by_types)
        .map(
          typeKey =>
            `<option value="${typeKey}" class="advanced-search__option">${TmdbAPI.sort_by_types[typeKey]}</option>`
        )
        .join('')}
		</select>`;
  form.insertAdjacentHTML(
    'afterbegin',
    selectGenreHtmlStr + excludeGenreHtmlStr + sortParamsStr
  );
  areOptionsGenerated = true;
}

function chosenAdvSearchParamsString(optionsObj) {
  return Object.keys(optionsObj).reduce((acc, key) => {
    if (!optionsObj[key] || optionsObj[key] === '' || key === 'page')
      return acc;
    if (key === 'with_genres' || key === 'without_genres') {
      return (
        acc +
        `<div class='advanced-search__chosen-option'><span class='advanced-search__search-key'>${key
          .split('_')
          .join(' ')}: </span>${TmdbAPI.genres[optionsObj[key]]}</div>`
      );
    }
    return (
      acc +
      `<div class='advanced-search__chosen-option'><span class='advanced-search__search-key'>${key
        .split('_')
        .join(' ')}: </span>${optionsObj[key]}</div>`
    );
  }, '');
}

export function makeAdvancedSearch(optionsObj) {
  tmdbAPI
    .fetchAdvancedMovieSearch(optionsObj)
    .then(response => {
      const { data } = response;

      scrollToTop();
      searchRefs.galleryEl.innerHTML = makeHMTLString(response.data);
      tooglePagination.isTrendingFilmsShown = false;
      tooglePagination.isFilmsByQueryShown = false;
      tooglePagination.isFilmsByAdvancedSearchShown = true;
      tooglePagination.isFilmsByYearShown = false;
      tooglePagination.isFilmsByGenreShown = false;
      if (data.total_pages > 500) {
        paginationSettings.totalPages = 500;
      } else {
        paginationSettings.totalPages = data.total_pages;
      }
      renderPaginationInterface(tmdbAPI.page, paginationSettings.totalPages);
    })
    .catch(console.error);
}

function clearAdvancedSearchForm() {
  searchRefs.advancedSearchEl.reset();
}

function changeAdvSearchWindow(obj) {
  searchRefs.advancedSearchChosenWindowEl.classList.remove('visually-hidden');
  searchRefs.advancedSearchChosenEl.innerHTML = `${chosenAdvSearchParamsString(
    obj
  )}`;
}

function hideAdvSearchWindow() {
  searchRefs.advancedSearchChosenWindowEl.classList.add('visually-hidden');
  searchRefs.advancedSearchChosenEl.innerHTML = ``;
}

//callback function for event listener on button submit - when the advanced search form is submitted and on reset
function onAdvancedSearchElSubmit(event) {
  event.preventDefault();
  //forming advanced search object
  const optionsObj = {
    with_genres: TmdbAPI.genreIDs[searchRefs.advancedSearchEl.genre.value],
    without_genres:
      TmdbAPI.genreIDs[searchRefs.advancedSearchEl.excludeGenre.value],
    sort_by:
      TmdbAPI.sort_by_types[searchRefs.advancedSearchEl.sortParams.value],
    with_watch_monetization_types:
      TmdbAPI.watch_monetization_types[
        searchRefs.advancedSearchEl.monetization.value
      ],
  };

  //check if nothing chosen
  if (!isOptionsObjHasValues(optionsObj)) {
    Notify.failure('Choose some parameters!');

    return;
  }
  tmdbAPI.page = 1;

  tooglePagination.isFilmsByYearShown = true;
  //checking search year input
  let searchYear = searchRefs.advancedSearchEl.year.value;

  if (!checkYear(searchYear)) {
    // searchYear = new Date().getFullYear();
    Notify.failure('The year chosen is ineligible!');
    clearAdvancedSearchForm();
    return;
  }

  optionsObj.primary_release_year = searchYear;

  let isTheSameSettings = true;
  Object.keys(optionsObj).forEach(key => {
    if (optionsObj[key] !== userAdvancedSearchForPagination[key])
      isTheSameSettings = false;
  });

  //checking if included and excluded genre are not equal
  if (
    optionsObj.with_genres === optionsObj.without_genres &&
    optionsObj.with_genres !== undefined &&
    optionsObj.without_genres !== undefined
  ) {
    Notify.failure("You can't choose and exclude the same genre!");
    clearAdvancedSearchForm();
    return;
  }

  if (isTheSameSettings) {
    Notify.warning('Please,make changes in search params and try again');
    clearAdvancedSearchForm();
    // renderPopularFilms(1);
    return;
  }

  optionsObj.page = tmdbAPI.page;
  userAdvancedSearchForPagination.with_genres = optionsObj.with_genres;
  userAdvancedSearchForPagination.without_genres = optionsObj.without_genres;
  userAdvancedSearchForPagination.sort_by = optionsObj.sort_by;
  userAdvancedSearchForPagination.primary_release_year =
    optionsObj.primary_release_year;
  userAdvancedSearchForPagination.with_watch_monetization_types =
    optionsObj.with_watch_monetization_types;

  userAdvancedSearchForPagination.page = optionsObj.page;

  deletePaginationInterface();
  clearAdvancedSearchForm();
  Notify.info('Searching');
  changeAdvSearchWindow(userAdvancedSearchForPagination);
  makeAdvancedSearch(optionsObj);
}

export async function onResetAdvancedSearch() {
  clearAdvancedSearchForm();
  tooglePagination.isFilmsByYearShown = false;
  tooglePagination.isFilmsByGenreShown = false;
  tooglePagination.isFilmsByQueryShown = false;
  tooglePagination.isFilmsByAdvancedSearchShown = false;
  tooglePagination.isTrendingFilmsShown = true;
  searchRefs.advancedSearchChosenWindowEl.classList.add('visually-hidden');
  await renderPopularFilms(1);
}

function checkYear(searchYear) {
  if (searchYear === '') return true;
  searchYear = Number.parseInt(searchYear);
  if (
    searchYear &&
    searchYear > 1880 &&
    searchYear <= new Date().getFullYear()
  ) {
    return true;
  }
  return false;
}

function isOptionsObjHasValues(optionsObj) {
  let result = false;
  //if film year entered - object has values
  if (searchRefs.advancedSearchEl.year.value !== '') return true;
  Object.values(optionsObj).forEach(value => {
    if (value !== undefined && !emptyStingRegEx.test(value)) {
      result = true;
    }
  });
  return result;
}
