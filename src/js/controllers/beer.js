import BeerComponent from '../components/beer';
import FavoriteBeer from '../components/favorite-beer';
import {render} from '../utils/render';

export default class BeerController {
  constructor(container) {
    this._container = container;
    this._beerComponent = null;
    this.clickedBtn = false;
  }

  render(beer) {
    this._beer = beer;
    this._beerComponent = new BeerComponent(beer);
    
    render(this._container, this._beerComponent);
    this._setHandlers();
  }

  _setHandlers() {
    this._beerComponent.setFavoritesBtnIconHandler((evt) => {
      evt.preventDefault();
      const icon = this._beerComponent.getElement().querySelector('.fa-heart');
      icon.classList.toggle('fas');
    })

    this._beerComponent.addBeerToFavoritesHandler((evt) => {
      
      const title = this._beerComponent.getElement().querySelector('.card-title').textContent;
      const id = this._beerComponent.getElement().querySelector('button[data-favorites]').value;
      const favoriteBeer = new FavoriteBeer(title, id);

      const element = favoriteBeer.getElement();

      const removeFavBeer = () => {
        element.remove();
        const icon = this._beerComponent.getElement().querySelector('.fa-heart');
        icon.classList.toggle('fas');
        delete localStorage.getItem(id);
      }

      const checkFavsDuplicate = (evt) => {
        const favChildren = Array.from(favBasket.children);
        console.log(favChildren);
        favChildren.forEach((it) => {
          if (it.innerText === title) {
            it.remove();
            removeFavBeer(evt)
          }
        })
      }

      favoriteBeer.removeFromFavoritesHandler(removeFavBeer);
      const favBasket = document.querySelector('#favorites');

    //  debugger;
      if (!this.clickedBtn) {
        evt.preventDefault();
        this.clickedBtn = true;
  
        // Добавление в локал сторедж
        
        
  
        // проверка контейнера фаворитов на наличие дублей
        checkFavsDuplicate();
  
        favBasket.append(element);
  
        const addToLocalStorage = () => {
          const id = this._beerComponent.getElement().querySelector('button[data-favorites]').getAttribute('data-favorites');
          const template = JSON.stringify(favoriteBeer.getTemplate());
          const elem = JSON.parse(template);
          
          localStorage.setItem(id, elem);
        }
        addToLocalStorage();
      } else {
        this.clickedBtn = false;

        // проверка контейнера фаворитов на наличие дублей
        checkFavsDuplicate();
      }

    });
  }
}
