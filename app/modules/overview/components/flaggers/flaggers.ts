// Directive stylesheet
import './flaggers.scss';

interface FlaggersComponentScope extends ng.IScope
{
    Flaggers: any
}

export class FlaggersComponent implements ng.IComponentOptions {

    public template:string = <string>require('./flaggers.html');
    public restrict:string = "E";
    public bindings:Object = {
        flaggers: '<'
    };
    public controllerAs:string = 'Flaggers';

    public controller:Function = ($scope: FlaggersComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Flaggers;
    };
}