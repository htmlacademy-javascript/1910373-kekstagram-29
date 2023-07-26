import { renderThumbnails } from './render-thumbnails.js';
import { debounce } from '../utils/util.js';

const RANDOM_PICTURES_COUNT = 10;
const DELAY = 500;
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

const filterByCommentsCount = (data) => (data.slice().sort((a, b) => b.comments.length - a.comments.length));

const filterByRandomOrder = (data) => {
  const dataClone = data.slice();
  for (let i = dataClone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dataClone[i], dataClone[j]] = [dataClone[j], dataClone[i]];
  }

  return dataClone.splice(0, RANDOM_PICTURES_COUNT);
};

const getFilteringData = (id, data) => {
  switch (id) {
    case FILTER_RANDOM:
      return filterByRandomOrder(data);
    case FILTER_DISCUSSED:
      return filterByCommentsCount(data);
    default:
      return data;
  }
};

const renderFilteringPictures = (filter, data) => {
  picturesContainer.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderThumbnails(getFilteringData(filter, data));
};

const renderPictures = debounce((id, data) => renderFilteringPictures(id, data), DELAY);

const initFilter = (data) => {
  filters.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      renderPictures(evt.target.id, data);
    }
  });
};

export { initFilter, renderFilteringPictures };
