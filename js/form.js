// Модуль работы с формой подачи объявления
const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.querySelectorAll('.ad-form__element');

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');

const roomsNumber = offerForm.querySelector('#room_number');
const guestsCapacity = offerForm.querySelector('#capacity');

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

  window.removeEventListener('click', activatePage); // Удаляем обработчик после активации страницы
};

window.addEventListener('click', activatePage); // Проверка: активация формы и фильтров карты по клику в любом месте страницы

const capacityChangeHandler = () => {
  if (guestsCapacity.options.length > 0) {
    [].forEach.call(guestsCapacity.options, (item) => {
      if (ROOMS_CAPACITY[roomsNumber.value][0] === item.value) {
        item.selected = true;
      } else {
        item.selected = false;
      }

      if (ROOMS_CAPACITY[roomsNumber.value].indexOf(item.value) >= 0) {
        item.hidden = false;
      } else {
        item.hidden = true;
      }
    });
  }
};

roomsNumber.addEventListener('change', () => {
  capacityChangeHandler();
});
