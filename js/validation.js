import { offerTitle, offerPrice } from './form.js';
import { HousingPrice } from './consts.js';

const titleInvalidHandler = () => {
  if (offerTitle.validity.valueMissing) {
    offerTitle.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerTitle.validity.tooShort) {
    offerTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов симв.');
    return;
  }
  if (offerTitle.validity.tooLong) {
    offerTitle.setCustomValidity('Длина заголовка не должна превышать 100 символов симв.');
    return;
  }
  offerTitle.setCustomValidity('');
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

offerTitle.addEventListener('invalid', titleInvalidHandler);

offerPrice.addEventListener('invalid', priceInvalidHandler);
