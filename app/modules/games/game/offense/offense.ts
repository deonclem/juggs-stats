// Directive stylesheet
import './offense.scss';

interface OffenseComponentScope extends ng.IScope
{
    Offense: any
}

export class OffenseComponent implements ng.IComponentOptions {

    public template:string = <string>require('./offense.html');
    public restrict:string = "E";
    public bindings:Object = {
        offense: '<'
    };
    public controllerAs:string = 'Offense';

    public controller:Function = ($scope: OffenseComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Offense;
    };
}