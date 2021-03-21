import {createElement} from '../utils/render';

export const renderFavorites = () => {
  const favoritesWrapper = document.querySelector('#favorites');
  const deleteFavsBtn = document.querySelector('#clear_favorites');

  // рендер избранных товаров
  for (let key in localStorage) {
    if (parseInt(key)) {
      deleteFavsBtn.style.display = 'block';
      const template = localStorage.getItem(key);
      const elem = createElement(template);
      const iconDelete = elem.querySelector('.fas.fa-trash-alt');
      iconDelete.addEventListener('click', () => {
        elem.remove();
        delete localStorage[key];
      })
      favoritesWrapper.append(elem);
      favoritesWrapper.insertAdjacentElement('afterend',deleteFavsBtn);
    }
  }

  deleteFavsBtn.addEventListener('click', () => {
    favoritesWrapper.innerHTML = '';
    deleteFavsBtn.remove();
    localStorage.clear();
  });
}