/**
 * ui-router overview state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('overview', {
        url: '/',
        views: {
            "@": {
                template: <string>require('./overview.html'),
                controller: 'OverviewController',
                controllerAs: 'Overview'
            }
        }
    });
}