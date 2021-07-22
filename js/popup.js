import { isEscEvent } from './utils/common.js';

const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupSuccessElement = popupSuccessTemplate.cloneNode(true);
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const popupErrorElement = popupErrorTemplate.cloneNode(true);
const errorButton = popupErrorElement.querySelector('.error__button');

const handleSuccessPopupClickClose = () => {
  popupSuccessElement.classList.add('hidden');
  document.removeEventListener('click', handleSuccessPopupClickClose);
};

const handleErrorPopupClickClose = () => {
  popupErrorElement.classList.add('hidden');
  document.removeEventListener('click', handleErrorPopupClickClose);
  document.removeEventListener('keydown', handleErrorPopupClickClose);
};

const handleSuccessPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    handleSuccessPopupClickClose();
    document.removeEventListener('keydown', handleSuccessPopupEscKeydown);
  }
};

const handleErrorPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    handleErrorPopupClickClose();
    document.removeEventListener('keydown', handleErrorPopupEscKeydown);
  }
};

const openSuccessPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupSuccessElement);
  document.addEventListener('keydown', handleSuccessPopupEscKeydown);
  document.addEventListener('click', handleSuccessPopupClickClose);
};

const openErrorPopup = () => {
  document.body.insertAdjacentElement('beforeend', popupErrorElement);
  document.addEventListener('keydown', handleErrorPopupEscKeydown);
  document.addEventListener('click', handleErrorPopupClickClose);
};

errorButton.addEventListener('click', handleErrorPopupClickClose);

export { openSuccessPopup, openErrorPopup };
