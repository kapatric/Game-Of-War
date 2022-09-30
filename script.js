class Card {
  constructor(suit, rank, score) {
    this.suit = suit;
    this.rank = rank;
    this.score = score;
  }
}

class Deck {
  constructor() {
    this.cards = [];
    this.deck();
    this.shuffle();
  }
  deck() {
    let cardSuit = ["hearts", "clubs", "spades", "diamonds"];
    let cardRank = [
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ];

    for (let i = 0; i < cardSuit.length; i++) {
      for (let j = 0; j < cardRank.length; j++) {
        this.cards.push(new Card(cardSuit[i], cardRank[j], j + 2));
      }
    }
    return this.cards;
  }

  shuffle() {
    let currentIndex = this.cards.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [this.cards[currentIndex], this.cards[randomIndex]] = [
        this.cards[randomIndex],
        this.cards[currentIndex],
      ];
    }

    return this.cards;
  }

  drawCard() {
    const randomCard =
      this.cards[Math.floor(Math.random() * this.cards.length)];
    return randomCard;
  }
}

class GameOfWar {
  constructor() {
    this.playerOne = [];
    this.playerTwo = [];
    this.pile = [];
    this.distribute();
  }

  distribute() {
    let completeDeck = new Deck();
    console.log(completeDeck.cards.length, "here") 
    for (let i = 0; i < completeDeck.cards.length / 2; i++) {
      this.playerOne.push(completeDeck.cards[i]);
      this.playerTwo.push(
        completeDeck.cards[completeDeck.cards.length - i - 1]
      );
    }
  }

  startGame() {
    while (this.playerOne.length > 0 && this.playerTwo.length > 0) {
      let p1card = this.playerOne.pop();
      let p2card = this.playerTwo.pop();
      if (p1card.score > p2card.score) {
        console.log(p1card.score, p2card.score)
       // console.log(`${player.name} :`)
        this.playerOne.unshift(p1card, p2card, ...this.pile);
        this.pile.length = 0;
      } else if (p1card.score < p2card.score) {
         console.log(p1card.score,p2card.score)
        this.playerTwo.unshift(p1card, p2card, ...this.pile);
        this.pile.length = 0;
      } else {
        //console.log("It's War!")
        p2card.score == p1card.score;
        this.War(p1card, p2card);
      }
     
    }
    if (this.playerOne.length <= 0) {
      console.log("Player 2 Wins!", this.playerTwo.length);
    } else {
      console.log("Player 1 Wins", this.playerOne.length);
    }
    
    
  }

  
  War(c1, c2) {
    this.pile.push(c1, c2);

    if (this.playerOne.length >= 4 && this.playerTwo.length >= 4) {
      let p1war = this.playerOne.splice(this.playerOne.length - 3, 3); //pushing war cards
      let p2war = this.playerTwo.splice(this.playerTwo.length - 3, 3); //pushing war cards
      this.pile.push(...p1war, ...p2war);
    } else if (this.playerOne.length >= 4 && this.playerTwo.length < 4) {
      this.playerOne.unshift(...this.pile);
      this.playerOne.unshift(...this.playerTwo);
      this.pile.length = 0
      this.playerTwo.length = 0
    } else {
      this.playerTwo.unshift(...this.pile);
      this.playerTwo.unshift(...this.playerOne);
      this.pile.length = 0
      this.playerOne.length = 0
    }
  } 
}



let game = new GameOfWar();
game.startGame();

