"use strict";

class Stats {
  static wins = 0;
  static losses = 0;
  static wordsPlayed = [];

  constructor(playerName) {
    this.playerName = playerName;
  }

  static recordWin(word) {
    this.wins++;
    this.wordsPlayed.push(word);
    this.save();
  }

  static recordLoss(word) {
    this.losses++;
    this.wordsPlayed.push(word);
    this.save();
  }

  static save() {
    localStorage.setItem(
      "playerStats",
      JSON.stringify({
        wins: this.wins,
        losses: this.losses,
        wordsPlayed: this.wordsPlayed,
      }),
    );
  }

  static load() {
    const data = JSON.parse(localStorage.getItem("playerStats"));

    if (!data) return;
    this.wins = data.wins;
    this.losses = data.losses;
    this.wordsPlayed = data.wordsPlayed;
  }
}

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

let gameOver = false;

const main = async () => {
  Stats.load();
  showMessage(winsClass, `Wins : ${Stats.wins}`);
  showMessage(lossesClass, `Losses : ${Stats.losses}`);

  const jsonWords = await fetch("./assets/example-words.json");
  const arrayWords = await jsonWords.json();
  const randomWord = getRandomWord(arrayWords);

  renderletters(randomWord, guessedList, underScor);
  showMessage(msgClass, "Hangman Game!");

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

        if (hangmanIterator >= 10) {
          gameOver = true;
          Stats.recordLoss(randomWord.join(""));
          showMessage(lossesClass, `Losses : ${Stats.losses}`);
          showMessage(msgClass, "You lost!");
          return;
        }
      }

      renderletters(randomWord, guessedList, underScor);

      if (hasWon(randomWord, guessedList)) {
        gameOver = true;
        Stats.recordWin(randomWord.join(""));
        showMessage(winsClass, `Wins : ${Stats.wins}`);
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
