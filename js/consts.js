const ZOOM = 10;

const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить данные';

const SIMILAR_OFFERS_COUNT = 10;
const ANY_VALUE = 'any';
const RADIX = 10;

const RERENDER_DELAY = 500;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const TitleInputBorderColor = {
  GREEN: '#19e485',
  RED: '#ffaa99',
};

const TitleInputBorderWidth = {
  THICK: '2px',
  THIN: '1px',
};

const LengthTitle = {
  MIN: 30,
  Max: 100,
};

const TITLE_INVALID_SHADOW = '0 0 2px 2px #ff6547';

const HousingPrice = {
  MIN: 0,
  Max: 1000000,
};

const Url = {
  GET: 'https://23.javascript.pages.academy/keksobooking/data',
  POST: 'https://23.javascript.pages.academy/keksobooking',
};

const SimilarMarkerSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const InitialPosition = {
  LAT: 35.67980,
  LNG: 139.76941,
};

const MainMarkerSize = {
  WIDTH: 52,
  HEIGHT: 52,
};

const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const HousingMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const HousingPriceRange = {
  LOW: {
    MIN: 0,
    MAX: 10000,
  },
  MIDDLE: {
    MIN: 10001,
    MAX: 50000,
  },
  HIGH: {
    MIN: 50001,
    MAX: 1000000,
  },
};

const PreviewPhotoSize = {
  WIDTH: '70',
  HEIGHT: '70',
};

export { ZOOM, SimilarMarkerSize, InitialPosition, MainMarkerSize,
  SIMILAR_OFFERS_COUNT ,TitleInputBorderColor, TitleInputBorderWidth,
  LengthTitle, TITLE_INVALID_SHADOW, ANY_VALUE, RADIX, HousingPriceRange,
  ALERT_SHOW_TIME, ALERT_MESSAGE, RoomsCapacity,  HousingMinPrice,
  HousingPrice, Url, FILE_TYPES, PreviewPhotoSize, RERENDER_DELAY };
