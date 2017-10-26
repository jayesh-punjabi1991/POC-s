/* global requirejs, define */
/* jshint camelcase: false */
/* jshint unused: false */

'use strict';
/**
* This file sets up the basic module libraries you'll need
* for your application.
*/
requirejs.onError = function(err) {
    //console.log(err.requireType);
    if (err.requireType === 'timeout') {
        //console.error('modules: ' + err.requireModules);
    }
    throw err;
};
/**
* RequireJS Config
* This is configuration for the entire application.
*/
require.config({
    enforceDefine: false,
    xhtml: false,
    //Cache buster
    //urlArgs : '_=' + px-datasource.now(),
    waitSeconds: 15,
    config: {
        text: {
            env: 'xhr'
        }
    },
    paths: {

        'bower_components': '../bower_components',
        'highcharts': "../bower_components/highcharts",
        'exporting': "../bower_components/exporting",
        /*'sockjs':"../bower_components/sockjs-client-1.0.3/dist/sockjs-1.0.3.min",
        'stompjs':"../bower_components/stomp-websocket/stomp.min",*/
        'ng-stomp':'../bower_components/ng-stomp/dist/ng-stomp.standalone.min',
        'px-datasource': '../bower_components/px-datasource/dist/px-datasource.min',

       
        'ng-bind-polymer': '../bower_components/ng-bind-polymer/ng-bind-polymer',

        // Named References
        config: './config',
        app: './app',

        // angularjs + modules
        angular: '../bower_components/angular/angular',
        'angular-mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular-resource': '../bower_components/angular-resource/angular-resource',
        'angular-route': '../bower_components/angular-route/angular-route',

        // angular ui router
        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',

        // Require JS Plugins
        text: '../bower_components/requirejs-plugins/lib/text',
        order: '../bower_components/requirejs-plugins/src/order',
        async: '../bower_components/requirejs-plugins/src/async',
        depend: '../bower_components/requirejs-plugins/src/depend',
        font: '../bower_components/requirejs-plugins/src/font',
        goog: '../bower_components/requirejs-plugins/src/goog',
        image: '../bower_components/requirejs-plugins/src/image',
        json: '../bower_components/requirejs-plugins/src/json',
        mdown: '../bower_components/requirejs-plugins/src/mdown',
        noext: '../bower_components/requirejs-plugins/src/noext',
        propertyParser: '../bower_components/requirejs-plugins/src/propertyParser',
        Markdown: '../bower_components/requirejs-plugins/lib/Markdown.Converter',
        css: '../bower_components/require-css/css',
        'css-builder': '../bower_components/require-css/css-builder',
        'normalize': '../bower_components/require-css/normalize',
        lodash: '../bower_components/lodash/dist/lodash.min',
        jquery: '../bower_components/jquery/dist/jquery.min',

        'ngMap':'../bower_components/ngmap/build/scripts/ng-map.min'

    },
    priority: [
        'jquery',
        'angular',
        'angular-resource',
        'angular-route',
        'ng-stomp'

    ],
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular-route': ['angular'],
        'angular-resource': ['angular', 'angular-route', 'angular-ui-router'],
        'angular-sanitize': ['angular'],
        'angular-mocks': {
            deps: ['angular', 'angular-route', 'angular-resource', 'angular-ui-router'],
            exports: 'mock'
        },
        'angular-ui-router': ['angular'],
        underscore: {
            exports: '_'
        },
        'px-datasource': {
            deps: ['angular', 'lodash']
        },
        
        'app': {
            deps: ['angular', 'ngMap']
        },
        'highcharts': {
          exports: "Highcharts",
          deps: ["jquery"]
        }


    }
});
