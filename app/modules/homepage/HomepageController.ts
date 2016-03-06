import {HomeService} from "../../services/HomeService";
import {Play} from "../../models/Play";
import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
/**
 * The homepage controller for the app. The controller:
 * - display a <hello world> message
 */
export class HomepageController {
    public helloWorld: string;
    public componentMessage: string;
    public attemptedPasses = 0;
    public completedPasses = 0;
    public nbTD = 0;

    constructor($firebaseObject: AngularFireObjectService, HomeService: HomeService){
        "ngInject";

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/');

        let plays: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        plays.$loaded((data: CustomFirebaseObject) => {
            this.processQBStats(data.plays);
        });

        this.helloWorld = HomeService.getData().message;
        this.componentMessage = 'Hello';
    }

    private processQBStats(gameData:Play[]):void {
        gameData.forEach((play: Play) => {
            if(play.side === "O" && play.play_type === "P"){
                this.attemptedPasses++;
                if(play.completed){
                    this.completedPasses++;
                }
                if(play.score){
                    this.nbTD++;
                }
            }
        });
    };
}