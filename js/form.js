// Модуль работы с формой подачи объявления
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

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');

// DOM-элементы для полей формы
const roomsNumber = offerForm.querySelector('#room_number');
const guestsCapacity = offerForm.querySelector('#capacity');
const typeHousing = offerForm.querySelector('#type');
const priceHousing = offerForm.querySelector('#price');
const offerTitle = offerForm.querySelector('#title');
const offerPrice = offerForm.querySelector('#price');
const timein = offerForm.querySelector('#timein');
const timeout = offerForm.querySelector('#timeout');
const address = offerForm.querySelector('#address');

const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

deactivatePage();

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

// Функции для синхронизация полей:

// 1. "Кол-во комнат" - "Кол-во мест"
const mapCapacityToGuestsCount = (event) => {
  guestsCapacity.querySelectorAll('option').forEach((guest) => {
    guest.disabled = true;
  });
  RoomsCapacity[event.target.value].forEach((item) => {
    guestsCapacity.querySelector(`option[value="${item}"]`).disabled = false;
    guestsCapacity.value = item;
  });
};

// 2. "Время заезда-выезда"
const mapTimeinToTimeout = (event) => {
  const timeinValue = event.target.value;
  timeout.value = timeinValue;
};

const mapTimeoutToTimein = (event) => {
  const timeoutValue = event.target.value;
  timein.value = timeoutValue;
};

// 3. "Тип жилья - мин цена за ночь"
const mapTypeToMinPrice = (event) => {
  const minPrice = HousingMinPrice[event.target.value.toUpperCase()];
  priceHousing.min = minPrice;
  priceHousing.placeholder = minPrice;
};

// Добавление обработчиков на поля формы
roomsNumber.addEventListener('change', mapCapacityToGuestsCount);
timein.addEventListener('change', mapTimeinToTimeout);
timeout.addEventListener('change', mapTimeoutToTimein);
typeHousing.addEventListener('change', mapTypeToMinPrice);

// Валидиция полей "Заголовок"и "Цена за ночь"
offerTitle.addEventListener('invalid', () => {
  if (offerTitle.validity.tooShort) {
    offerTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
  } else if (offerTitle.validity.tooLong) {
    offerTitle.setCustomValidity('Длина заголовка не должна превышать 100 символов');
  } else if (offerTitle.validity.valueMissing) {
    offerTitle.setCustomValidity('Обязательное поле');
  } else {
    offerTitle.setCustomValidity('');
  }

  offerTitle.reportValidity();
});

offerPrice.addEventListener('invalid', () => {
  if (offerPrice.validity.tooShort) {
    offerPrice.setCustomValidity('Цена за ночь не может быть меньше нуля');
  } else if (offerPrice.validity.tooLong) {
    offerPrice.setCustomValidity('Цена за ночь не должна превышать 1000000 руб.');
  } else if (offerPrice.validity.valueMissing) {
    offerPrice.setCustomValidity('Обязательное поле');
  } else {
    offerPrice.setCustomValidity('');
  }

  offerPrice.reportValidity();
});

export { activatePage, address };
