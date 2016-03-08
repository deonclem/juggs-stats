/**
 * Homepage Component
 */

/**
 * Internal deps
 */
import {OverviewController} from './OverviewController'
import {config as OverviewRouting} from './OverviewRouting'
import {TeamRecordComponent} from "./components/team-record/teamRecord";
import {LastGamesComponent} from "./components/last-games/lastGames";
import {PointRatioComponent} from "./components/point-ratio/pointRatio";

// Highcharts
import 'commonjs-highcharts'
import 'highcharts-ng';

/**
 * Stylesheet
 */
import "./overview.scss";

angular.module('app.overview', ["ui.router", 'highcharts-ng'])
    .config(OverviewRouting)
    .controller('OverviewController', OverviewController)
    .component('lastGames', new LastGamesComponent())
    .component('pointRatio', new PointRatioComponent())
    .component('teamRecord', new TeamRecordComponent());
