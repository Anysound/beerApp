import {renderBeerTemplate} from '../templates/beer';
import AbstractComponent from './abstract-component';

export default class Beer extends AbstractComponent {
  constructor(beer) {
    super();
    this._beer = beer;
  }

  getTemplate() {
    return renderBeerTemplate(this._beer);
  }

  setFavoritesBtnIconHandler(handler) {
    this.getElement().querySelector('button[data-favorites]').addEventListener('click', handler);
  }

  addBeerToFavoritesHandler(handler) {
    this.setFavoritesBtnIconHandler(handler);
  }
}