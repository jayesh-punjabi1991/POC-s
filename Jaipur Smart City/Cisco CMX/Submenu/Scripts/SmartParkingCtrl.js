cisco.filter('groupBy', function() {
  return _.memoize(function(items, field) {
    return _.groupBy(items, field);
  });
}).filter('unique', function() {
  return function(arr, field) {
    var o = {},
      i, l = arr.length,
      r = [];
    for (i = 0; i < l; i += 1) {
      o[arr[i][field]] = arr[i];
    }
    for (i in o) {
      r.push(o[i]);
    }
    return r;
  };
});
   cisco.controller('SmartParkingCtrl', function ($scope, $filter,$http, $interval, $timeout) {
 $('#MenuBar1 a').removeClass("activemenu");
    $('#liNewUseCase a').addClass("activemenu")
//Important->Working Websocket Connection
    var messagetosend="{'Subscribe':'parking.event'}";

  var wsUri = "ws://cdp-jda-ui.cisco.com/deveng/ws/fid-CIMNotificationGateway";
  var output;
  init();
  function init()
  {
    testWebSocket();
  }
  function testWebSocket()
  {
    websocket = new WebSocket(wsUri);
    websocket.onopen = function(evt) { onOpen(evt) };
    websocket.onclose = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror = function(evt) { onError(evt) };
  }
  function onOpen(evt)
  {
    console.log("CONNECTED");
    doSend(messagetosend);
  }
  function onClose(evt)
  {
    console.log("DISCONNECTED");
  }
  function onMessage(evt)
  {
    console.log( evt.data);
    $scope.$apply(function(){
        $scope.returnedData = evt.data;
    });
   
  }
  function onError(evt)
  {
    console.log('<span style="color: red;">ERROR:</span> ' + evt.data);
  }
  function doSend(message)
  {
    console.log(message);
    websocket.send(message);
  }

  window.addEventListener("load", init, false);
$scope.dataforpiechart=[];
$scope.valuesforFilter=[];
$scope.totaloccupiedSpace=0;
$scope.totalSpace=0;
$scope.totalVacantSpace=0;
$scope.selLocation="All";
$scope.selLocation1="All";
$scope.filtereddataforlivechart=[];
$scope.flag="NotSelected";
$scope.temp="";
var body = {
    "Query": {
        "Find": {
            "With": {
                "kind": "const",
                "GeoPolygon": {
                    "as": "region",
                    "geoPoint": [
                        {
                            "latitude": 27.4400404650971,
                            "longitude": 74.46533203125
                        },
                        {
                            "latitude": 27.7321607095809,
                            "longitude": 76.2890625
                        },
                        {
                            "latitude": 26.7063598576335,
                            "longitude": 76.81640625
                        },
                        {
                            "latitude": 25.7504248359094,
                            "longitude": 75.992431640625
                        },
                        {
                            "latitude": 26.2343020324067,
                            "longitude": 74.8828125
                        }
                    ]
                }
            },
            "ParkingSpace": {
                "as": "var.myspace",
                "eq": {
                    "target": "overlaps(const.region, var.myspace.boundary)",
                    "value": true
                }
            }
        }
    }
};
   $scope.getData=function(){
    $http.post("https://cdp-jda-ui.cisco.com/deveng/fid-CIMQueryInterface", body, {
       headers: {
        "Content-Type": "application/json"
        },
        transformResponse : function(data){
            return data;
        }
    })
    .success(function(data, status, headers, config) {
    $scope.dataforpiechart.push(JSON.parse(data));
     if($scope.dataforpiechart.length!=0 && $scope.selLocation=="All"){
    $scope.modifyDataforPiechart();    
    } 
    if($scope.dataforpiechart.length!=0 && $scope.selLocation1=="All"){
         $scope.getDataforLiveChart();   
    } 
    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
    });
  }
  $scope.getData();
  $interval(function(){
    $scope.getData();
    if($scope.dataforpiechart.length!=0 && $scope.selLocation=="All"){
    $scope.modifyDataforPiechart();    
    }    
    if($scope.selLocation1=="All" && $scope.dataforpiechart.length!=0){
      $scope.getDataforLiveChart();
    }
    else if($scope.selLocation1!="All"){
         $scope.getDataforLiveChart();
    }
    else if($scope.selLocation!="All"){
      $scope.onChgLocationData();
    }
  }, 10000);

    $timeout(function(){
    $scope.PlotLiveChart();
    },10000);

//For All Locations
$scope.modifyDataforPiechart=function(){
  //values for Filter
  angular.forEach($scope.dataforpiechart[0].Find.Result,function(value,key){  
    if(typeof value.ParkingSpace.state.occupied=="number"){
    $scope.valuesforFilter.push({'ParkingSpaceName':value.ParkingSpace.sid});    
  }
  })
  $scope.valuesforFilter=$filter('unique')($scope.valuesforFilter,'ParkingSpaceName');
  $scope.valuesforFilter=$filter('orderBy')($scope.valuesforFilter,'ParkingSpaceName');
  //Calculation of Total Space,Occupied Space and Vacant Space ON-Load
  angular.forEach($scope.dataforpiechart[0].Find.Result,function(value,key){  
    if(typeof value.ParkingSpace.state.occupied=="number"){
    $scope.totaloccupiedSpace=value.ParkingSpace.state.occupied+$scope.totaloccupiedSpace;
    $scope.totalSpace=value.ParkingSpace.state.total + $scope.totalSpace;
  }
  })
  $scope.totalVacantSpace=$scope.totalSpace-$scope.totaloccupiedSpace;
  $scope.drawPieChart();
  $scope.totaloccupiedSpace=0;
  $scope.totalVacantSpace=0;
  $scope.totalSpace=0;
}
//Data for Selected Location
$scope.onChgLocationData=function(){
  if($scope.selLocation=="All"){
$scope.modifyDataforPiechart();
  }
  else {
   $scope.totalVacantSpace=0;
  $scope.totaloccupiedSpace=0;
  $scope.totalSpace=0;
  angular.forEach($scope.dataforpiechart[0].Find.Result,function(value,key){
    if(typeof value.ParkingSpace.state.occupied=="number"){
    if(value.ParkingSpace.sid==$scope.selLocation){
    $scope.totaloccupiedSpace=value.ParkingSpace.state.occupied;
    $scope.totalSpace=value.ParkingSpace.state.total;
    $scope.totalVacantSpace=$scope.totalSpace-$scope.totaloccupiedSpace;
  }
    }
  })
  $scope.drawPieChart();
  $scope.totaloccupiedSpace=0;
  $scope.totalVacantSpace=0;
  $scope.totalSpace=0;
}
}


//Parking Status
$scope.drawPieChart=function(){
        Highcharts.chart('container11', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                
            },
               legend: {
            itemStyle: {
                color: '#000000',                 
                 fontSize: '15px'
              }
        },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: ' <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                      data: [
                ['Vacant Space', $scope.totalVacantSpace],
               /* ['Occupied Space', $scope.totaloccupiedSpace]*/
                {
                        name: 'Occupied Space',
                        y: $scope.totaloccupiedSpace,
                        sliced: true,
                        selected: true
                    },
                ]
                }
            },
                exporting: {
        enabled: false
      },
       credits: {
            enabled: false
             },
            series: [{
                type:'pie',
                name: '',
             dataLabels: {
                            color:'black',
                            distance: -20,
                            formatter: function () {
                                return this.y;
                            }
                        }
            }]
        });
}
$scope.getDataforLiveChart=function(){

  if($scope.selLocation1=="All"){
    debugger
  for(var i=0;i<$scope.dataforpiechart[0].Find.Result.length;i++){
    eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid + "=[]"); 
    eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid).push({'x':(new Date()).getTime(),'y':Math.floor((($scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.total-$scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.occupied)/$scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.total)*100)});    
  } 
}
else if($scope.selLocation1!="All"){
  debugger

  $scope.filtereddataforlivechart=[];
  angular.forEach($scope.dataforpiechart[0].Find.Result,function(val,key){
    if(val.ParkingSpace.sid==$scope.selLocation1){
        $scope.filtereddataforlivechart.push(val);
    }
  })

    eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid + "=[]"); 
    eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid ).push({'x':(new Date()).getTime(),'y':Math.floor((($scope.filtereddataforlivechart[0].ParkingSpace.state.total -$scope.filtereddataforlivechart[0].ParkingSpace.state.occupied)/$scope.filtereddataforlivechart[0].ParkingSpace.state.total)*100)});    
    if($scope.selLocation1!=$scope.temp){
  $scope.PlotLiveChart();
}
  $scope.temp=$scope.selLocation1;

}
}
//  Live Chart  
$scope.PlotLiveChart=function(){

var interval;
var interval1;
debugger

  //For All
  if($scope.selLocation1=="All"){

  $timeout(function(){
   for(var i=0;i<4;i++){
    $scope.chart1.addSeries({
      name: $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid,
      data: eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid)
    });
  }
    },5000);

interval =$interval(function(){
  if($scope.selLocation1=="All"){
  var shift = $scope.chart1.series[0].data.length > 4; 
    //$scope.dataforpiechart[0].Find.Result.length
  for(var i=0;i<4;i++){
      $scope.chart1.series[i].addPoint({'x':eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid)[0].x,'y':eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid)[0].y},true,shift);
}
 }
 debugger
},10000);
$scope.flag="NotSelected";
}

//For Filter
if($scope.selLocation1!="All"){
  $interval.cancel(interval);
  $scope.flag="Selected";
   $timeout(function(){
   $scope.chart1.addSeries({
      name: $scope.filtereddataforlivechart[0].ParkingSpace.sid,
      data: eval("$scope.location_" +  $scope.filtereddataforlivechart[0].ParkingSpace.sid)
 })
    },5000);
    interval1 =$interval(function(){
       if($scope.selLocation1!="All"){
  var shift1 = $scope.chart1.series[0].data.length > 4; 
      $scope.chart1.series[0].addPoint({'x':eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid)[0].x,'y':eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid)[0].y},true,shift1);   
    }
    debugger
},10000);

}

  Highcharts.setOptions({
      global: {
        useUTC: false
      },
        chart: {
            style: {
              fontWeight:'bold',
            fontSize:'15px'
           
            }
         }
    });
    $scope.chart1 = new Highcharts.Chart({
      chart: {
        type: 'spline',
        renderTo:'container13',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        zoomType:'y'
       
      },
      title: {
        text: ''
      },
      legend: {
        enabled: true,
      itemStyle: {
                color: '#000000',                 
                 fontSize: '15px'
              }
    },
    
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150,
         labels: {
                style: {
                    fontSize:'13px'
                }
            }
      },
      yAxis: {
        title: {
          text: 'Availabile Parking Spaces'
        },
        labels: {
                style: {
                    fontSize:'13px'
                },
                  formatter: function() {
            return this.value + ' %';
        }
            },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }],
        min:0,
        max:100
      },
      tooltip: {
        formatter: function() {
          
          return '<b> Location : ' + this.series.name + '</b><br/>' + '<b>Parking Spaces Available : ' + this.y + '<b> %'
       }
      
      },
      exporting: {
        enabled: false
      },
       credits: {
            enabled: false
             },
      series: []
    });

 };


});
