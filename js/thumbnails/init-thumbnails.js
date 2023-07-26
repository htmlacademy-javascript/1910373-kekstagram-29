import { getData } from '../utils/api.js';
import { renderMessage } from '../utils/messages.js';
import { initFilter, renderFilteringPictures } from './filter.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_TEXT = 'Ошибка загрузки данных.';
const STATE = 'error';

const onGetSuccess = (data) => {
  initFilter(data);
  renderFilteringPictures(document.querySelector('.img-filters__button--active').id, data);
};

const onGetError = () => renderMessage(STATE, ERROR_TEXT);

const initThumbnails = () => getData(DATA_URL, onGetSuccess, onGetError);

export { initThumbnails };
