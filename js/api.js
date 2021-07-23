import { showAlert } from './utils/common.js';
import { ALERT_MESSAGE, Url, POST_METHOD } from './consts.js';

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
      method: POST_METHOD,
      body,
    },
  )
    .then((response) => {
      (response.ok) ? onSuccess() : onFail();
    })
    .catch(() => {
      onFail();
    });
};

export { getOffers, sendData };
