import { isEscEvent } from './util.js';

const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupSuccessElement = popupSuccessTemplate.cloneNode(true);
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const popupErrorElement = popupErrorTemplate.cloneNode(true);
const errorButton = popupErrorElement.querySelector('.error__button');

const successPopupClickCloseHandler = () => {
  popupSuccessElement.classList.add('hidden');
  document.removeEventListener('click', successPopupClickCloseHandler);
};

const errorPopupClickCloseHandler = () => {
  popupErrorElement.classList.add('hidden');
  document.removeEventListener('click', errorPopupClickCloseHandler);
  document.removeEventListener('keydown', errorPopupClickCloseHandler);
};

const successPopupEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    successPopupClickCloseHandler();
    document.removeEventListener('keydown', successPopupEscKeydownHandler);
  }
};

const errorPopupEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    errorPopupClickCloseHandler();
    document.removeEventListener('keydown', errorPopupEscKeydownHandler);
  }
};

const openSuccessPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupSuccessElement);
  document.addEventListener('keydown', successPopupEscKeydownHandler);
  document.addEventListener('click', successPopupClickCloseHandler);
};

const openErrorPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupErrorElement);
  document.addEventListener('keydown', errorPopupEscKeydownHandler);
  document.addEventListener('click', errorPopupClickCloseHandler);
};

errorButton.addEventListener('click', errorPopupClickCloseHandler);

export { openSuccessPopup, openErrorPopup };
