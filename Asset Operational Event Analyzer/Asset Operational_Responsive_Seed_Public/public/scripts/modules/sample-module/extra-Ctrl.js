
define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('extra-Ctrl', ['$scope','$http','fetchData','$filter',function($scope,$http,fetchData,$filter) {
                $scope.data1='[{"key":"one", "val": "0 km/h"}, {"key":"one", "val": "1 km/h"}, {"key":"two", "val": "2 km/h"}, {"key":"three", "val": "3 km/h"}]';

                                              /*  $scope.drawchart1=function(){

                 var chart = new Highcharts.Chart({
                            chart: {
                              renderTo:'chart1',
                              zoomType: 'x'
                              },
                              title: {
                              text: '',
                              x: -20 ,//center,
                              style: {
                              fontSize: '1.2em'
                              }
                              },
                              /*subtitle: {
                              text: 'Source: WorldClimate.com',
                              x: -20
                              },
                              xAxis: {
                              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
                              },
                              yAxis: {
                              title: {
                              text: 'Temperature (°C)'
                              },
                              plotLines: [{
                              value: 0,
                              width: 1,
                              color: '#808080'
                              }]
                              },
                              tooltip: {
                              valueSuffix: '°C'
                              },
                              // legend: {
                              //     layout: 'vertical',
                              //     align: 'right',
                              //     verticalAlign: 'middle',
                              //     borderWidth: 0
                              // },
                              credits: {
                              enabled: false
                              },
                              exporting: {
                              enabled: false
                              },
                              annotationsOptions: {
                              enabledButtons: false
                              },
                              series: [{
                              name: 'New York',
                              data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
                              }]
                 });
            }

            $scope.drawchart1();
        //Loading the json data from factory
        $scope.sendFilterValues=function(){
            $scope.spinner='running';
            var machine=$rootScope.machine;
            var startDate=$rootScope.fDate;
            var endDate=$rootScope.tDate;

            fetchData.get(startDate,endDate,machine).then(function success(data){
                console.log(angular.toJson(data));
                $scope.dataNotLoaded=false;
                $scope.spinner='!running';
                $scope.dataFromService=data;
                $scope.points=$scope.dataFromService[0];
                console.log($scope.dataFromService[1]);
                $scope.tableDataFromService($scope.dataFromService[1]);
              //var dataForTable=data[];
              //$scope.renderTableData(dataForTable);
              })
          }
            //Map
            // $scope.points=[{"machineNumber":"1","eventName":"event4","datetime":"2014-08-23","latitude":40.700295374999996,"longitude":-89.57852299999999},
            // {"machineNumber":"1","eventName":"event8","datetime":"2014-08-23","latitude":40.706732624999994,"longitude":-89.568191}
            //             ];

              $scope.customIcon = {
                  "scaledSize": [52, 42],
                  "url": "../images/truck-2-64.png"
              };

              //Event Tabulation
            //   document.getElementById("mytable").addEventListener("px-row-click", function(e) {
            //   var clickedRow = e.detail.row;
            //   console.log("Row clicked", clickedRow, " _selected: ", clickedRow._selected);
            //   //console.log($scope.startDate);
            //   $http.get('https://komatsu-maintenance-service.run.aws-usw02-pr.ice.predix.io/komatsu/trendAnalysis?startDate=23-Aug-2014&machineNumber=1').success(function(res){
            //     console.log(angular.toJson(res));
            //      var arrayToRender=[];

            //      angular.forEach(res,function(v,k){
            //       arrayToRender.push([v.timestamp,v.value]);

            //      })
            //   })
            // });

              $scope.info1 = [{"machineNumber":"1","eventName":"event4","count":1},
                              {"machineNumber":"1","eventName":"event8","count":1}];

              //Event history
              $scope.info2 = [{"machineNumber":"1","eventName":"event4","eventDate":"2014-08-23"},
              {"machineNumber":"1","eventName":"event8","eventDate":"2014-08-23"}];*/

                $scope.RepairTypeAnalysisByDate=function(){
                $http.get('https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/repairTypeByDate?machineName=1').success(function (data, status) {



                var repairType = [];
                for (var i = 0; i < data.length; i++) {
                repairType.push(data[i].repairType);
                }

                $scope.ChartData = [];
                var repairDateYear =[];
                var repairDateDay=[];
                var repairDateMonth=[];
                var repairDateHour=[];
                var repairDateMin=[];
                var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                for (var i = 0; i < data.length; i++) {

                repairDateYear=$filter('date')(new Date(data[i].repairDate),"yyyy");
                repairDateMonth=$filter('date')(new Date(data[i].repairDate),"M");
                repairDateDay=$filter('date')(new Date(data[i].repairDate),"d");
                repairDateMonth=repairDateMonth-1;


                repairDateHour=0;
                repairDateMin=0;
                $scope.ChartData.push({'x':Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin),
                'y':data[i].count,'data':data[i].repairType,'Year':repairDateYear,'Month':monthNames[repairDateMonth] ,'Day':repairDateDay});

                $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');
                }

                var count = [];
                for (var i = 0; i < data.length; i++) {
                count.push(data[i].count);
                }
                $scope.drawchart1=function(){

                var chart = new Highcharts.Chart({
                chart: {
                type:'column',
                renderTo:'chart1'

                },
                title: {
                text: 'Repair Type Anaylsis By Date',

                },

                xAxis: {
                ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                month: '%b. %y ',
                year: '%b'
                },
                title: {
                text: 'Date'
                }
                },
                yAxis: {
                title: {
                text: 'Counts'
                },
                min: 0
                },
                credits: {
                enabled: false
                },

                plotOptions: {

                spline: {
                marker: {
                enabled: true
                }
                }
                },

                exporting: {
                enabled: false
                },
                legend: {
                enabled: false,
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
                },
                tooltip: {

                formatter: function () {

                return '<b>Repair Type: </b>'+this.point.data+'<br>'+'<b>Date </b>:'+this.point.Day+' '+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
                },

                },     annotationsOptions: {
                enabledButtons: false
                },
                series: [{
                name: 'Repair Type',
                data: $scope.ChartData
                }]
                });
                }
                $scope.drawchart1();


                });
                };
                $scope.RepairTypeAnalysisByDate();
        }]);
});
