import { mapRoomsToGuests,  HousingMinPrice } from './consts.js';
import { sendData } from './api.js';
import { openSuccessPopup, openErrorPopup } from './popup.js';
import { resetPage } from './map.js';

const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.querySelectorAll('.ad-form__element');
const resetFormButton = offerForm.querySelector('.ad-form__reset');

const roomsNumberElement = offerForm.querySelector('#room_number');
const guestsCapacityElement = offerForm.querySelector('#capacity');
const typeHousingElement = offerForm.querySelector('#type');
const offerTitleElement = offerForm.querySelector('#title');
const offerPriceElement = offerForm.querySelector('#price');
const timeinElement = offerForm.querySelector('#timein');
const timeoutElement = offerForm.querySelector('#timeout');
const addressElement = offerForm.querySelector('#address');

const setInitialGuestsNumber = () => {
  guestsCapacityElement.value = roomsNumberElement.value;
};

const setInitialPriceValue = () => {
  offerPriceElement.placeholder = HousingMinPrice[typeHousingElement.value.toUpperCase()];
};

setInitialGuestsNumber();
setInitialPriceValue();

const handleRoomsOption = (event) => {
  guestsCapacityElement.querySelectorAll('option').forEach((guestOption) => {
    guestOption.disabled = true;
  });
  mapRoomsToGuests[event.target.value].forEach((roomsOption) => {
    guestsCapacityElement.querySelector(`option[value="${roomsOption}"]`).disabled = false;
    guestsCapacityElement.value = roomsOption;
  });
};

const handleTimeinOption = (event) => {
  timeoutElement.value = event.target.value;
};

const handleTimeoutOption = (event) => {
  timeinElement.value = event.target.value;
};

const handleTypeOption = (event) => {
  const minPrice = HousingMinPrice[event.target.value.toUpperCase()];
  offerPriceElement.min = minPrice;
  offerPriceElement.placeholder = minPrice;
  offerPriceElement.setAttribute('min', minPrice);
};

const sendSuccess = () => {
  openSuccessPopup();
  resetPage();
};

offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  sendData(sendSuccess, openErrorPopup, formData);

});

roomsNumberElement.addEventListener('change', handleRoomsOption);
timeinElement.addEventListener('change', handleTimeinOption);
timeoutElement.addEventListener('change', handleTimeoutOption);
typeHousingElement.addEventListener('change', handleTypeOption);

export { offerForm, offerFormElements, offerTitleElement, offerPriceElement, addressElement,
  resetFormButton, setInitialGuestsNumber, setInitialPriceValue };
