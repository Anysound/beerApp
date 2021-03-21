import Beer from './models/beer';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Api {
  constructor(url) {
    this._url = url;
  }

  getBeers() {
    return this.load()
      .then(response => response.json())
      .then(Beer.parseBeers)
  }

  load() {
    return fetch(this._url)
      .then(checkStatus)
      .catch(err => {
        throw new Error(err);
      })
  }
}