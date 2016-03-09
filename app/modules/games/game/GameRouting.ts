/**
 * ui-router game state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('games.game', {
        url: '/:gameId',
        views: {
            "@": {
                template: <string>require('./game.html'),
                controller: 'GameController',
                controllerAs: 'Game'
            }
        }
    });
}