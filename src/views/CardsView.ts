///<reference path="../types/rank.ts"/>
///<reference path="../types/suit.ts"/>
///<reference path="../Message.ts"/>
namespace views {
  import Rank = poker.rank;
  import Suit = poker.suit;
  import Message = poker.Message;
  export class CardsView extends PIXI.Container {
    public static readonly COUNT = 5;
    public static readonly DISTANCE_BETWEEN = 10;

    private readonly _x = 90;
    private readonly _y = 335;

    private _cards: Card[];
    private _speed: number = 1;

    constructor() {
      super();
      this._cards = [];
      this.createNewCards();
    }

    public get cards(): Card[] {
      return this._cards;
    }

    public getUnholdedCardIndexes(): number[] {
      const unholdedCardIndexes = [];
      for (const card of this._cards) {
        if (!card.isHeld) {
          unholdedCardIndexes.push(this._cards.indexOf(card));
        }
      }
      return unholdedCardIndexes;
    }

    public set revealSpeed(val: number) {
      this._speed = val;
    }

    public setCardsRanksAndSuits(v: number[]): void {
      console.log(v);
      for (let index = 0; index < v.length; index++) {
        this._cards[index].setSuitAndRank(
          this.getRank(v[index]),
          this.getSuit(v[index])
        );
      }
    }

    //TODO Use TimelineMax
    public revealCards(): void {
      this.emit(Message.cardsStartReveiling);
      for (const card of this._cards) {
        if (!card.isHeld) {
          setTimeout(() => {
            card.reveal();
          }, 100 * this.cards.indexOf(card));
        }
      }
      setTimeout(() => {
        this.emit(Message.cardsEndReveiling);
      }, 100 * this.cards.length);
    }

    public hideCards(): void {
      for (const card of this._cards) {
        if (!card.isHeld) {
          card.hide();
        }
      }
    }

    public startInteractivity(): void {
      for (const card of this._cards) {
        card.interactive = true;
      }
    }

    public stopInteractivity(): void {
      for (const card of this._cards) {
        card.interactive = false;
      }
    }

    public holdCard(index: number): void {
      this._cards[index].hold();
    }

    public releaseCard(index: number): void {
      this._cards[index].release();
    }

    public releaseAllCards(): void {
      for (const card of this._cards) {
        card.release();
      }
    }

    private createNewCards(): void {
      for (let index = 0; index < CardsView.COUNT; index++) {
        const newCard = new Card();
        newCard.x = this._x;
        newCard.x += index * (newCard.width + CardsView.DISTANCE_BETWEEN);
        newCard.y = this._y;
        newCard.buttonMode = true;
        this._cards.push(newCard);
        this.addChild(newCard);
      }
    }

    public setWinningCards(indexes : number[]):void{
      for(const index of indexes){
        this._cards[index].win();
      }
    }

    private getRank(card: number): Rank {
      const rank = card % 13;
      switch (rank) {
        case 0: {
          return "A";
        }
        case 1: {
          return "2";
        }
        case 2: {
          return "3";
        }
        case 3: {
          return "4";
        }
        case 4: {
          return "5";
        }
        case 5: {
          return "6";
        }
        case 6: {
          return "7";
        }
        case 7: {
          return "8";
        }
        case 8: {
          return "9";
        }
        case 9: {
          return "10";
        }
        case 10: {
          return "J";
        }
        case 11: {
          return "Q";
        }
        case 12: {
          return "K";
        }
      }
    }

    private getSuit(card: number): Suit {
      const suit = Math.floor(card / 13);
      switch (suit) {
        case 0: {
          return "C";
        }
        case 1: {
          return "D";
        }
        case 2: {
          return "H";
        }
        case 3: {
          return "S";
        }
      }
    }
  }
}
