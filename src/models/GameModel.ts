namespace model {
  export class GameModel extends Pluck.Model {
    public balance: number = 50000;
    public cards: number[];

    constructor() {
      super();
    }
  }
}
