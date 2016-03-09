/**
 * Games Component
 */

/**
 * Stylesheet
 */
import "./games.scss";

/**
 * Internal deps
 */
import {GamesController} from './GamesController'
import {config as GamesRouting} from './GamesRouting'
import './game';

angular.module('app.games', ["ui.router", "app.games.game"])
    .config(GamesRouting)
    .controller('GamesController', GamesController);
