import './util.js';
import './avatar.js';
import './offer-photos.js';
import './validation.js';
import './form.js';
import './map.js';
import { filterOffers } from './filters.js';
import { renderPins } from './similar-offers.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getOffers, sendOffer } from './api.js';
import { SIMILAR_OFFERS_COUNT } from './consts.js';
import { debounce } from './utils/debounce.js';


getOffers((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
  debounce(filterOffers(offers));
});

sendOffer(openSuccessPopup, openErrorPopup);
