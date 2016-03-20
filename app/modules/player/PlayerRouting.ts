/**
 * ui-router overview state
 * @param $stateProvider
 */

export function config($stateProvider: ng.ui.IStateProvider): void {

    'ngInject'; //needed when directly exporting a class or function

    $stateProvider.state('player', {
        url: '/player/:id',
        views: {
            "@": {
                template: <string>require('./player.html'),
                controller: 'PlayerController',
                controllerAs: 'Player'
            }
        }
    });
}