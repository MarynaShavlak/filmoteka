import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
import 'notiflix/dist/notiflix-3.2.6.min.css';
import Notiflix from 'notiflix';

import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
} from 'firebase/database';

import { spinnerStart, spinnerStop } from './loader';
import { onWatchedBtnClick } from './my-library-watched-queue/queueWatchAuthFunc.js';
import {
  getValueFromLocalStorage,
  setValueInLocalStorage,
} from './utils/localStorage.js';
import { userIcon, lockIcon } from './utils/markup.js';

export let currentUID = '';

//btn header switch

const userAvatar = document.querySelector('[data-switch]');
const watchedBtnEl2 = document.querySelector('.js-library-btn--watched');
const queueBtnEl2 = document.querySelector('.js-library-btn--queue');
const movieListEl2 = document.querySelector('.movie-list');

const backdrop = document.querySelector('.backdrop-modal-login');
const btnLogOut = document.querySelector('.btn-log-out');
const btnSign = document.querySelector('.btn-sign');
const btnLogin = document.querySelector('.btn-login');
const signupNameEl = document.querySelector('.signup .user_name');
const signupEmailEl = document.querySelector('.signup .user_login');
const signupPasswordEl = document.querySelector('.signup .user_password');
const signinEmailEl = document.querySelector('.login .user_login');
const signinPasswordEl = document.querySelector('.login .user_password');

const form = document.querySelector('#auth-form');
const headerContainer = document.querySelector('.header__link-container');
const profile = document.querySelector('#profile');
const profileUserEmail = document.querySelector('.profile-window__email');
const profileUserName = document.querySelector('.profile-window__user');

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCCtjOeYUGfFakMk9BInb8D18c_-yBX2Oc',
  authDomain: 'filmoteka-e135b.firebaseapp.com',
  databaseURL:
    'https://filmoteka-e135b-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'filmoteka-e135b',
  storageBucket: 'filmoteka-e135b.appspot.com',
  messagingSenderId: '1055697661638',
  appId: '1:1055697661638:web:27ed1ccf73ceb81da0b1c7',
  measurementId: 'G-8186NK0FHL',
});

export const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, async user => {
  if (user) {
    btnLogOut.classList.remove('hide'); //
    form.classList.add('hide'); //
    headerContainer.classList.remove('isOverflowHidden');
    profile.classList.remove('disabled'); //
    backdrop.classList.add('is-hidden');
    currentUID = user.uid;
    userAvatar.innerHTML = userIcon;

    try {
      profileUserEmail.textContent = user.email;
    } catch {}
  } else {
    currentUID = '';
    profileUserEmail.textContent = '';

    btnLogOut.classList.add('hide'); //
    form.classList.remove('hide'); //
    headerContainer.classList.add('isOverflowHidden');
    profile.classList.add('disabled'); //
    userAvatar.innerHTML = lockIcon;
  }
});
btnSign.addEventListener('click', signUpUser);
btnLogin.addEventListener('click', signInUser);
btnLogOut.addEventListener('click', logOutUser);

export async function writeUserDataQueue(userId, data) {
  if (userId === '') {
    console.log('userId is missing');
    return;
  }
  const db = getDatabase();
  update(ref(db, 'users/' + userId), { userDataQueue: data });
}

export async function currentFilmList(userId, data) {
  if (userId === '') {
    console.log('userId is missing');
    return;
  }
  const db = getDatabase();
  update(ref(db, 'users/' + userId), { currentFilmList: data });
}

export async function writeUserDataWatch(userId, data) {
  if (userId === '') {
    console.log('userId is missing');
    return;
  }
  const db = getDatabase();
  update(ref(db, 'users/' + userId), { userDataWatch: data });
}

async function writeUserDataFirst(userId, /*queue, watch, */ loginData) {
  try {
    const db = getDatabase();
    const reference = ref(db, 'users/' + userId);
    await set(reference, {
      /* userDataQueue: queue,
       userDataWatch: watch,*/
      userLogin: loginData,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function readAllUserData(userId) {
  try {
    const dbRef = ref(getDatabase());
    const snapshot = await get(child(dbRef, `users/${userId}`));
    const data = await snapshot.val();
    return data;
  } catch (eror) {
    console.log(eror);
  }
}

function showLoginEror(error) {
  if (error.code === AuthErrorCodes.INVALID_PASSWORD) {
    Notiflix.Notify.failure('Password is invalid');
  } else {
    Notiflix.Notify.failure('Login is invalid');
  }
}

// _______  Registaration functions_____________________//
async function signUpUser(event) {
  event.preventDefault();
  const userEmail = signupEmailEl.value;
  const userPassword = signupPasswordEl.value;
  const userName = signupNameEl.value;
  await updateUserName(userName);

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    await writeUserDataFirst(userCredential.user.uid, userEmail);
    updateProfileEmail(userEmail);
    Notiflix.Notify.success('Account is created');
  } catch (error) {
    handleSignUpError(error);
  }
}
async function signInUser(event) {
  event.preventDefault();
  const userEmail = signinEmailEl.value;
  const userPassword = signinPasswordEl.value;
  updateProfileName(getValueFromLocalStorage('userName') || 'TestUser');

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      userEmail,
      userPassword
    );
    Notiflix.Notify.success('Welcome to your library!');
    try {
      onWatchedBtnClick(auth, readAllUserData);
    } catch {}
  } catch (error) {
    showLoginEror(error);
  }
}
async function logOutUser() {
  await signOut(auth);
  currentUID = '';
  resetFormFields();
  try {
    queueBtnEl2.style.background = 'transparent';
    queueBtnEl2.style.borderColor = '#ffffff';

    watchedBtnEl2.style.background = 'transparent';
    watchedBtnEl2.style.borderColor = '#ffffff';
    movieListEl2.innerHTML = '';
  } catch {
    spinnerStart(); ///////////
    setTimeout(() => {
      spinnerStop();
    }, 1500);
  }
  try {
    onWatchedBtnClick(auth, readAllUserData);
  } catch {}
}
//________________________________________________

function resetFormFields() {
  signupEmailEl.value = '';
  signupPasswordEl.value = '';
  signinEmailEl.value = '';
  signinPasswordEl.value = '';
  signupNameEl.textContent = '';
}

async function updateUserName(userName) {
  if (!(userName === getValueFromLocalStorage('userName'))) {
    setValueInLocalStorage('userName', userName);
    profileUserName.textContent = userName;
  }
}

function updateProfileEmail(userEmail) {
  profileUserEmail.textContent = userEmail;
}

function updateProfileName(userName) {
  profileUserName.textContent = userName;
}

function handleSignUpError(error) {
  switch (error.message) {
    case 'Firebase: Error (auth/invalid-email).':
      Notiflix.Notify.failure('Login is invalid');
      break;
    case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
      Notiflix.Notify.failure('Password should be at least 6 characters');
      break;
    case 'Firebase: Error (auth/email-already-in-use).':
      Notiflix.Notify.failure('This email already exists');
      break;
    default:
      if (signupEmailEl.value !== '' && signupPasswordEl.value === '')
        Notiflix.Notify.failure('Password is invalid');
      else if (signupEmailEl.value === '' && signupPasswordEl.value === '')
        Notiflix.Notify.failure('Password and login are invalid');
      else {
        Notiflix.Notify.failure(error.message);
        console.log(error.message);
      }
      break;
  }
}
