define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('graphCtrl', ['$rootScope','$scope','$http','goToGraphService','$filter','SelectedUnits',function($rootScope,$scope,$http,goToGraphService,$filter,SelectedUnits) {


        Highcharts.setOptions({
        chart: {
        style: {
        fontFamily: 'geInspira'
        }
        }
        });



        $scope.loadingSpinner='yes';
        $rootScope.smArr=[];
        $scope.arr1=[];
        $scope.data1='[{"key":"one", "val": "parameter_1"}, {"key":"three", "val": "parameter_4"}, {"key":"three", "val": "parameter_5"}, {"key":"three", "val": "parameter_6"}, {"key":"three", "val": "parameter_7"}, {"key":"three", "val": "parameter_8"}]';

       // $scope.SplDrop='[ {"key":"one", "val": "parameter_1"}, {"key":"four", "val": "parameter_4"}, {"key":"five", "val": "parameter_5"}, {"key":"three", "val": "parameter_6"}, {"key":"three", "val": "parameter_7"}, {"key":"three", "val": "parameter_8"}]';

        // $scope.SplDrop='[{"key":"one","val":"parameter_1"},{"key":"four","val":"parameter_4"},{"key":"five","val":"parameter_5"},{"key":"six","val":"parameter_6"},{"key":"seven","val":"parameter_7"},{"key":"eight","val":"parameter_8"},{"key":"nine","val":"parameter_9"},{"key":"ten","val":"parameter_10"},{"key":"eleven","val":"parameter_11"},{"key":"twelve","val":"parameter_12"},{"key":"thirteen","val":"parameter_13"},{"key":"fourteen","val":"parameter_14"},{"key":"fifteen","val":"parameter_15"},{"key":"sixteen","val":"parameter_16"},{"key":"seventeen","val":"parameter_17"},{"key":"eighteen","val":"parameter_18"},{"key":"nineteen","val":"parameter_19"},{"key":"twenty","val":"parameter_20"},{"key":"twenty-one","val":"parameter_21"},{"key":"twenty-two","val":"parameter_22"},{"key":"twenty-three","val":"parameter_23"},{"key":"twenty-four","val":"parameter_24"},{"key":"twenty-five","val":"parameter_25"},{"key":"twenty-six","val":"parameter_26"},{"key":"twenty-seven","val":"parameter_27"},{"key":"twenty-eight","val":"parameter_28"},{"key":"twenty-nine","val":"parameter_29"},{"key":"thirty","val":"parameter_30"},{"key":"thirty-one","val":"parameter_31"},{"key":"thirty-two","val":"parameter_32"},{"key":"thirty-three","val":"parameter_33"},{"key":"thirty-four","val":"parameter_34"},{"key":"thirty-five","val":"parameter_35"},{"key":"thirty-six","val":"parameter_36"},{"key":"thirty-seven","val":"parameter_37"},{"key":"thirty-eight","val":"parameter_38"},{"key":"thirty-nine","val":"parameter_39"},{"key":"forty","val":"parameter_40"},{"key":"forty-one","val":"parameter_41"},{"key":"forty-two","val":"parameter_42"},{"key":"forty-three","val":"parameter_43"},{"key":"forty-four","val":"parameter_44"},{"key":"forty-five","val":"parameter_45"}]';
        $scope.SplDrop='[{"key":"ALTI_PMR_1","val":"ATMOSPHERIC PRESSURE"},{"key":"Z_THROTTLE_VAL0","val":"% DROOP SETTING"},{"key":"Z_NSDREF_VAL0","val":"POWER TURBINE SPEED REFERENCE"},{"key":"BFX_VAL0","val":"BUS FREQUENCY"},{"key":"BFX2_VAL0","val":"UTILITY FREQUENCY"},{"key":"BVX_VAL0","val":"BUS VOLTAGE"},{"key":"BVX2_VAL0","val":"UTILITY VOLTAGE 1"},{"key":"BVX2SEL_VAL0","val":"UTILITY VOLTAGE 2"},{"key":"CHPDTA_VAL0","val":"SUMP A CHIP DETECTOR SENSOR"},{"key":"CHPDTASEL_VAL0","val":"SUMP A CHIP DETECTOR SELECT"},{"key":"CHPDTB_VAL0","val":"SUMP B CHIP DETECTOR SENSOR"},{"key":"CHPDTBSEL_VAL0","val":"SUMP B CHIP DETECTOR SELECT"},{"key":"CHPDTC_VAL0","val":"SUMP C CHIP DETECTOR SENSOR"},{"key":"CHPDTCOM_VAL0","val":"CHIP DETECTOR 1"},{"key":"CHPDTCOMSEL_VAL0","val":"CHIP DETECTOR 2"},{"key":"CHPDTCSEL_VAL0","val":"SUMP C CHIP DETECTOR SELECT"},{"key":"CNT_DM_VAL0","val":"DECEL MIN COUNT"},{"key":"CNT_ES_VAL0","val":"COUNTO OF E STOPS"},{"key":"CNT_ESN_VAL0","val":"EMERGENCY SD WITHOUT MOTOR COUNTER"},{"key":"CNT_OPHRSG_VAL0","val":"OPERATIONAL HOURS  FUEL"},{"key":"CNT_PS3HRS_VAL0","val":"PS3 IN CONTROL RUNNING"},{"key":"CRFDIRVIB_VAL0","val":"CRF VIBE LEVEL FILTERED"},{"key":"CRFNHPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N25"},{"key":"CRFNLPVIB_VAL0","val":"CRF VIBE LEVEL FILTERED TO N2"},{"key":"DE_XVIB_VAL0","val":"GENERATOR BEARING DE X AXIS VIBRATION"},{"key":"DE_YVIB_VAL0","val":"GENERATOR BEARING DE Y AXIS VIBRATION"},{"key":"EAX_VAL0","val":"AUX EXCITATION CURRENT"},{"key":"EAXSEL_VAL0","val":"AUX EXCITATION CURRENT SELECT"},{"key":"EVX_VAL0","val":"EXCITER FIELD"},{"key":"FLAMEDT1_VAL0","val":"FLAME DETECTOR"},{"key":"FO_ALM_VAL0","val":"FUEL SUPPLY ALARM"},{"key":"GBDEVIB_VAL0","val":"AGB VIBE"},{"key":"GFX_VAL0","val":"GENERATOR FREQUENCY"},{"key":"HUMIDITY_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY"},{"key":"HUMIDITYSEL_VAL0","val":"ANTI-ICE AMBIENT HUMIDITY SELECT"},{"key":"LVL_GLUBA_VAL0","val":"GENERATURE LUBE OIL PRESSURE SIGNAL A"},{"key":"MVAR_VAL0","val":"GENERATOR CONTROL VAR SETPOINT"},{"key":"N25DOT_VAL0","val":"(N25) RATE OF CHANGE"},{"key":"N25R_VAL0","val":"SPEED CORRECTED TO T25"},{"key":"N25R2_VAL0","val":"SPEED CORRECTED TO T2"},{"key":"N25REF_VAL0","val":"N25REF TO HMI - SLOW EXCHANGE"},{"key":"NETLOAD_VAL0","val":"NET LOAD ON LP SHAFT #1 BEARING"},{"key":"PVGF_VAL0","val":"VG FILTER PRESS SENSOR"}]';
        $scope.machineNumber=SelectedUnits.getMachineNumber();
        $scope.newUnits=[];
        angular.forEach($scope.machineNumber,function(data,key2){
        $scope.newUnits.push({"machineNumber":data});
        });


        $scope.machineDrop=[];

        $scope.machineList=sessionStorage.getItem("SelectedMachines");
        $scope.machineDropdown=$scope.machineList.toString();

        $scope.toAngularForEach=$scope.machineDropdown.split(',');
        console.log($scope.toAngularForEach)

        angular.forEach($scope.toAngularForEach,function(v,k){
          console.log(v);
      //  console.log(k);
          $scope.machineDrop.push({ "key":k,"val":v});

        })

        //Display the Selected Machine Numbers in the heading
        $scope.displayUnits=[];
        angular.forEach($scope.newUnits,function(data,key)
        {
        $scope.displayUnits.push(data.machineNumber);
        });
        $scope.string=$scope.displayUnits.join(",");

        $scope.machineList=[];
        $scope.fromDate=[];
        $scope.toDate=[];

        $scope.machineList=sessionStorage.getItem("SelectedMachines");

        $scope.fromDate=sessionStorage.getItem("startDate");
        $scope.toDate=sessionStorage.getItem("endDate");
        $scope.objtoChart=[];

        $scope.getdata=function(){

        $scope.machineList=sessionStorage.getItem("SelectedMachines");
        var machines=$scope.machineList.toString();
        $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/eventTabulation?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines).then(function(res){
        $scope.info=res.data;
        $scope.loadingData='no';
        })
        //date :10-Jan-2015

        $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/histogramResult?startDate='+$scope.fromDate+'&sensor=ALTI_PMR_1&machineNumber=1&tagLmt=50').then(function success(res){
        $scope.arrObj=[];
         var passToHisto=[];
        $scope.dataSet=res.data;
         //console.log(angular.toJson($scope.dataSet));

         angular.forEach($scope.dataSet,function(v,k){
          passToHisto.push(Number(v.datapointValue),v.datapointValueCount);

         })

           $scope.drawfirstChart(passToHisto);

        })

        }
        $scope.getdata();




        $scope.pickFilter=function(){
        SelectedUnits.addString($scope.displayUnits);
        };



     //done with populating Table

        $scope.drawfirstChart=function(addData) {

              var chart = new Highcharts.Chart({

                    chart: {
                            alignTicks:true,
                          renderTo:'chart1',
                            type:'column',
                            zoomType: 'x'
                            },
                    title: {
                      text: 'Histogram',
                      style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25
                    },

                    legend: {
                      enabled: false
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
                    tooltip: {},
                    xAxis: {
                      title: {
                        text: 'Parameter'
                      },

                    },
                    yAxis: {
                      title: {
                        text: ''
                      }
                    }, plotOptions: {
                      column: {
                          stacking: 'normal',
                          dataLabels: {
                              enabled: true,
                              color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                              style: {
                                  textShadow: '0 0 3px black'
                              }
                          },

                      }
                  },
                   series:[
                    {
                      name:'frequency',
                      data:addData
                    }

                    ]
                  });

        };


       $scope.trendChart=function(abc){
                    var chart = new Highcharts.Chart({

                    chart: {
                    type:'line',
                    renderTo:'chart2',
                    zoomType:'x'
                    },
                    title: {
                    text: 'Trend Analysis',
                   style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25},
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
                       text: 'Parameter'
                      },
                       min:-1
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
                    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#000000'),
                    shadow: true
                    },
                    tooltip: {
                    // formatter: function () {
                    // return '<b>Repair Type: </b>'+this.point.data+'<br>'+'<b>Date </b>:'+this.point.Day+' '+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
                    // },
                    },annotationsOptions: {
                    enabledButtons: false
                    },
                    series: abc

                    })
      }



        $scope.draw2Chart=function(){

          $scope.renderTrend=function(){

             $scope.machineList=sessionStorage.getItem("SelectedMachines");
            $scope.fromDate=sessionStorage.getItem("startDate");
            $scope.toDate=sessionStorage.getItem("endDate");
            var machines=$scope.machineList.toString();
            $scope.finaldata=[];


          $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName=ALTI_PMR_1').then(function(response){
          var datafetched=response.data;
           $scope.finalData=[];
            //console.log(angular.toJson(datafetched));
              var length=datafetched.length;
          for(var i=0;i<length;i++){


          var newData=datafetched[i];
          var len=datafetched[i].length;

          $scope.ChartData = [];
          var repairDateYear =[];
          var repairDateDay=[];
          var repairDateMonth=[];
          var repairDateHour=[];
          var repairDateMin=[];
          var repairDateSec=[];
          var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


          for (var j = 0; j <len; j++) {
          repairDateYear=$filter('date')(new Date(newData[j].date),"yyyy");
          repairDateMonth=$filter('date')(new Date(newData[j].date),"M");
          repairDateDay=$filter('date')(new Date(newData[j].date),"d");
          repairDateMonth=repairDateMonth-1;
          repairDateHour=$filter('date')(new Date(newData[j].date),"HH");
          repairDateMin=$filter('date')(new Date(newData[j].date),"mm");
          repairDateSec=$filter('date')(new Date(newData[j].date),"ss")

          $scope.ChartData.push({"x":Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin,repairDateSec),"y":newData[j].value});
          $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');

          var name=newData[i]["tag"];
          }
           $scope.finalData.push({'name':name,'data':$scope.ChartData});
          }
         // console.log( angular.toJson($scope.finalData));

          $scope.trendChart($scope.finalData);
          })
          }
          $scope.renderTrend();
        }
      $scope.draw2Chart();


         $scope.drawFourthChart=function(abc,val){
                    var chart = new Highcharts.Chart({
                    chart: {
                    type:'line',
                    renderTo:'chart4',
                    zoomType:'x'
                    },
                    title: {
                    text: 'Threshold Analysis',
                    style: {
                        fontSize: '1.85em',
                         fontWeight: 'bold'
                    },
                x: 25},
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
                       text: 'Parameter'
                      },
                       min: -1
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
                                 plotOptions: {
                          series: {
                              threshold:val,
                              trackByArea: true
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
                    // formatter: function () {
                    // return '<b>Repair Type: </b>'+this.point.data+'<br>'+'<b>Date </b>:'+this.point.Day+' '+this.point.Month+','+this.point.Year+'<br><b>Counts:</b>'+this.y;
                    // },
                    },annotationsOptions: {
                    enabledButtons: false
                    },
                    series: abc
                    })
      }



        $scope.pickChart3=function(){

          $scope.formatForChart=function(){

            $scope.machineList=sessionStorage.getItem("SelectedMachines");

            $scope.fromDate=sessionStorage.getItem("startDate");
            $scope.toDate=sessionStorage.getItem("endDate");
            var machines=$scope.machineList.toString();
            $scope.finaldata=[];
        //  console.log('https://komatsu-graph-service.run.aws-usw02-pr.ice.predix.io/komatsu/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName=parameter_1');


          $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName=ALTI_PMR_1').then(function(response){
          var datafetched=response.data;
           $scope.finalData=[];
            //console.log(angular.toJson(datafetched));
              var length=datafetched.length;
          for(var i=0;i<length;i++){


          var newData=datafetched[i];
          var len=datafetched[i].length;

          $scope.ChartData = [];
          var repairDateYear =[];
          var repairDateDay=[];
          var repairDateMonth=[];
          var repairDateHour=[];
          var repairDateMin=[];
          var repairDateSec=[];
          var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


          for (var j = 0; j <len; j++) {
          repairDateYear=$filter('date')(new Date(newData[j].date),"yyyy");
          repairDateMonth=$filter('date')(new Date(newData[j].date),"M");
          repairDateDay=$filter('date')(new Date(newData[j].date),"d");
          repairDateMonth=repairDateMonth-1;
          repairDateHour=$filter('date')(new Date(newData[j].date),"HH");
          repairDateMin=$filter('date')(new Date(newData[j].date),"mm");
          repairDateSec=$filter('date')(new Date(newData[j].date),"ss")

          $scope.ChartData.push({"x":Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin,repairDateSec),"y":newData[j].value});
          $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');

          var name=newData[i]["tag"];
          }
           $scope.zones=[{'value': $scope.MachineLowThreshold,color: 'blue' },{ color: 'red' }];

          $scope.finalData.push({'name':name,'data':$scope.ChartData,'zones':$scope.zones});
          }
         // console.log( angular.toJson($scope.finalData));

         $scope.val=5;
                      $scope.drawFourthChart($scope.finalData,$scope.val);
          })
          }
          $scope.formatForChart();

        }

        $scope.pickChart3();

                $scope.ChangeChart=function(){


                }



                //dropdown change event:
                var dropDown2 =document.getElementById('valforChart2');

                      dropDown2.addEventListener('dropdown_content_value_changed',function(ev){
                      //console.log(ev.currentTarget.innerText);
                      debugger
                      var i2;
                      var k2;
                      for(i2=0;i2<ev.target.items.length;i2++){
                        if(ev.target.items[i2].val==ev.currentTarget.displayValue){
                          k2=ev.target.items[i2].key;
                            console.log("Key-"+  k2);
                          break;
                        }
                      }
                      // $rootScope.parameterVal=k;
                      // var param=ev.currentTarget.innerText;
                      var param=k2;
                      $scope.machineList=sessionStorage.getItem("SelectedMachines");
                      var machines=$scope.machineList.toString();
                      $scope.fromDate=sessionStorage.getItem("startDate");
                      $scope.toDate=sessionStorage.getItem("endDate");

                      $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName='+param).then(function(response){
                      var datafetched=response.data;
                       $scope.finalData=[];
                        //console.log(angular.toJson(datafetched));
                          var length=datafetched.length;
                      for(var i=0;i<length;i++){


                      var newData=datafetched[i];
                      var len=datafetched[i].length;

                      $scope.ChartData = [];
                      var repairDateYear =[];
                      var repairDateDay=[];
                      var repairDateMonth=[];
                      var repairDateHour=[];
                      var repairDateMin=[];
                      var repairDateSec=[];
                      var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


                      for (var j = 0; j <len; j++) {
                      repairDateYear=$filter('date')(new Date(newData[j].date),"yyyy");
                      repairDateMonth=$filter('date')(new Date(newData[j].date),"M");
                      repairDateDay=$filter('date')(new Date(newData[j].date),"d");
                      repairDateMonth=repairDateMonth-1;
                      repairDateHour=$filter('date')(new Date(newData[j].date),"HH");
                      repairDateMin=$filter('date')(new Date(newData[j].date),"mm");
                      repairDateSec=$filter('date')(new Date(newData[j].date),"ss")

                      $scope.ChartData.push({"x":Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin,repairDateSec),"y":newData[j].value});
                      $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');

                     var name=newData[i]["tag"];

                      //debugger
                      }
                       $scope.finalData.push({'name':name,'data':$scope.ChartData});
                      }
                  // console.log( angular.toJson($scope.finalData));
                   //debugger
                      $scope.trendChart($scope.finalData);
                      })
                })


                $scope.eventArr=[];
                $rootScope.newMachineList = [];
                var evenTable=document.getElementById('eventGraphtable');

                // Changed Here

          /*evenTable.addEventListener('px-row-click', function(event){
                var clickedRow = event.detail.row;

                var statusFlag=event.detail.row["_selected"];




               if(statusFlag == false) {
                var countValue=clickedRow.row.count.value;
                var machineNum=clickedRow.row.machineNumber.value;
                var eventName=clickedRow.row.eventName.value;
                $rootScope.smArr.push({"MachineNumber":machineNum,"EventName":eventName,"Count":countValue})
                }
                else
                {
                var countValue=clickedRow.row.count.value;
                var machineNum=clickedRow.row.machineNumber.value;
                var eventName=clickedRow.row.eventName.value;
                $rootScope.smArr.pop({"MachineNumber":machineNum,"EventName":eventName,"Count":countValue})
                }




                  for(var i=0;i<$rootScope.smArr.length;i++)
                  {
                      $scope.arr1.push( $rootScope.smArr[i].MachineNumber);
                  }

                 $rootScope.newMachineList=$scope.arr1;

                  $rootScope.uniqueNewMachineList= $rootScope.newMachineList.filter(function(item, i, ar)
                    { return ar.indexOf(item) === i; });

            });*/

                  evenTable.addEventListener('px-row-click', function(event){

                var clickedRow = event.detail.row;

                var statusFlag=event.detail.row["_selected"];
                 $scope.smArr1=[];
                 var countValue=clickedRow.row.count;
                 var machineNum=clickedRow.row.machineNumber;
                 var eventName=clickedRow.row.eventName;
                 var tempData={"MachineNumber":machineNum,"EventName":eventName,"Count":countValue};

                if(statusFlag == false) {
                $rootScope.smArr.push({"MachineNumber":machineNum,"EventName":eventName,"Count":countValue});
                }
                else if(statusFlag == true){
                $scope.smArr1.push({"MachineNumber":machineNum,"EventName":eventName,"Count":countValue});
                }
                for(var i=0;i<$rootScope.smArr.length;i++)
                {
                  for(var j=0;j<$scope.smArr1.length;j++) {
                  if (($rootScope.smArr[i].MachineNumber == $scope.smArr1[j].MachineNumber) && ($rootScope.smArr[i].EventName == $scope.smArr1[j].EventName) && ($rootScope.smArr[i].Count == $scope.smArr1[j].Count)) {
                       //delete row from data
                       $rootScope.smArr.splice(i, 1);
                  }
                }
                }

                  $scope.arr1=[];
                  for(var i=0;i<$rootScope.smArr.length;i++)
                  {
                      var macNum =$rootScope.smArr[i].MachineNumber;
                       $scope.arr1.push( macNum );
                  }

                  $rootScope.newMachineList=$scope.arr1;

                  $rootScope.uniqueNewMachineList= $rootScope.newMachineList.filter(function(item, i, ar)
                    { return ar.indexOf(item) === i; });

            });

            // $rootScope.newMachineList=$filter('orderBy')($scope.arr1,'machinenos');



                 var dropDown3=document.getElementById('valforChart4');

                      dropDown3.addEventListener('dropdown_content_value_changed',function(ev){
                      //console.log(ev.currentTarget.innerText);
                      debugger
                      var i4;
                      var k4;
                      for(i4=0;i4<ev.target.items.length;i4++){
                        if(ev.target.items[i4].val==ev.currentTarget.displayValue){
                          k4=ev.target.items[i4].key;
                            console.log("Key-"+  k4);
                          break;
                        }
                      }
                      // var param=ev.currentTarget.innerText;
                      var param=k4;
                      $scope.machineList=sessionStorage.getItem("SelectedMachines");
                      var machines=$scope.machineList.toString();
                      $scope.fromDate=sessionStorage.getItem("startDate");
                      $scope.toDate=sessionStorage.getItem("endDate");
                      // console.log('https://komatsu-graph-service.run.aws-usw02-pr.ice.predix.io/komatsu/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName='+param);
                      $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/trendAnalysis?startDate='+$scope.fromDate+'&endDate='+$scope.toDate+'&machineName='+machines+'&tagName='+param).then(function(response){
                      var datafetched=response.data;
                     // console.log(datafetched);
                      $scope.finalData=[];
                      var length=datafetched.length;
                      for(var i=0;i<length;i++){


                      var newData=datafetched[i];
                      var len=datafetched[i].length;

                      $scope.ChartData = [];
                      var repairDateYear =[];
                      var repairDateDay=[];
                      var repairDateMonth=[];
                      var repairDateHour=[];
                      var repairDateMin=[];
                      var repairDateSec=[];
                      var monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


                      for (var j = 0; j <len; j++) {
                      repairDateYear=$filter('date')(new Date(newData[j].date),"yyyy");
                      repairDateMonth=$filter('date')(new Date(newData[j].date),"M");
                      repairDateDay=$filter('date')(new Date(newData[j].date),"d");
                      repairDateMonth=repairDateMonth-1;
                      repairDateHour=$filter('date')(new Date(newData[j].date),"HH");
                      repairDateMin=$filter('date')(new Date(newData[j].date),"mm");
                      repairDateSec=$filter('date')(new Date(newData[j].date),"ss")
                      $scope.ChartData.push({"x":Date.UTC(repairDateYear,repairDateMonth,repairDateDay,repairDateHour,repairDateMin,repairDateSec),"y":newData[j].value});
                      $scope.ChartData = $filter('orderBy')($scope.ChartData,'x');

                      var name=newData[j]["tag"];
                      }
                     $scope.zones=[{'value': $scope.MachineLowThreshold,color: 'blue' },{ color: 'red' }];

                      $scope.finalData.push({'name':name,'data':$scope.ChartData,'zones':$scope.zones});
                      }
                       $scope.val=$scope.MachineLowThreshold;
                      $scope.drawFourthChart($scope.finalData,$scope.val);
                      })
                })


                  $rootScope.eventValArray=[];
                  $scope.goToEventHistory=function(){

                  sessionStorage.setItem("machineNumFrGraph",$rootScope.uniqueNewMachineList);
                  $scope.machineNumFrGraph=sessionStorage.getItem("machineNumFrGraph");
                  $rootScope.EventArray=$rootScope.smArr;

                  sessionStorage.setItem("Event",JSON.stringify($rootScope.smArr));

                  for(var i=0;i<$rootScope.smArr.length;i++){
                  var eventVal=$rootScope.smArr[i].EventName;
                  $rootScope.eventValArray.push(eventVal);

                  }
                  sessionStorage.setItem("eventValues",($rootScope.eventValArray).toString());
                  }


                  var dropforParam=document.getElementById('valforChart1');

                  var dropfroMachine=document.getElementById('valf');

                  dropfroMachine.addEventListener('dropdown_content_value_changed',function(event){
                  var valF=event.currentTarget.innerText;
                  console.log(valF);

                  $rootScope.machineVal=valF;
                  })

                  dropforParam.addEventListener('dropdown_content_value_changed',function(event){
                  debugger
                  var valFromDrop=event.currentTarget.displayValue;
                  var i;
                  var k;
                  for(i=0;i<event.target.items.length;i++){
                    if(event.target.items[i].val==valFromDrop){
                      k=event.target.items[i].key;
                        console.log("Key-"+  k);
                      break;
                    }
                  }
                  $rootScope.parameterVal=k;
                  // $rootScope.parameterVal=valFromDrop;



                  })
                 $scope.getMachineCol=function(){
                   var passToHisto=[];

                    $scope.fromDate=sessionStorage.getItem("startDate");
                    $scope.toDate=sessionStorage.getItem("endDate");
                    var   machines=$rootScope.machineVal;
                    var param=$rootScope.parameterVal;

                    console.log('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/histogramResult?startDate='+$scope.fromDate+'&sensor='+param+'&machineNumber='+machines+'&tagLmt=50');

                    $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/histogramResult?startDate='+$scope.fromDate+'&sensor='+param+'&machineNumber='+machines+'&tagLmt=50').then(function success(res){

                    var data=res.data;
                     console.log(data);

                     angular.forEach(data,function(v,k){
                      passToHisto.push(Number(v.datapointValue),v.datapointValueCount);

                     })
                      console.log(passToHisto);
                       $scope.drawfirstChart(passToHisto);


                    });




                 }


    }]);
});
