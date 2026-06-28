export const getRandomWord = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  const word = randomItem.toLowerCase().split("");
  return word;
};

export const fetchRandomWord = async (url) => {
  const response = await fetch(url);
  const words = await response.json();

  return getRandomWord(words);
};

export const hasWon = (secretWord, guessedList) =>
  secretWord.every((letter) => guessedList.includes(letter));
