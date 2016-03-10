import {Play} from "../../../models/Play";
/**
 * The games controller for the app.
 */
export class GameController {

    public game: Play[];
    public opponent: string;
    public gameStats: any;
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
            this.gameStats = this.computeStats(this.game);
            this.gameStats.meta = gameId;
            this.loading = false;
        });
    }

    private computeStats(game : Play[]):any {
        let homeScore = 0;
        let oppScore = 0;

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
        return {
            result : {homeScore, oppScore, result: homeScore > oppScore ? 'W' : oppScore > homeScore ? 'L' : 'D'}
        }
    }
}