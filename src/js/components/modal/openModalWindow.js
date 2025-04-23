import { refs } from '../../utils/refs';
import { userIcon, lockIcon } from '../../utils/markup.js';
import {
  getValueFromLocalStorage,
  setValueInLocalStorage,
} from '../../utils/localStorage.js';

const {
  body,
  userAvatar,
  closeAuthModalBtn,
  backdrop,
  profile,
  headerContainer,
  form,
  btnLogOut,
  signupNameEl,
  signupEmailEl,
  signupPasswordEl,
  signinEmailEl,
  signinPasswordEl,
  profileUserEmail,
  profileUserName,
} = refs;

userAvatar.addEventListener('click', openModal);
closeAuthModalBtn.addEventListener('click', toggleAuthModal);
backdrop.addEventListener('click', closeAuthModal);
window.addEventListener('click', handleCloseProfileModal);

function toggleAuthModal() {
  body.classList.toggle('modal-open');
  backdrop.classList.toggle('is-hidden');
}
function closeAuthModal(e) {
  const clickedEl = e.target;
  if (clickedEl.classList.contains('backdrop-modal-login')) {
    body.classList.remove('modal-open');
    backdrop.classList.add('is-hidden');
  }
}

function openModal() {
  const isUserActive = !profile.classList.contains('disabled');
  const isProfileModalOpen = !profile.classList.contains('isHidden');
  if (!isUserActive) {
    toggleAuthModal();
  } else if (!isProfileModalOpen) {
    showProfileModal();
  } else if (isProfileModalOpen) {
    hideProfileModal();
  }
}

function showProfileModal() {
  headerContainer.classList.remove('isOverflowHidden');
  profile.classList.remove('isHidden');
}

export function hideProfileModal() {
  headerContainer.classList.add('isOverflowHidden');
  profile.classList.add('isHidden');
}

function handleCloseProfileModal(e) {
  const clickedEl = e.target;
  const isButton =
    clickedEl.classList.contains('sign-in-btn') ||
    clickedEl.closest('button.sign-in-btn');
  if (!isButton) {
    const parent = clickedEl.closest('.profile-window');
    if (!parent) {
      hideProfileModal();
    }
  }
}

export function makeAuthFormInvisible() {
  form.classList.add('hide');
  headerContainer.classList.remove('isOverflowHidden');
  profile.classList.add('isHidden');
  profile.classList.remove('disabled');
  backdrop.classList.add('is-hidden');
}
export function makeAuthFormVisible() {
  form.classList.remove('hide');
  headerContainer.classList.add('isOverflowHidden');
  profile.classList.add('disabled');
}

export function updateProfileModal(isEnable) {
  if (isEnable) {
    btnLogOut.classList.remove('hide');
    userAvatar.innerHTML = userIcon;
  } else {
    btnLogOut.classList.add('hide');
    userAvatar.innerHTML = lockIcon;
  }
}

export function resetFormFields() {
  signupEmailEl.value = '';
  signupPasswordEl.value = '';
  signinEmailEl.value = '';
  signinPasswordEl.value = '';
  signupNameEl.textContent = '';
}

export async function updateUserName(userName) {
  if (!(userName === getValueFromLocalStorage('userName'))) {
    setValueInLocalStorage('userName', userName);
    profileUserName.textContent = userName;
  }
}

export function updateProfileEmail(userEmail) {
  profileUserEmail.textContent = userEmail;
}

export function updateProfileName(userName) {
  profileUserName.textContent = userName;
}
