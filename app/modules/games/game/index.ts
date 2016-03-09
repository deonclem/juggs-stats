/**
 * Game Component
 */

// Highcharts
import 'commonjs-highcharts'
import 'highcharts-ng';

/**
 * Stylesheet
 */
import "./game.scss";

/**
 * Internal deps
 */
import {GameController} from './GameController'
import {config as GameRouting} from './GameRouting'

angular.module('app.games.game', ["ui.router", 'highcharts-ng'])
    .config(GameRouting)
    .controller('GameController', GameController);
