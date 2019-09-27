///<reference path="../types/combination.ts"/>

namespace server {
    import combination = server.combination;

    export class CardsUtils {
        public static hasWin(card: number[]) {
            return (
                this.onePairOfJacksOrBetter(card) ||
                this.twoPair(card) ||
                this.threeOfAKind(card)||
                this.straight(card) ||
                this.flush(card)
            );
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
            const firstCase: boolean =
                sortedRanks[0] == sortedRanks[1] &&
                sortedRanks[1] == sortedRanks[2] &&
                sortedRanks[2] == sortedRanks[3];
            //yxxxx
            const secondCase: boolean =
                sortedRanks[1] == sortedRanks[2] &&
                sortedRanks[2] == sortedRanks[3] &&
                sortedRanks[3] == sortedRanks[4];
            return firstCase || secondCase;
        }

        public static fullHouse(card: number[]): boolean {
            const ranks = this.getRanks(card);
            const sortedRanks = ranks.sort();
            //xxyyy
            const firstCase: boolean =
                sortedRanks[0] == sortedRanks[1] &&
                sortedRanks[2] == sortedRanks[3] &&
                sortedRanks[3] == sortedRanks[4];
            //xxxyy
            const secondCase: boolean =
                sortedRanks[0] == sortedRanks[1] &&
                sortedRanks[1] == sortedRanks[2] &&
                sortedRanks[3] == sortedRanks[4];
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
            const ranks = this.getRanks(card);
            const sortedRanks = ranks.sort();
            if (sortedRanks[0] == 0) {
                //10 J Q K A
                if (sortedRanks[1] == 10 && sortedRanks[2] == 11 && sortedRanks[3] == 12 && sortedRanks[4] == 13) {
                    return true;
                }
                //A 2 3 4 5
                if (sortedRanks[1] == 1 && sortedRanks[2] == 2 && sortedRanks[3] == 3 && sortedRanks[4] == 4) {
                    return true;
                }
            } else {
                //abcde
                if (
                    sortedRanks[0] == sortedRanks[1] - 1 &&
                    sortedRanks[1] == sortedRanks[2] - 1 &&
                    sortedRanks[2] == sortedRanks[3] - 1 &&
                    sortedRanks[3] == sortedRanks[4] - 1
                ) {
                    return true;
                }
            }
            return false;
        }

        public static threeOfAKind(card: number[]): boolean {
            const ranks = this.getRanks(card);
            const sortedRanks = ranks.sort();
            //xxx**
            const firstCase = sortedRanks[0] == sortedRanks[1] && sortedRanks[1] == sortedRanks[2];
            //*xxx*
            const secondCase = sortedRanks[1] == sortedRanks[2] && sortedRanks[2] == sortedRanks[3];
            //**xxx
            const thirdCase = sortedRanks[2] == sortedRanks[3] && sortedRanks[3] == sortedRanks[4];
            return firstCase || secondCase || thirdCase;
        }

        public static twoPair(card: number[]): boolean {
            const ranks = this.getRanks(card);
            const sortedRanks = ranks.sort();
            //xxyy*
            const firstCase = sortedRanks[0] == sortedRanks[1] && sortedRanks[2] == sortedRanks[3];
            //xx*yy
            const secondCase = sortedRanks[0] == sortedRanks[1] && sortedRanks[3] == sortedRanks[4];
            //*xxyy
            const thirdCase = sortedRanks[1] == sortedRanks[2] && sortedRanks[3] == sortedRanks[4];
            return firstCase || secondCase || thirdCase;
        }

        public static onePairOfJacksOrBetter(card: number[]): boolean {
            const ranks = this.getRanks(card);
            const sortedRanks = ranks.sort();
            //xx***
            const firstCase = sortedRanks[0] == sortedRanks[1] && (sortedRanks[0] == 0 || sortedRanks[0] >= 10);
            //*xx**
            const secondCase = sortedRanks[1] == sortedRanks[2] && (sortedRanks[1] == 0 || sortedRanks[1] >= 10);
            //**xx*
            const thirdCase = sortedRanks[2] == sortedRanks[3] && (sortedRanks[2] == 0 || sortedRanks[2] >= 10);
            //***xx
            const forthCase = sortedRanks[3] == sortedRanks[4] && (sortedRanks[3] == 0 || sortedRanks[3] >= 10);
            return firstCase || secondCase || thirdCase || forthCase;
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
