import { offerForm, offerFormElements, resetFormButton, address } from './form.js';
import { ZOOM, InitialPosition, MainMarkerSize, SIMILAR_OFFERS_COUNT, SimilarMarkerSize } from './consts.js';
import { resetAvatarPreview } from './avatar.js';
import { resetPhotorPreview } from './offer-photos.js';
import { createSimilarOffersPins, createPopup } from './similar-offers.js';

const mapBlock = document.querySelector('.map');
const mapFilter = mapBlock.querySelector('.map__filters');
const mapFiltersElements = mapFilter.querySelectorAll('.map__filter');

const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });

  mapFilter.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
    element.setAttribute('disabled', 'disabled');
  });
};

deactivatePage();

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  offerFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });

  mapFilter.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((element) => {
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

const markerGroup = L.layerGroup().addTo(map);

const renderPins = (ads) => {
  const similarOffersPins = createSimilarOffersPins(ads);

  similarOffersPins.forEach((similarOffer) => {
    const {lat, lng} = similarOffer;

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [SimilarMarkerSize.WIDTH, SimilarMarkerSize.HEIGHT],
      iconAnchor: [SimilarMarkerSize.WIDTH / 2, SimilarMarkerSize.HEIGHT],
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
      .addTo(markerGroup)
      .bindPopup(
        createPopup(similarOffer),
        {
          keepInView: true,
        },
      );
  });
};

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

const reRenderPins = (offers) => {
  markerGroup.clearLayers();
  renderPins(offers.slice(0, SIMILAR_OFFERS_COUNT));
};

const resetPage = (offers) => {
  resetAvatarPreview();
  resetPhotorPreview();
  offerForm.reset();
  resetMapPosition();
  mapFilter.reset();
  setMainMarkerInitialPosition();
  reRenderPins (offers);
};

const setResetButtonClick = (cb) => {
  resetFormButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    cb();
  });
};

export { map, resetMapPosition, resetPage, mapFilter, setResetButtonClick, markerGroup, renderPins };
