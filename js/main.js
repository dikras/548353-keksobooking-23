import { setFormSubmit } from './form.js';
import {resetPage, setResetButtonClick, renderPins, disablePage,
  setMainMarkerInitialPosition, mapInit, activatePage } from './map.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getOffers } from './api.js';
import { SIMILAR_OFFERS_COUNT, RERENDER_DELAY } from './consts.js';
import { setFilterChange, changeMapFilters } from './filters.js';
import { debounce } from './utils/debounce.js';

disablePage();
mapInit();
activatePage();
setMainMarkerInitialPosition();

getOffers((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
  setFilterChange(() => debounce(changeMapFilters(offers), RERENDER_DELAY));
  setResetButtonClick(() => resetPage(offers));
  setFormSubmit(() => resetPage(offers));
});

setFormSubmit(openSuccessPopup, openErrorPopup);
