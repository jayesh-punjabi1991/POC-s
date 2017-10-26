define(['angular', './sample-module'], function(angular, controllers) {
    'use strict';
    controllers.controller('MaintenanceRecordsCtrl', ['$rootScope','$http','$scope', '$log', 'PredixAssetService', 'PredixViewService','SelectedUnits','$filter', function ($rootScope,$http, $scope, $log, PredixAssetService, PredixViewService,SelectedUnits,$filter) {    
    $scope.MaintenanceData=[];
    $scope.eventHistory=[];
    $scope.data='loading';
    $scope.data1='hide';
    $scope.url=null;
    $scope.image='hide';
    $scope.note="show";
    $scope.note1='hide';
    $scope.locomotiveID=sessionStorage.getItem("SelectedLoco");

    $http.get('/json/Parameter1.json').then(function(response){
    $scope.data2=response.data;        
    });


     Highcharts.setOptions({
                    chart: {
                      style: {
                      fontFamily: 'geInspira'
                      }
                   }
                });
    //For Accordian
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].onclick = function(){
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
      }
    }

//Table Data for Maintenance Table
$http.get('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/maintenanceRec?locoID='+$scope.locomotiveID).then(function(response){
        $scope.MaintenanceData=response.data;
        $scope.data='!loading';
		});

//Table Data for Events History Table
 document.getElementById("mytable1").addEventListener("px-row-click", function(e) {
        $scope.note1='hide';
        $scope.note='hide';
        var clickedRow = e.detail.row;   
        $scope.data1="show"; 
        $scope.$apply();
        if(e.detail.row.row.maintenaceID == "M.04"){
            $scope.image='show';
            $scope.url="../images/M-04.jpg";
            $scope.$apply();
        }
        else if(e.detail.row.row.maintenaceID === 'M.01'){
            $scope.image='show';
            $scope.url="../images/M-01.jpg";
            $scope.$apply();
        }
        else{
            $scope.image='hide';
            $scope.url=""
            $scope.note1='show';
            $scope.$apply();
        }
  		});

//Plotting the chart
    $scope.parameter1=[];
    var insideDiv=document.getElementById('firstparameter');
      insideDiv.onclick = function(event) {
              
            $scope.parameter1 = event.target.childNodes[1].data;
              angular.forEach($scope.data2,function(value,key){
              if(value.val==$scope.parameter1){
                $scope.parameter1=value.key;
              }
            })
           
            };  

    $scope.parameter2=[];
    var insideDiv=document.getElementById('secondparameter');
      insideDiv.onclick = function(event) {
              
            $scope.parameter2 = event.target.childNodes[1].data;
           angular.forEach($scope.data2,function(value,key){
              if(value.val==$scope.parameter2){
                $scope.parameter2=value.key;
              }
            })
            }; 

$scope.trendAnalysisComparison=function(){  

    if($scope.parameter1.length==0 && $scope.parameter2.length==0){
    $scope.parameter1="parameter_4";
    $scope.parameter2="parameter_5";  
  }

    $http.get("https://komatsu-maintenance-service.run.aws-usw02-pr.ice.predix.io/komatsu/trendAnalysisComparison?startDate=23-Aug-2014&machineNumber=1&param1="+$scope.parameter1+"&param2="+$scope.parameter2).success(function (data, status) {

    $scope.ChartData1 = [];
    var DateYear1 =[];
    var DateDay1=[];
    var DateMonth1=[];
    var DateHour1=[];
    var DateMin1=[];
    var DateSec1=[];
    var monthNames1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 0; i < data[0].length; i++) {

        DateYear1=$filter('date')(new Date(data[0][i].date),"yyyy");   
        DateMonth1=$filter('date')(new Date(data[0][i].date),"M");
        DateDay1=$filter('date')(new Date(data[0][i].date),"d");
        DateMonth1=DateMonth1-1;            
        DateHour1=$filter('date')(new Date(data[0][i].date),"HH");
        DateMin1=$filter('date')(new Date(data[0][i].date),"mm");
        DateSec1=$filter('date')(new Date(data[0][i].date),"ss");
        $scope.ChartData1.push({'x':Date.UTC(DateYear1,DateMonth1,DateDay1,DateHour1,DateMin1,DateSec1),
          'y':data[0][i].value,'Year':DateYear1,'Month':monthNames1[DateMonth1] ,'Day':DateDay1,'Hour':DateHour1,
          "Min":DateMin1,"Seconds":DateSec1,"Quality":data[0][i].quality,"Tag":data[0][i].tag});
      
        $scope.ChartData1 = $filter('orderBy')($scope.ChartData1,'x');
    }
    
    $scope.ChartData2 = [];
    var DateYear2 =[];
    var DateDay2=[];
    var DateMonth2=[];
    var DateHour2=[];
    var DateMin2=[];
    var DateSec2=[];
    var monthNames2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 0; i < data[1].length; i++) {

        DateYear2=$filter('date')(new Date(data[1][i].date),"yyyy");   
        DateMonth2=$filter('date')(new Date(data[1][i].date),"M");
        DateDay2=$filter('date')(new Date(data[1][i].date),"d");
        DateMonth2=DateMonth2-1;            
        DateHour2=$filter('date')(new Date(data[1][i].date),"HH");
        DateMin2=$filter('date')(new Date(data[1][i].date),"mm");
        DateSec2=$filter('date')(new Date(data[1][i].date),"ss");
        $scope.ChartData2.push({'x':Date.UTC(DateYear2,DateMonth2,DateDay2,DateHour2,DateMin2,DateSec2),
          'y':data[1][i].value,'Year':DateYear2,'Month':monthNames2[DateMonth2] ,'Day':DateDay2,'Hour':DateHour2,
          "Min":DateMin2,"Seconds":DateSec2,"Quality":data[1][i].quality,"Tag":data[1][i].tag});
      
        $scope.ChartData2 = $filter('orderBy')($scope.ChartData2,'x');

    }
    
   
$scope.drawchart1=function(){

               var chart = new Highcharts.Chart({
                  chart: {
                  type:'spline',
                  renderTo:'chart1',
                  zoomType: 'x'

                  },
                  title: {
                  text: '',
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
                
                  },
                  scrollbar: {
                  enabled: true
                  },
                  navigator: {
                  enabled: true
                  },
                  rangeSelector: {
                  selected: 1
                  },

                  xAxis: {
                  ordinal:false,
                  type: 'datetime',
                  dateTimeLabelFormats: {
                  month: '%e. %b.',
                  year: '%b'
                  },
                  title: {
                  text: 'Date'
                  }
                  },
                  yAxis: {
                  title: {
                  text: 'Value'
                  }

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

                  return '<b>Tag: </b>'+this.point.Tag+'<br>'+'<b>Date </b>:'+this.point.Day+' '+this.point.Month+','
                  +this.point.Year+'<b> '+this.point.Hour+':'+this.point.Min+':'+this.point.Seconds+'</b><br><b>Value:</b>'+this.y;
                  },
                  },     annotationsOptions: {
                  enabledButtons: false
                  },
                  series: [{
                  name: 'Parameter 1',
                  data: $scope.ChartData1
                  },
                  {
                  name: 'Parameter 2',
                  data: $scope.ChartData2
                  }
                  ]
                  });
                  }
                  $scope.drawchart1();


                  });
                 
                  }

  
             

    }]);
});
