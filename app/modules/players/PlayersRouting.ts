/**
 * ui-router overview state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('players', {
        url: '/players',
        views: {
            "@": {
                template: <string>require('./players.html'),
                controller: 'PlayersController',
                controllerAs: 'Players'
            }
        }
    });
}