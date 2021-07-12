import { getData } from './api.js';
import { mapFilters } from './map.js';
import { renderPins, markerGroup } from './similar-offers.js';
import { isInRange } from './util.js';

const SIMILAR_OFFERS_COUNT = 10;
const ANY_VALUE = 'any';
const RADIX = 10;

const HousingPriceRange = {
  LOW: [0, 9999],
  MIDDLE: [10000, 50000],
  HIGH: [50001, 1000000],
};

const BigFilter = {
  isFilterTypeOn: false,
  isFilterPriceOn: false,
  isFilterRoomsNumberOn: false,
  isFilterGuestsNumberOn: false,
};
// DOM-элементы для фильтров
const filterHousingType = mapFilters.querySelector('#housing-type');
const filterHousingPrice = mapFilters.querySelector('#housing-price');
const filterRoomsNumber = mapFilters.querySelector('#housing-rooms');
const filterGuestsNumber = mapFilters.querySelector('#housing-guests');
// const filterHousingFeatures = mapFilters.querySelector('#housing-features');
// const housingFeatureElements = filterHousingFeatures.querySelectorAll('input[name="features"]');

// Ф-ии фильтрации
const filterByHousingType = (ad) => ad.offer.type === filterHousingType.value;
const filterByHousingPrice = (ad) => (isInRange(HousingPriceRange[`${filterHousingPrice.value.toUpperCase()}`], ad.offer.price));
const filterByRoomsNumber = (ad) => ad.offer.rooms === parseInt(filterRoomsNumber.value, RADIX);
const filterByGuestsNumber = (ad) => ad.offer.guests === parseInt(filterGuestsNumber.value, RADIX);

const renderUnfilteredPins = () => {
  getData((offers) => {
    const anyHousingTypeOffers = offers.slice(0, SIMILAR_OFFERS_COUNT);
    markerGroup.clearLayers();
    renderPins(anyHousingTypeOffers);
  });
};

const renderPinsByOneFilter = (filter) => {
  getData((offers) => {
    const similarOffers = offers.filter(filter);
    markerGroup.clearLayers();
    renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
};

const renderPinsByTwoFilters = (filterOne, filterTwo) => {
  getData((offers) => {
    const similarOffers = offers.filter(filterOne).filter(filterTwo);
    markerGroup.clearLayers();
    renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
};

const renderPinsByThreeFilters = (filterOne, filterTwo, filterThree) => {
  getData((offers) => {
    const similarOffers = offers.filter(filterOne).filter(filterTwo).filter(filterThree);
    markerGroup.clearLayers();
    renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
};

// ******************  ФИЛЬТРАЦИЯ ПО ТИПУ  **************************
const filterHousingTypeAds = () => {
  BigFilter.isFilterTypeOn = true;

  // Если был включен фильтр по цене
  if (BigFilter.isFilterPriceOn) {
    if (filterHousingType.value !== ANY_VALUE) {
      renderPinsByTwoFilters(filterByHousingPrice, filterByHousingType);
      return;
    }
    BigFilter.isFilterTypeOn = false;
    renderPinsByOneFilter(filterByHousingPrice);
    return;
  }
  // Если был включен фильтр по цене и по числу комнат
  if (BigFilter.isFilterPriceOn && BigFilter.isFilterRoomsNumberOn) {
    if (filterHousingType.value !== ANY_VALUE) {
      renderPinsByThreeFilters(filterByHousingPrice, filterByHousingType, filterByRoomsNumber);
      return;
    }
    BigFilter.isFilterTypeOn = false;
    renderPinsByTwoFilters(filterByHousingPrice, filterByRoomsNumber);
    return;
  }

  // Если был включен фильтр по числу комнат
  if (BigFilter.isFilterRoomsNumberOn) {
    if (filterHousingType.value !== ANY_VALUE) {
      renderPinsByTwoFilters(filterByHousingType, filterByRoomsNumber);
      return;
    }
    BigFilter.isFilterTypeOn = false;
    renderPinsByOneFilter(filterByRoomsNumber);
    return;
  }

  if (!BigFilter.isFilterPriceOn) {
    if (filterHousingType.value !== ANY_VALUE) {
      renderPinsByOneFilter(filterByHousingType);
      return;
    }
    renderUnfilteredPins();
  }
};

// ******************  ФИЛЬТРАЦИЯ ПО ЦЕНЕ  **************************
const filterHousingPriceAds = () => {
  BigFilter.isFilterPriceOn = true;

  if (BigFilter.isFilterTypeOn) {
    if (filterHousingPrice.value !== ANY_VALUE) {
      renderPinsByTwoFilters(filterByHousingPrice, filterByHousingType);
      return;
    }
    BigFilter.isFilterPriceOn = false;
    renderPinsByOneFilter(filterByHousingType);
    return;
  }

  if (!BigFilter.isFilterTypeOn) {
    if (filterHousingPrice.value !== ANY_VALUE) {
      renderPinsByOneFilter(filterByHousingPrice);
      return;
    }
    renderUnfilteredPins();
  }
};

// ******************  ФИЛЬТРАЦИЯ ПО КОЛ-ВУ КОМНАТ  **************************
const filterRoomsNumberAds = () => {
  BigFilter.isFilterRoomsNumberOn = true;

  if (filterRoomsNumber.value !== ANY_VALUE) {
    getData((offers) => {
      const similarOffers = offers.filter(filterByRoomsNumber);
      markerGroup.clearLayers();
      renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
    });
    return;
  }

  getData((offers) => {
    const anyRoomsNumberOffers = offers.slice(0, SIMILAR_OFFERS_COUNT);
    markerGroup.clearLayers();
    renderPins(anyRoomsNumberOffers);
  });
};

// ******************  ФИЛЬТРАЦИЯ ПО КОЛ-ВУ ГОСТЕЙ  **************************
const filterGuestsNumberAds = () => {
  BigFilter.isFilterGuestsNumberOn = true;

  if (filterGuestsNumber.value !== ANY_VALUE) {
    getData((offers) => {
      const similarOffers = offers.filter(filterByGuestsNumber);
      markerGroup.clearLayers();
      renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
    });
    return;
  }

  getData((offers) => {
    const anyGuestsNumberOffers = offers.slice(0, SIMILAR_OFFERS_COUNT);
    markerGroup.clearLayers();
    renderPins(anyGuestsNumberOffers);
  });
};

// ******************  ФИЛЬТРАЦИЯ ПО УДОБСТВАМ  **************************
/* const filterByWifi = () => {
  if (wifiFeature.checked) {
    getData((offers) => {
      const similarOffers = offers.filter((offer) => {
        if (offer.offer.features) {
          offer.offer.features.includes('wifi');
        }
      });
      markerGroup.clearLayers();
      renderPins(similarOffers.slice(0, SIMILAR_OFFERS_COUNT));
    });
  }
}; */

filterHousingType.addEventListener('change', filterHousingTypeAds);
filterHousingPrice.addEventListener('change', filterHousingPriceAds);
filterRoomsNumber.addEventListener('change', filterRoomsNumberAds);
filterGuestsNumber.addEventListener('change', filterGuestsNumberAds);


/* const onFilterHousingTypeChange = (evt) => {
  const housingTypeCurrentValue = evt.target.value;

  if (housingTypeCurrentValue === ANY_VALUE) {
    getData((offers) => {
      const anyHousingTypeOffers = offers.slice(0, SIMILAR_OFFERS_COUNT);
      markerGroup.clearLayers();
      renderPins(anyHousingTypeOffers);
    });
    return;
  }

  getData((offers) => {
    const similarHousingTypeOffers = offers.filter((offer) => (offer.offer.type === housingTypeCurrentValue));
    markerGroup.clearLayers();
    renderPins(similarHousingTypeOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
};

const onFilterHousingPriceChange = (evt) => {
  const priceCurrentValue = evt.target.value;

  if (priceCurrentValue === ANY_VALUE) {
    getData((offers) => {
      const anyPriceOffers = offers.slice(0, SIMILAR_OFFERS_COUNT);
      markerGroup.clearLayers();
      renderPins(anyPriceOffers);
    });
    return;
  }

  getData((offers) => {
    const similarPriceOffers = offers.filter((offer) => (isInRange(HousingPriceRange[`${priceCurrentValue.toUpperCase()}`], offer.offer.price)));
    markerGroup.clearLayers();
    renderPins(similarPriceOffers.slice(0, SIMILAR_OFFERS_COUNT));
  });
}; */

export { SIMILAR_OFFERS_COUNT };
