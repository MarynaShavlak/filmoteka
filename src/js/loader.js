import { refs } from './refs';
export const spinnerStart = () => {
  refs.backdropLoader.classList.remove('is-hidden');
};

export const spinnerStop = () => {
  refs.backdropLoader.classList.add('is-hidden');
};
