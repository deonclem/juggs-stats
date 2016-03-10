// Directive stylesheet
import './plays.scss';

interface PlaysComponentScope extends ng.IScope
{
    Plays: any
}

export class PlaysComponent implements ng.IComponentOptions {

    public template:string = <string>require('./plays.html');
    public restrict:string = "E";
    public bindings:Object = {
        plays: '<'
    };
    public controllerAs:string = 'Plays';

    public controller:Function = ($scope: PlaysComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Plays;
    };
}