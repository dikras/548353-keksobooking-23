import { renderPins, markerGroup, mapFilter } from './map.js';
import { SIMILAR_OFFERS_COUNT, ANY_VALUE, RADIX, HousingPriceRange } from './consts.js';

const housingTypeFilter = mapFilter.querySelector('#housing-type');
const housingPriceFilter = mapFilter.querySelector('#housing-price');
const roomsNumberFilter = mapFilter.querySelector('#housing-rooms');
const guestsNumberFilter = mapFilter.querySelector('#housing-guests');
const housingFeatureFilter = mapFilter.querySelector('#housing-features');

const filterByFeatures = (ad) => {
  if (!ad.offer.features) {
    return false;
  }
  const checkedFeatures = housingFeatureFilter.querySelectorAll('input:checked');
  for (const feature of checkedFeatures) {
    if (!ad.offer.features.includes(feature.value)) {
      return false;
    }
  }
  return true;
};

const filterOffers = (offer) => {
  const filteringPrice = HousingPriceRange[housingPriceFilter.value.toUpperCase()];

  if (housingTypeFilter.value !== ANY_VALUE && housingTypeFilter.value !== offer.offer.type || 
  housingPriceFilter.value !== ANY_VALUE && (offer.offer.price < filteringPrice.MIN || offer.offer.price > filteringPrice.MAX) ||
  roomsNumberFilter.value !== ANY_VALUE && parseInt(roomsNumberFilter.value, RADIX) !== offer.offer.rooms ||
  guestsNumberFilter.value !== ANY_VALUE && parseInt(guestsNumberFilter.value, RADIX) !== offer.offer.guests ||
  !filterByFeatures(offer)) {
    return false;
  }

  return true;
};

const changeMapFilters = (offers) => {
  const similarOffers = offers.filter(filterOffers);
  markerGroup.clearLayers();
  renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
};

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', cb);
};

export { setFilterChange, changeMapFilters };
