// Фиксированные значения
const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

const TITLES = [
  'Дворец с теремом и резными башенками',
  'Уютная квартирка с видом на старую площадь',
  'Дом в викторианском стиле с настоящим дворецким',
  'Тропическое бунгало в центре современного мегаполиса',
  'Многозвездочный отель с круглосуточной спа-зоной',
  'Деревянный домик с расписными ставнями',
  'Двухэтажное бунгало на сваях и с прозрачным полом',
  'Дворец в стиле венецианско барокко',
];

const ACCOMODATION_TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECKIN_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT_TIMES = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const MIN_PRICE = 1000;
const MAX_PRICE = 300000;

const MIN_ROOMS = 2;
const MAX_ROOMS = 20;

const MIN_GUESTS = 1;
const MAX_GUESTS = 40;

const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;

const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;

const DIGITS_AFTER_POINT = 5;

const SIMILAR_OFFERS_COUNT = 10;

// Вспомогательные функции
function getRandomPositiveInteger (firstNum, secondNum) {
  const lower = Math.ceil(Math.min(Math.abs(firstNum), Math.abs(secondNum)));
  const upper = Math.floor(Math.max(Math.abs(firstNum), Math.abs(secondNum)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

function getRandomPositiveFloat (firstNum, secondNum, digits = 1) {
  const lower = Math.min(Math.abs(firstNum), Math.abs(secondNum));
  const upper = Math.max(Math.abs(firstNum), Math.abs(secondNum));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
}

const getRandomArrayElement = (array) => array[getRandomPositiveInteger(0, array.length - 1)];

const getRandomArray = (array) => {
  const randomIndex = getRandomPositiveInteger(0, array.length - 1);
  const randomArray = array.slice(0, randomIndex + 1);
  return randomArray;
};

const getStringLocation = () => {
  const latitude = getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE, DIGITS_AFTER_POINT);
  const longitude = getRandomPositiveFloat(MIN_LONGITUDE, MAX_LONGITUDE, DIGITS_AFTER_POINT);

  return `${latitude}, ${longitude}`;

};

// Создание массива похожих объявлений
function createOffer() {
  return {
    author: getRandomArrayElement(AVATARS),
    offer: {
      title: getRandomArrayElement(TITLES),
      address: getStringLocation(),
      price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(ACCOMODATION_TYPES),
      rooms: getRandomPositiveInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomPositiveInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomArrayElement(CHECKIN_TIMES),
      checkout: getRandomArrayElement(CHECKOUT_TIMES),
      features: getRandomArray(FEATURES),
      description: 'Удобное расположение, оригинальный дизайн комнат, прекрасные виды из окон.',
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: getRandomPositiveFloat(MIN_LATITUDE, MAX_LATITUDE, DIGITS_AFTER_POINT),
      lng: getRandomPositiveFloat(MIN_LONGITUDE, MAX_LONGITUDE, DIGITS_AFTER_POINT),
    },
  };
}

const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill(null).map(() => createOffer());

similarOffers.slice();
