/**
 * Player picture with name for lists
 */

import './player-link.scss'

interface PlayerLinkComponentScope extends ng.IScope
{
    Player: any // must match controllerAs
}

export class PlayerLinkComponent implements ng.IComponentOptions {

    public template:any = <string>require('./player-link.html');
    public restrict:string = "E";
    public bindings:Object = {
        player: '<'
    };
    public controllerAs:string = 'Player';

    public controller:Function = ($scope: PlayerLinkComponentScope) :void => {
        'ngInject';
        var ctrl = $scope.Player;
    };
}