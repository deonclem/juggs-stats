// Directive stylesheet
import './scorers.scss';

interface ScorersComponentScope extends ng.IScope
{
    Scorers: any
}

export class ScorersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./scorers.html');
    public restrict:string = "E";
    public bindings:Object = {
        scorers: '<'
    };
    public controllerAs:string = 'Scorers';

    public controller:Function = ($scope: ScorersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Scorers;
    };
}