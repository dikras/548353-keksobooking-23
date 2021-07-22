import { FILE_TYPES, PreviewPhotoSize } from './consts.js';
import { offerForm } from './form.js';

const photoChooser = offerForm.querySelector('.ad-form__input');
const photoPreviewContainer = offerForm.querySelector('.ad-form__photo');
const photoPreview = document.createElement('img');

photoPreview.width = PreviewPhotoSize.WIDTH;
photoPreview.height = PreviewPhotoSize.HEIGHT;

const handlePreviewPhotoUpload = () => {
  photoPreviewContainer.insertAdjacentElement('afterbegin', photoPreview);

  const file = photoChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      photoPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

photoChooser.addEventListener('change', handlePreviewPhotoUpload);

const resetPhotorPreview = () => {
  photoPreview.remove();
};

export { resetPhotorPreview };
