import { FILE_TYPES, AVATAR_URL } from './consts.js';
import { offerForm } from './form.js';

const avatarChooser = offerForm.querySelector('.ad-form-header__input');
const avatarPreview = offerForm.querySelector('.ad-form-header__preview img');

const avatarUploadHandler = () => {
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
};

avatarChooser.addEventListener('change', avatarUploadHandler);

const resetAvatarPreview = () => {
  avatarPreview.src = AVATAR_URL;
};

export { resetAvatarPreview };
