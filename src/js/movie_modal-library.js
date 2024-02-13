import {
  auth,
  writeUserDataQueue,
  writeUserDataWatch,
  currentFilmList,
  readAllUserData,
} from './authFireBase.js';
import { refs } from './refs';
import Notiflix from 'notiflix';
import { renderModal } from './render_modal';
import { onTrailerBtnClick } from './trailer';
import { onWatchedBtnClick } from './my-library-watched-queue/my-library-watched-queue'; //add
import { onQueueBtnClick } from './my-library-watched-queue/my-library-watched-queue'; //add

const { modal, overflow, closeBtn, innerModal, body, sectionLibrary } = refs;
let queue;
let watched;
async function updateVar() {
  if (auth.currentUser === null) {
    console.log(auth);
    queue = [];
    watched = [];
  } else {
    const q = await readAllUserData(auth.currentUser.uid);
    const w = await readAllUserData(auth.currentUser.uid);
    queue = q.userDataQueue || [];
    watched = w.userDataWatch || [];
  }
}

setTimeout(() => {
  updateVar();
}, 2500);

sectionLibrary.addEventListener('click', showModal);

async function updateMoviesList() {
  if (auth.currentUser === null) {
    const allMoviesListFromStorage = localStorage.getItem('currentFilmList');
    const allMoviesList = JSON.parse(allMoviesListFromStorage);
    return allMoviesList;
  } else {
    try {
      const allMoviesListFromStorage = await currentFilmList(
        auth.currentUser.uid
      );
      console.log(allMoviesListFromStorage);
      const allMoviesList = allMoviesListFromStorage.currentFilmList || [];
      return allMoviesList;
    } catch {
      return [];
    }
  }
}
export async function showModal(e) {
  if (e.target.nodeName === 'IMG' || e.target.nodeName === 'SPAN') {
    innerModal.innerHTML = '';
    modal.classList.remove('hidden-movie-modal');
    overflow.classList.remove('hidden-movie-modal');
    overflow.classList.add('overflow-height');
    sectionLibrary.removeEventListener('click', showModal);
    document.addEventListener('keydown', closeModalOnEsc);
    closeBtn.addEventListener('click', closeModal);
    overflow.addEventListener('click', closeModalOverflow);

    const id =
      e.target.nodeName === 'IMG'
        ? e.target.dataset.id
        : e.target.closest('li').dataset.id;
    await createModal(id);
    const top = window.scrollY;
    body.style.position = 'fixed';
    body.style.top = `-${top}px`;
    const watchedBtn = document.querySelector('.modal__btn-watched');
    const queueBtn = document.querySelector('.modal__btn-queue');
    const watchTrailerBtn = document.querySelector(
      '.movie-modal__btn-watch-trailer'
    );
    if (auth.currentUser !== null) {
      watchedBtn.addEventListener('click', handleWatched);
      queueBtn.addEventListener('click', handleQueued);
    } else {
      watchedBtn.setAttribute('disabled', 'disabled');
      queueBtn.setAttribute('disabled', 'disabled');
    }
    watchTrailerBtn.addEventListener('click', onTrailerBtnClick);
  }
}
function closeModalOverflow(e) {
  if (e.currentTarget === e.target) closeModal();
}
function closeModalOnEsc(e) {
  if (e.code === 'Escape') closeModal();
}
function closeModal() {
  modal.classList.add('hidden-movie-modal');
  overflow.classList.add('hidden-movie-modal');
  overflow.classList.remove('overflow-height');
  sectionLibrary.addEventListener('click', showModal);
  document.removeEventListener('keydown', closeModal);
  closeBtn.removeEventListener('click', closeModal);
  overflow.removeEventListener('click', closeModalOverflow);
  const top = body.style.top;
  body.style.position = '';
  body.style.top = '';
  window.scrollTo(0, parseInt(top || '0') * -1);
}

async function createModal(id) {
  if (auth.currentUser === null) {
    const currentList = updateMoviesList();
    const rendered = await renderModal(currentList, id, watched, queue);
    innerModal.innerHTML = rendered;
  } else {
    await updateVar();
    const currentList = await updateMoviesList();
    const rendered = await renderModal(currentList, id, watched, queue);
    innerModal.innerHTML = rendered;
  }
}

async function handleWatched(e) {
  const modalEl = document.querySelector('.movie-modal__main');

  const movie = {
    poster_path: modalEl.dataset.poster,
    title: modalEl.dataset.title,
    genre_ids: modalEl.dataset.genres,
    release_date: modalEl.dataset.date,
    vote_average: modalEl.dataset.votes,
    id: modalEl.dataset.id,
  };

  const isInWatched = watched.some(film => film.id === movie.id);

  if (e.target.innerText === 'ADD TO WATCHED') {
    if (!isInWatched) {
      watched.push(movie);
      if (auth.currentUser === null) {
        localStorage.setItem('movieWatched', JSON.stringify(watched));
        e.target.innerText = 'Remove from watched';
        const saved = JSON.parse(localStorage.getItem('movieWatched'));
      } else {
        await writeUserDataWatch(auth.currentUser.uid, watched);
        e.target.innerText = 'Remove from watched';
        const w = await readAllUserData(auth.currentUser.uid);
        const saved = w.userDataWatch || [];
      }

      onWatchedBtnClick();
      Notiflix.Notify.success('Added to watched!');
    }
  } else if (e.target.innerText === 'REMOVE FROM WATCHED') {
    watched = watched.filter(film => film.id !== movie.id);
    if (auth.currentUser === null) {
      localStorage.setItem('movieWatched', JSON.stringify(watched));
    } else {
      await writeUserDataWatch(auth.currentUser.uid, watched);
    }
    e.target.innerText = 'Add to watched';
    onWatchedBtnClick();
    Notiflix.Notify.success('Removed from watched!');
  }
}
async function handleQueued(e) {
  const modalEl = document.querySelector('.movie-modal__main');

  const movie = {
    poster_path: modalEl.dataset.poster,
    title: modalEl.dataset.title,
    genre_ids: modalEl.dataset.genres,
    release_date: modalEl.dataset.date,
    vote_average: modalEl.dataset.votes,
    id: modalEl.dataset.id,
  };

  const isInQueued = queue.some(film => film.id === movie.id);
  if (e.target.innerText === 'ADD TO QUEUE') {
    if (!isInQueued) {
      queue.push(movie);
      if (auth.currentUser === null)
        localStorage.setItem('movieQueue', JSON.stringify(queue));
      else {
        await writeUserDataQueue(auth.currentUser.uid, queue);
      }
      e.target.innerText = 'Remove from queue';
      onQueueBtnClick();
      Notiflix.Notify.success('Added to queue!');
    }
  } else if (e.target.innerText === 'REMOVE FROM QUEUE') {
    queue = queue.filter(film => film.id !== movie.id);
    if (auth.currentUser === null) {
      localStorage.setItem('movieQueue', JSON.stringify(queue));
    } else {
      await writeUserDataQueue(auth.currentUser.uid, queue);
    }

    e.target.innerText = 'Add to queue';
    onQueueBtnClick();
    Notiflix.Notify.success('Removed from queue!');
  }
}
