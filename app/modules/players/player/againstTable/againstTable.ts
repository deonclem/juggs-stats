// Directive stylesheet
import './against-table.scss';

interface AgainsTableComponentScope extends ng.IScope
{
    Against: any
}

export class AgainsTableComponent implements ng.IComponentOptions {

    public template:string = <string>require('./against-table.html');
    public restrict:string = "E";
    public bindings:Object = {
        data: '<',
        pos: '@'
    };
    public controllerAs:string = 'Against';

    public controller:Function = ($scope:AgainsTableComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Against;
    }
}