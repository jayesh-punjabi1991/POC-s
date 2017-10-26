/**
 * Load controllers, directives, filters, services before bootstrapping the application.
 * NOTE: These are named references that are defined inside of the config.js RequireJS configuration file.
 */
define([
    'jquery',
    'angular',
    'main',
    'routes',
    'interceptors',
    'px-datasource',
    'ng-bind-polymer',
    'ngSanitize', 'ui.select',
    'ng-stomp',
], function ($, angular) {
    'use strict';
    /**
     * Application definition
     * This is where the AngularJS application is defined and all application dependencies declared.
     * @type {module}
     */
    var predixApp = angular.module('predixApp', [
        'app.routes',
        'app.interceptors',
        'sample.module',
        'predix.datasource',
        'px.ngBindPolymer',
        'ngMap',
        'ngStomp',
    ]);

    /**
     * Main Controller
     * This controller is the top most level controller that allows for all
     * child controllers to access properties defined on the $rootScope.
     */

    predixApp.controller('MainCtrl', ['$scope', '$rootScope', 'PredixUserService', function ($scope, $rootScope, predixUserService) {
       $('#icon-hamburger').click(function(){
        // debugger
          if( $(this).hasClass('fa-times')){
            //debugger
            $('.nav-pills').removeClass('disp');
         $('.nav-pills').addClass('hide');
         $('.xyz').removeClass('fa-times');
         $('.xyz').addClass('hamburger');
         $('.xyz').addClass('fa-bars');
          }
          
          else if($(this).hasClass('hamburger')){
            //debugger
             $('.nav-pills').removeClass('hide');
        $('.nav-pills').addClass('disp');
        $('.xyz').removeClass('hamburger');
        $('.xyz').removeClass('fa-bars');
        $('.xyz').addClass('fa-times');
        $('.xyz').addClass('clicked');

          }
      })
          window.App = $rootScope.App = {
            version: '1.0',
            name: 'Predix Seed',
            session: {},
            tabs: [
                {icon: 'fa fa-home', state: 'dashboards', label: 'Home Portal'},
                  {icon: 'fa fa-area-chart', state: 'realtimegraph', label: 'Realtime Analysis'},
                  {icon: 'fa  fa-gears', state: 'analytics', label: 'Analytics'}
            ]
        };

    }]);

 //Set on window for debugging
    window.predixApp = predixApp;
    //Return the application  object
    return predixApp;
});
