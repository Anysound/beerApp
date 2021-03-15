// //для работы IE 11
// require("element-closest-polyfill");
// import 'element-closest-polyfill';

import {url} from "./config";
import {initSlider} from './utils/slider';
import {createSlideTemplate} from './templates/slide';
// import BeerController from './controllers/beer';
// import BeersData from './models/Beers';
import Api from './api';

import BeerController from './controllers/beer';
import {createElement} from './utils/render';
 
const BEERS_COUNT = 5;

const sortContainer = document.querySelector('#sort');
const beersContainer = document.querySelector('#beers');
const sliderContainer = document.querySelector('.slider__wrapper');

const api = new Api(url);

api.getBeers()
  .then((beers) => {

    // определение числа слайдов
    let slidesCount = beers.length / BEERS_COUNT;

    // если имеется остаток данных, создать дополнительный слайд под остатки
    if (beers.length % BEERS_COUNT !== 0 && beers.length % BEERS_COUNT < BEERS_COUNT) {
      slidesCount++;
    };

    for (let i = 1; i < (slidesCount + 1); i++) {
      const templateSlide = createSlideTemplate(i);
      const element = createElement(templateSlide);
      sliderContainer.append(element);
    }

    const slidesWrappers = Array.from(sliderContainer.children);
    const slides = [];
    slidesWrappers.forEach((it) => {
      slides.push(it.firstElementChild);
    })

    // рендер карточек
    const renderCardsFromData = () => {
      beers.forEach((it, index) => {
        if (index < BEERS_COUNT) {
          const beerController = new BeerController(slides[0]);
          beerController.render(it);
        } else if (index < (BEERS_COUNT * 2)) {
          const beerController = new BeerController(slides[1]);
          beerController.render(it);
        } else if (index < (BEERS_COUNT * 3)) {
          const beerController = new BeerController(slides[2]);
          beerController.render(it);
        } else if (index < (BEERS_COUNT * 4)) {
          const beerController = new BeerController(slides[3]);
          beerController.render(it);
        } else {
          const beerController = new BeerController(slides[4]);
          beerController.render(it);
        }
      });
    }
    renderCardsFromData();

    // slider
    initSlider();

    // сортировка по содержанию спирта
    const sortAbvUpBtn = sortContainer.querySelector('button[data-sort_abv=up]');
    sortAbvUpBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const sortAbv = (a, b) => b.abv - a.abv;
      beers.sort(sortAbv);
      slides.forEach((it) => {
        it.innerHTML = ``;
      })
      renderCardsFromData();
    });

    const sortAbvDownBtn = sortContainer.querySelector('button[data-sort_abv=down');
    sortAbvDownBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const sortAbv = (a, b) => a.abv - b.abv;
      beers.sort(sortAbv);
      slides.forEach((it) => {
        it.innerHTML = ``;
      })
      renderCardsFromData();
    });

    // сортировка по горечи
    const sortIbuUpBtn = sortContainer.querySelector('button[data-sort_ibu=up]');
    sortIbuUpBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const sortIbu = (a, b) => b.ibu - a.ibu;
      beers.sort(sortIbu);
      slides.forEach((it) => {
        it.innerHTML = ``;
      })
      renderCardsFromData();
    });

    const sortIbuDownBtn = sortContainer.querySelector('button[data-sort_ibu=down]');
    sortIbuDownBtn.addEventListener('click', (evt) => {
      evt.preventDefault();
      const sortIbu = (a, b) => a.ibu - b.ibu;
      beers.sort(sortIbu);
      slides.forEach((it) => {
        it.innerHTML = ``;
      })
      renderCardsFromData();
    })
  });

const favoritesWrapper = document.querySelector('#favorites');
// favoritesWrapper.innerHTML = localStorage.getItem('todos');

// console.log(localStorage.length + ' - length')

const deleteFavsBtn = document.querySelector('#clear_favorites');

for (let key in localStorage) {
  if (parseInt(key)) {
    deleteFavsBtn.style.display = 'block';
    const template = localStorage.getItem(key);
    const elem = createElement(template);
    const iconDelete = elem.querySelector('.fas.fa-trash-alt')
    iconDelete.addEventListener('click', () => {
      elem.remove();
      delete localStorage[key];
    })
    favoritesWrapper.append(elem);
    // favoritesWrapper.innerHTML += localStorage.getItem(key);
  }
}

deleteFavsBtn.addEventListener('click', () => {
  favoritesWrapper.innerHTML = '';
  deleteFavsBtn.remove();
  localStorage.clear();
})


// favoriteBeer.removeFromFavoritesHandler((evt) => {
//   evt.preventDefault();
//   element.remove();
//   const icon = this._beerComponent.getElement().querySelector('.fa-heart');
//   icon.classList.toggle('fas');
//   delete localStorage.getItem(id);
// });

// import LS from './models/LS';
// import Modal from './models/Modal';

// import elements from "./views/base";
// import {renderLoader, clearLoader} from "./views/loaderView";
// import renderBeers from "./views/beersView";
// import renderPages from './views/pagesView';
// import {renderFavorites, clearFavorites} from "./views/favoritesView";
// import {renderPhone, renderPassword, renderEmail, renderSubmit} from "./views/modalView";

// import Observer from './models/Observer';

// const state = {
//     pages: {
//         page: 1,
//         amount: 6,
//         lastPage: 1
//     }
// };

// state.ls = new LS('beers');

// state.modal = new Modal({
//    minLenPassword: 6,
//    minLenPhone: 7
// });

// window.addEventListener('load', () => {

//     renderLoader(elements.loader);
//     state.beers = new Beers(url);
//     state.beers.getData()
//         .then(() => {
//             const len = state.beers.data.length;
//             state.pages.lastPage = Math.ceil(len/state.pages.amount);

//             //блок который отработает при перезагрузке, если location.hash есть
//             const newPage = parseInt(location.hash.slice(1));
//             //установка в state текущей страницы
//             if ((newPage !== NaN) && (newPage >= 1) && (newPage <= state.pages.lastPage)){
//                 state.pages.page = newPage;
//             }

//             //добавление в state favorites из LocalStorage
//             updateFavorites();

//             clearLoader(elements.loader);
//             renderBeers(state.beers.data, state.pages.page, state.pages.amount);
//             renderPages(state.pages.page, state.pages.lastPage);
//             renderFavorites(state.beers.data);

//         })
//         .catch(error => console.error('error fetching data', error));
// });

// //событие клика по кнопкам favorites
// [elements.beers, elements.favorites].forEach(elem => {
//     elem.addEventListener('click', e => {
//         const target = e.target.closest('[data-favorites]');
//         if (target !== null){
//             const idFavorites = +target.dataset.favorites;
//             state.ls.toggle(idFavorites);
//             //добавление в state favorites из LocalStorage
//             updateFavorites();
//             renderBeers(state.beers.data, state.pages.page, state.pages.amount);
//             renderFavorites(state.beers.data);
//         }
//     })
// });

// //событие на кнопки сортировок
// elements.sort.addEventListener('click', e => {
//     const target = e.target.closest('[data-sort_abv]') || e.target.closest('[data-sort_ibu]');
//     if (target !== null) {
//         const sort_abv = target.dataset.sort_abv;
//         const sort_ibu = target.dataset.sort_ibu;

//         if (sort_abv){
//             state.beers.data.sort((a,b) => {
//                 return (sort_abv === 'up')
//                 ? b.abv - a.abv
//                 : a.abv - b.abv;
//             });
//         } else if (sort_ibu){
//             state.beers.data.sort((a,b) => {
//                 return (sort_ibu === 'up')
//                 ? b.ibu - a.ibu
//                 : a.ibu - b.ibu
//             });
//         }
//         renderBeers(state.beers.data, state.pages.page, state.pages.amount);
//     }
// });

// //событие на кнопку очистка избранного
// elements.favorites.addEventListener('click', e => {
//     if (e.target.dataset.clear){
//         clearFavorites();
//         state.ls.delAllFromLocalStorage();
//         state.beers.data.forEach(el => {
//             el.favorites = false;
//         });
//         renderBeers(state.beers.data, state.pages.page, state.pages.amount);
//     }
// });

// //Событие смена hash
// window.addEventListener('hashchange', () => {
//     const newPage = parseInt(location.hash.slice(1));
//     if ((newPage !== NaN) && (newPage >= 1) && (newPage <= state.pages.lastPage)){
//         state.pages.page = newPage;

//         renderBeers(state.beers.data, newPage, state.pages.amount);
//         renderPages(newPage, state.pages.lastPage);
//         renderFavorites(state.beers.data);
//     }
// });

// //модальная форма
// elements.btnModal.addEventListener('click', (e) => {
//     elements.exampleModal.style.display = 'block';
// });

// window.addEventListener('click', (e) => {
//  if ((e.target === elements.exampleModal)||(e.target.dataset.modal === 'close')){
//      elements.exampleModal.style.display = 'none';
//  }
// });

// //События на модальную форму через слушателя
// state.observerBtnSuccess = new Observer();
// state.observerBtnSuccess.subscribe(renderPhone, renderEmail, renderPassword, renderSubmit);

// elements.inputPhone.addEventListener('keyup', (e) => {
//     state.modal.setPhone(e.target.value);
//     state.observerBtnSuccess.run(state.modal);
// });

// elements.inputEmail.addEventListener('keyup', (e) => {
//     state.modal.setEmail(e.target.value);
//     state.observerBtnSuccess.run(state.modal);
// });

// elements.inputPassword.addEventListener('keyup', (e) => {
//     state.modal.setPassword(e.target.value);
//     state.observerBtnSuccess.run(state.modal);
// });

// function updateFavorites(){
//     if (state.ls.isBeersLocalStorage()){
//         state.beers.data.forEach((el) => {
//             if (state.ls.isIdInLocalStorage(el.id)) el.favorites = true;
//             else el.favorites = false;
//         });
//     }
// }