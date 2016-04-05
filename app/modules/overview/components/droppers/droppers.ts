// Directive stylesheet
import './droppers.scss';

interface DroppersComponentScope extends ng.IScope
{
    Droppers: any
}

export class DroppersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./droppers.html');
    public restrict:string = "E";
    public bindings:Object = {
        droppers: '<'
    };
    public controllerAs:string = 'Droppers';

    public controller:Function = ($scope: DroppersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Droppers;
        ctrl.catchPercents = [];
        ctrl.droppers.forEach(player => {
           if(player.data.catches > 0){
               ctrl.catchPercents.push({
                   name: player.name,
                   data: {id: player.data.id},
                   percent: player.data.catches * 100 / (player.data.catches + player.data.drops),
                   catches: player.data.catches,
                   total: player.data.catches + player.data.drops
               })
           }
        });
    };
}