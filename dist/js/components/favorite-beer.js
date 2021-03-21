import {favoritesBeerTemplate} from '../templates/favorites-beer';
import AbstractComponent from '../components/abstract-component';

export default class FavoriteBeer extends AbstractComponent {
  constructor(title, id) {
    super();
    this._title = title;
    this._id = id;
  }

  getTemplate() {
    return favoritesBeerTemplate(this._title, this._id);
  }

  removeFromFavoritesHandler(handler) {
    this.getElement().querySelector('.fa-trash-alt').addEventListener('click', handler);
  }

  
}
