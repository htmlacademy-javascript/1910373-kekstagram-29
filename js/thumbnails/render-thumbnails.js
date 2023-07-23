import { renderBigPicture } from './render-full-image.js';

const fragment = document.createDocumentFragment();
const picture = document.querySelector('#picture').content.querySelector('.picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnails = (item) => {
  const pictureClone = picture.cloneNode(true);
  const cloneImg = pictureClone.querySelector('.picture__img');

  cloneImg.src = item.url;
  cloneImg.alt = item.description;
  pictureClone.querySelector('.picture__likes').textContent = item.likes;
  pictureClone.querySelector('.picture__comments').textContent = item.comments.length;
  pictureClone.addEventListener('click', (evt) => {
    evt.preventDefault();
    renderBigPicture(item);
  });
  fragment.append(pictureClone);
};

const renderThumbnails = (data) => {
  data.forEach((item) => createThumbnails(item));
  picturesContainer.append(fragment);
};

export { renderThumbnails };