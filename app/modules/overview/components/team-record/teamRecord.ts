// Directive stylesheet
import './team-record.scss';

interface TeamRecordComponentScope extends ng.IScope
{
    Record: any
}

export class TeamRecordComponent implements ng.IComponentOptions {

    public template:string = <string>require('./team-record.html');
    public restrict:string = "E";
    public bindings:Object = {
        record: '<'
    };
    public controllerAs:string = 'Record';

    public controller:Function = ($scope: TeamRecordComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Record;
    };
}