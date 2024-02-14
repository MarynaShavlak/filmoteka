import { Notify } from 'notiflix';
import TmdbAPI from '../TMDB_API';

const emptyStingRegEx = /^\s*$/; // regular expression of an empty string
const tmdbAPI = new TmdbAPI();
tmdbAPI.fetchGenres();

const searchRefs = {
  galleryEl: document.querySelector('.trending-gallery'),
  searchInputEl: document.querySelector('.search__input'),
  searchForm: document.querySelector('.search'),
  showAdvancedSearchEl: document.querySelector('.show-advanced-search-js'),
  hideAdvancedSearchEl: document.querySelector('.hide-advanced-search-js'),
  advancedSearchEl: document.querySelector('.search--advanced-js '),
  advancedSearchWrap: document.querySelector('.search--advanced-js div '),
  advancedSearchChosenWindowEl: document.querySelector(
    '.advanced-search__chosen-window'
  ),
  advancedSearchChosenEl: document.querySelector('.advanced-search__chosen'),
  resetAdvancedSearchBtn: document.querySelector('.advanced-search__reset'),
  advacedSearchSubmitBtn: document.querySelector('.advanced-search__submit'),
  advacedSearchYearInput: document.querySelector('.advanced-search__year'),
};

//scroll to the top of the page
function scrollToTop() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
}

export { searchRefs, tmdbAPI, TmdbAPI, scrollToTop, emptyStingRegEx, Notify };
