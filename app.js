"use strict";

const getRandomWord = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  const word = randomItem.toLowerCase().split("");
  return word;
};

const renderletters = (secretWord, guessedLetters, mainClass) => {
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

const hangmanImage = (hmClass, iterator) => {
  hmClass.innerHTML = "";

  const img = document.createElement("img");
  img.src = `./assets/img/h-${iterator}.jpg`;
  hmClass.append(img);
};

const showMessage = (msgClass, text) => {
  msgClass.innerHTML = "";

  const span = document.createElement("span");
  span.textContent = text;

  msgClass.append(span);
};

const hasWon = (secretWord, guessedList) =>
  secretWord.every((letter) => guessedList.includes(letter));

// DOM

const buttons = document.querySelectorAll(".keyboard__btn");

const playAgainBtn = document.querySelector(".play-again__btn");

const underScor = document.querySelector(".underscores");

const hmClass = document.querySelector(".hangman");

const msgClass = document.querySelector(".message");

const winsClass = document.querySelector(".scores__wins");

const lossesClass = document.querySelector(".scores__losses");

// Async function
let guessedList = [];

let hangmanIterator = 0;
let wins = 0;
let losses = 0;

let gameOver = false;

const main = async () => {
  const jsonWords = await fetch("./assets/example-words.json");
  const arrayWords = await jsonWords.json();
  const randomWord = getRandomWord(arrayWords);

  renderletters(randomWord, guessedList, underScor);
  showMessage(msgClass, "Lets Play!");

  for (const btn of buttons) {
    // keyboard button
    btn.addEventListener("click", function () {
      if (gameOver) return;

      const guessedLetter = btn.textContent;

      btn.disabled = true;
      guessedList.push(guessedLetter);

      if (!randomWord.includes(guessedLetter)) {
        hangmanIterator++;

        if (hangmanIterator <= 10) {
          hangmanImage(hmClass, hangmanIterator);
        }

        if (hangmanIterator > 10) {
          gameOver = true;
          losses++;
          showMessage(lossesClass, `Losses : ${losses}`);
          showMessage(msgClass, "You lost!");
          return;
        }
      }

      renderletters(randomWord, guessedList, underScor);

      if (hasWon(randomWord, guessedList)) {
        gameOver = true;
        wins++;
        showMessage(winsClass, `Wins : ${wins}`);
        showMessage(msgClass, "You Won!");
      }
    });
  }

  // play again button
  playAgainBtn.addEventListener("click", function () {
    location.reload();
  });
};

main();
