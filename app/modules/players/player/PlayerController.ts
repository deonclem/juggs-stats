import {CustomFirebaseObject} from "../../../models/CustomFirebaseObject";
import {Play} from "../../../models/Play";
import {Player} from "../../../models/Player";
/**
 * The overview controller for the app.
 */
export class PlayerController {
    public loading: boolean;
    public player: Player;
    public plays: Play[] = [];

    constructor($scope: ng.IScope, $stateParams: ng.ui.IStateParamsService, $timeout:ng.ITimeoutService){
        "ngInject";

        this.loading = true;

        let playersDB:Firebase = new Firebase('https://juggs-stats.firebaseio.com/players');

        playersDB // select player where jerseyNumber = stateParams.id
            .orderByChild("jerseyNumber")
            .startAt(parseInt($stateParams['id'],10))
            .endAt(parseInt($stateParams['id'],10))
            .once('value', (snap) => {
                var snapVal = snap.val();
                if(typeof snapVal === 'object'){
                    for(var i in snapVal){
                        this.player = snapVal[i];
                    }
                } else {
                    this.player = snapVal[0];
                }

                let playsDB:Firebase = new Firebase('https://juggs-stats.firebaseio.com/plays');

                playsDB // select player where jerseyNumber = stateParams.id
                    .orderByChild("player")
                    .startAt(this.player.name)
                    .endAt(this.player.name)
                    .once('value', (snap) => {
                        var snapVal = snap.val();
                        console.log(snapVal);
                        $timeout(() =>{
                            for(var i in snapVal){
                                this.plays.push(snapVal[i]);
                                console.log(angular.copy(this.plays));
                            }
                        }, 0);

                    });
                $timeout(() => {
                    this.loading = false;
                }, 0);
            });
    }
}