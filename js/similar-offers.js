// Модуль похожих объявлений с метками
import { map } from './map.js';

const similarMarkerSize = {
  WIDTH: 40,
  HEIGHT: 40,
};

const renderSimilarOffersPins = (items) => {
  const points = [];
  items.forEach((item) => {
    const point = {
      src: item.author.avatar,
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

  const fragment = document.createDocumentFragment();

  if (element.photos) {
    const photosBlock = popupElement.querySelector('.popup__photos');
    const photoElement = photosBlock.querySelector('.popup__photo');
    photosBlock.removeChild(photoElement);
    for (let index = 0; index < element.photos.length; index++) {
      const photoNewElement = photoElement.cloneNode(true);
      photoNewElement.src = element.photos[index];
      fragment.appendChild(photoNewElement);
    }
    photosBlock.appendChild(fragment);
  }

  if (element.features) {
    const featuresList = popupElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    for (let index = 0; index < element.features.length; index++) {
      const featureNewElement = document.createElement('li');
      featureNewElement.classList.add('popup__feature');
      featureNewElement.classList.add(`popup__feature--${element.features[index]}`);
      fragment.appendChild(featureNewElement);
    }
    featuresList.appendChild(fragment);
  }

  if (!element.features) {
    popupElement.querySelector('.popup__features').classList.add('hidden');
  }
  if (!element.photos) {
    popupElement.querySelector('.popup__photos').classList.add('hidden');
  }

  if (!element.description) {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  return popupElement;
};

const markerGroup = L.layerGroup().addTo(map);

const renderPins = (items) => {
  const similarOffersPins = renderSimilarOffersPins(items);

  similarOffersPins.forEach((similarOffer) => {
    const {lat, lng} = similarOffer;

    const icon = L.icon({
      iconUrl: './img/pin.svg',
      iconSize: [similarMarkerSize.WIDTH, similarMarkerSize.HEIGHT],
      iconAnchor: [similarMarkerSize.WIDTH / 2, similarMarkerSize.HEIGHT],
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
        createCustomPopup(similarOffer),
        {
          keepInView: true,
        },
      );
  });
};

export { renderPins, markerGroup };
