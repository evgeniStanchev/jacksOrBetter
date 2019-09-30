///<reference path="../types/state.ts"/>
///<reference path="../Main.ts"/>
///<reference path="../server/CardsUtils.ts"/>
///<reference path="../types/combination.ts"/>
namespace server {
  import Main = poker.Main;
  import state = poker.state;
  import CardsUtils = server.CardsUtils;
  import combination = poker.combination;
  export class Server {
    private readonly _requestDeal = "requestDeal";
    private readonly _requestDraw = "requestDraw";
    private readonly _requestCollect = "requestCollect";
    private readonly _resourceLoaded = "resources loaded";
    private readonly _prices = new Map<combination, number>();
    private readonly _facade: Main;
    private _state: state;
    private _balance: number;
    private _cards: number[];
    private _winCardsIndexes: number[];
    private _bet: number;
    private _winCombination: combination;

    constructor(facade: Main, balance: number) {
      this._cards = [];
      this._winCardsIndexes = [];
      this._balance = balance;
      this._facade = facade;
      this._state = "Init";
      this.setPrices();
      this._facade.on(this._requestDeal, this.requestDeal, this);
      this._facade.on(this._requestDraw, this.requestDraw, this);
      this._facade.on(this._requestCollect, this.requestCollect, this);
      this._facade.on(this._resourceLoaded, this.setBalance, this);
    }

    private requestDeal(request: { bet: number }) {
      if (this._state == "Deal") {
        this._bet = request.bet;
        if (this._balance >= request.bet) {
          this.setRandomCards([0, 1, 2, 3, 4]);
          this._balance -= request.bet;
          this._facade.data = {
            state: this._state,
            balance: this._balance,
            cards: this._cards
          };
          this.changeState("Draw");
          console.log("SERVER: Deal was successfull.");
        } else {
          console.error("You dont have enough balance");
        }
      } else {
        console.error(
          "To Deal You must be in Deal state. Your state now is " + this._state
        );
      }
    }

    private setPrices(): void {
      this._prices.set("one pair of jacks or better", 1);
      this._prices.set("two pair", 2);
      this._prices.set("three of a kind", 3);
      this._prices.set("straight", 4);
      this._prices.set("flush", 5);
      this._prices.set("full house", 9);
      this._prices.set("four of a kind", 25);
      this._prices.set("straight flush", 50);
      this._prices.set("royal flush", 250);
    }

    private requestDraw(indexes: number[]) {
      if (this._state == "Draw") {
        // this.setRandomCards(indexes);
        //TODO this combination doesnt work 
        this.setSelectedCards([48, 16, 47, 29, 22]);
        this._state = "Collect";
        this._facade.data = {
          state: "Draw",
          cards: this._cards
        };
      } else {
        console.log("You cannot draw if your state is not Draw");
      }
      console.log("SERVER: Draw was successfull.");
    }

    private requestCollect(): void {
      if (this._state == "Collect") {
        let winAmount = 0;
        if (CardsUtils.hasWin(this._cards)) {
          this._winCombination = CardsUtils.getCombination(this._cards);
          this._winCardsIndexes = CardsUtils.getWinIndexes(
            this._winCombination,
            this._cards
          );
          winAmount = this._prices.get(this._winCombination) * this._bet;
        }
        this._balance += winAmount;
        this._facade.data = {
          state: this._state,
          balance: this._balance,
          winAmount: winAmount,
          winCombination: this._winCombination,
          winCardsIndexes: this._winCardsIndexes
        };
        console.log;
      } else {
        console.error(
          "To Collect You must be in Collect state. Your state now is " +
            this._state
        );
      }
      console.log("Collecting started successfully");
      this.restartValues();
      this._state = "Deal";
    }

    private restartValues(): void {
      this._winCardsIndexes = [];
    }

    private setSelectedCards(indexes: number[]): void {
      this._cards[0] = indexes[0];
      this._cards[1] = indexes[1];
      this._cards[2] = indexes[2];
      this._cards[3] = indexes[3];
      this._cards[4] = indexes[4];
    }

    private setRandomCards(indexes: number[]): void {
      for (const index of indexes) {
        let card: number;
        do {
          card = Math.floor(Math.random() * 52);
        } while (this.cardExists(card));
        this._cards[index] = card;
      }
    }

    private setBalance(): void {
      const data = {
        state: this._state,
        balance: this._balance
      };
      this._facade.data = data;
      this._state = "Deal";
    }

    private changeState(newState: state) {
      this._state = newState;
    }

    private cardExists(card: number): boolean {
      for (const currentCard of this._cards) {
        if (currentCard == card) {
          return true;
        }
      }
      return false;
    }
  }
}
