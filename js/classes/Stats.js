export default class Stats {
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
