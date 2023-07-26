const DEFAULT_METHOD = 'POST';

const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error();
    })
    .then((data) => onSuccess(data))
    .catch(() => onError());
};

const sendData = (url, body, onSuccess, onError, method = DEFAULT_METHOD) => {
  fetch(url, {
    method,
    body
  })
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      throw new Error();
    })
    .catch(() => onError());
};

export { getData, sendData };
