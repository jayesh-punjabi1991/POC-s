define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('eventhistoryCtrl', ['$rootScope','$scope','$http','SelectedUnits','$filter',function($rootScope,$scope,$http,SelectedUnits,$filter) {

/*  $scope.arr=SelectedUnits.getString();*/
      Highcharts.setOptions({
          chart: {
            style: {
            fontFamily: 'geInspira'
            }
         }
      });

  $scope.machineNumFrGraph=sessionStorage.getItem("machineNumFrGraph");

  console.log($scope.machineNumFrGraph);
   $scope.data='loading';
   $scope.data1='loading';
   $scope.spinner='running';
   $scope.MR = '!Selected';
    $scope.machineNumber=sessionStorage.getItem("SelectedMachines");
    console.log($scope.machineNumber);
     $scope.fromDate=sessionStorage.getItem("startDate");
     $scope.ToDate=sessionStorage.getItem("endDate");
     $scope.eventvalue=sessionStorage.getItem("eventValues");
     // /console.log($scope.eventvalue)
   $scope.EventArr=sessionStorage.getItem("Event");
    // /console.log($scope.EventArr)


$scope.trendAnalysis=function(){
    $scope.data1='!loading';
     $scope.machineNumber=sessionStorage.getItem("SelectedMachines");
     $scope.fromDate=sessionStorage.getItem("startDate");
     $scope.ToDate=sessionStorage.getItem("endDate");
     $scope.eventvalue=sessionStorage.getItem("eventValues");

   //$scope.EventArr=sessionStorage.getItem("Event");
    var edate=$rootScope.Edate;
    //console.log("https://komatsu-maintenance-service.run.aws-usw02-pr.ice.predix.io/komatsu/trendAnalysis?startDate="+$scope.fromDate+"&machineNumber="+$scope.machineNumber);
    $http.get("https://mchnoprtn-maintenance-data-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/trendAnalysis?startDate="+edate+"&machineNumber="+$scope.machineNumber).success(function (data, status) {



    var value = [];
    for (var i = 0; i < data.length; i++) {
        value.push(data[i].value);
    }

    $scope.ChartData = [];
    var DateYear =[];
    var DateDay=[];
    var DateMonth=[];
    var DateHour=[];
    var DateMin=[];
    var DateSec=[];
    var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    for (var i = 0; i < data.length; i++) {

        DateYear=$filter('date')(new Date(data[i].date),"yyyy");
        DateMonth=$filter('date')(new Date(data[i].date),"M");
        DateDay=$filter('date')(new Date(data[i].date),"d");
        DateMonth=DateMonth-1;
        DateHour=$filter('date')(new Date(data[i].date),"HH");
        DateMin=$filter('date')(new Date(data[i].date),"mm");
        DateSec=$filter('date')(new Date(data[i].date),"ss");
        $scope.ChartData.push({'x':Date.UTC(DateYear,DateMonth,DateDay,DateHour,DateMin,DateSec),
          'y':data[i].value,'Year':DateYear,'Month':monthNames[DateMonth] ,'Day':DateDay,'Hour':DateHour,
          "Min":DateMin,"Seconds":DateSec,"Quality":data[i].quality,"Tag":data[i].tag});

        $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');
    }


$scope.drawchart1=function(){

              var chart = new Highcharts.Chart({
              chart: {
              type:'spline',
              renderTo:'chart1',
                zoomType: 'x'

              },
              title: {
                text: 'Trend Analysis',
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
                name: 'Trend Analysis',
                data: $scope.ChartData
                }]
                     });
              }
             $scope.drawchart1();

    });
}
              $scope.points=[];
              // $scope.drawchart1();
              //Loading the json data from factory



              //Event history
             // $scope.info2 = [{"machineNumber":"1","eventName":"event4","eventDate":"2014-08-23"},
              //{"machineNumber":"1","eventName":"event8","eventDate":"2014-08-23"}];


              document.getElementById("mytable2").addEventListener("px-row-click", function(e) {
              var clickedRow = e.detail.row;
              $scope.MachineNum1=[];
              $scope.EventDate=[];
              $rootScope.MachineNum1=clickedRow.row.machineNumber;
              $scope.EventDate=clickedRow.row.eventDate;
              $rootScope.Edate=$filter('date')(new Date($scope.EventDate),"dd-MMM-yyyy");

              var statusFlag=e.detail.row["_selected"];
              if(statusFlag == false) {
                $scope.MR = 'Selected'
              $scope.trendAnalysis();
               }
              //$scope.trendAnalysis();

        });

//Trend Analysis comparsions

    // $scope.data2='[{"key":"one","val":"parameter_1"},{"key":"four","val":"parameter_4"},{"key":"five","val":"parameter_5"},{"key":"six","val":"parameter_6"},{"key":"seven","val":"parameter_7"},{"key":"eight","val":"parameter_8"},{"key":"nine","val":"parameter_9"},{"key":"ten","val":"parameter_10"},{"key":"eleven","val":"parameter_11"},{"key":"twelve","val":"parameter_12"},{"key":"thirteen","val":"parameter_13"},{"key":"fourteen","val":"parameter_14"},{"key":"fifteen","val":"parameter_15"},{"key":"sixteen","val":"parameter_16"},{"key":"seventeen","val":"parameter_17"},{"key":"eighteen","val":"parameter_18"},{"key":"nineteen","val":"parameter_19"},{"key":"twenty","val":"parameter_20"},{"key":"twenty-one","val":"parameter_21"},{"key":"twenty-two","val":"parameter_22"},{"key":"twenty-three","val":"parameter_23"},{"key":"twenty-four","val":"parameter_24"},{"key":"twenty-five","val":"parameter_25"},{"key":"twenty-six","val":"parameter_26"},{"key":"twenty-seven","val":"parameter_27"},{"key":"twenty-eight","val":"parameter_28"},{"key":"twenty-nine","val":"parameter_29"},{"key":"thirty","val":"parameter_30"},{"key":"thirty-one","val":"parameter_31"},{"key":"thirty-two","val":"parameter_32"},{"key":"thirty-three","val":"parameter_33"},{"key":"thirty-four","val":"parameter_34"},{"key":"thirty-five","val":"parameter_35"},{"key":"thirty-six","val":"parameter_36"},{"key":"thirty-seven","val":"parameter_37"},{"key":"thirty-eight","val":"parameter_38"},{"key":"thirty-nine","val":"parameter_39"},{"key":"forty","val":"parameter_40"},{"key":"forty-one","val":"parameter_41"},{"key":"forty-two","val":"parameter_42"},{"key":"forty-three","val":"parameter_43"},{"key":"forty-four","val":"parameter_44"},{"key":"forty-five","val":"parameter_45"}]';
    $scope.data2='[{"key":"ALTI_PMR_1","val":"ATMOSPHERIC PRESSURE"},{"key":"Z_THROTTLE_VAL0","val":"% DROOP SETTING"},{"key":"Z_NSDREF_VAL0","val":"POWER TURBINE SPEED REFERENCE"},{"key":"BFX_VAL0","val":"BUS FREQUENCY"},{"key":"BFX2_VAL0","val":"UTILITY FREQUENCY"},{"key":"BVX_VAL0","val":"BUS VOLTAGE"},{"key":"BVX2_VAL0","val":"UTILITY VOLTAGE 1"},{"key":"BVX2SEL_VAL0","val":"UTILITY VOLTAGE 2"},{"key":"CHPDTA_VAL0","val":"SUMP A CHIP DETECTOR SENSOR"},{"key":"CHPDTASEL_VAL0","val":"SUMP A CHIP DETECTOR SELECT"},{"key":"CHPDTB_VAL0","val":"SUMP B CHIP DETECTOR SENSOR"},{"key":"CHPDTBSEL_VAL0","val":"SUMP B CHIP DETECTOR SELECT"},{"key":"CHPDTC_VAL0","val":"SUMP C CHIP DETECTOR SENSOR"},{"key":"CHPDTCOM_VAL0","val":"CHIP DETECTOR 1"},{"key":"CHPDTCOMSEL_VAL0","val":"CHIP DETECTOR 2"},{"key":"CHPDTCSEL_VAL0","val":"SUMP C CHIP DETECTOR SELECT"},{"key":"CNT_DM_VAL0","val":"DECEL MIN COUNT"},{"key":"CNT_ES_VAL0","val":"COUNTO OF E STOPS"},{"key":"CNT_ESN_VAL0","val":"EMERGENCY SD WITHOUT MOTOR COUNTER"},{"key":"CNT_OPHRSG_VAL0","val":"OPERATIONAL HOURS  FUEL"},{"key":"CNT_PS3HRS_VAL0","val":"PS3 IN CONTROL RUNNING"},{"key":"CRFDIRVIB_VAL0","val":"CRF VIBE LEVEL FILTERED"},{"key":"CRFNHPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N25"},{"key":"CRFNLPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N2"},{"key":"DE_XVIB_VAL0","val":"GENERATOR BEARING DE X AXIS VIBRATION"},{"key":"DE_YVIB_VAL0","val":"GENERATOR BEARING DE Y AXIS VIBRATION"},{"key":"EAX_VAL0","val":"AUX EXCITATION CURRENT"},{"key":"EAXSEL_VAL0","val":"AUX EXCITATION CURRENT SELECT"},{"key":"EVX_VAL0","val":"EXCITER FIELD"},{"key":"FLAMEDT1_VAL0","val":"FLAME DETECTOR"},{"key":"FO_ALM_VAL0","val":"FUEL SUPPLY ALARM"},{"key":"GBDEVIB_VAL0","val":"AGB VIBE"},{"key":"GFX_VAL0","val":"GENERATOR FREQUENCY"},{"key":"HUMIDITY_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY"},{"key":"HUMIDITYSEL_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY SELECT"},{"key":"LVL_GLUBA_VAL0","val":"GENERATURE LUBE OIL PRESSURE SIGNAL A"},{"key":"MVAR_VAL0","val":"GENERATOR CONTROL VAR SETPOINT"},{"key":"N25DOT_VAL0","val":"(N25) RATE OF CHANGE"},{"key":"N25R_VAL0","val":"SPEED CORRECTED TO T25"},{"key":"N25R2_VAL0","val":"SPEED CORRECTED TO T2"},{"key":"N25REF_VAL0","val":"N25REF TO HMI - SLOW EXCHANGE"},{"key":"NETLOAD_VAL0","val":"NET LOAD ON LP SHAFT #1 BEARING"},{"key":"PVGF_VAL0","val":"VG FILTER PRESS SENSOR"}]';
    // $scope.data3='[{"key":"one","val":"parameter_1"},{"key":"four","val":"parameter_4"},{"key":"five","val":"parameter_5"},{"key":"six","val":"parameter_6"},{"key":"seven","val":"parameter_7"},{"key":"eight","val":"parameter_8"},{"key":"nine","val":"parameter_9"},{"key":"ten","val":"parameter_10"},{"key":"eleven","val":"parameter_11"},{"key":"twelve","val":"parameter_12"},{"key":"thirteen","val":"parameter_13"},{"key":"fourteen","val":"parameter_14"},{"key":"fifteen","val":"parameter_15"},{"key":"sixteen","val":"parameter_16"},{"key":"seventeen","val":"parameter_17"},{"key":"eighteen","val":"parameter_18"},{"key":"nineteen","val":"parameter_19"},{"key":"twenty","val":"parameter_20"},{"key":"twenty-one","val":"parameter_21"},{"key":"twenty-two","val":"parameter_22"},{"key":"twenty-three","val":"parameter_23"},{"key":"twenty-four","val":"parameter_24"},{"key":"twenty-five","val":"parameter_25"},{"key":"twenty-six","val":"parameter_26"},{"key":"twenty-seven","val":"parameter_27"},{"key":"twenty-eight","val":"parameter_28"},{"key":"twenty-nine","val":"parameter_29"},{"key":"thirty","val":"parameter_30"},{"key":"thirty-one","val":"parameter_31"},{"key":"thirty-two","val":"parameter_32"},{"key":"thirty-three","val":"parameter_33"},{"key":"thirty-four","val":"parameter_34"},{"key":"thirty-five","val":"parameter_35"},{"key":"thirty-six","val":"parameter_36"},{"key":"thirty-seven","val":"parameter_37"},{"key":"thirty-eight","val":"parameter_38"},{"key":"thirty-nine","val":"parameter_39"},{"key":"forty","val":"parameter_40"},{"key":"forty-one","val":"parameter_41"},{"key":"forty-two","val":"parameter_42"},{"key":"forty-three","val":"parameter_43"},{"key":"forty-four","val":"parameter_44"},{"key":"forty-five","val":"parameter_45"}]';
    $scope.data3='[{"key":"ALTI_PMR_1","val":"ATMOSPHERIC PRESSURE"},{"key":"Z_THROTTLE_VAL0","val":"% DROOP SETTING"},{"key":"Z_NSDREF_VAL0","val":"POWER TURBINE SPEED REFERENCE"},{"key":"BFX_VAL0","val":"BUS FREQUENCY"},{"key":"BFX2_VAL0","val":"UTILITY FREQUENCY"},{"key":"BVX_VAL0","val":"BUS VOLTAGE"},{"key":"BVX2_VAL0","val":"UTILITY VOLTAGE 1"},{"key":"BVX2SEL_VAL0","val":"UTILITY VOLTAGE 2"},{"key":"CHPDTA_VAL0","val":"SUMP A CHIP DETECTOR SENSOR"},{"key":"CHPDTASEL_VAL0","val":"SUMP A CHIP DETECTOR SELECT"},{"key":"CHPDTB_VAL0","val":"SUMP B CHIP DETECTOR SENSOR"},{"key":"CHPDTBSEL_VAL0","val":"SUMP B CHIP DETECTOR SELECT"},{"key":"CHPDTC_VAL0","val":"SUMP C CHIP DETECTOR SENSOR"},{"key":"CHPDTCOM_VAL0","val":"CHIP DETECTOR 1"},{"key":"CHPDTCOMSEL_VAL0","val":"CHIP DETECTOR 2"},{"key":"CHPDTCSEL_VAL0","val":"SUMP C CHIP DETECTOR SELECT"},{"key":"CNT_DM_VAL0","val":"DECEL MIN COUNT"},{"key":"CNT_ES_VAL0","val":"COUNTO OF E STOPS"},{"key":"CNT_ESN_VAL0","val":"EMERGENCY SD WITHOUT MOTOR COUNTER"},{"key":"CNT_OPHRSG_VAL0","val":"OPERATIONAL HOURS  FUEL"},{"key":"CNT_PS3HRS_VAL0","val":"PS3 IN CONTROL RUNNING"},{"key":"CRFDIRVIB_VAL0","val":"CRF VIBE LEVEL FILTERED"},{"key":"CRFNHPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N25"},{"key":"CRFNLPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N2"},{"key":"DE_XVIB_VAL0","val":"GENERATOR BEARING DE X AXIS VIBRATION"},{"key":"DE_YVIB_VAL0","val":"GENERATOR BEARING DE Y AXIS VIBRATION"},{"key":"EAX_VAL0","val":"AUX EXCITATION CURRENT"},{"key":"EAXSEL_VAL0","val":"AUX EXCITATION CURRENT SELECT"},{"key":"EVX_VAL0","val":"EXCITER FIELD"},{"key":"FLAMEDT1_VAL0","val":"FLAME DETECTOR"},{"key":"FO_ALM_VAL0","val":"FUEL SUPPLY ALARM"},{"key":"GBDEVIB_VAL0","val":"AGB VIBE"},{"key":"GFX_VAL0","val":"GENERATOR FREQUENCY"},{"key":"HUMIDITY_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY"},{"key":"HUMIDITYSEL_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY SELECT"},{"key":"LVL_GLUBA_VAL0","val":"GENERATURE LUBE OIL PRESSURE SIGNAL A"},{"key":"MVAR_VAL0","val":"GENERATOR CONTROL VAR SETPOINT"},{"key":"N25DOT_VAL0","val":"(N25) RATE OF CHANGE"},{"key":"N25R_VAL0","val":"SPEED CORRECTED TO T25"},{"key":"N25R2_VAL0","val":"SPEED CORRECTED TO T2"},{"key":"N25REF_VAL0","val":"N25REF TO HMI - SLOW EXCHANGE"},{"key":"NETLOAD_VAL0","val":"NET LOAD ON LP SHAFT #1 BEARING"},{"key":"PVGF_VAL0","val":"VG FILTER PRESS SENSOR"}]';
    //$scope.parameter1
    var insideDiv=document.getElementById('firstparameter');
      insideDiv.onclick = function(event) {
        var i;
        var k;
        for(i=0;i<event.currentTarget.items.length;i++){
          if(event.currentTarget.items[i].val==event.target.childNodes[1].data){
            k=event.currentTarget.items[i].key;
              console.log("Key-"+  k);
            break;
          }
        }
           $rootScope.parameter1=k;
            //  $rootScope.parameter1 = event.target.childNodes[1].data;

            };

    //$scope.parameter2=[];
    var insideDiv=document.getElementById('secondparameter');
      insideDiv.onclick = function(event) {

        var i2;
        var k2;
        for(i2=0;i2<event.currentTarget.items.length;i2++){
          if(event.currentTarget.items[i2].val==event.target.childNodes[1].data){
            k2=event.currentTarget.items[i2].key;
              console.log("Key-"+  k2);
            break;
          }
        }
        $rootScope.parameter2 =k2;
            // $rootScope.parameter2 = event.target.childNodes[1].data;

            };


  $scope.trendAnalysisComparison=function(){


    $scope.data1='!loading';

    /*if($scope.firstparameter==null || $scope.secondparameter==null){
      $scope.trendAnalysis();
      window.alert("Select the Parameters");
    }
    else
    {*/

     $scope.machineNumber=sessionStorage.getItem("SelectedMachines");
     $scope.fromDate=sessionStorage.getItem("startDate");
     $scope.ToDate=sessionStorage.getItem("endDate");
     $scope.eventvalue=sessionStorage.getItem("eventvalue");
     var edate=$rootScope.Edate;

    $scope.EventArr=sessionStorage.getItem("Event");

    //console.log("https://komatsu-maintenance-service.run.aws-usw02-pr.ice.predix.io/komatsu/trendAnalysisComparison?startDate="+$scope.fromDate+"&machineNumber="+$rootScope.MachineNum1+"&param1="+$rootScope.parameter1+"&param2="+$rootScope.parameter2);
    $http.get("https://mchnoprtn-maintenance-data-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/trendAnalysisComparison?startDate="+$scope.fromDate+"&machineNumber="+$scope.machineNumber+"&param1="+$rootScope.parameter1+"&param2="+$rootScope.parameter2).success(function (data, status) {


      //for parameter 1


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


    //for parameter 2


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

        //change quality to value in "x" and value to quality in "Quality" !!IMPORTANT !!
        $scope.ChartData2.push({'x':Date.UTC(DateYear2,DateMonth2,DateDay2,DateHour2,DateMin2,DateSec2),
          'y':data[1][i].value,'Year':DateYear2,'Month':monthNames2[DateMonth2] ,'Day':DateDay2,'Hour':DateHour2,
          "Min":DateMin2,"Seconds":DateSec2,"Quality":data[1][i].quality,"Tag":data[1][i].tag});

        $scope.ChartData2 = $filter('orderBy')($scope.ChartData2,'x');

    }

    if(data!== undefined){
      $scope.responseStatusText=null;
    }
    else {
      $scope.responseStatusText="No Data Available";
    }

$scope.drawchart1=function(){

               var chart = new Highcharts.Chart({
                      chart: {
                      type:'spline',
                      renderTo:'chart1',
                      zoomType: 'x'

                      },
                      title: {
                      text: 'Trend Analysis Comparison',
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

              //Loading the json data from factory


           /* $scope.sendFilterValues=function(){

              var machine=$rootScope.machine;
              var startDate=$rootScope.fDate;
              var endDate=$rootScope.tDate;

              fetchData1.get(startDate,endDate,machine).then(function success(data){

              $scope.dataNotLoaded=false;

              $scope.dataFromService=data;
              $scope.points=$scope.dataFromService.data;
              $scope.AvgLat=0;
             $scope.AvgLon=0;

             for(var i=0;i<$scope.points.length;i++){

                  $scope.AvgLat=$scope.AvgLat+$scope.points[i].latitude;
                  $scope.AvgLon=$scope.AvgLon+$scope.points[i].longitude;
             }
            // console.log($scope.AvgLon);
             //console.log($scope.AvgLat);
            // debugger
             $scope.AvgLat=($scope.AvgLat/$scope.points.length);
             $scope.AvgLon=($scope.AvgLon/$scope.points.length);



              })
              }
*/
         //console.log("https://komatsu-event-service.run.aws-usw02-pr.ice.predix.io/komatsu/eventLocations?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber+"&eventList="+$scope.eventvalue);
         $http.get("https://mchnoprtn-event-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/eventLocations?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber+"&eventList="+$scope.eventvalue).success(function(response){
           $scope.spinner='!running';
           $scope.points=[];
           $scope.points=response;

              $scope.AvgLat=0;
             $scope.AvgLon=0;

             for(var i=0;i<$scope.points.length;i++){

                  $scope.AvgLat=$scope.AvgLat+$scope.points[i].latitude;
                  $scope.AvgLon=$scope.AvgLon+$scope.points[i].longitude;
             }
            //  console.log($scope.AvgLon);
             //console.log($scope.AvgLat);
            // debugger
             $scope.AvgLat=($scope.AvgLat/$scope.points.length);
             $scope.AvgLon=($scope.AvgLon/$scope.points.length);
              debugger
             //console.log($scope.AvgLon);
             //console.log($scope.AvgLat);

              })
                //$scope.sendFilterValues();

              $scope.customIcon = {
                  "scaledSize": [52, 42],
                  "url": "../images/truck-2-64.png"
              };



              //Event history
            /*  $scope.info2 = [{"machineNumber":"1","eventName":"event4","eventDate":"2014-08-23"},
              {"machineNumber":"1","eventName":"event8","eventDate":"2014-08-23"}];*/



              //Event History
              // $scope.info2=[];
              //Loading the json data from factory
            //   $scope.sendTableValue=function(){
            //   var machine=$rootScope.machine;
            //   var startDate=$rootScope.fDate;
            //   var endDate=$rootScope.tDate;

            //   fetchData2.get(startDate,endDate,machine).then(function success(data){
            //   $scope.dataNotLoaded=false;
            //   $scope.dataFromService=data;
            //   $scope.info2=$scope.dataFromService.data;

            //   })
            // }
            //   $scope.sendTableValue();


         // console.log("https://komatsu-event-service.run.aws-usw02-pr.ice.predix.io/komatsu/eventHistory?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber+"&eventList="+$scope.eventvalue);
          $http.get("https://mchnoprtn-event-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/eventHistory?startDate="+$scope.fromDate+"&endDate="+$scope.ToDate+"&machineName="+$scope.machineNumber+"&eventList="+$scope.eventvalue).success(function(response)
          {

              $scope.info2=[];
              $scope.info2=response;
               })
        }]);
});
