import { offerTitle, offerPrice } from './form.js';
import { TitleInputBorderColor, TitleInputBorderWidth, LengthTitle,
  TITLE_INVALID_SHADOW, HousingPrice } from './consts.js';

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

const isTitleLengthValid = () => {
  const valueLength = offerTitle.value.length;
  if (valueLength < LengthTitle.MIN || valueLength > LengthTitle.MAX) {
    return false;
  }
  return true;
};

const titleLengthHandler = () => {
  isTitleLengthValid() ? offerTitle.style.borderColor = TitleInputBorderColor.GREEN : offerTitle.style.borderColor = TitleInputBorderColor.RED;
  isTitleLengthValid() ? offerTitle.style.borderWidth = TitleInputBorderWidth.THICK : offerTitle.style.borderWidth = TitleInputBorderWidth.THIN;
  isTitleLengthValid() ? offerTitle.style.boxShadow = 'none ' : offerTitle.style.boxShadow = TITLE_INVALID_SHADOW;
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
