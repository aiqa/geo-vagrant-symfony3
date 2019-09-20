const generateString = () => {
  return Math.random()
    .toString(36)
    .replace('0.', '');
};

const generateNumber = () => {
  return Math.floor(Math.random() * 10000) + 1;
};

module.exports = { generateNumber, generateString };
