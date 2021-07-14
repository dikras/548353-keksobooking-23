
import { renderPins, markerGroup } from './similar-offers.js';
import { SIMILAR_OFFERS_COUNT, ANY_VALUE, RADIX, HousingPriceRange } from './consts.js';
import { mapFilter } from './map.js';

const filterHousingType = mapFilter.querySelector('#housing-type');
const filterHousingPrice = mapFilter.querySelector('#housing-price');
const filterRoomsNumber = mapFilter.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilter.querySelector('#housing-guests');
// const filterHousingFeatures = mapFilter.querySelector('#housing-features');

/* const filterByFeatures = (ad) => {
  if (!ad.offer.features) {
    return false;
  }
  const checkedFeaturesItems = filterHousingFeatures.querySelectorAll('input:checked');
  return Array.from(checkedFeaturesItems).every((element) => ad.offer.features.includes(element.value));
}; */

const filterOffers = (offer) => {
  if (filterHousingType.value !== ANY_VALUE && filterHousingType.value !== offer.offer.type) {
    return false;
  }
  const filteringPrice = HousingPriceRange[filterHousingPrice.value.toUpperCase()];
  if (filterHousingPrice.value !== ANY_VALUE && (offer.offer.price < filteringPrice.MIN || offer.offer.price > filteringPrice.MAX)) {
    return false;
  }
  if (filterRoomsNumber.value !== ANY_VALUE && parseInt(filterRoomsNumber.value, RADIX) !== offer.offer.rooms) {
    return false;
  }
  if (filterGuestsNumber.value !== ANY_VALUE && parseInt(filterGuestsNumber.value, RADIX) !== offer.offer.guests) {
    return false;
  }

  return true;
};

const onMapFilterChange = (offers) => {
  const similarOffers = offers.filter(filterOffers);
  markerGroup.clearLayers();
  renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
};

const setFilterChange = (cb) => {
  mapFilter.addEventListener('change', cb);
};

export { setFilterChange, onMapFilterChange };
