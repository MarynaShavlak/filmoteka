import { refs } from './refs';
const { toTopBtn } = refs;

window.onscroll = function () {
  scrollFunction();
};

export function scrollFunction() {
  if (document.body.scrollB > 50 || document.documentElement.scrollTop > 50) {
    toTopBtn.style.display = 'block';
    toTopBtn.addEventListener('click', topFunction);
  } else {
    toTopBtn.style.display = 'none';
  }
}

export function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}
