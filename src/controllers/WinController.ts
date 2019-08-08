///<reference path="../views/WinView.ts"/>

namespace controllers {
    import WinView = views.WinView;

    export class WinController extends Pluck.ViewController {
        constructor() {
            super(new WinView());
        }
    }
}
