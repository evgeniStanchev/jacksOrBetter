///<reference path="../types/combination.ts"/>

namespace server {
  import combination = poker.combination;

  export class CardsUtils {
    private static sortAsNumbers = function(a: number, b: number) {
      return a - b;
    };

    public static hasWin(card: number[]) {
      return (
        this.onePairOfJacksOrBetter(card) ||
        this.twoPair(card) ||
        this.threeOfAKind(card) ||
        this.straight(card) ||
        this.flush(card)
      );
    }

    public static getWinIndexes(combination: combination, card: number[]) {
      switch (combination) {
        case "four of a kind": {
          const winIndexes = this.spliceOneExclusiveIndex(card);
          return winIndexes;
        }
        case "three of a kind": {
          const winIndexes = this.spliceTwoExclusiveIndexes(card);
          return winIndexes;
        }
        case "two pair": {
          const winIndexes = this.spliceOneExclusiveIndex(card);
          return winIndexes;
        }
        case "one pair of jacks or better": {
          const winIndexes = this.spliceThreeExclusiveIndexes(card);
          return winIndexes;
        }
        default: {
          return [0, 1, 2, 3, 4];
        }
      }
    }

    private static spliceThreeExclusiveIndexes(card: number[]): number[] {
      const winIndexes = [0, 1, 2, 3, 4];
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort(this.sortAsNumbers);
      let pairsRank : number;
      for(let index=0; index< sortedRanks.length - 1;index++){
        if(sortedRanks[index] == sortedRanks[index+1]){
          pairsRank = sortedRanks[index];
          break;
        }
      }
      let deletedIndexes = 0;
      for(let index = 0; index< card.length;index++){
        if(this.getRank(card[index]) != pairsRank){
          winIndexes.splice(index - deletedIndexes++, 1);
        }
      }
      return winIndexes;
    }

    private static spliceTwoExclusiveIndexes(card: number[]): number[] {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort(this.sortAsNumbers);
      const winIndexes = [0, 1, 2, 3, 4];
      let deletedIndexes = 0;

      for (const currentCard of card) {
        const currentRank = this.getRank(currentCard);
        if (currentRank != sortedRanks[2]) {
          winIndexes.splice(card.indexOf(currentCard) - deletedIndexes++, 1);
        }
      }
      return winIndexes;
    }

    private static spliceOneExclusiveIndex(card: number[]): number[] {
      const ranks = this.getRanks(card);
      const winIndexes = [0, 1, 2, 3, 4];
      let exclusiveCard = 0;
      for (const currentCard of ranks) {
        exclusiveCard ^= currentCard;
      }
      winIndexes.splice(card.indexOf(exclusiveCard), 1);
      return winIndexes;
    }

    public static royalFlush(card: number[]): boolean {
      return this.flush(card) && this.straight(card) && this.hasAce(card);
    }

    public static straightFlush(card: number[]): boolean {
      return this.flush(card) && this.straight(card);
    }

    public static getCombination(card: number[]): combination {
      if (this.royalFlush(card)) {
        return "royal flush";
      }
      if (this.straightFlush(card)) {
        return "straight flush";
      }
      if (this.fourOfAKind(card)) {
        return "four of a kind";
      }
      if (this.fullHouse(card)) {
        return "full house";
      }
      if (this.flush(card)) {
        return "flush";
      }
      if (this.straight(card)) {
        return "straight";
      }
      if (this.threeOfAKind(card)) {
        return "three of a kind";
      }
      if (this.twoPair(card)) {
        return "two pair";
      }
      if (this.onePairOfJacksOrBetter(card)) {
        return "one pair of jacks or better";
      }
      return null;
    }

    public static fourOfAKind(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort();
      //xxxxy
      const firstCase = this.isFourOfAKind(
        sortedRanks[0],
        sortedRanks[1],
        sortedRanks[2],
        sortedRanks[3]
      );
      //yxxxx
      const secondCase = this.isFourOfAKind(
        sortedRanks[1],
        sortedRanks[2],
        sortedRanks[3],
        sortedRanks[4]
      );
      return firstCase || secondCase;
    }

    private static isFourOfAKind(
      card1Rank: number,
      card2Rank: number,
      card3Rank: number,
      card4Rank: number
    ): boolean {
      return (
        card1Rank == card2Rank &&
        card2Rank == card3Rank &&
        card3Rank == card4Rank
      );
    }

    public static fullHouse(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort();
      //xxyyy
      const firstCase =
        this.isPair(sortedRanks[0], sortedRanks[1]) &&
        this.isThreeOfAKind(sortedRanks[2], sortedRanks[3], sortedRanks[4]);
      //xxxyy
      const secondCase =
        this.isThreeOfAKind(sortedRanks[0], sortedRanks[1], sortedRanks[2]) &&
        this.isPair(sortedRanks[3], sortedRanks[4]);
      return firstCase || secondCase;
    }

    public static flush(card: number[]): boolean {
      const suits = this.getSuits(card);
      const sortedSuits = suits.sort();
      if (sortedSuits[0] == sortedSuits[suits.length - 1]) {
        return true;
      }
      return false;
    }

    public static straight(card: number[]): boolean {
      return this.isNormalStraight(card) || this.isBigStraight(card);
    }

    //abcde
    private static isNormalStraight(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort(this.sortAsNumbers);
      return (
        sortedRanks[0] == sortedRanks[1] - 1 &&
        sortedRanks[1] == sortedRanks[2] - 1 &&
        sortedRanks[2] == sortedRanks[3] - 1 &&
        sortedRanks[3] == sortedRanks[4] - 1
      );
    }

    private static isBigStraight(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort(this.sortAsNumbers);
      return (
        sortedRanks[0] == 0 &&
        sortedRanks[1] == 10 &&
        sortedRanks[2] == 11 &&
        sortedRanks[3] == 12 &&
        sortedRanks[4] == 13
      );
    }

    public static threeOfAKind(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort();
      //xxx**
      const firstCase = this.isThreeOfAKind(
        sortedRanks[0],
        sortedRanks[1],
        sortedRanks[2]
      );
      //*xxx*
      const secondCase = this.isThreeOfAKind(
        sortedRanks[1],
        sortedRanks[2],
        sortedRanks[3]
      );
      //**xxx
      const thirdCase = this.isThreeOfAKind(
        sortedRanks[2],
        sortedRanks[3],
        sortedRanks[4]
      );
      return firstCase || secondCase || thirdCase;
    }

    private static isThreeOfAKind(
      card1Rank: number,
      card2Rank: number,
      card3Rank: number
    ): boolean {
      return card1Rank == card2Rank && card2Rank == card3Rank;
    }

    public static twoPair(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort();
      //xxyy*
      const firstCase =
        this.isPair(sortedRanks[0], sortedRanks[1]) &&
        this.isPair(sortedRanks[2], sortedRanks[3]);
      //xx*yy
      const secondCase =
        this.isPair(sortedRanks[0], sortedRanks[1]) &&
        this.isPair(sortedRanks[3], sortedRanks[4]);
      //*xxyy
      const thirdCase =
        this.isPair(sortedRanks[1], sortedRanks[2]) &&
        this.isPair(sortedRanks[3], sortedRanks[4]);
      return firstCase || secondCase || thirdCase;
    }

    private static isPair(card1Rank: number, card2Rank: number): boolean {
      return card1Rank == card2Rank;
    }

    public static onePairOfJacksOrBetter(card: number[]): boolean {
      const ranks = this.getRanks(card);
      const sortedRanks = ranks.sort();
      // xx***
      const firstCase = this.isPairJacksOrBetter(
        sortedRanks[0],
        sortedRanks[1]
      );
      //*xx**
      const secondCase = this.isPairJacksOrBetter(
        sortedRanks[1],
        sortedRanks[2]
      );
      //**xx*
      const thirdCase = this.isPairJacksOrBetter(
        sortedRanks[2],
        sortedRanks[3]
      );
      //***xx
      const forthCase = this.isPairJacksOrBetter(
        sortedRanks[3],
        sortedRanks[4]
      );
      return firstCase || secondCase || thirdCase || forthCase;
    }

    private static isPairJacksOrBetter(
      card1Rank: number,
      card2Rank: number
    ): boolean {
      return card1Rank == card2Rank && (card2Rank == 0 || card1Rank >= 10);
    }

    public static getSuit(card: number): number {
      return Math.floor(card / 13);
    }

    public static getRank(card: number): number {
      return card % 13;
    }

    public static getSuits(card: number[]): number[] {
      const suits = [];
      for (const currentCard of card) {
        suits.push(this.getSuit(currentCard));
      }
      return suits;
    }

    public static getRanks(card: number[]): number[] {
      const ranks = [];
      for (const currentCard of card) {
        ranks.push(this.getRank(currentCard));
      }
      return ranks;
    }

    public static hasAce(cards: number[]): boolean {
      for (const card of cards) {
        if (this.getRank(card) == 0) {
          return true;
        }
      }
      return false;
    }
  }
}
