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
import {OffenseComponent} from "./offense/offense";
import {DefenseComponent} from "./defense/defense";
import {PlaysComponent} from "./plays/plays";

angular.module('app.games.game', ["ui.router", 'highcharts-ng'])
    .config(GameRouting)
    .controller('GameController', GameController)
    .component('defense', new DefenseComponent())
    .component('plays', new PlaysComponent())
    .component('offense', new OffenseComponent());
