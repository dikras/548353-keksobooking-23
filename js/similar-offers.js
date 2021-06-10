// Модуль создания и работы с похожими объявлениями

import { getRandomInteger, getRandomFloat, getRandomItem, getRandomFeatures } from './utils.js';

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
  'Дворец в стиле венецианское барокко',
];

const TYPES = [
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

const Price = {
  MIN: 1000,
  MAX: 300000,
};

const Room = {
  MIN: 2,
  MAX: 20,
};

const Guest = {
  MIN: 1,
  MAX: 40,
};

const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
};

const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
};

const DIGITS_COUNT = 5;

const SIMILAR_OFFERS_COUNT = 10;

const getStringLocation = () => {
  const latitude = getRandomFloat(Latitude.MIN, Latitude.MAX, DIGITS_COUNT);
  const longitude = getRandomFloat(Longitude.MIN, Longitude.MAX, DIGITS_COUNT);

  return `${latitude}, ${longitude}`;

};

// Создание массива похожих объявлений
const createOffer = () => (
  {
    author: getRandomItem(AVATARS),
    offer: {
      title: getRandomItem(TITLES),
      address: getStringLocation(),
      price: getRandomInteger(Price.MIN, Price.MAX),
      type: getRandomItem(TYPES),
      rooms: getRandomInteger(Room.MIN, Room.MAX),
      guests: getRandomInteger(Guest.MIN, Guest.MAX),
      checkin: getRandomItem(CHECKIN_TIMES),
      checkout: getRandomItem(CHECKOUT_TIMES),
      features: getRandomFeatures(FEATURES),
      description: 'Удобное расположение, оригинальный дизайн комнат, прекрасные виды из окон.',
      photos: getRandomFeatures(PHOTOS),
    },
    location: {
      lat: getRandomFloat(Latitude.MIN, Latitude.MAX, DIGITS_COUNT),
      lng: getRandomFloat(Longitude.MIN, Longitude.MAX, DIGITS_COUNT),
    },
  }
);

const similarOffers = new Array(SIMILAR_OFFERS_COUNT).fill(null).map(() => createOffer());

export { similarOffers };
