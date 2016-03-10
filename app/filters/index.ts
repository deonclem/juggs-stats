import {cleanTeamName} from "./cleanTeamName";

angular.module('app.filters', [])
    .filter('cleanTeamName', cleanTeamName);
