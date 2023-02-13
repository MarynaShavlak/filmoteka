import Notiflix from 'notiflix';
import { renderMoviesLibrary } from './renderMoviesLibrary';
//import { userDataQueue, userDataWatched } from './data-template-local-storage';
import { spinnerStart, spinnerStop } from '../loader';
import fetchPopularFilms from '../trending-search-main/fetch-movies';
import { readAllUserData, currentUID, auth } from '../authFireBase.js';
import { async } from '@firebase/util';

const watchedBtnEl = document.querySelector('.js-library-btn--watched');
const queueBtnEl = document.querySelector('.js-library-btn--queue');
const movieListEl = document.querySelector('.movie-list');

// --дефолт інфа в бібліотеці

async function defaultLibrary() {
  // minPage = Math.ceil(1);
  // maxPage = Math.floor(100);
  const minPage = 1;
  const maxPage = 100;
  let page = Math.floor(Math.random() * (maxPage - minPage + 1) + minPage);
  try {
    const IMG_PATH = 'https://image.tmdb.org/t/p/original';
    movieListEl.innerHTML = '';
    const films = await fetchPopularFilms(page);

    // console.log(films.results);

    const markup = `<h3 class='library-gallery-recomend'>RECOMMENDATIONS</h3><div class='library-gallery__default'><img class='library-gallery__default-poster' data-id='${films.results[1].id}' src=${IMG_PATH}${films.results[1].poster_path}>
    <div><p class='library-gallery__default__title'>${films.results[1].title}</p>
    <p class='library-gallery__default-overview'>${films.results[1].overview}</p></div>
    </div>
    
    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${IMG_PATH}${films.results[2].poster_path} data-id='${films.results[2].id}'>
    <div><p class='library-gallery__default__title'>${films.results[2].title}</p>
    <p class='library-gallery__default-overview'>${films.results[2].overview}</p></div>
    </div>
    
    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${IMG_PATH}${films.results[3].poster_path} data-id='${films.results[3].id}'>
    <div><p class='library-gallery__default__title'>${films.results[3].title}</p>
    <p class='library-gallery__default-overview'>${films.results[3].overview}</p></div>
    </div>`;
    // console.log(markup);

    movieListEl.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}

defaultLibrary();
// --/дефолт інфа в бібліотеці

// при натисканні на Watched
export async function onWatchedBtnClick() {
  spinnerStart();
  setTimeout(spinnerStop, 500);
  queueBtnEl.style.background = 'transparent';
  queueBtnEl.style.borderColor = '#ffffff';

  watchedBtnEl.style.background = '#ff6b01';
  watchedBtnEl.style.borderColor = '#ff6b01';
  if (auth.currentUser === null) {
    movieListEl.innerHTML =
      "<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>";
    return;
  }
  const movieWatched = await readAllUserData(auth.currentUser.uid);
  if (movieWatched.userDataWatch === undefined) {
    movieListEl.innerHTML =
      "<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>";

    return;
  }
  // console.log(movieWatched);
  if (Object.keys(movieWatched).length === 1) {
    movieListEl.innerHTML =
      "<p>It seems you haven't watched any movie. You should try, it's fun🎭</p>";
    return;
  }
  const moviesCards = movieWatched.userDataWatch
    .map(movie => {
      return renderMoviesLibrary(movie);
    })
    .join('');
  movieListEl.innerHTML = moviesCards;
}

export async function onQueueBtnClick() {
  spinnerStart();
  setTimeout(spinnerStop, 500);
  queueBtnEl.style.background = '#ff6b01';
  queueBtnEl.style.borderColor = '#ff6b01';

  watchedBtnEl.style.background = 'transparent';
  watchedBtnEl.style.borderColor = '#ffffff';

  if (auth.currentUser === null) {
    movieListEl.innerHTML =
      "<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>";
    return;
  }
  const movieQueue = await readAllUserData(auth.currentUser.uid);
  // console.log(movieQueue);
  if (movieQueue.userDataQueue === undefined) {
    movieListEl.innerHTML =
      "<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>";
    return;
  }
  if (Object.keys(movieQueue).length === 1) {
    movieListEl.innerHTML =
      "<p>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>";
    return;
  }

  const moviesCards = movieQueue.userDataQueue
    .map(movie => {
      return renderMoviesLibrary(movie);
    })
    .join('');
  movieListEl.innerHTML = moviesCards;
}

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

// localStorage functions

/*import Notiflix from 'notiflix';
import { renderMoviesLibrary } from './renderMoviesLibrary';
import { userDataQueue, userDataWatched } from './data-template-local-storage';
import { spinnerStart, spinnerStop } from '../loader';
import fetchPopularFilms from '../trending-search-main/fetch-movies';

const watchedBtnEl = document.querySelector('.js-library-btn--watched');
const queueBtnEl = document.querySelector('.js-library-btn--queue');
const movieListEl = document.querySelector('.movie-list');

// --дефолт інфа в бібліотеці

async function defaultLibrary() {
  minPage = Math.ceil(1);
  maxPage = Math.floor(100);
  let page = Math.floor(Math.random() * (maxPage - minPage + 1) + minPage);

  try {
    const IMG_PATH = 'https://image.tmdb.org/t/p/original';
    movieListEl.innerHTML = '';
    const films = await fetchPopularFilms(page);

    const markup = `<h3 class='library-gallery-recomend'>RECOMENDATIONS</h3><div class='library-gallery__default'><img class='library-gallery__default-poster' src=${IMG_PATH}${films.results[1].poster_path}>
    <div><p class='library-gallery__default__title'>${films.results[1].title}</p>
    <p class='library-gallery__default-overview'>${films.results[1].overview}</p></div>
    </div>
    
    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${IMG_PATH}${films.results[2].poster_path}>
    <div><p class='library-gallery__default__title'>${films.results[2].title}</p>
    <p class='library-gallery__default-overview'>${films.results[2].overview}</p></div>
    </div>
    
    <div class='library-gallery__default'><img class='library-gallery__default-poster' src=${IMG_PATH}${films.results[3].poster_path}>
    <div><p class='library-gallery__default__title'>${films.results[3].title}</p>
    <p class='library-gallery__default-overview'>${films.results[3].overview}</p></div>
    </div>`;

    movieListEl.innerHTML = markup;
  } catch (error) {
    console.log(error);
  }
}

defaultLibrary();
// --/дефолт інфа в бібліотеці

// при натисканні на Watched
function onWatchedBtnClick() {
  spinnerStart();

  const movieWatched = gettingItem('movieWatched');
  if (movieWatched.length === 0) {
    movieListEl.innerHTML =
      "<p class='no-movies'>It seems you haven't watched any movie. You should try, it's fun🎭</p>";
    setTimeout(spinnerStop, 500);

    return;
  }
  const moviesCards = movieWatched
    .map(movie => {
      return renderMoviesLibrary(movie);
    })
    .join('');
  movieListEl.innerHTML = moviesCards;
  setTimeout(spinnerStop, 500);
}

function onQueueBtnClick() {
  spinnerStart();

  const movieQueue = gettingItem('movieQueue');

  if (movieQueue.length === 0) {
    movieListEl.innerHTML =
      "<p class='no-movies'>The queue is empty. Add all Harry Potter movies - you won't regret this✨</p>";
    setTimeout(spinnerStop, 500);

    return;
  }

  const moviesCards = movieQueue
    .map(movie => {
      return renderMoviesLibrary(movie);
    })
    .join('');
  movieListEl.innerHTML = moviesCards;

  setTimeout(spinnerStop, 500);
}

watchedBtnEl.addEventListener('click', onWatchedBtnClick);
queueBtnEl.addEventListener('click', onQueueBtnClick);

// localStorage functions
function gettingItem(key) {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.log('Everyone makes mistakes, this is yours:', error.message);
  }
}*/
