import { FILE_TYPES } from './consts.js';
import { offerForm } from './form.js';

const avatarChooser = offerForm.querySelector('.ad-form-header__input');
const avatarPreview = offerForm.querySelector('.ad-form-header__preview img');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
