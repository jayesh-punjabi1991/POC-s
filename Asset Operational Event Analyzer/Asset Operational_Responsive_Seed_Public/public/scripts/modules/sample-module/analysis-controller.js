define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('analysisCtrl', ['$scope','$http','$filter', function($scope,$http,$filter) {

       Highcharts.setOptions({
                    chart: {
                      style: {
                      fontFamily: 'geInspira'
                      }
                   }
                }); 

     $scope.locomotiveID=sessionStorage.getItem("SelectedLoco");    
      $scope.view="Chart View";
      $scope.view1="Chart View";
      $scope.spinner='running';
     

$scope.swapView1=function(){

          if($('#toggle1').hasClass('fa-toggle-off')){
                  $scope.view1="Data View";
                      $scope.view="Data View";
                  $('#toggle1').removeClass('fa-toggle-off');
                  $('#toggle1').addClass('fa-toggle-on');

               }
               else{
                $scope.view1="Chart View";
                $scope.view="Chart View";
                $('#toggle1').removeClass('fa-toggle-on');
                  $('#toggle1').addClass('fa-toggle-off');
               }
        }
//For Accordian
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
      }
    }

        //Planned Maintenance Cost
      $http.get("https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/plannedMaintenanceCost?locoID="+$scope.locomotiveID)
    .success(function(response) 
            {  
               $scope.PlannedCost=[];
               $scope.PlannedCost=response;


                var ohCost = [];
                for (var i = 0; i < $scope.PlannedCost.length; i++) {
                    ohCost.push($scope.PlannedCost[i].ohCost);   
                }
                var rmCost = [];
                for (var i = 0; i < $scope.PlannedCost.length; i++) {
                    rmCost.push($scope.PlannedCost[i].rmCost);   
                }
                var unplannedMCost = [];
                for (var i = 0; i < $scope.PlannedCost.length; i++) {
                    unplannedMCost.push($scope.PlannedCost[i].unplannedMCost);   
                }
                 var proactiveMCost = [];
                for (var i = 0; i < $scope.PlannedCost.length; i++) {
                    proactiveMCost.push($scope.PlannedCost[i].proactiveMCost);   
                }

                var maintenancDate = [];
                for (var i = 0; i < $scope.PlannedCost.length; i++) {
                    maintenancDate.push($scope.PlannedCost[i].maintenancDate);   
                }

              $scope.drawchart2=function(){

               var chart = new Highcharts.Chart({
                  chart: {
                renderTo:'chart1',
                type:'column'
              },
                title: {
                  text: 'Planned Maintenance Cost',
                  style: {
                        fontSize: '1.45em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
             
               xAxis: {
             
            title: {
                text: 'Date'
            },
             categories: maintenancDate
        },
              yAxis: {
               allowDecimals: true,
                  title: {
                      text: 'Cost'
                  },
                  labels: {
                formatter: function () {
                    return '$'+this.value ;
                }
            }
                   
            },
            credits: {
            enabled: false
            },
          exporting: {
            enabled: false
            },
     
          
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>'
        },
          plotOptions: {
            column: {
                stacking: 'normal'
           //  depth: 40
            }
        },

          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
            name: 'Over Haul Cost',
            data: ohCost
        }, {
            name: 'RM Cost',
            data: rmCost
        }, {
            name: 'Un Planned Maintenance Cost',
            data: unplannedMCost
        }, {
            name: 'Proactive Maintenance Cost',
            data: proactiveMCost
        }]
           
                 });
            }
            $scope.spinner='!running';
             $scope.drawchart2();

            });

        //Actual Maintenance Cost
      $http.get("https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/actualMaintenanceCost?locoID="+$scope.locomotiveID)
    .success(function(response) 
        {    
           $scope.ActualCost=[];
           $scope.ActualCost=response;

            var ohActualCost = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    ohActualCost.push($scope.ActualCost[i].ohActualCost);   
                }
                var rmActualCost = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    rmActualCost.push($scope.ActualCost[i].rmActualCost);   
                }
                var unplannedMActCost = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    unplannedMActCost.push($scope.ActualCost[i].unplannedMActCost);   
                }
                 var proactiveMActCost = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    proactiveMActCost.push($scope.ActualCost[i].proactiveMActCost);   
                }
                var maintenancDate = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    maintenancDate.push($scope.ActualCost[i].maintenancDate);   
                }
                var savings = [];
                for (var i = 0; i < $scope.ActualCost.length; i++) {
                    savings.push($scope.ActualCost[i].savings);   
                }

              $scope.drawchart2=function(){

               var chart = new Highcharts.Chart({
                  chart: {
                renderTo:'chart2',
                type:'column'
              },
                title: {
                  text: 'Actual Maintenance Cost',
                  style: {
                        fontSize: '1.45em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
             
               xAxis: {
             
            title: {
                text: 'Date'
            },
             categories: maintenancDate
        },
              yAxis: [{
               allowDecimals: true,
                  title: {
                      text: 'Cost'
                  },
                  labels: {
                formatter: function () {
                    return '$'+this.value ;
                }
            }
              },{
                min: -0.75,
                
                tickInterval: 0.25,
                  title: {
                    text: 'Saving Cost',
                   
                },labels: {
                formatter: function () {
                    return '$'+this.value ;
                }
            },
                opposite: true
            }
                   
            ],
            credits: {
            enabled: false
            },
          exporting: {
            enabled: false
            },
     
          
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>'
        },
          plotOptions: {
            column: {
                stacking: 'normal'
           //  depth: 40
            }
        },

          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
            name: 'Over Haul Actual Cost',
            data: ohActualCost
        }, {
            name: 'RM Actual Cost',
            data: rmActualCost
        }, {
            name: 'Un Planned Maintenance Actual Cost',
            data: unplannedMActCost
        }, {
            name: 'Proactive Maintenance Actual Cost',
            data: proactiveMActCost
        }, {
            name: 'Savings',
            data: savings,
            yAxis:1
        }]
           
                 });
            }
              $scope.spinner='!running';
             $scope.drawchart2();

        });


    //CBM chart
     $http.get("../analysis.json")
    .success(function(response) 
        {    
          
           $scope.CBMData=[];
           $scope.CBMData=response;
      
                  $scope.OHData=[];
                  $scope.RMData=[];                  
                  $scope.FLData=[];

                   angular.forEach($scope.CBMData,function(value,key){
                   $scope.FLData.push({'x':value.Year,'y':value.FLYear});
                   })

                   angular.forEach($scope.CBMData,function(value,key){
                   $scope.OHData.push({'x':value.Year,'y':value.OHYear});
                   })

                   angular.forEach($scope.CBMData,function(value,key){
                   $scope.RMData.push({'x':value.Year,'y':value.RMYear,});
                   })
                   
                   $scope.FLData=$filter('orderBy')($scope.FLData,'x');
                   $scope.OHData=$filter('orderBy')($scope.OHData,'x');
                   $scope.RMData=$filter('orderBy')($scope.RMData,'x');

              $scope.drawchart3=function(){

               var chart = new Highcharts.Chart({
                  chart: {
                renderTo:'chart3'
              },
                title: {
                  text: '',
                  style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
              },
             
               xAxis: {
             
            title: {
                text: 'Year'
            },
              allowDecimals:false
        },
              yAxis: [{
               allowDecimals: true,
                  title: {
                      text: 'Value'
                  },
                  labels: {
                formatter: function () {
                    return this.value ;
                }
            }
              } 
            ],
            credits: {
            enabled: false
            },
          exporting: {
            enabled: false
            },
              tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '<b>Year </b>: {point.x}<br/><b>Value </b>: {point.y}'
        },

          annotationsOptions: {
            enabledButtons: false
            },
              series: [{
            name: 'Failure Line',
            data: $scope.FLData
        },
        {
            name: 'Over Haul',
            data: $scope.OHData
        },
        {
            name: 'Running  Maintenance',
            data: $scope.RMData
        }
         ]           
                 });
            }
              $scope.spinner='!running';
             $scope.drawchart3();

        });
        }]);
});
