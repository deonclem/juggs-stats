import {Play} from "../../../models/Play";
import {Player} from "../../../models/Player";
/**
 * The overview controller for the app.
 */
export class PlayerController {
    public loading: boolean;
    public player: Player;
    public plays: Play[] = [];
    public qbStats: any = {complete:0,incomplete:0,tds:0,interceptions:0,conversions:0,sacked:0};
    public offenseStats: any = {catches:0,drops:0,catchTds:0,runTds:0,conversions:0,run:0};
    public defenseStats: any = {deflags:0,defended:0,interceptions:0,sacks:0,pickSix:0};
    public weeklyStats: any = {};
    public againstStats: any = {};
    public hasOffensiveStats: boolean;
    public hasDefensiveStats: boolean;
    public hasQbStats: boolean;

    constructor($stateParams: ng.ui.IStateParamsService, $timeout:ng.ITimeoutService){
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

                playsDB // select plays where player = player.name
                    .orderByChild("player")
                    .startAt(this.player.name)
                    .endAt(this.player.name)
                    .once('value', (snap) => {
                        var snapVal = snap.val();
                        $timeout(() =>{
                            for(var i in snapVal){
                                var play = snapVal[i];
                                if(play.side === 'O'){
                                    this.hasOffensiveStats = true;
                                    this.processOffenseStats(play);
                                }
                                if(play.side === 'D'){
                                    this.hasDefensiveStats = true;
                                    this.processDefenseStats(play);
                                }
                                this.processWeeklyStats(play);
                                this.processAgainstStats(play);
                                this.plays.push(play);
                            }
                        }, 0);

                    });

                playsDB // select plays where quarterback = player.name
                    .orderByChild("quarterback")
                    .startAt(this.player.name)
                    .endAt(this.player.name)
                    .once('value', (snap) => {
                        var snapVal = snap.val();
                        $timeout(() =>{
                            for(var i in snapVal){
                                this.hasQbStats = true;
                                var play = snapVal[i];
                                this.processQBStats(play);
                                this.processWeeklyStats(play, true);
                                this.processAgainstStats(play, true);
                            }
                        }, 0);

                    });
                $timeout(() => {
                    this.loading = false;
                }, 0);
            });
    }

    private processQBStats(play: Play) {
        if(play.completed){
            this.qbStats.complete++;
        }
        if(play.dropped || play.incomplete || play.defended || play.intercepted){
            this.qbStats.incomplete++;
        }
        if(play.score){
            this.qbStats.tds++;
        }
        if(play.intercepted){
            this.qbStats.interceptions++;
        }
        if(play.conversion && play.conversion !== "0"){
            this.qbStats.conversions++;
        }
        if(play.sack){
            this.qbStats.sacked++;
        }
    }

    private processOffenseStats(play: Play) {
        if(play.completed){
            this.offenseStats.catches++;
        }
        if(play.dropped){
            this.offenseStats.drops++;
        }
        if(play.score && play.play_type === 'R'){
            this.offenseStats.runTds++;
        }
        if(play.score && play.play_type === 'P'){
            this.offenseStats.catchTds++;
        }
        if(play.conversion && play.conversion !== "0"){
            this.offenseStats.conversions++;
        }
        if(play.play_type === 'R'){
            this.offenseStats.run++;
        }
    }

    private processDefenseStats(play: Play) {
        if(play.flagged){
            this.defenseStats.deflags++;
        }
        if(play.defended){
            this.defenseStats.defended++;
        }
        if(play.intercepted){
            this.defenseStats.interceptions++;
        }
        if(play.sack){
            this.defenseStats.sacks++;
        }
        if(play.score){
            this.defenseStats.pickSix++;
        }
        
    }

    private processWeeklyStats(play: Play, isQb?:boolean) {
        if(angular.isUndefined(this.weeklyStats[play.week])){
            this.weeklyStats[play.week] = {
                Q_complete:0,Q_incomplete:0,Q_tds:0,Q_interceptions:0,Q_conversions:0,Q_sacked:0,
                O_catches:0,O_drops:0,O_catchTds:0,O_runTds:0,O_conversions:0,O_run:0,
                D_deflags:0,D_defended:0,D_interceptions:0,D_sacks:0,D_pickSix:0,
                weekNumber: play.week
            };
        }
        if(isQb){
            if(play.completed){
                this.weeklyStats[play.week].Q_complete++;
            }
            if(play.dropped || play.incomplete || play.defended || play.intercepted){
                this.weeklyStats[play.week].Q_incomplete++;
            }
            if(play.score){
                this.weeklyStats[play.week].Q_tds++;
            }
            if(play.intercepted){
                this.weeklyStats[play.week].Q_interceptions++;
            }
            if(play.conversion && play.conversion !== "0"){
                this.weeklyStats[play.week].Q_conversions++;
            }
            if(play.sack){
                this.weeklyStats[play.week].Q_sacked++;
            }
        } else if(play.side === 'O'){
            if(play.completed){
                this.weeklyStats[play.week].O_catches++;
            }
            if(play.dropped){
                this.weeklyStats[play.week].O_drops++;
            }
            if(play.score && play.play_type === 'R'){
                this.weeklyStats[play.week].O_runTds++;
            }
            if(play.score && play.play_type === 'P'){
                this.weeklyStats[play.week].O_catchTds++;
            }
            if(play.conversion && play.conversion !== "0"){
                this.weeklyStats[play.week].O_conversions++;
            }
            if(play.play_type === 'R'){
                this.weeklyStats[play.week].O_run++;
            }
        } else if(play.side === 'D'){
            if(play.flagged){
                this.weeklyStats[play.week].D_deflags++;
            }
            if(play.defended){
                this.weeklyStats[play.week].D_defended++;
            }
            if(play.intercepted){
                this.weeklyStats[play.week].D_interceptions++;
            }
            if(play.sack){
                this.weeklyStats[play.week].D_sacks++;
            }
            if(play.score){
                this.weeklyStats[play.week].D_pickSix++;
            }
        }
    }

    private processAgainstStats(play: Play, isQb?:boolean) {
        if(angular.isUndefined(this.againstStats[play.opponent])){
            this.againstStats[play.opponent] = {
                Q_complete:0,Q_incomplete:0,Q_tds:0,Q_interceptions:0,Q_conversions:0,Q_sacked:0,
                O_catches:0,O_drops:0,O_catchTds:0,O_runTds:0,O_conversions:0,O_run:0,
                D_deflags:0,D_defended:0,D_interceptions:0,D_sacks:0,D_pickSix:0,
                opponent: play.opponent
            };
        }
        if(isQb){
            if(play.completed){
                this.againstStats[play.opponent].Q_complete++;
            }
            if(play.dropped || play.incomplete || play.defended || play.intercepted){
                this.againstStats[play.opponent].Q_incomplete++;
            }
            if(play.score){
                this.againstStats[play.opponent].Q_tds++;
            }
            if(play.intercepted){
                this.againstStats[play.opponent].Q_interceptions++;
            }
            if(play.conversion && play.conversion !== "0"){
                this.againstStats[play.opponent].Q_conversions++;
            }
            if(play.sack){
                this.againstStats[play.opponent].Q_sacked++;
            }
        } else if(play.side === 'O'){
            if(play.completed){
                this.againstStats[play.opponent].O_catches++;
            }
            if(play.dropped){
                this.againstStats[play.opponent].O_drops++;
            }
            if(play.score && play.play_type === 'R'){
                this.againstStats[play.opponent].O_runTds++;
            }
            if(play.score && play.play_type === 'P'){
                this.againstStats[play.opponent].O_catchTds++;
            }
            if(play.conversion && play.conversion !== "0"){
                this.againstStats[play.opponent].O_conversions++;
            }
            if(play.play_type === 'R'){
                this.againstStats[play.opponent].O_run++;
            }
        } else if(play.side === 'D'){
            if(play.flagged){
                this.againstStats[play.opponent].D_deflags++;
            }
            if(play.defended){
                this.againstStats[play.opponent].D_defended++;
            }
            if(play.intercepted){
                this.againstStats[play.opponent].D_interceptions++;
            }
            if(play.sack){
                this.againstStats[play.opponent].D_sacks++;
            }
            if(play.score){
                this.againstStats[play.opponent].D_pickSix++;
            }
        }
    }
}