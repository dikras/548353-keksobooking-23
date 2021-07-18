import './util.js';
import './avatar.js';
import './offer-photos.js';
import './validation.js';
import { setFormSubmit } from './form.js';
import {resetPage, setResetButtonClick, renderPins} from './map.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getOffers } from './api.js';
import { SIMILAR_OFFERS_COUNT, RERENDER_DELAY } from './consts.js';
import { setFilterChange, mapFiltersChangeHandler } from './filters.js';
import { debounce } from './utils/debounce.js';

getOffers((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
  setFilterChange(() => debounce(mapFiltersChangeHandler(offers), RERENDER_DELAY));
  setResetButtonClick(() => resetPage(offers));
  setFormSubmit(() => resetPage(offers));
});

setFormSubmit(openSuccessPopup, openErrorPopup);
