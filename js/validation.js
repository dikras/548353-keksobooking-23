import { offerTitle, offerPrice, typeHousing, roomsNumber, guestsCapacity } from './form.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

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

const setValidFieldBorderColor = (inputField) => {
  inputField.style.borderColor = '#19e485';
  inputField.style.borderWidth = '2px';
  inputField.style.boxShadow = 'none ';
};

const setInvalidFieldBorderColor = (inputField) => {
  inputField.style.borderColor = '#ffaa99';
  inputField.style.borderWidth = '1px';
  inputField.style.boxShadow = '0 0 2px 2px #ff6547';
};

const onTitleLengthInput = () => {
  const valueLength = offerTitle.value.length;
  if (valueLength >= MIN_LENGTH_TITLE) {
    setValidFieldBorderColor(offerTitle);
  }
  if (valueLength < MIN_LENGTH_TITLE || valueLength > MAX_LENGTH_TITLE) {
    setInvalidFieldBorderColor(offerTitle);
  }
};

const onTypeHousingChange = () => {
  setValidFieldBorderColor(typeHousing);
};

const onRoomsNumbergChange = () => {
  setValidFieldBorderColor(roomsNumber);
};

const onGuestsCapacityChange = () => {
  setValidFieldBorderColor(guestsCapacity);
};

const onPriceValueInput = () => {
  const valuePrice = offerPrice.value;
  if (valuePrice >= MIN_PRICE) {
    setValidFieldBorderColor(offerPrice);
  }
  if (valuePrice < MIN_PRICE || valuePrice > MAX_PRICE || !valuePrice) {
    setInvalidFieldBorderColor(offerPrice);
  }
};

// Добавление функций
offerTitle.addEventListener('input', onTitleLengthInput);

typeHousing.addEventListener('change', onTypeHousingChange);

roomsNumber.addEventListener('change', onRoomsNumbergChange);

guestsCapacity.addEventListener('change', onGuestsCapacityChange);

offerPrice.addEventListener('input', onPriceValueInput);

offerTitle.addEventListener('invalid', onTitleInvalidInput);

offerPrice.addEventListener('invalid', onPriceInvalidInput);
