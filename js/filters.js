import { getData } from './api.js';
import { mapFilters } from './map.js';
import { renderPins, markerGroup } from './similar-offers.js';

const SIMILAR_OFFERS_COUNT = 10;
const ANY_VALUE = 'any';
const RADIX = 10;

const HousingPriceRange = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10001,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50001,
    MAX: 1000000,
  },
};

const filterHousingType = mapFilters.querySelector('#housing-type');
const filterHousingPrice = mapFilters.querySelector('#housing-price');
const filterRoomsNumber = mapFilters.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilters.querySelector('#housing-guests');
const filterHousingFeatures = mapFilters.querySelector('#housing-features');
// const housingFeatureElements = filterHousingFeatures.querySelectorAll('input[name="features"]');

// Ф-ии фильтрации
const filterByHousingType = (ad) => filterHousingType.value === ANY_VALUE ? true : ad.offer.type === filterHousingType.value;

const filterByHousingPrice = (ad) => {
  const filteringPriceRange = HousingPriceRange[filterHousingPrice.value.toUpperCase()];
  return filteringPriceRange ? ad.offer.price >= filteringPriceRange.MIN && ad.offer.price <= filteringPriceRange.MAX : true;
};

const filterByRoomsNumber = (ad) => filterRoomsNumber.value === ANY_VALUE ? true : ad.offer.rooms === parseInt(filterRoomsNumber.value, RADIX);

const filterByGuestsNumber = (ad) => filterGuestsNumber.value === ANY_VALUE ? true : ad.offer.guests === parseInt(filterGuestsNumber.value, RADIX);

const filterByFeatures = (ad) => {
  const checkedFeaturesItems = filterHousingFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeaturesItems).every((element) => ad.offer.features.includes(element.value));
};

mapFilters.addEventListener('change', () => {
  getData((offers) => {
    const similarOffers = offers.filter(filterByHousingType).filter(filterByHousingPrice).filter(filterByRoomsNumber).filter(filterByGuestsNumber).filter(filterByFeatures);
    markerGroup.clearLayers();
    renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
});

export { SIMILAR_OFFERS_COUNT };
