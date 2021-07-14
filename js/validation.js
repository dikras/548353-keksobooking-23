import { offerTitle, offerPrice } from './form.js';
import { LengthTitle, HousingPrice } from './consts.js';

const TitleInputBorderColor = {
  GREEN: '#19e485',
  RED: '#ffaa99',
};

const TitleInputBorderWidth = {
  THICK: '2px',
  THIN: '1px',
};

const TITLE_INVALID_SHADOW = '0 0 2px 2px #ff6547';

const titleInvalidHandler = () => {
  const valueLength = offerTitle.value.length;
  if (offerTitle.validity.valueMissing) {
    offerTitle.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerTitle.validity.tooShort) {
    offerTitle.setCustomValidity(`Заголовок должен состоять минимум из 30 символов
    (еще ${LengthTitle.MIN - valueLength} симв.)`);
    return;
  }
  if (offerTitle.validity.tooLong) {
    offerTitle.setCustomValidity(`Длина заголовка не должна превышать 100 символов
    (удалите лишние ${valueLength - LengthTitle.MAX} симв.)`);
    return;
  }
  offerTitle.setCustomValidity('');
};

const setValidBorderColor = (inputField) => {
  inputField.style.borderColor = TitleInputBorderColor.GREEN;
  inputField.style.borderWidth = TitleInputBorderWidth.THICK;
  inputField.style.boxShadow = 'none ';
};

const setInvalidBorderColor = (inputField) => {
  inputField.style.borderColor = TitleInputBorderColor.RED;
  inputField.style.borderWidth = TitleInputBorderWidth.THIN;
  inputField.style.boxShadow = TITLE_INVALID_SHADOW;
};

const titleLengthHandler = () => {
  const valueLength = offerTitle.value.length;
  if (valueLength >= LengthTitle.MIN) {
    setValidBorderColor(offerTitle);
  }
  if (valueLength < LengthTitle.MIN || valueLength > LengthTitle.MAX) {
    setInvalidBorderColor(offerTitle);
  }
};

const titleReportValidityHandler = () => {
  offerTitle.reportValidity();
};

const priceReportValidityHandler = () => {
  offerPrice.reportValidity();
};

const priceInvalidHandler = () => {
  if (offerPrice.validity.valueMissing) {
    offerPrice.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerPrice.validity.rangeUnderflow) {
    offerPrice.setCustomValidity(`Цена за ночь не может быть меньше ${HousingPrice.MIN} руб.`);
    return;
  }
  if (offerPrice.validity.rangeOverflow) {
    offerPrice.setCustomValidity(`Цена за ночь не должна превышать ${HousingPrice.MAX} руб.`);
  }
  offerPrice.setCustomValidity('');
};

offerTitle.addEventListener('input', titleLengthHandler);

offerTitle.addEventListener('input', titleReportValidityHandler);

offerPrice.addEventListener('input', priceReportValidityHandler);

offerTitle.addEventListener('invalid', titleInvalidHandler);

offerPrice.addEventListener('invalid', priceInvalidHandler);
