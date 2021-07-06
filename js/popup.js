const popupSuccessTemplate = document.querySelector('#success').content.querySelector('.success');
const popupErrorTemplate = document.querySelector('#error').content.querySelector('.error');
const popupSuccessElement = popupSuccessTemplate.cloneNode(true);
const popupErrorElement = popupErrorTemplate.cloneNode(true);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const closeSuccessPopup = () => {
  popupSuccessElement.classList.add('hidden');
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const openSuccessPopup = () => {
  document.body.appendChild(popupSuccessElement);
  document.addEventListener('keydown', onPopupEscKeydown);
};

const createErrorPopup = () => {
  document.body.appendChild(popupErrorElement);
};

export { openSuccessPopup, createErrorPopup };
