import { isEscapeKey } from './util.js';

let message;
let isOpen = false;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessage = (type, text, buttonText) =>
  `<section class="${type}">
  <div class="${type}__inner">
    <h2 class="${type}__title">${text}</h2>
    ${buttonText ? `<button type="button" class="${type}__button">${buttonText}</button>` : ''}
  </div>
</section>`;

const documentKeydownHandler = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
    evt.preventDefault();
    closeMessage();
  }
};

function closeMessage() {
  message.remove();
  document.removeEventListener('keydown', documentKeydownHandler, { capture: true });

  if (!isOpen) {
    document.body.classList.remove('modal-open');
  }
}

const renderMessage = (type, text, buttonText) => {
  message = createElement(createMessage(type, text, buttonText));
  document.body.append(message);
  isOpen = false;

  message.addEventListener('click', (evt) => {
    if (!evt.target.closest(`.${type}__inner`)) {
      evt.preventDefault();
      closeMessage();
    }
  });

  document.addEventListener('keydown', documentKeydownHandler, { capture: true });

  if (buttonText) {
    message.querySelector(`.${type}__button`).addEventListener('click', closeMessage);
  }

  if (!document.body.classList.contains('modal-open')) {
    document.body.classList.add('modal-open');
    return;
  }
  isOpen = true;
};

export { renderMessage };
