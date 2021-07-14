// import { getOffers } from './api.js';
import { mapFilters } from './map.js';
import { renderPins, markerGroup } from './similar-offers.js';
import { SIMILAR_OFFERS_COUNT, ANY_VALUE, RADIX, HousingPriceRange } from './consts.js';

const filterHousingType = mapFilters.querySelector('#housing-type');
const filterHousingPrice = mapFilters.querySelector('#housing-price');
const filterRoomsNumber = mapFilters.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilters.querySelector('#housing-guests');
const filterHousingFeatures = mapFilters.querySelector('#housing-features');

// Ф-ии фильтрации
const filterByHousingType = (ad) => filterHousingType.value === ANY_VALUE ? true : ad.offer.type === filterHousingType.value;

const filterByHousingPrice = (ad) => {
  const filteringPriceRange = HousingPriceRange[filterHousingPrice.value.toUpperCase()];
  return filteringPriceRange ? ad.offer.price >= filteringPriceRange.MIN && ad.offer.price <= filteringPriceRange.MAX : true;
};

const filterByRoomsNumber = (ad) => filterRoomsNumber.value === ANY_VALUE ? true : ad.offer.rooms === parseInt(filterRoomsNumber.value, RADIX);

const filterByGuestsNumber = (ad) => filterGuestsNumber.value === ANY_VALUE ? true : ad.offer.guests === parseInt(filterGuestsNumber.value, RADIX);

const filterByFeatures = (ad) => {
  if (!ad.offer.features) {
    return false;
  }
  const checkedFeaturesItems = filterHousingFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeaturesItems).every((element) => ad.offer.features.includes(element.value));
};

const filterOffers = (offers) => {
  mapFilters.addEventListener('change', () => {
    const similarOffers = offers.filter(filterByHousingType).filter(filterByHousingPrice).filter(filterByRoomsNumber).filter(filterByGuestsNumber).filter(filterByFeatures);
    markerGroup.clearLayers();
    renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
};

export { filterOffers };
