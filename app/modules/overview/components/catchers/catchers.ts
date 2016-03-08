// Directive stylesheet
import './catchers.scss';

interface CatchersComponentScope extends ng.IScope
{
    Catchers: any
}

export class CatchersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./catchers.html');
    public restrict:string = "E";
    public bindings:Object = {
        catchers: '<'
    };
    public controllerAs:string = 'Catchers';

    public controller:Function = ($scope: CatchersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Catchers;
    };
}