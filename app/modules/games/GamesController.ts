import {CustomFirebaseObject} from "../../models/CustomFirebaseObject";
import {Play} from "../../models/Play";
/**
 * The games controller for the app.
 */
export class GamesController {

    public gamesByWeek:any = {};
    private loading:boolean;

    constructor($firebaseArray: AngularFireArrayService){
        "ngInject";

        this.loading = true;

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com/games');

        let games = $firebaseArray(dbRef);

        games.$loaded((data:AngularFireArray) => {
            this.loading = false;

            data.forEach((game) => {
                const week = game[0].week;
                const gameMeta = {
                    opponent: game[0].opponent,
                    id: game[0].week + '' + game[0].game,
                    score: {}
                };
                gameMeta.score = this.processScore(game);
                if(week in this.gamesByWeek){
                    this.gamesByWeek[week].push(gameMeta);
                } else {
                    this.gamesByWeek[week] = [gameMeta];
                }
            });
        });
    }

    private processScore(game):any {

        let homeScore: number = 0,
            oppScore: number = 0,
            result: string;

        game.forEach((play: Play) => {
            if(play.side === 'O'){
                if(play.score){
                    homeScore+=6;
                }
                if(play.conversion){
                    homeScore += parseInt(play.conversion, 10);
                }
            } else {
                if(play.score){
                    if(play.intercepted){
                        homeScore+=6;
                    } else {
                        oppScore+=6;
                    }
                }
                if(play.conversion){
                    oppScore += parseInt(play.conversion, 10);
                }
            }
        });
        if(homeScore > oppScore){
            result = 'W';
        } else if (homeScore < oppScore){
            result = 'L';
        } else {
            result = 'D';
        }
        return {homeScore, oppScore, result}

    }
}