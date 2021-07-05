import './filters.js';
import './validation.js';
import './form.js';
import './map.js';
import './mark.js';
import './similar-offers.js';
import './offer.js';
import './server.js';
import { renderPins } from './similar-offers.js';

const SIMILAR_OFFER_COUNT = 15;

fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`Статус ответа: ${response.status} ${response.statusText}`);
  })
  .then((offers) => {
    renderPins(offers.slice(0, SIMILAR_OFFER_COUNT));
  })
  .catch((error) => {
    console.error(error);
  });

