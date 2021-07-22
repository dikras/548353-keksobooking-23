// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
import { DEFAULT_DELAY } from '../consts.js';

const debounce = (callback, DEFAULT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), DEFAULT_DELAY);
  };
};

export {debounce};
