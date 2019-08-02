///<reference path="../views/BetButtonsView.ts"/>

namespace controllers {
    import BetButtonsView = views.BetButtonsView;

    export class ButtonsController extends Pluck.ViewController {
        constructor() {
            super(new BetButtonsView());
        }

    }
}
