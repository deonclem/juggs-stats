// Directive stylesheet
import './defense.scss';

interface DefenseComponentScope extends ng.IScope
{
    Defense: any
}

export class DefenseComponent implements ng.IComponentOptions {

    public template:string = <string>require('./defense.html');
    public restrict:string = "E";
    public bindings:Object = {
        defense: '<'
    };
    public controllerAs:string = 'Defense';

    public controller:Function = ($scope: DefenseComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Defense;
    };
}