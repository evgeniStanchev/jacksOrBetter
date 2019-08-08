///<reference path="../views/BalanceView.ts"/>
namespace controllers {
    import BalanceView = views.BalanceView;

    export class BalanceController extends Pluck.ViewController {
        constructor() {
            //TODO balance must be received from server
            super(new BalanceView(5000));
        }
    }
}
