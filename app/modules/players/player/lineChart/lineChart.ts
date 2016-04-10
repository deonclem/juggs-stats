// Directive stylesheet
import './line-chart.scss';

interface LineChartComponentScope extends ng.IScope
{
    Chart: any
}

export class LineChartComponent implements ng.IComponentOptions {

    public template:string = <string>require('./line-chart.html');
    public restrict:string = "E";
    public bindings:Object = {
        data: '<',
        metric: '@',
        title: '@',
        displayAxisLabel: '<'
    };
    public controllerAs:string = 'Chart';

    public controller:Function = ($scope: LineChartComponentScope):void => {
        'ngInject';

        var ctrl = $scope.Chart;

        Highcharts.setOptions({
            colors: ['#C7C6E3']
        });
        var serie = [];
        let maxWeek = 1;
        for(var week in ctrl.data) { // get max week
            if(parseInt(week ,10)> maxWeek){
                maxWeek = parseInt(week,10);
            }
        }
        for(let i = 1; i <= maxWeek ; i++){
            if(angular.isDefined(ctrl.data[i])){
                var entry = ctrl.data[i][ctrl.metric];
                if(entry > 0){
                    ctrl.hasData = true;
                }
                serie.push(entry);
            } else {
                serie.push(0);
            }
        }
        let margin = 30;
        ctrl.chartConfig = {
            options: {
                chart: {
                    type: 'column',
                    zoomType: 'x',
                    height: 100,
                    margin: [margin,0,margin-5,0],
                    backgroundColor: null,
                    borderWidth: 0,
                    style: {
                        overflow: 'visible'
                    }
                },
                title: {
                    text: ''
                },
                credits: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        enabled: true,
                        formatter: function() {
                            return ctrl.displayAxisLabel ? 'Week ' + (this.value + 1) : '';
                        }
                    }
                },
                yAxis: {
                    endOnTick: false,
                    startOnTick: false,
                    labels: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    tickPositions: [0]
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        dataLabels: {
                            enabled: true
                        },
                        enableMouseTracking: false
                    }
                }
            },
            series: [{
                data: serie,
                name: ctrl.title
            }],
            title: {
                text: ctrl.title
            },

            loading: false
        };
        if(!ctrl.displayAxisLabel){
            ctrl.chartConfig.options.xAxis.tickPositions = [];
        }
    };
}