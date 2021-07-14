import { offerForm, offerFormElements, resetFormButton, address } from './form.js';
import { ZOOM, InitialPosition, MainMarkerSize } from './consts.js';

const mapBlock = document.querySelector('.map');
const mapFilter = mapBlock.querySelector('.map__filters');
const mapFiltersElement = mapFilter.querySelectorAll('.map__filter');

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilter.classList.remove('map__filters--disabled');
  mapFiltersElement.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const map = L.map('map-canvas')
  .on('load', activatePage)
  .setView({
    lat: InitialPosition.LAT,
    lng: InitialPosition.LNG,
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
    iconSize: [MainMarkerSize.WIDTH, MainMarkerSize.HEIGHT],
    iconAnchor: [MainMarkerSize.WIDTH / 2, MainMarkerSize.HEIGHT],
  },
);
const mainMarker = L.marker(
  {
    lat: InitialPosition.LAT,
    lng: InitialPosition.LNG,
  },
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

mainMarker.addTo(map);

// Установка в поле адреса начальных координат маркера
const setMainMarkerInitialPosition = () => {
  address.value = `${mainMarker._latlng.lat}, ${mainMarker._latlng.lng}`;
};

setMainMarkerInitialPosition();

// Получение текущей позиции маркера и установка в поле адреса
const getMainMarkerCurrentPosition = (evt) => {
  const currentLatitude = evt.target.getLatLng().lat.toFixed(5);
  const currentLongitude = evt.target.getLatLng().lng.toFixed(5);

  address.value = `${currentLatitude}, ${currentLongitude}`;
};

mainMarker.on('moveend', getMainMarkerCurrentPosition);

// Сброс позиции маркера и карты
const resetMapPosition = () => {
  mainMarker.setLatLng({
    lat: InitialPosition.LAT,
    lng: InitialPosition.LNG,
  });
  map.setView({
    lat: InitialPosition.LAT,
    lng: InitialPosition.LNG,
  }, ZOOM);
};

const resetPage = () => {
  offerForm.reset();
  resetMapPosition();
  mapFilter.reset();
  setMainMarkerInitialPosition();
};

resetFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetPage();
  resetMapPosition();
  setMainMarkerInitialPosition();
});

export { map, resetMapPosition, resetPage, mapFilter, mapFiltersElement };
