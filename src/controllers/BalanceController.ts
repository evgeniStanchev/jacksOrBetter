///<reference path="../views/BalanceView.ts"/>
namespace controllers{

    import BalanceView = views.BalanceView;

    export class BalanceController extends Pluck.ViewController{

        constructor(){
            super(new BalanceView());
            
        }

    }

}