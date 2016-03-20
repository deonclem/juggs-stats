import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
import {Play} from "../../models/Play";
/**
 * The overview controller for the app.
 */
export class PlayerController {
    public loading: boolean;

    constructor($firebaseObject: AngularFireObjectService){
        "ngInject";

        this.loading = true;

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/');

        let plays: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        plays.$loaded((data: CustomFirebaseObject) => {

            data.games.forEach((game: Play[]) => {
                this.processGame(game);
            });

        });
    }

    private processGame(game:Play[]):void {

    }
}