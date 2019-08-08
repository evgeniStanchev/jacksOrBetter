///<reference path="../views/GambleButtonView.ts"/>

namespace controllers {
    import GambleButtonView = views.GambleButtonView;

    export class GambleButtonController extends Pluck.ViewController {
        constructor() {
            super(new GambleButtonView());
        }
    }
}
