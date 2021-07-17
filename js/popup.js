import { isEscEvent } from './util.js';

const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupSuccessElement = popupSuccessTemplate.cloneNode(true);
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const popupErrorElement = popupErrorTemplate.cloneNode(true);
const errorButton = popupErrorElement.querySelector('.error__button');

const closeSuccessPopupHandler = () => {
  popupSuccessElement.classList.add('hidden');
  document.removeEventListener('click', closeSuccessPopupHandler);
};

const closeErrorPopupHandler = () => {
  popupErrorElement.classList.add('hidden');
  document.removeEventListener('click', closeErrorPopupHandler);
  document.removeEventListener('keydown', closeErrorPopupHandler);
};

const successPopupEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopupHandler();
    document.removeEventListener('keydown', successPopupEscKeydownHandler);
  }
};

const errorPopupEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeErrorPopupHandler();
    document.removeEventListener('keydown', errorPopupEscKeydownHandler);
  }
};

const openSuccessPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupSuccessElement);
  document.addEventListener('keydown', successPopupEscKeydownHandler);
  document.addEventListener('click', closeSuccessPopupHandler);
};

const openErrorPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupErrorElement);
  document.addEventListener('keydown', errorPopupEscKeydownHandler);
  document.addEventListener('click', closeErrorPopupHandler);
};

errorButton.addEventListener('click', closeErrorPopupHandler);

export { openSuccessPopup, openErrorPopup };
