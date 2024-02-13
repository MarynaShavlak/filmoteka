const refs = {
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
};

refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', toggleModal);

function toggleModal() {
  document.body.classList.toggle('modal-open');
  refs.modal.classList.toggle('is-hidden');
}

function openModal() {
  console.log('click on modal open ');
  const isProfileVisible = profile.classList.contains('disabled');
  console.log('isProfileVisible: ', isProfileVisible);
  if (profile.classList.contains('disabled')) {
    document.body.classList.toggle('modal-open');
    refs.modal.classList.toggle('is-hidden');
  } else {
    console.log('треба показати випадаюче вікно');
    profile.classList.remove('isHidden');
  }
}
