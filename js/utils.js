// Модуль вспомогательных функций

const getRandomInteger = (firstNumber, secondNumber) => {
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const getRandomFloat = (firstNumber, secondNumber, digits = 1) => {
  const lower = Math.min(Math.abs(firstNumber), Math.abs(secondNumber));
  const upper = Math.max(Math.abs(firstNumber), Math.abs(secondNumber));
  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(digits);
};

const getRandomItem = (items) => items[getRandomInteger(0, items.length - 1)];

const getRandomFeatures = (items) => {
  const randomIndex = getRandomInteger(0, items.length - 1);
  const randomFeatures = items.slice(0, randomIndex + 1);
  return randomFeatures;
};

export { getRandomInteger, getRandomFloat, getRandomItem, getRandomFeatures };
