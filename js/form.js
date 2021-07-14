import { RoomsCapacity,  HousingMinPrice } from './consts.js';

const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.querySelectorAll('.ad-form__element');
const resetFormButton = offerForm.querySelector('.ad-form__reset');

// DOM-элементы для полей формы
const roomsNumber = offerForm.querySelector('#room_number');
const guestsCapacity = offerForm.querySelector('#capacity');
const typeHousing = offerForm.querySelector('#type');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');
const timein = offerForm.querySelector('#timein');
const timeout = offerForm.querySelector('#timeout');
const address = offerForm.querySelector('#address');

// СИНХРОНИЗАЦИЯ ПОЛЕЙ, ОБРАБОТЧИКИ

// 1. "Кол-во комнат" - "Кол-во мест"
const roomsSelectChangeHandler = (event) => {
  guestsCapacity.querySelectorAll('option').forEach((guest) => {
    guest.disabled = true;
  });
  RoomsCapacity[event.target.value].forEach((item) => {
    guestsCapacity.querySelector(`option[value="${item}"]`).disabled = false;
    guestsCapacity.value = item;
  });
};

// 2. "Время заезда-выезда"
const timeinSelectChangeHandler = (event) => {
  const timeinValue = event.target.value;
  timeout.value = timeinValue;
};

const timeoutSelectChangeHandler = (event) => {
  const timeoutValue = event.target.value;
  timein.value = timeoutValue;
};

// 3. "Тип жилья - мин цена за ночь"
const typeSelectChangeHandler = (event) => {
  const minPrice = HousingMinPrice[event.target.value.toUpperCase()];
  offerPrice.min = minPrice;
  offerPrice.placeholder = minPrice;
};

// Добавление обработчиков на поля формы
roomsNumber.addEventListener('change', roomsSelectChangeHandler);
timein.addEventListener('change', timeinSelectChangeHandler);
timeout.addEventListener('change', timeoutSelectChangeHandler);
typeHousing.addEventListener('change', typeSelectChangeHandler);

export { offerForm, offerFormElements, offerTitle, offerPrice, address, resetFormButton };
