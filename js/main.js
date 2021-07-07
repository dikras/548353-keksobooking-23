import './util.js';
import './filters.js';
import './validation.js';
import './form.js';
import './map.js';
import './popup.js';
import './similar-offers.js';
import './api.js';
import { renderPins } from './similar-offers.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getData } from './api.js';
import { sendData } from './api.js';

const SIMILAR_OFFER_COUNT = 15;

getData((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFER_COUNT));
});

sendData(openSuccessPopup, openErrorPopup);
