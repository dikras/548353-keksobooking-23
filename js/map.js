// Модуль работы с картой
import { offerForm, offerFormElements, address } from './form.js';
import { mapFilters, mapFiltersElements } from './filters.js';
// import { similarOffersPins, createCustomPopup } from './similar-offers.js';

const ZOOM = 10;

const initialPosition = {
  LAT: 35.67980,
  LNG: 139.76941,
};

const mainMarkerSize = {
  WIDTH: 52,
  HEIGHT: 52,
};

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const map = L.map('map-canvas')
  .on('load', activatePage)
  .setView({
    lat: initialPosition.LAT,
    lng: initialPosition.LNG,
  }, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [mainMarkerSize.WIDTH, mainMarkerSize.HEIGHT],
    iconAnchor: [mainMarkerSize.WIDTH / 2, mainMarkerSize.HEIGHT],
  },
);
const mainMarker = L.marker(
  {
    lat: initialPosition.LAT,
    lng: initialPosition.LNG,
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

/* resetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: initialPosition.LAT,
    lng: initialPosition.LNG,
  });
  map.setView({
    lat: initialPosition.LAT,
    lng: initialPosition.LNG,
  }, ZOOM);
}); */

export { map };
