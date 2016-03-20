import {Play} from "../../models/Play";
import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
/**
 * The overview controller for the app.
 */
export class OverviewController {
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
    public loading: boolean;
    private players = {};
    private playersArray = [];

    constructor($firebaseObject: AngularFireObjectService){
        "ngInject";

        this.loading = true;

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/');

        let plays: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        plays.$loaded((data: CustomFirebaseObject) => {

            data.players.forEach(player => {
                this.players[player.name] = {
                    tds: 0,
                    catches: 0,
                    drops: 0,
                    id: player.jerseyNumber,
                    deflags: 0,
                    sacks: 0,
                    defended: 0,
                    pickSix: 0,
                    interceptions: 0
                };
            });

            data.games.forEach((game: Play[]) => {
               this.processGame(game);
            });
            this.loading = false;

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
                if(play.completed && play.player){
                    this.players[play.player].catches++;
                }
                if(play.dropped){
                    this.players[play.player].drops++;
                }
                if(play.score){
                    homeScore+=6;
                    if(play.player){
                        this.players[play.player].tds++ ;
                    }
                }
                if(play.conversion){
                    homeScore += parseInt(play.conversion, 10);
                }
            } else {
                if(play.score){
                    if(play.intercepted){
                        homeScore+=6;
                        this.players[play.player].pickSix++;
                    } else {
                        oppScore+=6;
                    }
                }
                if(play.intercepted){
                    this.players[play.player].interceptions++;
                }
                if(play.flagged){
                    this.players[play.player].deflags++;
                }
                if(play.sack){
                    this.players[play.player].sacks++;
                }
                if(play.defended){
                    this.players[play.player].defended++;
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
            result: result,
            id: game[0].week + '' + game[0].game
        });

        this.playersArray = Object.keys(this.players).map(key => {return {name:key, data: this.players[key]}});

    }
}