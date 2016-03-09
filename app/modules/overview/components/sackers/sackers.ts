// Directive stylesheet
import './sackers.scss';

interface SackersComponentScope extends ng.IScope
{
    Sackers: any
}

export class SackersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./sackers.html');
    public restrict:string = "E";
    public bindings:Object = {
        sackers: '<'
    };
    public controllerAs:string = 'Sackers';

    public controller:Function = ($scope: SackersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Sackers;
    };
}