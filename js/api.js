import { showAlert } from './util.js';
import { ALERT_MESSAGE, Url } from './consts.js';

const getOffers = (onSuccess) => {
  fetch(Url.GET)
    .then((response) => {
      if (!response.ok) {
        throw new Error(ALERT_MESSAGE);
      }
      return response.json();
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      showAlert(ALERT_MESSAGE);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    Url.POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

export { getOffers, sendData };
