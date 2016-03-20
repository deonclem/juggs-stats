import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
import {Player} from "../../models/Player";
/**
 * The overview controller for the app.
 */
export class PlayersController {
    public loading: boolean;
    public players: Player[];

    constructor($firebaseArray: AngularFireArrayService){
        "ngInject";

        this.loading = true;

        let playersDB:Firebase = new Firebase('https://juggs-stats.firebaseio.com/players');

        let players = $firebaseArray(playersDB);

        players.$loaded((data: any) => {
            this.players = data;
            this.loading = false;
        })
    }
}