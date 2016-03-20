import {NavbarComponent} from "./navbar/navbar";
import {PlayerLinkComponent} from "./player-link/playerLink";
/**
 Global components for the app
 **/

angular.module('app.components', [])
    .component('navbar', new NavbarComponent())
    .component('playerLink', new PlayerLinkComponent());