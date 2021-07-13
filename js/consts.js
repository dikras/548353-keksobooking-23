const ZOOM = 10;

const ALERT_SHOW_TIME = 5000;
const ALERT_MESSAGE = 'Не удалось загрузить данные';

const URL_GET = 'https://23.javascript.pages.academy/keksobooking/data';
const URL_POST = 'https://23.javascript.pages.academy/keksobooking';

const SIMILAR_OFFERS_COUNT = 10;
const ANY_VALUE = 'any';
const RADIX = 10;

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;

const MIN_PRICE = 0;
const MAX_PRICE = 1000000;

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const similarMarkerSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const initialPosition = {
  LAT: 35.67980,
  LNG: 139.76941,
};

const mainMarkerSize = {
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

export { ZOOM, similarMarkerSize, initialPosition, mainMarkerSize,  SIMILAR_OFFERS_COUNT,
  ANY_VALUE, RADIX, HousingPriceRange, ALERT_SHOW_TIME, ALERT_MESSAGE, RoomsCapacity,  HousingMinPrice,
  MIN_LENGTH_TITLE, MAX_LENGTH_TITLE, MIN_PRICE, MAX_PRICE, URL_GET, URL_POST, FILE_TYPES };
