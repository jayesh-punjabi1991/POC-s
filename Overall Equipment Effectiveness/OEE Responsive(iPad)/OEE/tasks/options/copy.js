/**
 * Configure copying tasks into dist version
 */
module.exports = {
    dist: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: [
                    'index.html',
                    'polymer-loader.vulcanized.html',
                    'images/*',
                    'sample-data/*',
                    'views/*',
                    'bower_components/webcomponentsjs/webcomponents-lite.js',
                    'bower_components/px/dist/px.min.js',
                    'bower_components/es6-promise/es6-promise.min.js',
                    'bower_components/requirejs/require.js',
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/font-awesome/fonts/*',
                    'bower_components/px-typography-design/type/*',
                    'bower_components/materialize/dist/css/*',
                    'bower_components/materialize/dist/js/*',
                    'bower_components/materialize/dist/fonts/*',
                    'bower_components/highcharts/highcharts.js',
                    'bower_components/angular/angular.js',

                    'bower_components/px-datasource/dist/px-datasource.min.js',
                    'bower_components/ng-bind-polymer/ng-bind-polymer.js',
                    'bower_components/angular-animate/angular-animate.min.js',
                    'bower_components/lodash/dist/lodash.min.js',
                    'bower_components/angular-ui-router/release/angular-ui-router.min.js',


                    'scripts/*',
                    'scripts/modules/*',
                    'scripts/modules/controllers/*',
                    'scripts/modules/directives/*',
                    'scripts/modules/services/*',
                    'stylesheet/*',
                    'fonts/*',
                    'bower_components/materialize/dist/fonts/roboto/*',
                    'js/*'

                ],
                dest: 'dist/www/'
            }
        ]
    },
    serve: {
        files: [
            {
                expand: true,
                cwd: 'public',
                src: ['polymer-loader.html'],
                rename: function (src, dest) {
                    return 'public/polymer-loader.vulcanized.html';
                }
            }
        ]
    }
};
