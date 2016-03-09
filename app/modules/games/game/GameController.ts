import {Play} from "../../../models/Play";
/**
 * The games controller for the app.
 */
export class GameController {

    public game: Play[];
    public opponent: string;
    private loading:boolean;

    constructor($firebaseArray: AngularFireArrayService, $stateParams: ng.ui.IStateParamsService){
        "ngInject";

        this.loading = true;

        let gameId = {
            week: $stateParams['gameId'].charAt(0),
            game: $stateParams['gameId'].charAt(1)
        };

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/games');

        let game = $firebaseArray(dbRef);

        game.$loaded((data: any) => {
            let found = false, i = 0;
            while(!found){
                if(data[i][0].week === gameId.week && data[i][0].game === gameId.game){
                    this.game = data[i];
                    found = true
                }
                i++;
            }
            this.opponent = this.game[0].opponent;
            this.loading = false;
        });
    }

}