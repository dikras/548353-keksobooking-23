import { offerTitle, offerPrice } from './form.js';
import { MIN_LENGTH_TITLE, MAX_LENGTH_TITLE, MIN_PRICE, MAX_PRICE } from './consts.js';

const onTitleInvalidInput = () => {
  const valueLength = offerTitle.value.length;
  if (offerTitle.validity.valueMissing) {
    offerTitle.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerTitle.validity.tooShort) {
    offerTitle.setCustomValidity(`Заголовок должен состоять минимум из 30 символов
    (еще ${MIN_LENGTH_TITLE - valueLength} симв.)`);
    return;
  }
  if (offerTitle.validity.tooLong) {
    offerTitle.setCustomValidity(`Длина заголовка не должна превышать 100 символов
    (удалите лишние ${valueLength - MAX_LENGTH_TITLE} симв.)`);
  }
  offerTitle.setCustomValidity('');
};

const setValidBorderColor = (inputField) => {
  inputField.style.borderColor = '#19e485';
  inputField.style.borderWidth = '2px';
  inputField.style.boxShadow = 'none ';
};

const setInvalidBorderColor = (inputField) => {
  inputField.style.borderColor = '#ffaa99';
  inputField.style.borderWidth = '1px';
  inputField.style.boxShadow = '0 0 2px 2px #ff6547';
};

const onTitleLengthInput = () => {
  const valueLength = offerTitle.value.length;
  if (valueLength >= MIN_LENGTH_TITLE) {
    setValidBorderColor(offerTitle);
  }
  if (valueLength < MIN_LENGTH_TITLE || valueLength > MAX_LENGTH_TITLE) {
    setInvalidBorderColor(offerTitle);
  }
};

const onTitleReportValidity = () => {
  offerTitle.reportValidity();
};

const onPriceReportValidity = () => {
  offerPrice.reportValidity();
};

const onPriceInvalidInput = () => {
  if (offerPrice.validity.valueMissing) {
    offerPrice.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerPrice.validity.rangeUnderflow) {
    offerPrice.setCustomValidity(`Цена за ночь не может быть меньше ${MIN_PRICE} руб.`);
    return;
  }
  if (offerPrice.validity.rangeOverflow) {
    offerPrice.setCustomValidity(`Цена за ночь не должна превышать ${MAX_PRICE} руб.`);
  }
  offerPrice.setCustomValidity('');
};

offerTitle.addEventListener('input', onTitleLengthInput);

offerTitle.addEventListener('input', onTitleReportValidity);

offerPrice.addEventListener('input', onPriceReportValidity);

offerTitle.addEventListener('invalid', onTitleInvalidInput);

offerPrice.addEventListener('invalid', onPriceInvalidInput);
