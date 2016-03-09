/**
 * ui-router games state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('games', {
        url: '/games',
        views: {
            "@": {
                template: <string>require('./games.html'),
                controller: 'GamesController',
                controllerAs: 'Games'
            }
        }
    });
}