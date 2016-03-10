import {Play} from "../../../models/Play";
import {CustomFirebaseObject} from "../../../models/CustomFirebaseObject";
/**
 * The games controller for the app.
 */
export class GameController {

    public game: Play[];
    public opponent: string;
    public gameStats: any;
    private loading:boolean;
    private players = {};
    private playersArray = [];
    private plays = {};
    private playsArray = [];

    constructor($firebaseObject: AngularFireObjectService, $stateParams: ng.ui.IStateParamsService){
        "ngInject";

        this.loading = true;

        let gameId = {
            week: $stateParams['gameId'].charAt(0),
            game: $stateParams['gameId'].charAt(1)
        };

        let dbRef:Firebase = new Firebase('https://juggs-stats.firebaseio.com');

        let game: CustomFirebaseObject = <CustomFirebaseObject>$firebaseObject(dbRef);

        game.$loaded((data: CustomFirebaseObject) => {

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

            let found = false, i = 0;
            while(!found){
                if(data.games[i][0].week === gameId.week && data.games[i][0].game === gameId.game){
                    this.game = data.games[i];
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
                //let completePlay = play.play_formation + ' ' + play.play_routes;
                let completePlay = play.play_routes;
                if(completePlay in this.plays && play.video_id){
                    this.plays[completePlay].count++;
                } else {
                    this.plays[completePlay] = {count:1,td:0,catches:0,drops:0,incomplete:0,interceptions:0};
                }
                if(play.completed && play.player){
                    this.plays[completePlay].catches++;
                    this.players[play.player].catches++;
                }
                if(play.dropped){
                    this.plays[completePlay].drops++;
                    this.players[play.player].drops++;
                }
                if(play.score){
                    homeScore+=6;
                    this.plays[completePlay].td++;
                    if(play.player){
                        this.players[play.player].tds++;
                    }
                }
                if(play.incomplete){
                    this.plays[completePlay].incomplete++;
                }
                if(play.intercepted){
                    this.plays[completePlay].interceptions++;
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
        this.playersArray = Object.keys(this.players).map(key => {return {name:key, data: this.players[key]}});
        this.playsArray = Object.keys(this.plays).map(key => {return {play:key, data: this.plays[key]}});
        return {
            result : {homeScore, oppScore, result: homeScore > oppScore ? 'W' : oppScore > homeScore ? 'L' : 'D'}
        }
    }
}