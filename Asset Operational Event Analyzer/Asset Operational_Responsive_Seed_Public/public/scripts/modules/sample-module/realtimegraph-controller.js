define(['angular','ngMap', './sample-module'], function (angular,ngMap,controllers) {
  'use strict';

  // Controller definition
controllers.controller('realtimegraphCtrl', ['$rootScope','$scope','$http', '$stomp', '$log','fetchData','SelectedUnits','$filter','fetchData3' ,function ($rootScope, $scope, $http, $stomp,$log, fetchData,SelectedUnits,$filter,fetchData3) {

    $scope.sensorData='[{"key":"ALTI_PMR_1","val":"ATMOSPHERIC PRESSURE"},{"key":"Z_THROTTLE_VAL0","val":"% DROOP SETTING"},{"key":"Z_NSDREF_VAL0","val":"POWER TURBINE SPEED REFERENCE"},{"key":"BFX_VAL0","val":"BUS FREQUENCY"},{"key":"BFX2_VAL0","val":"UTILITY FREQUENCY"},{"key":"BVX_VAL0","val":"BUS VOLTAGE"},{"key":"BVX2_VAL0","val":"UTILITY VOLTAGE 1"},{"key":"BVX2SEL_VAL0","val":"UTILITY VOLTAGE 2"},{"key":"CHPDTA_VAL0","val":"SUMP A CHIP DETECTOR SENSOR"},{"key":"CHPDTASEL_VAL0","val":"SUMP A CHIP DETECTOR SELECT"},{"key":"CHPDTB_VAL0","val":"SUMP B CHIP DETECTOR SENSOR"},{"key":"CHPDTBSEL_VAL0","val":"SUMP B CHIP DETECTOR SELECT"},{"key":"CHPDTC_VAL0","val":"SUMP C CHIP DETECTOR SENSOR"},{"key":"CHPDTCOM_VAL0","val":"CHIP DETECTOR 1"},{"key":"CHPDTCOMSEL_VAL0","val":"CHIP DETECTOR 2"},{"key":"CHPDTCSEL_VAL0","val":"SUMP C CHIP DETECTOR SELECT"},{"key":"CNT_DM_VAL0","val":"DECEL MIN COUNT"},{"key":"CNT_ES_VAL0","val":"COUNTO OF E STOPS"},{"key":"CNT_ESN_VAL0","val":"EMERGENCY SD WITHOUT MOTOR COUNTER"},{"key":"CNT_OPHRSG_VAL0","val":"OPERATIONAL HOURS  FUEL"},{"key":"CNT_PS3HRS_VAL0","val":"PS3 IN CONTROL RUNNING"},{"key":"CRFDIRVIB_VAL0","val":"CRF VIBE LEVEL FILTERED"},{"key":"CRFNHPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N25"},{"key":"CRFNLPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N2"},{"key":"DE_XVIB_VAL0","val":"GENERATOR BEARING DE X AXIS VIBRATION"},{"key":"DE_YVIB_VAL0","val":"GENERATOR BEARING DE Y AXIS VIBRATION"},{"key":"EAX_VAL0","val":"AUX EXCITATION CURRENT"},{"key":"EAXSEL_VAL0","val":"AUX EXCITATION CURRENT SELECT"},{"key":"EVX_VAL0","val":"EXCITER FIELD"},{"key":"FLAMEDT1_VAL0","val":"FLAME DETECTOR"},{"key":"FO_ALM_VAL0","val":"FUEL SUPPLY ALARM"},{"key":"GBDEVIB_VAL0","val":"AGB VIBE"},{"key":"GFX_VAL0","val":"GENERATOR FREQUENCY"},{"key":"HUMIDITY_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY"},{"key":"HUMIDITYSEL_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY SELECT"},{"key":"LVL_GLUBA_VAL0","val":"GENERATURE LUBE OIL PRESSURE SIGNAL A"},{"key":"MVAR_VAL0","val":"GENERATOR CONTROL VAR SETPOINT"},{"key":"N25DOT_VAL0","val":"(N25) RATE OF CHANGE"},{"key":"N25R_VAL0","val":"SPEED CORRECTED TO T25"},{"key":"N25R2_VAL0","val":"SPEED CORRECTED TO T2"},{"key":"N25REF_VAL0","val":"N25REF TO HMI - SLOW EXCHANGE"},{"key":"NETLOAD_VAL0","val":"NET LOAD ON LP SHAFT #1 BEARING"},{"key":"PVGF_VAL0","val":"VG FILTER PRESS SENSOR"}]';
    $scope.machineData='[{"key":"1","val":"Machine 1"},{"key":"2","val":"Machine 2"},{"key":"3","val":"Machine 3"},{"key":"4","val":"Machine 4"}]';



    //fetching the Machine Number:
	var date1=document.getElementById("machineValue");

		date1.addEventListener("dropdown_content_value_changed",function(event) {
		$rootScope.machineNumberFilterSelectedValue=event.detail.key;
		});

    //fetching the sensor value
	var date2=document.getElementById("sensorValue");

	  date2.addEventListener("dropdown_content_value_changed",function(event) {
	     $rootScope.paramterValue=event.detail.key;
	  });

   //for global object:
   Highcharts.setOptions({
  						global : {
  							useUTC : false
  						}
  					});


  //the new code:
  $rootScope.paramterValue="ALTI_PMR_1";

  $rootScope.machineNumberFilterSelectedValue="1";

   Highcharts.setOptions({
  						global : {
  							useUTC : false
  						}
  					});

    $scope.displayDefaultChart=function(){

    var options = {
        chart: {
            renderTo: 'container',
            type: 'spline',
			animation:Highcharts.svg,
			events:{

			   load:function(){
			     var series=this.series[0];
			   }
			}
        },
        title: {
            text: 'Live simulated sensor data'
        },
        xAxis: {
                    type: 'datetime',
                    tickPixelInterval:150
                  },
        yAxis:{
          title:{
            text:'value'
          }
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
		plotLines : [ {
                value : 0,
				width : 1,
				color : '#808080'
			} ]
		,
		tooltip : {
			formatter : function() {
				return '<b>'
						+ this.series.name
						+ '</b><br/>'
						+ Highcharts.dateFormat(
								'%Y-%m-%d %H:%M:%S',
								this.x)
						+ '<br/>'
						+ Highcharts.numberFormat(
								this.y, 2);
			}
		},
		legend : {
			enabled : false
		},
		exporting : {
			enabled : false
		},
		series : [ {
			name : 'Random data',
			data : (function() {
				// generate an array of random data
				var data = [], time = (new Date())
						.getTime(), i;

				for (i = -19; i <= 0; i += 1) {
					data.push({
						x : time + i * 1000,
						y : Math.random(2)
					});
				}
				return data;
			}())
		} ]


    }
    $rootScope.chartToRender = new Highcharts.Chart(options);
 }


     $scope.displayDefaultChart();

    // var chartRefObj=$('#container').highcharts();

    $scope.buttonClicked=function(){
     
		 var seriesToConnectFunction=$rootScope.chartToRender.series[0];
		$scope.connect(seriesToConnectFunction);

	}


	$scope.connect=function(series){

	  // var socket = new SockJS('/gs-guide-websocket');
	  // stompClient = $Stomp.over(socket);
      console.log(series);
      // $scope.stompCall=function(){
            var h='{"tagNumber" : "'+$rootScope.paramterValue+'","timestamp" : "1476111942689","machineNumber" : "'+$rootScope.machineNumberFilterSelectedValue+'","datavalue" : "4.8","quality" : null}'

	  $stomp.setDebug(function (args) {
      $log.debug(args)
      })

      $stomp.connect('https://mchnoprtn-graph-event-consumer.run.aws-usw02-pr.ice.predix.io/gs-guide-websocket', JSON.parse(h))

      // frame = CONNECTED headers
      .then(function (frame) {
      	  
        var subscription = $stomp.subscribe('/topic/greetings', function (payload, headers, res) {
          console.log("payload.body:- "+payload);
          $scope.payload = payload;
          // $scope.tagNumberL = $scope.payload.tagNumber;
          // $scope.machineNumberL=$scope.payload.machineNumber;

            console.log("For="+$scope.payload.machineNumber+ " & " +$scope.payload.tagNumber);

				if($scope.payload.tagNumber==$rootScope.paramterValue && $rootScope.machineNumberFilterSelectedValue==$scope.payload.machineNumber){
					//console.info("("+mahcineNumberL+":"+parameterValue+") >> "+parsedBody.timestamp+"=="+parsedBody.datavalue)
					//var time = (new Date()).getTime()
          series.addPoint([ Number($scope.payload.timestamp),Number($scope.payload.datavalue) ], true, true);
				}
            })
       })
	}
// }



  }]);
});
