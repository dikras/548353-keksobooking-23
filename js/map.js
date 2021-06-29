// Модуль работы с картой
import { activatePage, address } from './form.js';
import { createOffers } from './data.js';

const InitialSettingMap = {
  LAT: 35.67980,
  LNG: 139.76941,
  ZOOM: 10,
};

const MainMarkerSetting = {
  WIDTH: 52,
  HEIGHT: 52,
  URL: './img/main-pin.svg',
};

const SimilarMarkerSetting = {
  WIDTH: 40,
  HEIGHT: 40,
  URL: './img/pin.svg',
};

const map = L.map('map-canvas')
  .on('load', activatePage)
  .setView({
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  }, InitialSettingMap.ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: MainMarkerSetting.URL,
    iconSize: [MainMarkerSetting.WIDTH, MainMarkerSetting.HEIGHT],
    iconAnchor: [MainMarkerSetting.WIDTH / 2, MainMarkerSetting.HEIGHT],
  },
);
const mainMarker = L.marker(
  {
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

const setMainMarkerInitialPosition = () => {
  address.value = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;
};

setMainMarkerInitialPosition();

const getMainMarkerCurrentPosition = (evt) => {
  const currentLatitude = evt.target.getLatLng().lat.toFixed(5);
  const currentLongitude = evt.target.getLatLng().lng.toFixed(5);

  address.value = `${currentLatitude}, ${currentLongitude}`;
};

mainMarker.on('moveend', getMainMarkerCurrentPosition);

const renderSimilarOffersPins = (items) => {
  const points = [];
  items.forEach((item) => {
    const point = {
      src: item.author,
      title: item.offer.title,
      address: item.offer.address,
      price: item.offer.price,
      type: item.offer.type,
      rooms: item.offer.rooms,
      guests: item.offer.guests,
      checkin: item.offer.checkin,
      checkout: item.offer.checkout,
      features: item.offer.features,
      photos: item.offer.photos,
      lat: item.location.lat,
      lng: item.location.lng,
      description: item.offer.description,
    };
    points.push(point);
  });
  return points;
};

const similarOffers = createOffers();

const similarOffersPins = renderSimilarOffersPins(similarOffers);
// console.log(similarOffers);

const createCustomPopup = (element) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = element.src;
  popupElement.querySelector('.popup__title').textContent = element.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${element.address}`;
  popupElement.querySelector('.popup__text--price').textContent = `${element.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = element.type;
  popupElement.querySelector('.popup__text--capacity').textContent = `${element.rooms} комнаты для ${element.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${element.checkin}, выезд до ${element.checkout}`;
  popupElement.querySelector('.popup__description').textContent = element.description;

  const photosBlock = popupElement.querySelector('.popup__photos');
  const photoElement = photosBlock.querySelector('.popup__photo');
  photosBlock.removeChild(photoElement);
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < element.photos.length; index++) {
    const photoNewElement = photoElement.cloneNode(true);
    photoNewElement.src = element.photos[index];
    fragment.appendChild(photoNewElement);
  }
  photosBlock.appendChild(fragment);

  const featuresList = popupElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  for (let index = 0; index < element.features.length; index++) {
    const featureNewElement = document.createElement('li');
    featureNewElement.classList.add('popup__feature');
    featureNewElement.classList.add(`popup__feature--${element.features[index]}`);
    fragment.appendChild(featureNewElement);
  }
  featuresList.appendChild(fragment);

  if (element.description === '') {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  return popupElement;
};

similarOffersPins.forEach((similarOffer) => {
  const {lat, lng} = similarOffer;

  const icon = L.icon({
    iconUrl: SimilarMarkerSetting.URL,
    iconSize: [SimilarMarkerSetting.WIDTH, SimilarMarkerSetting.HEIGHT],
    iconAnchor: [SimilarMarkerSetting.WIDTH / 2, SimilarMarkerSetting.HEIGHT],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );
  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup(similarOffer),
      {
        keepInView: true,
      },
    );
});

/* resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  });
  map.setView({
    lat: InitialSettingMap.LAT,
    lng: InitialSettingMap.LNG,
  }, InitialSettingMap.ZOOM);
}); */
