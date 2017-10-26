
define(['angular', './sample-module'], function(angular, controllers) {
    'use strict';
     controllers.controller('IndividualHistoryCtrl', ['$rootScope','$http','$scope', '$log', 'PredixAssetService', 'PredixViewService','SelectedUnits','$filter', function ($rootScope,$http, $scope, $log, PredixAssetService, PredixViewService,SelectedUnits,$filter) {

    Highcharts.setOptions({
      chart: {
        style: {
        fontFamily: 'GE-Inspira'
        }
      }
    });

   $scope.machineNumber=sessionStorage.getItem("MachineNumForIndividual");
   $scope.fromDate=sessionStorage.getItem("startDate");
   $scope.ToDate=sessionStorage.getItem("endDate");

   $scope.data='loading';
   $scope.data1='loading';

//  Maintenance Records Table.

    $http.get("https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/maintenanceRecords?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber).success(function(response) 
        {
            $scope.data='!loading';
            $scope.data1='!loading';
             $scope.Maintenance=[];
            $scope.Maintenance=response;


        });

  //Notification History Table

      $http.get("https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/indHistory?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber).success(function(response)
        {
            $scope.data='!loading';
            $scope.data1='!loading';
             $scope.Notification=[];
            $scope.Notification=response;


        });

//OnLoad Repair Type Analysis Chart

     $http.get('https://komatsu-ind-history-service.run.aws-usw02-pr.ice.predix.io/komatsu/repairType?machineName='+$scope.machineNumber).success(function (data, status) {

    var repairType = [];
    for (var i = 0; i < data.length; i++) {
        repairType.push(data[i].repairType);
    }

    var count = [];
    for (var i = 0; i < data.length; i++) {
        count.push(data[i].count);
    }


     $scope.drawchart1=function(){

               var chart = new Highcharts.Chart({
              chart: {
                type:'bar',
                renderTo:'chart1'

              },
                title: {
                  text: 'Repair Type Anaylsis',
                 style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25

              },

              xAxis: {
                  title:{
                    text:'Repair Type'
                  },
                  categories: repairType,
              },
              yAxis: {
                  title: {
                      text: 'Counts'
                  },

              },

              credits: {
            enabled: false
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
          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
                  name: 'Counts',
                  data: count
              }]
                 });
            }
             $scope.drawchart1();

});

//On Click of the Radio Button, Show Repair Type Analysis Chart
$scope.RepairTypeAnalysis=function(){
    $http.get('https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/repairType?machineName='+$scope.machineNumber).success(function (data, status) {

    var repairType = [];
    for (var i = 0; i < data.length; i++) {
        repairType.push(data[i].repairType);
    }

    var count = [];
    for (var i = 0; i < data.length; i++) {
        count.push(data[i].count);
    }


     $scope.drawchart1=function(){

               var chart = new Highcharts.Chart({
              chart: {
                type:'bar',
                renderTo:'chart1'

              },
                title: {
                  text: 'Repair Type Anaylsis',
                  style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },

              xAxis: {
                  title:{
                    text:'Repair Type'
                  },
                  categories: repairType,
              },
              yAxis: {
                  title: {
                      text: 'Counts'
                  },

              },

              credits: {
            enabled: false
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
          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
                  name: 'Counts',
                  data: count
              }]
                 });
            }
             $scope.drawchart1();

});
}

//On Click of the Radio Button, show Repair Type Anaylsis By Date Chart

$scope.RepairTypeAnalysisByDate=function(){
    $http.get('https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/repairTypeByDate?machineName='+$scope.machineNumber).success(function (data, status) {

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
                type:'spline',
                renderTo:'chart1',
                  zoomType: 'x'

              },
                title: {
                  text: 'Repair Type Anaylsis By Date',
                  style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
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
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
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
}







//Error Details Chart


  $http.get("https://mchnoprtn-ind-history-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/errorDetails?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber).success(function (data, status) {
    var machineNumber = [];
    for (var i = 0; i < data.length; i++) {
        machineNumber.push(data[i].machineNumber);
    }

    var ChartData1 = [];
    var ChartData2 = [];
    var DateYear1 =[];
    var DateDay1=[];
    var DateMonth1=[];
    var DateHour1=[];
    var DateMin1=[];
    var DateSec1=[];
    var monthNames1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 0; i < data.length; i++) {

        DateYear1=$filter('date')(new Date(data[i].eventDate),"yyyy");
        DateMonth1=$filter('date')(new Date(data[i].eventDate),"M");
        DateDay1=$filter('date')(new Date(data[i].eventDate),"d");
        DateMonth1=DateMonth1-1;
        DateHour1=0;
        DateMin1=0;
        DateSec1=0;

        ChartData1.push({'x':Date.UTC(DateYear1,DateMonth1,DateDay1,DateHour1,DateMin1,DateSec1),'y':data[i].errorCount});
        ChartData1 = $filter('orderBy')(ChartData1,'x');

        ChartData2.push({'x':Date.UTC(DateYear1,DateMonth1,DateDay1,DateHour1,DateMin1,DateSec1),'y':data[i].warningCount});
        ChartData2 = $filter('orderBy')(ChartData2,'x');


    }

    console.log(ChartData1);
    console.log(ChartData2);

    var errorCount = [];
    for (var i = 0; i < data.length; i++) {
        errorCount.push(data[i].errorCount);
    }
    var warningCount = [];
    for (var i = 0; i < data.length; i++) {
        warningCount.push(data[i].warningCount);
    }
     $scope.drawchart2=function(){

               var chart = new Highcharts.Chart({
              chart: {
                renderTo:'chart2',
                type:'column',

                zoomType: 'x'
              },
                title: {
                  text: '<b>Error Details</b>',
                  style: {
                        fontSize: '1.85em'
                    },
                x: 25
              },

               xAxis: {
            title: {
                text: 'Date'
            },
            tickmarkPlacement: 'on',
            type: 'datetime'
        },
              yAxis: {
                min:0,
                  title: {
                      text: 'Counts'
                  },
                   stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }

              },

              credits: {
            enabled: false
            },
          exporting: {
            enabled: false
            },

          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
           /*tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },*/


          plotOptions: {
            column: {
                stacking: 'normal',

            }
        },
/*plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },*/
          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
            name: 'Error Count',
            data: ChartData1
        },{
            name: 'Warning Count',
            data: ChartData2

        }        ]
                 });
            }

             $scope.drawchart2();



});



    }]);


});
