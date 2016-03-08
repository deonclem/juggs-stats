import {Play} from "../../models/Play";
import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
/**
 * The overview controller for the app. The controller:
 * - display a <hello world> message
 */
export class OverviewController {
    public loaded: boolean;
    public componentMessage: string;
    public attemptedPasses = 0;
    public completedPasses = 0;
    public nbTD = 0;
    public totalPointsFor = 0;
    public totalPointsAgainst = 0;
    public record:any = {
        wins: 0,
        losses: 0,
        draws: 0
    };
    public games:any[] = [];

    private gameNumber = 0;

    constructor($firebaseObject: AngularFireObjectService){
        "ngInject";

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/');

        let plays: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        plays.$loaded((data: CustomFirebaseObject) => {
            //data.plays.forEach((play: Play) => {
            //    this.gameNumber = parseInt(play.game,10);
            //    this.processQBStats(play);
            //});

            data.games.forEach((game: Play[]) => {
               this.processRecord(game);
            });
            this.loaded = true;

        });
    }

    private processQBStats(play: Play):void {
        if(play.side === "O" && play.play_type === "P"){
            this.attemptedPasses++;
            if(play.completed){
                this.completedPasses++;
            }
            if(play.score){
                this.nbTD++;
            }
        }
    };

    private processRecord(game:Play[]):void {
        let homeScore = 0, oppScore = 0;
        let opponent = game[0].opponent;
        let result: string;
        game.forEach((play: Play) => {
            if(play.score && play.side === 'O'){
                homeScore+=6;
            }
            if(play.score && play.side === 'D'){
                oppScore+=6;
            }
            if(play.conversion && play.side === 'O'){
                homeScore += parseInt(play.conversion, 10);
            }
            if(play.conversion && play.side === 'D'){
                oppScore += parseInt(play.conversion, 10);
            }
        });
        this.totalPointsFor += homeScore;
        this.totalPointsAgainst += oppScore;
        if(homeScore > oppScore){
            this.record.wins++;
            result = 'W';
        } else if (homeScore < oppScore){
            this.record.losses++;
            result = 'L';
        } else {
            this.record.draws++;
            result = 'D';
        }
        this.games.push({
            opponent: opponent,
            homeScore: homeScore,
            oppScore: oppScore,
            result: result
        })
    }
}