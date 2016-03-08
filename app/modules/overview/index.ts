/**
 * Homepage Component
 */

// Highcharts
import 'commonjs-highcharts'
import 'highcharts-ng';

/**
 * Stylesheet
 */
import "./overview.scss";

/**
 * Internal deps
 */
import {OverviewController} from './OverviewController'
import {config as OverviewRouting} from './OverviewRouting'
import {TeamRecordComponent} from "./components/team-record/teamRecord";
import {LastGamesComponent} from "./components/last-games/lastGames";
import {PointRatioComponent} from "./components/point-ratio/pointRatio";
import {ScorersComponent} from "./components/scorers/scorers";
import {CatchersComponent} from "./components/catchers/catchers";
import {DroppersComponent} from "./components/droppers/droppers";

angular.module('app.overview', ["ui.router", 'highcharts-ng'])
    .config(OverviewRouting)
    .controller('OverviewController', OverviewController)
    .component('lastGames', new LastGamesComponent())
    .component('pointRatio', new PointRatioComponent())
    .component('scorers', new ScorersComponent())
    .component('catchers', new CatchersComponent())
    .component('droppers', new DroppersComponent())
    .component('teamRecord', new TeamRecordComponent());
