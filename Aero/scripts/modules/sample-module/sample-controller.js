define(['angular','ngMap', './sample-module'], function (angular,ngMap,controllers) {
  'use strict';

  // Controller definition
controllers.controller('ExtraCtrl', ['$rootScope','$scope','$http', '$log','$filter',function ($rootScope, $scope, $http, $log, $filter) {
    
    
/*    $scope.sensorData='[{"key":"one","val":"parameter_1"},{"key":"four","val":"parameter_4"},{"key":"five","val":"parameter_5"},{"key":"six","val":"parameter_6"},{"key":"seven","val":"parameter_7"},{"key":"eight","val":"parameter_8"},{"key":"nine","val":"parameter_9"},{"key":"ten","val":"parameter_10"},{"key":"eleven","val":"parameter_11"},{"key":"twelve","val":"parameter_12"},{"key":"thirteen","val":"parameter_13"},{"key":"fourteen","val":"parameter_14"},{"key":"fifteen","val":"parameter_15"},{"key":"sixteen","val":"parameter_16"},{"key":"seventeen","val":"parameter_17"},{"key":"eighteen","val":"parameter_18"},{"key":"nineteen","val":"parameter_19"},{"key":"twenty","val":"parameter_20"},{"key":"twenty-one","val":"parameter_21"},{"key":"twenty-two","val":"parameter_22"},{"key":"twenty-three","val":"parameter_23"},{"key":"twenty-four","val":"parameter_24"},{"key":"twenty-five","val":"parameter_25"},{"key":"twenty-six","val":"parameter_26"},{"key":"twenty-seven","val":"parameter_27"},{"key":"twenty-eight","val":"parameter_28"},{"key":"twenty-nine","val":"parameter_29"},{"key":"thirty","val":"parameter_30"},{"key":"thirty-one","val":"parameter_31"},{"key":"thirty-two","val":"parameter_32"},{"key":"thirty-three","val":"parameter_33"},{"key":"thirty-four","val":"parameter_34"},{"key":"thirty-five","val":"parameter_35"},{"key":"thirty-six","val":"parameter_36"},{"key":"thirty-seven","val":"parameter_37"},{"key":"thirty-eight","val":"parameter_38"},{"key":"thirty-nine","val":"parameter_39"},{"key":"forty","val":"parameter_40"},{"key":"forty-one","val":"parameter_41"},{"key":"forty-two","val":"parameter_42"},{"key":"forty-three","val":"parameter_43"},{"key":"forty-four","val":"parameter_44"},{"key":"forty-five","val":"parameter_45"}]';
    $scope.machineData='[{"key":"1","val":"Machine 1"},{"key":"2","val":"Machine 2"},{"key":"3","val":"Machine 3"},{"key":"4","val":"Machine 4"}]';

    
   

 /*   $scope.getData=function(){
     $http.get('../../../sample-data/timeSeriesData.json').then(function success(res){
      //debugger
        console.log(res.data[0].timestamp);
        var len=res.data.length;
        var arr=[];
        var arr2;
        var arr3=[];
       
        arr2=$filter('orderBy')(res.data,'date');
         for(var i=0;i<=arr2.length;i++){ 
         //console.log(arr2[i].date.split(' '));
          arr2[i].date=arr2[i].date.split(' ')[0];
          arr2[i].date=$filter('date')(new Date(arr2[i].date),'yyyy,M,d');
          //var dateVal=new Date(arr2[i].date);
          //arr2[i].date=arr2[i].date.getTime();
          //arr2[i].date=arr2[i].date.split('-');
          arr3.push(new Date(arr2[i].date).getTime(),arr2[i].value);
         }
         $scope.dataToPlot(arr3);
         console.log(angular.toJson(arr3));
     
    },function error(res){
      console.log(res);
    })
    }

  // $scope.getData();

   
   


   Highcharts.setOptions({
              global : {
                useUTC : false
              }
            });

   

  //the new code:
  $rootScope.paramterValue="parameter_1";
 
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
      /*events:{
       
         load:function(){
           var series=this.series[0];
         }
      }
      events:{
        load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
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
      data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time + i * 1000,
                            y: Math.random()
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
    //   $http.get('https://www.highcharts.com/samples/data/jsonp.php?filename=usdeur.json&callback=?').then(function success(res){
    //   //debugger
    //     console.log(res.data[0].timestamp);
    //     var len=res.data.length;
    //     var arr=[];
    //     var arr2;
    //     var arr3=[];
       
    //     arr2=$filter('orderBy')(res.data,'date');
    //      for(var i=0;i<=arr2.length;i++){ 
    //      //console.log(arr2[i].date.split(' '));
    //       arr2[i].date=arr2[i].date.split(' ')[0];
    //       arr2[i].date=$filter('date')(new Date(arr2[i].date),'yyyy,M,d');
    //       //var dateVal=new Date(arr2[i].date);
    //       //arr2[i].date=arr2[i].date.getTime();
    //       //arr2[i].date=arr2[i].date.split('-');
    //       arr3.push(new Date(arr2[i].date).getTime(),arr2[i].value);
    //      }
    //      $scope.dataToPlot(arr3);
    //      console.log(angular.toJson(arr3));
     
    // },function error(res){
    //   console.log(res);
    // })
     var seriesToConnectFunction=$rootScope.chartToRender.options.series[0].data[0];
    $scope.connect(seriesToConnectFunction);

  
  }
  
   
  
  $scope.connect=function(series){
    
   
      console.log(series);
     
    $stomp.setDebug(function (args) {
      $log.debug(args);

      })

      $stomp.connect('https://mchnoprtn-graph-event-consumer.run.aws-usw02-pr.ice.predix.io/gs-guide-websocket')

      // frame = CONNECTED headers
      .then(function (frame) {
      
        var subscription = $stomp.subscribe('/topic/greetings', function (payload, headers, res) {
          $scope.payload = JSON.parse(payload.body);
          $scope.tagNumberL = $scope.payload.tagNumber;
          $scope.machineNumberL=$scope.payload.machineNumber;
           
            console.warn("For="+$scope.mahcineNumberL+ " & " +$scope.payload.tagNumber);

        if($scope.tagNumberL==$rootScope.paramterValue && $rootScope.machineNumberFilterSelectedValue==$scope.mahcineNumberL){
          //console.info("("+mahcineNumberL+":"+parameterValue+") >> "+parsedBody.timestamp+"=="+parsedBody.datavalue)
          var time = (new Date()).getTime();
          series.addPoint([ Number($scope.payload.timestamp),Number($scope.payload.datavalue) ], true, true)
        }
            })
       })
  }*/

    
   
           
  }]);
});
