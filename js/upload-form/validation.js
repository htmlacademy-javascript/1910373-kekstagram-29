const HASHTAGS_MAX_COUNT = 5;
const COMMENTS_MAX_LENGTH = 140;
const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i;

const COMMENT_LENGTH_INVALID_TEXT = 'Длина комментария не может составлять больше 140 символов.';
const HASHTAG_INVALID_TEXT = 'У вас не валидный хэштег, используйте запись в формате: #аяёaz09, максимальная длина одного хэш-тега 20 символов, включая решётку, он не может состоять только из одной решётки, хэш-теги разделяются одним пробелом.';
const HASHTAG_INVALID_COUNT_TEXT = 'Нельзя указать больше пяти хэш-тегов.';
const HASHTAG_INVALID_SAME_TEXT = 'Один и тот же хэш-тег не может быть использован дважды.';

const uploadForm = document.querySelector('.img-upload__form');
const textHashtag = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

const checkDescriptionLength = (value) => value.length <= COMMENTS_MAX_LENGTH;

const createHashtags = (value) => value.trim().toLowerCase().split(' ').filter((it) => it);

const checkHashtagsCorrect = (value) => {
  if (!value.length) {
    return true;
  }
  const hashtags = createHashtags(value);
  return hashtags.every((element) => (HASHTAG_TEMPLATE.test(element)));
};

const checkHashtagsCount = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length <= HASHTAGS_MAX_COUNT;
};

const checkHashtagsSame = (value) => {
  const hashtags = createHashtags(value);
  return hashtags.length === new Set(hashtags).size;
};

const pristineValidate = () => pristine.validate();
const pristineReset = () => pristine.reset();

const initValidator = () => {
  pristine.addValidator(textDescription, checkDescriptionLength, COMMENT_LENGTH_INVALID_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagsCorrect, HASHTAG_INVALID_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagsCount, HASHTAG_INVALID_COUNT_TEXT, 1, true);
  pristine.addValidator(textHashtag, checkHashtagsSame, HASHTAG_INVALID_SAME_TEXT, 1, true);
};

export { initValidator, pristineValidate, pristineReset };
