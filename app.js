"use strict";

// Loading random word from json list
const loadList = async function (path) {
  const response = await fetch(path);
  const array = await response.json();
  return array;
};

const wordList = await loadList("./assets/example-words.json");

const randWord = function (arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const randomItem = arr[randomIndex];
  const word = randomItem.toLowerCase().split("");
  return word;
};

const word = randWord(wordList);

const guessed = [];

// DOM
const container = document.querySelector(".main-container");

const buttons = document.querySelectorAll(".keyboard__btn");

const underScor = document.querySelector(".underscores");

const renderletters = (word, guessed, underScor) => {
  underScor.innerHTML = "";
  for (const character of word) {
    const span = document.createElement("span");
    if (guessed.includes(character)) {
      span.textContent = character;
    } else {
      span.textContent = "_";
    }
    underScor.append(span);
  }
};

renderletters(word, guessed, underScor);

for (const btn of buttons) {
  btn.addEventListener("click", function () {
    guessed.push(btn.textContent);
    renderletters(word, guessed, underScor);
    console.log(word, guessed);
  });
}
