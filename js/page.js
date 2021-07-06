import { offerForm, offerFormElements } from './form.js';
import { mapFilters, mapFiltersElements } from './filters.js';

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

const resetPage = () => {
  offerForm.reset();
  mapFilters.reset();
};

/* const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', true);
  });
}; */

export { activatePage, resetPage };
