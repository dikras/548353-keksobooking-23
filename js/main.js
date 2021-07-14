import './util.js';
import './avatar.js';
import './offer-photos.js';
import './validation.js';
import './form.js';
import './map.js';
import { renderPins } from './similar-offers.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getOffers, setFormSubmit } from './api.js';
import { SIMILAR_OFFERS_COUNT, RERENDER_DELAY } from './consts.js';
import { setFilterChange, onMapFilterChange } from './filters.js';
import { debounce } from './utils/debounce.js';

getOffers((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
  setFilterChange(() => debounce(onMapFilterChange(offers), RERENDER_DELAY));
});

setFormSubmit(openSuccessPopup, openErrorPopup);
