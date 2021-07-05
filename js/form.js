// Модуль работы с формой подачи объявления
// import { mapFilters, mapFiltersElements } from './filters.js';

const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const HousingMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.querySelectorAll('.ad-form__element');

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
const roomsNumberClickHandler = (event) => {
  guestsCapacity.querySelectorAll('option').forEach((guest) => {
    guest.disabled = true;
  });
  RoomsCapacity[event.target.value].forEach((item) => {
    guestsCapacity.querySelector(`option[value="${item}"]`).disabled = false;
    guestsCapacity.value = item;
  });
};

// 2. "Время заезда-выезда"
const timeinClickHandler = (event) => {
  const timeinValue = event.target.value;
  timeout.value = timeinValue;
};

const timeoutClickHandler = (event) => {
  const timeoutValue = event.target.value;
  timein.value = timeoutValue;
};

// 3. "Тип жилья - мин цена за ночь"
const typeHousingClickHandler = (event) => {
  const minPrice = HousingMinPrice[event.target.value.toUpperCase()];
  offerPrice.min = minPrice;
  offerPrice.placeholder = minPrice;
};

// Добавление обработчиков на поля формы
roomsNumber.addEventListener('change', roomsNumberClickHandler);
timein.addEventListener('change', timeinClickHandler);
timeout.addEventListener('change', timeoutClickHandler);
typeHousing.addEventListener('change', typeHousingClickHandler);

// Сброс цвета границ полей
const resetBorderColor = (element) =>{
  element.style.borderColor = '#d9d9d3';
  element.style.borderWidth = '1px';
};

// ОТПРАВКА ДАННЫХ
offerForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  );

  offerForm.reset();
  resetBorderColor(offerTitle);
  resetBorderColor(offerPrice);
  resetBorderColor(typeHousing);
});

/* const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

deactivatePage(); */


export { offerForm, offerFormElements, offerTitle, offerPrice, address,
  typeHousing, roomsNumber, guestsCapacity };
