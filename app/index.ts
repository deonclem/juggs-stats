/// <reference path='../_all.ts' />

/**
 * Importing external libs
 */
import 'angular';
import 'angular-material';
import 'angular-ui-router';
import 'firebase'
import 'angularfire'

/**
 * Importing external stylesheets
 */
import 'angular-material/angular-material.css';

/**
 * Importing internal components
 */
import {config} from './config/core/coreConfig'
import {run} from './config/core/coreRun'
import './modules/overview/index';
import './services/index';
import './components/index';
/**
 * Importing the app images
 */

require.context('./assets/img', true, /^\.\//);

/**
 * The main app module.
 */

module app {
    angular
        .module('app', [
            "ui.router",
            "ngMaterial",
            "firebase",
            "app.services",
            "app.components",
            "app.overview"
        ])
        .config(config)
        .run(run);
}