"use strict";

import Stats from "./classes/Stats.js";

import { renderLetters, hangmanImage, showMessage } from "./dom/render.js";

import { fetchRandomWord, hasWon } from "./game/utils.js";

import {
  buttons,
  playAgainBtn,
  underScor,
  hmClass,
  msgClass,
  winsClass,
  lossesClass,
} from "./dom/elements.js";

// Async function
let guessedList = [];

let hangmanIterator = 0;

let gameOver = false;

const updateScoreboard = () => {
  showMessage(winsClass, `Wins : ${Stats.wins}`);
  showMessage(lossesClass, `Losses : ${Stats.losses}`);
};

const initialiseGame = (randomWord) => {
  renderLetters(randomWord, guessedList, underScor);
  showMessage(msgClass, "Hangman Game!");
};

const handleGuess = (btn, randomWord) => {
  if (gameOver) return;

  const guessedLetter = btn.textContent;

  btn.disabled = true;
  guessedList.push(guessedLetter);

  if (!randomWord.includes(guessedLetter)) {
    hangmanIterator++;

    if (hangmanIterator <= 10) {
      hangmanImage(hmClass, hangmanIterator);
    }

    if (hangmanIterator >= 10) {
      gameOver = true;
      Stats.recordLoss(randomWord.join(""));
      updateScoreboard();
      showMessage(msgClass, "You lost!");
      return;
    }
  }

  renderLetters(randomWord, guessedList, underScor);

  if (hasWon(randomWord, guessedList)) {
    gameOver = true;
    Stats.recordWin(randomWord.join(""));
    updateScoreboard();
    showMessage(msgClass, "You Won!");
  }
};

const setupKeyboard = (randomWord) => {
  for (const btn of buttons) {
    btn.addEventListener("click", () => handleGuess(btn, randomWord));
  }
};

const setupPlayAgain = () => {
  playAgainBtn.addEventListener("click", () => location.reload());
};

const startGame = async () => {
  Stats.load();
  updateScoreboard();

  const randomWord = await fetchRandomWord("./assets/example-words.json");

  initialiseGame(randomWord);

  setupKeyboard(randomWord);
  setupPlayAgain();
};

startGame();
