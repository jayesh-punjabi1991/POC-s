  define(['angular','ngMap', './sample-module'], function (angular,ngMap, controllers) {
    'use strict';

    // Controller definition
  controllers.controller('analyticsCtrl', ['$rootScope','$scope','$http', '$log','fetchData','SelectedUnits','$filter','fetchData3',function ($rootScope, $scope, $http, $log, fetchData,SelectedUnits,$filter,fetchData3) {
       // $scope.dataNotLoaded="this is a test message";
       $scope.valForLimit=100;
        $rootScope.sDate="22-Aug-2016";
        $rootScope.eDate="31-Dec-2016";
        $rootScope.sensorValue='ALTI_PMR_1';
        $rootScope.machineValue=1;
         $scope.dataToRender=[];
  
       $scope.sensorData='[{"id":"ALTI_PMR_1","val":"ATMOSPHERIC PRESSURE"},{"id":"Z_THROTTLE_VAL0","val":"% DROOP SETTING"},{"id":"Z_NSDREF_VAL0","val":"POWER TURBINE SPEED REFERENCE"},{"id":"BFX_VAL0","val":"BUS FREQUENCY"},{"id":"BFX2_VAL0","val":"UTILITY FREQUENCY"},{"id":"BVX_VAL0","val":"BUS VOLTAGE"},{"id":"BVX2_VAL0","val":"UTILITY VOLTAGE 1"},{"id":"BVX2SEL_VAL0","val":"UTILITY VOLTAGE 2"},{"id":"CHPDTA_VAL0","val":"SUMP A CHIP DETECTOR SENSOR"},{"id":"CHPDTASEL_VAL0","val":"SUMP A CHIP DETECTOR SELECT"},{"id":"CHPDTB_VAL0","val":"SUMP B CHIP DETECTOR SENSOR"},{"id":"CHPDTBSEL_VAL0","val":"SUMP B CHIP DETECTOR SELECT"},{"id":"CHPDTC_VAL0","val":"SUMP C CHIP DETECTOR SENSOR"},{"id":"CHPDTCOM_VAL0","val":"CHIP DETECTOR 1"},{"id":"CHPDTCOMSEL_VAL0","val":"CHIP DETECTOR 2"},{"id":"CHPDTCSEL_VAL0","val":"SUMP C CHIP DETECTOR SELECT"},{"id":"CNT_DM_VAL0","val":"DECEL MIN COUNT"},{"id":"CNT_ES_VAL0","val":"COUNTO OF E STOPS"},{"id":"CNT_ESN_VAL0","val":"EMERGENCY SD WITHOUT MOTOR COUNTER"},{"id":"CNT_OPHRSG_VAL0","val":"OPERATIONAL HOURS  FUEL"},{"id":"CNT_PS3HRS_VAL0","val":"PS3 IN CONTROL RUNNING"},{"id":"CRFDIRVIB_VAL0","val":"CRF VIBE LEVEL FILTERED"},{"id":"CRFNHPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N25"},{"id":"CRFNLPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N2"},{"id":"DE_XVIB_VAL0","val":"GENERATOR BEARING DE X AXIS VIBRATION"},{"id":"DE_YVIB_VAL0","val":"GENERATOR BEARING DE Y AXIS VIBRATION"},{"id":"EAX_VAL0","val":"AUX EXCITATION CURRENT"},{"id":"EAXSEL_VAL0","val":"AUX EXCITATION CURRENT SELECT"},{"id":"EVX_VAL0","val":"EXCITER FIELD"},{"id":"FLAMEDT1_VAL0","val":"FLAME DETECTOR"},{"id":"FO_ALM_VAL0","val":"FUEL SUPPLY ALARM"},{"id":"GBDEVIB_VAL0","val":"AGB VIBE"},{"id":"GFX_VAL0","val":"GENERATOR FREQUENCY"},{"id":"HUMIDITY_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY"},{"id":"HUMIDITYSEL_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY SELECT"},{"id":"LVL_GLUBA_VAL0","val":"GENERATURE LUBE OIL PRESSURE SIGNAL A"},{"id":"MVAR_VAL0","val":"GENERATOR CONTROL VAR SETPOINT"},{"id":"N25DOT_VAL0","val":"(N25) RATE OF CHANGE"},{"id":"N25R_VAL0","val":"SPEED CORRECTED TO T25"},{"id":"N25R2_VAL0","val":"SPEED CORRECTED TO T2"},{"id":"N25REF_VAL0","val":"N25REF TO HMI - SLOW EXCHANGE"},{"id":"NETLOAD_VAL0","val":"NET LOAD ON LP SHAFT #1 BEARING"},{"id":"PVGF_VAL0","val":"VG FILTER PRESS SENSOR"}]';


      $scope.machineSelected='[{"id":"1","val":"1"},{"id":"2","val":"2"},{"id":"3","val":"3"},{"id":"4","val":"4"},{"id":"5","val":"5"},{"id":"6","val":"6"},{"id":"7","val":"7"},{"id":"8","val":"8"},{"id":"9","val":"9"},{"id":"10","val":"10"},{"id":"11","val":"11"},{"id":"12","val":"12"}]';



  //fetching the date Values:
    var picker = document.getElementById('rangePick');
        picker.addEventListener('px-datetime-range-submitted', function (ev) {
        var date=ev.currentTarget;
        var selectedDate=date.range;
        var FromDate=selectedDate.from;
        var ToDate=selectedDate.to;

        $scope.startDate=$filter('date')(FromDate,'dd-MMM-yyyy');
        $scope.endDate=$filter('date')(ToDate,'dd-MMM-yyyy');
        $rootScope.sDate=$scope.startDate;
        $rootScope.eDate=$scope.endDate;

        });

  //fetching the Sensor values:
  var date=document.getElementById("sensorValue");
// var date4=document.getElementById("sensorValue").selectedIndex;
//  console.log("K2-"+date4);
 // console.log("K3-"+date4[0].id);

  date.addEventListener("dropdown_content_value_changed", function(event) {
    // debugger
    console.log("event.detail.id:------>"+event.detail.id);
    var i;
    var k;
    for(i=0;i<event.target.items.length;i++){
      if(event.target.items[i].val==event.detail.textValue){
        k=event.target.items[i].id;
          console.log("id-"+  k);
        break;
      }
    }
    //  $rootScope.sensorValue=event.detail.textValue;
     $rootScope.sensorValue=k;
  });



  //fetching the Machine Number:
  var date2=document.getElementById("machineValue");

  date2.addEventListener("dropdown_content_value_changed", function(event) {
      $rootScope.machineValue=event.detail.textValue;

  });




  $scope.SearchAnalysis=function(){

     $http.get('https://mchnoprtn-predix-analytics-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/analyticPost?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&sensor='+$rootScope.sensorValue+'&machineNumber='+$rootScope.machineValue+'&limit='+$scope.valForLimit)
        .then(function(res){

     $scope.statusToDisplay=res.data.analyticExecutionState;

     $http.get('https://mchnoprtn-predix-analytics-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/analyticStatus').then(function(response){

     $scope.statusToDisplay=response.data.analyticExecutionState;

     if( $scope.statusToDisplay==='FAILED'){
       $('#container').html(' ');
     };


     $http.get('https://mchnoprtn-predix-analytics-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/analyticResult').then(function(r){
                    var data1=r.data['0'];
                    var data2=r.data['1'];
                    	 /*angular.forEach(dataForChart,function(value,id){

                    	 	 angular.forEach(value,function(v,k){
                    	 	 	$scope.dataToRender.push(v[1]);
                    	 	 	$scope.sDate=v[0];
                    	 	 })
                    	 })*/
                       // var data1=$scope.dataToRender;
                        //var dateToPass=$scope.sDate;
                    	$scope.getChart(data1,data2);

                    })
               })
           })
    }


$scope.getChart=function(fetchedData1,fetchedData2) {

    var options = {
        chart: {
            renderTo: 'container',
            type: 'scatter'
        },
        title: {
            text: 'Kalman-filter'
        },
        xAxis: {
                    type: 'datetime',
                    ordinal: false, //this sets the fixed time formats
                    minorTickLength: 0
                  },
        subtitle: {
            text: 'Anomaly detection'
        },
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
            name: 'Filtered',
            data:fetchedData1,
            marker: {
                radius:4

            }
        //pointStart:sdate
        },
        {
         name:'Anomaly',
         data:fetchedData2
         //pointStart:sdate
        }]
    };

    var chart = new Highcharts.Chart(options);

  };
}]);
});
