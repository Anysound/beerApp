// //для работы IE 11
require("element-closest-polyfill");
import 'element-closest-polyfill';

import {url} from "./config";
import {initSlider} from './utils/slider';
import {renderFavorites} from './utils/favorites';
import {validateForm} from './utils/form';
import {createSlideTemplate} from './templates/slide';
import Api from './api';

import BeerController from './controllers/beer';
import {createElement} from './utils/render';
 
const BEERS_COUNT = 5;

const sortContainer = document.querySelector('#sort');
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

    // вставка слайдов
    const slidesWrappers = Array.from(sliderContainer.children);
    const slides = [];
    slidesWrappers.forEach((it) => {
      slides.push(it.firstElementChild);
    })

    // рендер карточек
    const renderByController = (container, arrItem) => {
      const beerController = new BeerController(container);
      beerController.render(arrItem)
    }

    const renderCardsFromData = () => {
      beers.forEach((it, index) => {
        if (index < BEERS_COUNT) {
          renderByController(slides[0], it);
        } else if (index < (BEERS_COUNT * 2)) {
          renderByController(slides[1], it);
        } else if (index < (BEERS_COUNT * 3)) {
          renderByController(slides[2], it);
        } else if (index < (BEERS_COUNT * 4)) {
          renderByController(slides[3], it);
        } else {
          renderByController(slides[4], it);
        }
      });
    }
    renderCardsFromData();

    // slider
    initSlider();

    // сортировка
    const sortAbvUpBtn = sortContainer.querySelector('button[data-sort_abv=up]');
    
    const sortByParams = (sortCb) => {
      beers.sort(sortCb);
      slides.forEach((it) => {
        it.innerHTML = ``;
      });
      renderCardsFromData();
    }
    
    // сортировка по содержанию спирта
    const sortAbvUp = (a, b) => b.abv - a.abv;
    sortAbvUpBtn.addEventListener('click', sortByParams.bind(null, sortAbvUp));

    const sortAbvDownBtn = sortContainer.querySelector('button[data-sort_abv=down');
    const sortAbvDown = (a, b) => a.abv - b.abv;
    sortAbvDownBtn.addEventListener('click', sortByParams.bind(null, sortAbvDown));

    // сортировка по горечи
    const sortIbuUpBtn = sortContainer.querySelector('button[data-sort_ibu=up]');
    const sortIbuUp = (a, b) => b.ibu - a.ibu;
    sortIbuUpBtn.addEventListener('click', sortByParams.bind(null, sortIbuUp));

    const sortIbuDownBtn = sortContainer.querySelector('button[data-sort_ibu=down]');
    const sortIbuDown = (a, b) => a.ibu - b.ibu;
    sortIbuDownBtn.addEventListener('click', sortByParams.bind(null, sortIbuDown));
  });

renderFavorites();

validateForm();
