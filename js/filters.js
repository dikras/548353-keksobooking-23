import { getData } from './api.js';
import { mapFilters } from './map.js';
import { renderPins, markerGroup } from './similar-offers.js';
import { isInRange } from './util.js';

const SIMILAR_OFFERS_COUNT = 10;

const PriceRange = {
  LOW: {
    MIN: 0,
    MAX: 9999
  },
  MIDDLE: {
    MIN: 10000,
    MAX: 49999
  },
  HIGH: {
    MIN: 50000,
    MAX: 1000000
  }
};

// DOM-элементы для фильтров
const mainFilter = document.querySelector('.map__filters');
const filterHousingType = mapFilters.querySelector('#housing-type');
const filterHousingPrice = mapFilters.querySelector('#housing-price');
const filterRoomsNumber = mapFilters.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilters.querySelector('#housing-guests');
// const filterHousingFeatures = mapFilters.querySelector('#housing-features');
// const housingFeatureElements = filterHousingFeatures.querySelectorAll('input[name="features"]');

const filterItem = (it, item, key) => it.value === 'any' ? true : it.value === item[key].toString();

const filterByType = (item) => filterItem(filterHousingType, item.offer, 'type');
const filterByPrice = (item) => {
  const filteringPrice = PriceRange[filterHousingPrice.value.toUpperCase()];
  return filteringPrice ? item.offer.price >= filteringPrice.MIN && item.offer.price <= filteringPrice.MAX : true;
};

const onMainFilterChange = () => {

};

export { SIMILAR_OFFERS_COUNT };
