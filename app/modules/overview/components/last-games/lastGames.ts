// Directive stylesheet
import './last-games.scss';

interface LastGamesComponentScope extends ng.IScope
{
    Last: any
}

export class LastGamesComponent implements ng.IComponentOptions {

    public template:string = <string>require('./last-games.html');
    public restrict:string = "E";
    public bindings:Object = {
        games: '<'
    };
    public controllerAs:string = 'Last';

    public controller:Function = ($scope: LastGamesComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Last;
    };
}