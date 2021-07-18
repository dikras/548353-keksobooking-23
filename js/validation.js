import { offerTitleElement, offerPriceElement } from './form.js';
import { HousingPrice } from './consts.js';

const titleInvalidInputHandler = () => {
  if (offerTitleElement.validity.valueMissing) {
    offerTitleElement.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerTitleElement.validity.tooShort) {
    offerTitleElement.setCustomValidity('Заголовок должен состоять минимум из 30 символов симв.');
    return;
  }
  if (offerTitleElement.validity.tooLong) {
    offerTitleElement.setCustomValidity('Длина заголовка не должна превышать 100 символов симв.');
    return;
  }
  offerTitleElement.setCustomValidity('');
};

const priceInvalidInputHandler = () => {
  if (offerPriceElement.validity.valueMissing) {
    offerPriceElement.setCustomValidity('Это обязательное поле');
    return;
  }
  if (offerPriceElement.validity.rangeUnderflow) {
    offerPriceElement.setCustomValidity(`Цена за ночь не может быть меньше ${HousingPrice.MIN} руб.`);
    return;
  }
  if (offerPriceElement.validity.rangeOverflow) {
    offerPriceElement.setCustomValidity(`Цена за ночь не должна превышать ${HousingPrice.MAX} руб.`);
  }
  offerPriceElement.setCustomValidity('');
};

offerTitleElement.addEventListener('invalid', titleInvalidInputHandler);

offerPriceElement.addEventListener('invalid', priceInvalidInputHandler);
