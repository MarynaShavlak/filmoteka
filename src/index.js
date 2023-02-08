import {
  paginationSettings,
  setPaginationSettings,
  renderPaginationInterface,
  deletePaginationInterface,
} from './js/pagination/paginationInterface';
import { refs } from './js/refs';
import './js/pagination/setPaginationSettings';
import renderPopularFilms from './js/trending-search-main/trending-search';
('./js/trending-search-main/trending-search');

let firstPage = 1;
let lastPage = paginationSettings.totalPages;
// в цю змінну треба записати загальну кількість сторінок,
//які можна відобразити за результатати пошуку
//тобто якщо із бекенду прийшло 1000 фільмів, то
//так як на одній сторінці може відображатись тільки 20 фільмів,
//то у змінну lastPage потрібно записати 50 (1000/20),
//необхідно зробити округлення вверх до найближчого цілого

// renderPaginationInterface(firstPage, lastPage);

export function onLoadAnotherPage(e) {
  const clickedBtn = e.target;
  // ТУТ МАЄ БУТИ КОД ДЛЯ ВІДОБРАЖЕНЯ НАСТУПНОЇ СТОРІНКИ
  const indexOfPageToLoad = Number(clickedBtn.dataset.value);
  renderPopularFilms(indexOfPageToLoad);
  renderPaginationInterface(indexOfPageToLoad, lastPage);
  console.log('Ви перейшли на сторінку', indexOfPageToLoad);
  console.log('total pages', indexOfPageToLoad, lastPage);
}
