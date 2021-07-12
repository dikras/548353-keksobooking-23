const ALERT_SHOW_TIME = 5000;

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ec6e6e';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isInRange = (arr, number) => {
  const firstIndex = arr[0], lastIndex= arr[arr.length - 1];
  if (number >= firstIndex && number <= lastIndex) {
    return true;
  }
};

export { isEscEvent, showAlert, isInRange };
