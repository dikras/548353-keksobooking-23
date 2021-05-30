function getRandomIntNumber (min, max) {
  if (max > min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  throw new Error('Второй аргумент функции должен быть больше первого');
}

function getRandomDecNumber (min, max, digits) {
  if (max > min) {
    const randomNumber = Math.random() * (max - min + 1) + min;
    return randomNumber.toFixed(digits);
  }
  throw new Error('Второй аргумент функции должен быть больше первого');
}

getRandomIntNumber(0, 10);
getRandomDecNumber(5.678, 32.753, 2);
