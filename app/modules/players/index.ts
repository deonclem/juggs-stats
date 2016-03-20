/**
 * Homepage Component
 */

/**
 * Stylesheet
 */
import "./players.scss";

/**
 * Internal deps
 */
import {PlayersController} from './PlayersController'
import {config as PlayersRouting} from './PlayersRouting'
import './player';

angular.module('app.players', ["ui.router", "app.players.player"])
    .config(PlayersRouting)
    .controller('PlayersController', PlayersController);
