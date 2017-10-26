/**
 * Router Config
 * This is the router definition that defines all application routes.
 */
define(['angular', 'angular-ui-router'], function(angular) {
    'use strict';
    return angular.module('app.routes', ['ui.router']).config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

        //Turn on or off HTML5 mode which uses the # hash
        $locationProvider.html5Mode(true).hashPrefix('!');

        /**
         * Router paths
         * This is where the name of the route is matched to the controller and view template.
         */
        $stateProvider

            .state('dashboard', {
                //parent: 'secure',
                url: '/dashboard',
                templateUrl: 'views/dashboards.html',
                controller: 'DashboardsCtrl'
            })
            .state('maintenance', {
                url: '/maintenance',
                templateUrl: 'views/MaintenanceRecords.html',
                controller:'MaintenanceRecordsCtrl'
            })
            .state('graph', {
                url: '/graphs',
                templateUrl: 'views/graphs.html',
                controller:'graphCtrl'
            })
            .state('analysis', {
                url: '/analysis',
                templateUrl: 'views/analysis.html',
                controller:'analysisCtrl'
            })
            .state('IndividualHistory', {
                url: '/IndividualHistory',
                templateUrl: 'views/IndividualHistory.html',
                controller: 'IndividualHistoryCtrl'
            })
            .state('eventHistory', {
                url: '/eventHistory',
                templateUrl: 'views/EventHistory.html',
                controller: 'eventhistoryCtrl'
            })
             .state('extra', {
                url: '/extra',
                templateUrl: 'views/extraHtml.html',
                controller: 'extra-Ctrl'
            })
            .state('realtimegraph', {
                //parent: 'secure',
                url: '/realtimegraph',
                templateUrl: 'views/realtimegraph.html',
                controller: 'realtimegraphCtrl'
            })
            .state('analytics', {
                //parent: 'secure',
                url: '/analytics',
                templateUrl: 'views/analytics.html',
                controller: 'analyticsCtrl'
            })
            .state('RealtimeTracking', {
                //parent: 'secure',
                url: '/RealtimeTracking',
                templateUrl: 'views/RealtimeTracking.html',
                controller: 'RealtimeTrackingCtrl'
            })

        $urlRouterProvider.otherwise(function ($injector) {
            var $state = $injector.get('$state');
            $state.go('dashboard');
        });

    }]);
});
