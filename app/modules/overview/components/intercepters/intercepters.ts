// Directive stylesheet
import './intercepters.scss';

interface InterceptersComponentScope extends ng.IScope
{
    Intercepters: any
}

export class InterceptersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./intercepters.html');
    public restrict:string = "E";
    public bindings:Object = {
        intercepters: '<'
    };
    public controllerAs:string = 'Intercepters';

    public controller:Function = ($scope: InterceptersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Intercepters;
    };
}