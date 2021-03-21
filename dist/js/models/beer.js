export default class Beer {
  constructor(data) {
    this.id = data[`id`];
    this.abv = data[`abv`];
    this.attenuationLevel = data[`attenuation_level`];
    this.boilVolume = data[`boil_volume`];
    this.brewersTips = data[`brewers_tips`];
    this.contributedBy = data[`contributed_by`];
    this.description = data[`description`];
    this.ebc = data[`ebc`];
    this.firstBrewed = data[`first_brewed`];
    this.foodPairing = data[`food_pairing`];
    this.ibu = data[`ibu`];
    this.imageUrl = data[`image_url`];
    this.ingredients = data[`ingredients`];
    this.method = data[`method`];
    this.name = data[`name`];
    this.ph = data[`ph`];
    this.srm = data[`srm`];
    this.tagline = data[`tagline`];
    this.targetFg = data[`target_fg`];
    this.targetOg = data[`target_og`];
    this.volume = data[`volume`];
  }

  static parseBeer(data) {
    return new Beer(data);
  }

  static parseBeers(data) {
    return data.map(Beer.parseBeer);
  }
}