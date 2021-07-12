import './util.js';
import './filters.js';
import './validation.js';
import './form.js';
import './map.js';
/* import './popup.js';
import './similar-offers.js';
import './api.js'; */
import { renderPins } from './similar-offers.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { getData, sendData } from './api.js';
import { SIMILAR_OFFERS_COUNT } from './filters.js';

getData((offers) => {
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
});

sendData(openSuccessPopup, openErrorPopup);
