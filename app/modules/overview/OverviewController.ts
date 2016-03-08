import {Play} from "../../models/Play";
import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
/**
 * The overview controller for the app.
 */
export class OverviewController {
    public loaded: boolean;
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
    private scorers = {};
    private scorersArray = [];

    constructor($firebaseObject: AngularFireObjectService){
        "ngInject";

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/');

        let plays: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        plays.$loaded((data: CustomFirebaseObject) => {
            //data.plays.forEach((play: Play) => {
            //    this.gameNumber = parseInt(play.game,10);
            //    this.processQBStats(play);
            //});

            data.players.forEach(player => {
                this.scorers[player.name] = {
                    tds: 0,
                    catches: 0,
                    drops: 0
                };
            });

            data.games.forEach((game: Play[]) => {
               this.processGame(game);
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

    private processGame(game:Play[]):void {
        let homeScore = 0, oppScore = 0;
        let opponent = game[0].opponent;
        let result: string;
        game.forEach((play: Play) => {
            if(play.side === 'O'){
                if(play.completed){
                    this.scorers[play.player].catches++;
                }
                if(play.dropped){
                    this.scorers[play.player].drops++;
                }
                if(play.score){
                    homeScore+=6;
                    this.scorers[play.player].tds++ ;
                }
                if(play.conversion){
                    homeScore += parseInt(play.conversion, 10);
                }
            } else {
                if(play.score){
                    oppScore+=6;
                }
                if(play.conversion){
                    oppScore += parseInt(play.conversion, 10);
                }
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
        });

        this.scorersArray = Object.keys(this.scorers).map(key => {return {name:key, data: this.scorers[key]}});

    }
}