// return the chart object
function get_chart() {
     return {
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        plotOptions: {
          series: {
              cursor: 'pointer',
              point: {
                  events: {
                      click: function() {
                          alert ('Category: '+ this.category +', value: '+ this.y);
                      }
                  }
              }
          }
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
      };
}

// JQuery example

$('#jqChart').highcharts(get_chart());

// Angular example

var app = angular.module('charts', []);

app.directive('highchart', function () {
    return {
        restrict: 'E',
        template: '<div></div>',
        replace: true,

        link: function (scope, element, attrs) {
          
            scope.$watch(function() { return attrs.chart; }, function() {
        
              if(!attrs.chart) return;
              
              var chart = JSON.parse(attrs.chart);
            
              $(element[0]).highcharts(chart);
            
            });
        
        }
    }
});

function Ctrl($scope) {
    $scope.example_chart = get_chart();
}

