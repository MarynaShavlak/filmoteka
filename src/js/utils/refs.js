export const refs = {
  body: document.querySelector('body'),
  filmsPaginationContainer: document.querySelector(
    '.films-pagination__container'
  ),

  allCardsSection: document.querySelector('.trending-gallery'),
  sectionLibrary: document.querySelector('.section-library'),
  modal: document.querySelector('.movie-modal'),
  overflow: document.querySelector('.overflow'),
  closeBtn: document.querySelector('.movie-modal__close-btn'),
  innerModal: document.querySelector('.movie-modal__main'),
  watchedBtn: document.querySelector('.watchedJS'),
  queueBtn: document.querySelector('.queueJS'),
  paginationContainer: document.querySelector('.tui-pagination'),
  closeAuthModalBtn: document.querySelector('[data-modal-close]'),

  headerContainer:
    document.querySelector('.header__link-container') ||
    document.querySelector('.library-header__link-container'),
  userAvatar: document.querySelector('[data-switch]'),
  watchedBtnEl2: document.querySelector('.js-library-btn--watched'),
  queueBtnEl2: document.querySelector('.js-library-btn--queue'),
  movieListEl2: document.querySelector('.movie-list'),
  backdrop: document.querySelector('.backdrop-modal-login'),
  btnLogOut: document.querySelector('.btn-log-out'),
  btnSign: document.querySelector('.btn-sign'),
  btnLogin: document.querySelector('.btn-login'),
  signupNameEl: document.querySelector('.signup .user_name'),
  signupEmailEl: document.querySelector('.signup .user_login'),
  signupPasswordEl: document.querySelector('.signup .user_password'),
  signinEmailEl: document.querySelector('.login .user_login'),
  signinPasswordEl: document.querySelector('.login .user_password'),
  form: document.querySelector('#auth-form'),
  profile: document.querySelector('#profile'),
  profileUserEmail: document.querySelector('.profile-window__email'),
  profileUserName: document.querySelector('.profile-window__user'),
  darkToggleEl: document.querySelector('#dark-toggle'),
  darkToggleWindowEl: document.querySelector('.dark-toggle-window'),
  darkTogleLableEl: document.querySelector('.dark-toggle-label'),
  backdropLoader: document.querySelector('.backdrop-loader'),
  toTopBtn: document.querySelector('#btnScrollToTop'),
};
