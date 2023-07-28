import { isEscapeKey } from '../utils/util.js';
import { initScale, resetScale } from './scale.js';
import { initEffects } from './effects-editor.js';
import { initValidator, pristineValidate, pristineReset } from './validation.js';
import { sendData } from '../utils/api.js';
import { renderMessage } from '../utils/messages.js';

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';
const SUCCESS_CLASS = 'success';
const ERROR_CLASS = 'error';
const MESSAGE_SUCCESS = 'Изображение успешно загружено';
const MESSAGE_ERROR = 'Ошибка загрузки файла';
const MESSAGE_LOAD = 'Недопустимое расширение для выбранного файла';
const SUCCESS_BTN_TEXT = 'Круто!';
const ERROR_BTN_TEXT = 'Попробовать ещё раз';

const EXTENSION_REGEXP = /.\.(jpg|png|jpeg|gif|webp)$/i;

const uploadInput = document.querySelector('.img-upload__input');
const uploadForm = document.querySelector('.img-upload__form');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const effectsList = document.querySelector('.img-upload__effects');
const currentEffectValue = effectsList.querySelector('input:checked').value;
const submitButton = document.querySelector('.img-upload__submit');
const imagePreview = document.querySelector('.img-upload__preview img');
const effectsPreviewImages = document.querySelectorAll('.effects__preview');

const effectsListChangeHandler = (evt) => initEffects(evt.target.value);

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', documentKeydownHandler);
};

const closeUploadForm = () => {
  uploadForm.reset();
  resetScale();
  pristineReset();
  initEffects(currentEffectValue);
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', documentKeydownHandler);
};

const showImagePreview = (evt) => {
  const fileUrl = URL.createObjectURL(evt.target.files[0]);
  imagePreview.src = fileUrl;
  effectsPreviewImages.forEach((effect) => {
    effect.style.backgroundImage = `url(${fileUrl})`;
  });
};

const uploadInputChangeHandler = (evt) => {
  if (evt.target.value.match(EXTENSION_REGEXP)) {
    openUploadForm();
    showImagePreview(evt);
    return;
  }
  renderMessage(ERROR_CLASS, MESSAGE_LOAD);
};

const setButtonState = (state) => {
  submitButton.disabled = state;
};

const uploadSuccess = () => {
  closeUploadForm();
  renderMessage(SUCCESS_CLASS, MESSAGE_SUCCESS, SUCCESS_BTN_TEXT);
  setButtonState(false);
};

const uploadError = () => {
  renderMessage(ERROR_CLASS, MESSAGE_ERROR, ERROR_BTN_TEXT);
  setButtonState(false);
};

const uploadFormSubmitHandler = (evt) => {
  evt.preventDefault();
  if (pristineValidate()) {
    setButtonState(true);
    sendData(SEND_URL, new FormData(evt.target), uploadSuccess, uploadError);
  }
};

const imgUploadCancelClickHandler = () => closeUploadForm();

const isInput = (evt) => evt.target.closest('.text__hashtags') || evt.target.closest('.text__description');

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt) && !isInput(evt)) {
    evt.preventDefault();
    closeUploadForm();
  }
}

const initUploadForm = () => {
  initValidator();
  initScale();
  initEffects(currentEffectValue);
  effectsList.addEventListener('change', effectsListChangeHandler);
  uploadInput.addEventListener('change', uploadInputChangeHandler);
  uploadForm.addEventListener('submit', uploadFormSubmitHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelClickHandler);
};

export { initUploadForm };
