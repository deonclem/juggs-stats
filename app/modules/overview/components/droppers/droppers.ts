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
        console.log(ctrl.droppers);
        ctrl.dropPercents = [];
        ctrl.droppers.forEach(player => {
           if(player.data.catches > 0){
               ctrl.dropPercents.push({
                   name: player.name,
                   percent: player.data.drops * 100 / player.data.catches
               })
           }
        });
    };
}