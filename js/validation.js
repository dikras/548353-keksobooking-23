import { offerTitle, offerPrice } from './form.js';

// Прекрасная небольшая студия на последнем этаже с видом на старую площадь

const onTitleInvalidInput = () => {
  if (offerTitle.validity.valueMissing) {
    offerTitle.setCustomValidity('Обязательное поле');
    return;
  }
  if (offerTitle.validity.tooShort) {
    offerTitle.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    return;
  }
  if (offerTitle.validity.tooLong) {
    offerTitle.setCustomValidity('Длина заголовка не должна превышать 100 символов');
  }
  offerTitle.setCustomValidity('');
};

const onPriceInvalidInput = () => {
  if (offerPrice.validity.valueMissing) {
    offerPrice.setCustomValidity('Обязательное поле');
    return;
  }
  if (offerPrice.validity.rangeUnderflow) {
    offerPrice.setCustomValidity('Цена за ночь не может быть меньше нуля');
    return;
  }
  if (offerPrice.validity.rangeOverflow) {
    offerPrice.setCustomValidity('Цена за ночь не должна превышать 1 000 000 руб.');
  }
  offerPrice.setCustomValidity('');
};

// Добавление функций
offerTitle.addEventListener('invalid', onTitleInvalidInput);

offerPrice.addEventListener('invalid', onPriceInvalidInput);
