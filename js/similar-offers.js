const createSimilarPin = (item) => {
  const pin = {
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
  return pin;
};

const createSimilarOffersPins = (ads) => ads.map((ad) => createSimilarPin(ad));

const createPopup = (ad) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = ad.src;
  popupElement.querySelector('.popup__title').textContent = ad.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${ad.address}`;
  popupElement.querySelector('.popup__text--price').textContent = `${ad.price} ₽/ночь`;
  popupElement.querySelector('.popup__type').textContent = ad.type;
  popupElement.querySelector('.popup__text--capacity').textContent = `${ad.rooms} комнаты для ${ad.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.checkin}, выезд до ${ad.checkout}`;
  popupElement.querySelector('.popup__description').textContent = ad.description;

  const fragment = document.createDocumentFragment();

  const adPhotos = ad.photos;
  if (adPhotos) {
    const photosBlock = popupElement.querySelector('.popup__photos');
    const photoElement = photosBlock.querySelector('.popup__photo');
    photosBlock.removeChild(photoElement);
    adPhotos.forEach((adPhoto) => {
      const photoNewElement = photoElement.cloneNode(true);
      photoNewElement.src = adPhoto;
      fragment.appendChild(photoNewElement);
    });
    photosBlock.appendChild(fragment);
  }

  const adFeatures = ad.features;

  if (adFeatures) {
    const featuresList = popupElement.querySelector('.popup__features');
    featuresList.innerHTML = '';
    adFeatures.forEach((adFeature) => {
      const featureNewElement = document.createElement('li');
      featureNewElement.classList.add('popup__feature');
      featureNewElement.classList.add(`popup__feature--${adFeature}`);
      fragment.appendChild(featureNewElement);
    });

    featuresList.appendChild(fragment);
  }

  if (!ad.features) {
    popupElement.querySelector('.popup__features').classList.add('hidden');
  }
  if (!ad.photos) {
    popupElement.querySelector('.popup__photos').classList.add('hidden');
  }

  if (!ad.description) {
    popupElement.querySelector('.popup__description').classList.add('hidden');
  }

  return popupElement;
};

export { createSimilarOffersPins, createPopup };
