import { resetPage } from './map.js';
import { offerForm } from './form.js';
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

const onFormSubmit = (onSuccess, onFail, body) => {
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
        resetPage();
      } else {
        onFail();
      }
    })
    .catch(() => onFail());
};

const setFormSubmit = (onSuccess, onFail) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    onFormSubmit(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

export { getOffers, setFormSubmit };
