import { resetPage } from './map.js';
import { offerForm } from './form.js';
import { showAlert } from './util.js';
import { ALERT_MESSAGE, URL_GET, URL_POST } from './consts.js';

const getOffers = (onSuccess) => {
  fetch(URL_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert(ALERT_MESSAGE);
      }
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert(ALERT_MESSAGE);
    });
};

const sendOffer = (onSuccess, onFail) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      URL_POST,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
          resetPage();
        } else {
          onFail();
        }
      })
      .catch(() => onFail());
  });
};

export { getOffers, sendOffer };
