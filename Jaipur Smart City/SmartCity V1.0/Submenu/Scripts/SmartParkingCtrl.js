smartcity.directive('loading1', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="images/loadingIcon.svg" /></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading1', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });
smartcity.filter('groupBy', function() {
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
   smartcity.controller('SmartParkingCtrl', function ($scope, $filter,$http, $interval, $timeout) {
  
  /*To Change the Highlighter*/
 $('.Submenu li').removeClass("active");
 $('#liSmartParking').addClass("active");

  var count = 0;

    $(document).ready(function () {
    $("#menu-toggle").click(function(e) {
       e.preventDefault();
         
        $("#wrapper").toggleClass("active");
         count++;
         if(count % 2==0)
         {
         }
         else
         {
         }
    })
  })

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
$scope.loading1=true;
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
    $scope.loading=true;
    
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
    $scope.loading=false;
    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
        $scope.loading=false;
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
  }, 20000);

    $timeout(function(){
    $scope.PlotLiveChart();
    },10000);

    //On change of Dropdown
    $scope.ChangedLocation=function(){
      if($scope.selLocation1!="All"){
        $scope.loading1=true;
      }
      else
      {
       $scope.loading1=true;
        $scope.PlotLiveChart();
      }
    }

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


  

Highcharts.theme = {

   colors: ['#8e4fc8', '#38CBFF','#5B91FF', '#4A7CDE', '#6C5EBF', '#4AA9DE', '#F89C1C',

      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],

   chart: {

      backgroundColor: {

         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },

         stops: [

            [0, '#2D3345'],

            [1, '#2D3345']

         ]

      },

      style: {

         fontFamily: '\'Unica One\', sans-serif'

      },

      plotBorderColor: '#606063'

   },

   title: {

      style: {

         color: '#E0E0E3',

         textTransform: 'uppercase',

         fontSize: '20px'

      }

   },

   subtitle: {

      style: {

         color: '#E0E0E3',

         textTransform: 'uppercase'

      }

   },

   xAxis: {

      gridLineColor: '#707073',

      labels: {

         style: {

            color: '#E0E0E3'

         }

      },

      lineColor: '#707073',

      minorGridLineColor: '#505053',

      tickColor: '#707073',

      title: {

         style: {

            color: '#A0A0A3'


         }

      }

   },

   yAxis: {

      gridLineColor: '#707073',

      labels: {

         style: {

            color: '#E0E0E3'

         }

      },

      lineColor: '#707073',

      minorGridLineColor: '#505053',

      tickColor: '#707073',

      tickWidth: 1,

      title: {

         style: {

            color: '#A0A0A3'

         }

      }

   },

   tooltip: {

      backgroundColor: 'rgba(0, 0, 0, 0.85)',

      style: {

         color: '#F0F0F0'

      }

   },

   plotOptions: {

      series: {

         dataLabels: {

            color: '#B0B0B3'

         },

         marker: {

            lineColor: '#333'

         }

      },

      boxplot: {

         fillColor: '#505053'

      },

      candlestick: {

         lineColor: 'white'

      },

      errorbar: {

         color: 'white'

      }

   },

   legend: {

      itemStyle: {

         color: '#FFF',

        fontWeight:'normal'          

 

      },

      itemHoverStyle: {

         color: '#E0E0E3'

      },

      itemHiddenStyle: {

         color: '#606063'

      }

   },

   credits: {

      style: {

         color: '#666'

      }

   },

   labels: {

      style: {

         color: '#707073'

      }

   },


   drilldown: {

      activeAxisLabelStyle: {

         color: '#F0F0F3'

      },

      activeDataLabelStyle: {

         color: '#F0F0F3'

      }

   },


   navigation: {

      buttonOptions: {

         symbolStroke: '#DDDDDD',

         theme: {

            fill: '#505053'

         }

      }

   },


   // scroll charts

   rangeSelector: {

      buttonTheme: {

         fill: '#505053',

         stroke: '#000000',

         style: {

            color: '#CCC'

         },

         states: {

            hover: {

               fill: '#707073',

               stroke: '#000000',

               style: {

                  color: 'white'

               }

            },

            select: {

               fill: '#000003',

               stroke: '#000000',

               style: {

                  color: 'white'

               }

            }

         }

      },

      inputBoxBorderColor: '#505053',

      inputStyle: {

         backgroundColor: '#333',

         color: 'silver'

      },

      labelStyle: {

         color: 'silver'

      }

   },


   navigator: {

      handles: {

         backgroundColor: '#666',

         borderColor: '#AAA'

      },

      outlineColor: '#CCC',

      maskFill: 'rgba(255,255,255,0.1)',

      series: {

         color: '#7798BF',

         lineColor: '#A6C7ED'

      },

      xAxis: {

         gridLineColor: '#505053'

      }

   },


   scrollbar: {

      barBackgroundColor: '#808083',

      barBorderColor: '#808083',

      buttonArrowColor: '#CCC',

      buttonBackgroundColor: '#606063',

      buttonBorderColor: '#606063',

      rifleColor: '#FFF',

      trackBackgroundColor: '#404043',

      trackBorderColor: '#404043'

   },


   // special colors for some of the

   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',

   background2: '#505053',

   dataLabelsColor: '#B0B0B3',

   textColor: '#C0C0C0',

   contrastTextColor: '#F0F0F3',

   maskColor: 'rgba(255,255,255,0.3)'

};


// Apply the theme

Highcharts.setOptions(Highcharts.theme);

 

 

    //Font of Highcharts

    Highcharts.setOptions({

            global: {

                useUTC: false

            },

            chart: {

            style: {

            fontFamily: 'Roboto-Regular',

            fontWeight:'normal'

 

            }

         }

        });




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
                // color: '#000000',                 
                //  fontSize: '15px'
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
  for(var i=0;i<$scope.dataforpiechart[0].Find.Result.length;i++){
    eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid + "=[]"); 
    eval("$scope.location_" + $scope.dataforpiechart[0].Find.Result[i].ParkingSpace.sid).push({'x':(new Date()).getTime(),'y':Math.floor((($scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.total-$scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.occupied)/$scope.dataforpiechart[0].Find.Result[i].ParkingSpace.state.total)*100)});    
  } 
}
else if($scope.selLocation1!="All"){
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
},10000);
$scope.flag="NotSelected";
$scope.loading1=false;
}


  $timeout(function(){$scope.loading1=false},10000);
//For Filter
if($scope.selLocation1!="All"){
  $interval.cancel(interval);
  $scope.flag="Selected";
   $timeout(function(){
   $scope.chart1.addSeries({
      name: $scope.filtereddataforlivechart[0].ParkingSpace.sid,
      data: eval("$scope.location_" +  $scope.filtereddataforlivechart[0].ParkingSpace.sid)
 })
   $scope.loading1=false;
    },2000);
    interval1 =$interval(function(){
       if($scope.selLocation1!="All"){
  var shift1 = $scope.chart1.series[0].data.length > 4; 
      $scope.chart1.series[0].addPoint({'x':eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid)[0].x,'y':eval("$scope.location_" + $scope.filtereddataforlivechart[0].ParkingSpace.sid)[0].y},true,shift1);   
    }
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
                // color: '#000000',                 
                //  fontSize: '15px'
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
