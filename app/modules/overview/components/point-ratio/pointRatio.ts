// Directive stylesheet
import './point-ratio.scss';

interface PointRatioComponentScope extends ng.IScope
{
    Ratio: any
}

export class PointRatioComponent implements ng.IComponentOptions {

    public template:string = <string>require('./point-ratio.html');
    public restrict:string = "E";
    public bindings:Object = {
        ratio: '<'
    };
    public controllerAs:string = 'Ratio';

    public controller:Function = ($scope: PointRatioComponentScope, $timeout: ng.ITimeoutService):void => {
        'ngInject';

        var ctrl = $scope.Ratio;

        Highcharts.setOptions({
            colors: ['#0D47A1', '#C7C6E3']
        });

        ctrl.ratioChart = {
            options: {
                chart: {
                    type: 'pie',
                    height: 300
                },
                title: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        dataLabels: {
                            enabled: true,
                            distance: 0,
                            format: '{y}',
                            style: {
                                fontWeight: 'bold',
                                color: 'black',
                                textShadow: '0px 1px 2px black',
                                fontSize: '22px'
                            }
                        },
                        startAngle: -90,
                        endAngle: 90,
                        center: ['50%', '75%']
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Scored points',
                innerSize : '50%',
                data: [
                    ['For', ctrl.ratio.for],
                    ['Against', ctrl.ratio.against]
                ]
            }]
        };

        $timeout(() => $scope.$broadcast('highchartsng.reflow'), 0 ); // fire the ng-highcharts reflow event to auto resize the charts
    };
}