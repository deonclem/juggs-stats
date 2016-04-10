/**
 * Player Component
 */

// Highcharts
import 'commonjs-highcharts'
import 'highcharts-ng';

/**
 * Stylesheet
 */
import "./player.scss";

/**
 * Internal deps
 */
import {PlayerController} from './PlayerController'
import {config as PlayerRouting} from './PlayerRouting'
import {LineChartComponent} from "./lineChart/lineChart";
import {AgainsTableComponent} from "./againstTable/againstTable";

angular.module('app.players.player', ["ui.router", 'highcharts-ng'])
    .config(PlayerRouting)
    .controller('PlayerController', PlayerController)
    .component('againstTable', new AgainsTableComponent())
    .component('lineChart', new LineChartComponent());
