// Модуль работы с формой подачи объявления
const offerForm = document.querySelector('.ad-form');
const offerFormElements = offerForm.querySelectorAll('.ad-form__element');

const map = document.querySelector('.map');
const mapFilters = map.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');

const deactivateFormAndMap = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

deactivateFormAndMap();

const activateFormAndMap = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

window.addEventListener('click', activateFormAndMap); // Проверка: активация формы и фильтров карты по клику в любом месте страницы
