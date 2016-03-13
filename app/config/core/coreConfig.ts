export function config($urlRouterProvider: ng.ui.IUrlRouterProvider, $locationProvider: ng.ILocationProvider) {
    "ngInject"; //needed when directly exporting a class or function
    if (ON_PROD && false) {
        $locationProvider.html5Mode(true);
    }
    $urlRouterProvider.otherwise('/');
}