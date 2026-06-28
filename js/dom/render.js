export const renderLetters = (secretWord, guessedLetters, mainClass) => {
  mainClass.innerHTML = "";

  for (const character of secretWord) {
    const span = document.createElement("span");
    if (guessedLetters.includes(character)) {
      span.textContent = character;
    } else {
      span.textContent = "_";
    }
    mainClass.append(span);
  }
};

export const hangmanImage = (hmClass, iterator) => {
  hmClass.innerHTML = "";

  const img = document.createElement("img");
  img.src = `./assets/img/h-${iterator}.jpg`;
  hmClass.append(img);
};

export const showMessage = (msgClass, text) => {
  msgClass.innerHTML = "";

  const span = document.createElement("span");
  span.textContent = text;

  msgClass.append(span);
};
