smartcity.directive('loading', function () {
      return {
        restrict: 'E',
        replace:true,
        template: '<div class="loading"><img src="images/loadingIcon.svg" /></div>',
        link: function (scope, element, attr) {
              scope.$watch('loading', function (val) {
                  if (val)
                      $(element).show();
                  else
                      $(element).hide();
              });
        }
      }
  });

smartcity.controller('NewVisitorPatternCtrl', function ($scope, $filter,$http ) {

$('.Submenu li').removeClass("active");
 $('#liNewVisitorPattern ').addClass("active");
 
 /*On Change of Date Dropdown*/
  $scope.d=new Date();
 $scope.month=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
 $scope.Date1=$scope.d.getDate() + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();
 
 /*On Change of Date Dropdown*/
 document.getElementById("Day").onchange = function() {
   var dayvalue=document.getElementById("Day").value;
   if(dayvalue=="today"){
        $scope.DurationTitle="Time";
        $scope.Date1=$scope.d.getDate() + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();
        $scope.selectDate('today');
   }
   else if(dayvalue=="yesterday"){
     $scope.DurationTitle="Time";
        $scope.Date1=($scope.d.getDate()-1) + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();
        $scope.selectDate('yesterday');
   }
   else if(dayvalue=="this week"){
    document.getElementById("styleofdate").style.marginLeft ="23%";
     $scope.DurationTitle=$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;
     $scope.Date1=($scope.d.getDate()-$scope.d.getDay()) + "-" + ($scope.d.getDate()) + " " + $scope.month[$scope.d.getMonth()] + " " + $scope.d.getFullYear();
     $scope.selectDate('this week');
   }
   $scope.$apply();
};

   document.getElementById("Location").onchange = function() {
   var Locationvalue=document.getElementById("Location").value;
   if(Locationvalue=="0"){
        $scope.selectArea(0);
   }
   else if(Locationvalue=="16"){
        $scope.selectArea(16);
   }
   else if(Locationvalue=="44"){
        $scope.selectArea(44);
   }
    else if(Locationvalue=="25"){
        $scope.selectArea(25);
   }
 
};
    
 $scope.rows1=[];
     $scope.dwelltimechart=[];
     $scope.UTCofCurrentDate=[];
     $scope.data_for_chart = [];
     $scope.Dwell=108;
     $scope.dataforchart="loading";
     $scope.day='today';
      $scope.areacode="16,25,44";

    //For Dummy Json Data
    $scope.datayesterday=[];
    var currentDate=new Date();
    var year=$filter('date')(new Date(currentDate),"yyyy"); 
    var month=$filter('date')(new Date(currentDate),"M"); 
    var day=$filter('date')(new Date(currentDate),"d");

    $scope.day="";

    Highcharts.theme = {
   colors: ['#8e4fc8', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
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
         color: '#E0E0E3',
         fontWeight:'normal'
      },
      itemHoverStyle: {
         color: '#FFF'
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



//GetData for Visitors Chart
$scope.getDataforVisitorChart=function(val1,val2){
   $scope.loading=true;
  if(val1=='this week'){
     $scope.day=val1;
    var body = {
            "areas":val2,
            "granularity" :"daily",
            "yAxis":"absoluteVisits",
            "timeRange":"00:00-23:59",
            "period":val1,
            "durationCategories":"0-1440",
            "includeStationary":false,
            "connectionState":"all"
        };

    $http.post("https://msesandbox.cisco.com:8081/api/analytics/v1/deviceCount", body, {
       headers: {
        "Content-Type": "application/json"
        },
        transformResponse : function(data){
            return data;
        }

    })
    .success(function(data, status, headers, config) {
    $scope.rows1 = JSON.parse(data);

    $scope.data_for_chart=[];

     $scope.SdateMonth=$filter('date')(new Date($scope.rows1.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.rows1.startDate),'dd');

    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart.push({'x':Date.UTC(year,month-1,day++,-5,0),'y':$scope.rows1.results[0].data[i].value});
              
            }

            $scope.drawVisitorschart();
           $scope.chart1.legend.allItems[0].update({name:'Hourly Trend'});
             $scope.loading=false;

    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
         $scope.loading=false;
    });

    //api call for number of visitor
  $scope.loading=true;
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
     
    $scope.NumberOfTotalVisitor = response.data.value.primary.value;
    $scope.PercentVisitor=response.data;
           
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=(($scope.PercentVisitor.value.primary.breakdown[0]['value'])-$scope.NewVistoNumberCount);
            if($scope.TotalRepeatVisitorCount<0){
              $scope.TotalRepeatVisitorCount=0;
              $scope.NewVistoNumberCount=0;
            }
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);
            $scope.TotalRepeatVisitorPercent=Math.ceil((($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount));
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent);
             $scope.loading=false;

    });
}
else
{
  $scope.day=val1;
       var body = {
            "areas":val2,
            "granularity" :"hourly",
            "yAxis":"absoluteVisits",
            "timeRange":"00:00-23:59",
            "period":val1,
            "durationCategories":"0-1440",
            "includeStationary":false,
            "connectionState":"all"
        };
     $scope.loading=true;
    $http.post("https://msesandbox.cisco.com:8081/api/analytics/v1/deviceCount", body, {
       headers: {
        "Content-Type": "application/json"
        },
        transformResponse : function(data){
            return data;
        }

    })
    .success(function(data, status, headers, config) {
    $scope.rows1 = JSON.parse(data);

    $scope.data_for_chart=[];

    $scope.SdateMonth=$filter('date')(new Date($scope.rows1.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.rows1.startDate),'dd');

    
    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');

    
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
    var count=0;
    var count1=-5;
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.rows1.results[0].data[count].value});
                count++;
                count1++;
            }
            $scope.dataforchart="!loading";
            $scope.drawVisitorschart();
            $scope.chart1.legend.allItems[0].update({name:'Hourly Trend'});
             $scope.loading=false;
    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
         $scope.loading=false;
    });

    //api call for number of visitor
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
     //$scope.loading=true;
    $scope.NumberOfTotalVisitor = response.data.value.primary.value;
    $scope.PercentVisitor=response.data;
            
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=(($scope.PercentVisitor.value.primary.breakdown[0]['value'])-$scope.NewVistoNumberCount);
            if($scope.TotalRepeatVisitorCount<0){
              $scope.TotalRepeatVisitorCount=0;
              $scope.NewVistoNumberCount=0;
            }
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);

            $scope.TotalRepeatVisitorPercent=Math.ceil((($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount))
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent)
             $scope.loading=false;
    });

}
}

//By Default Data for Visitors Chart
$scope.getDataforVisitorChart('today',$scope.areacode);



$scope.newVisitorPattern=function(val2){
        // /$scope.loading=true;
        if(val2=='today'){
            
          $http.get('Json/NewVisitorPatternHourly.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
   
       $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
      $scope.NewVistoNumberCount=10;
      $scope.NewVistorNumberCountRepeat=0;
      $scope.NewVistoNumberCountPercent=100;
      $scope.NewVistorNumberCountRepeatPercent=0;

    $scope.rows1 = $scope.NumberOfVisitor;
     
    $scope.data_for_chart_NewVisitor_Hourly=[];
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
    var count=0;
    var count1=-5;
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart_NewVisitor_Hourly.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.rows1.results[0].data[count].value});
                count++;
                count1++;
            }
            
            angular.forEach($scope.data_for_chart_NewVisitor_Hourly,function(val,key){
              if(val.y>=5){
                $scope.data_for_chart_NewVisitor_Hourly_Scatter.push({'x':val.x,'y':val.y})
              }
            })
            $scope.NewVisitorschartHourly();
            $scope.chart3.legend.allItems[0].update({name:'Hourly Trend'});
    });
      }
      else if(val2=='yesterday'){
        $http.get('Json/NewVisitorPatternHourlyyesterday.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
       $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
      $scope.NewVistoNumberCount=15;
      $scope.NewVistorNumberCountRepeat=0;
      $scope.NewVistoNumberCountPercent=100;
      $scope.NewVistorNumberCountRepeatPercent=0;
    $scope.rows1 = $scope.NumberOfVisitor;
   
    $scope.data_for_chart_NewVisitor_Hourly=[];
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
    var count=0;
    var count1=-5;
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart_NewVisitor_Hourly.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.rows1.results[0].data[count].value});
                count++;
                count1++;
            }
            angular.forEach($scope.data_for_chart_NewVisitor_Hourly,function(val,key){
              if(val.y>=5){
                $scope.data_for_chart_NewVisitor_Hourly_Scatter.push({'x':val.x,'y':val.y})
              }
            })
       
            $scope.NewVisitorschartHourly();
            $scope.chart3.legend.allItems[0].update({name:'Hourly Trend'});
    });
      }
      else if(val2=='this week'){
        $http.get('Json/NewVisitorweekly.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
     $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
      $scope.NewVistoNumberCount=20;
      $scope.NewVistorNumberCountRepeat=0;
      $scope.NewVistoNumberCountPercent=100;
      $scope.NewVistorNumberCountRepeatPercent=0;
    $scope.rows1 = $scope.NumberOfVisitor;
   
    $scope.data_for_chart_NewVisitor_Hourly=[];
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
    
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart_NewVisitor_Hourly.push({'x':Date.UTC(year,month-1,day++,-5,-30),'y':$scope.rows1.results[0].data[i].value});
               
            }
            angular.forEach($scope.data_for_chart_NewVisitor_Hourly,function(val,key){
              if(val.y>=5){
                $scope.data_for_chart_NewVisitor_Hourly_Scatter.push({'x':val.x,'y':val.y})
              }
            })
         
            $scope.NewVisitorschartHourly();
    });
      }
}


$scope.newVisitorPattern('today');
//Switch views on toggle of dropdown for Visitors chart
    $scope.selectDate=function(val){
        $scope.dataforchart="loading";
        if(val=='today'){
               $scope.day='today';
            $scope.Dwell=108;
         $scope.getDataforVisitorChart($scope.day,$scope.areacode);
         $scope.newVisitorPattern(val);
      }
      else if(val=='yesterday'){
             $scope.day='yesterday';
        $scope.Dwell=113;
         $scope.getDataforVisitorChart($scope.day,$scope.areacode);
         $scope.newVisitorPattern(val);
      }
      else if(val=='this week'){
             $scope.day='this week';
        $scope.getDataforVisitorChart($scope.day,$scope.areacode);
         $scope.newVisitorPattern(val);
      }
    }
     $scope.selectArea=function(val){
        
        if (val==0){
            $scope.areacode="16,44,25";
            $scope.getDataforVisitorChart($scope.day,$scope.areacode);
            $scope.getDataforDwellTimeChart($scope.day,$scope.areacode);
       
        }
        else{
            $scope.areacode=val;
            $scope.getDataforVisitorChart($scope.day,$scope.areacode);
            $scope.getDataforDwellTimeChart($scope.day,$scope.areacode);
       
        }
    }


//Visitors Chartart
$scope.drawVisitorschart=function(){
$scope.chart1= new Highcharts.Chart({
            rangeSelector: {
                selected: 1
            },
             chart: {
                    renderTo: 'container',
                    zoomType:'x',
             resetZoomButton: {
                theme: {
                    fill: 'white',
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#41739D',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                }
            }
              },
              yAxis: {
            min: 0,
            title: {
                text: 'Number Of visitor'
            }
        },
            xAxis: {
               ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },
            },

     title: {
                text: ''
            }, 
            credits: {
            enabled: false
             },

            series: [{
                name: 'Daily Trend', 
                data: $scope.data_for_chart,
                type: 'area',
                tooltip: {
                    valueDecimals: 2
                }
            }],

        exporting: {
            enabled: false
        }
           
            
          });
           
}

//Dwell Time Chart
$scope.NewVisitorschartHourly=function(){
     $scope.chart3=  new Highcharts.Chart({
  rangeSelector: {
                selected: 1
            },
             chart: {
                    renderTo: 'container1',
                    zoomType:'x',
             resetZoomButton: {
                theme: {
                    fill: 'white',
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#41739D',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                }
            }
              },
              yAxis: {
            min: 0,
            title: {
                text: 'Number Of New visitor'
            }
        },
            xAxis: {
               ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },                
            },

     title: {
                text: ''
            }, 
            credits: {
            enabled: false
             },

            series: [{
                name: 'Daily Trend',
                data: $scope.data_for_chart_NewVisitor_Hourly,
                type: 'area',
                tooltip: {
                    valueDecimals: 2
                }
              },
                {
                  name:'   Alert',
                  data:$scope.data_for_chart_NewVisitor_Hourly_Scatter,
                  type:'scatter',
                  marker:{
                    symbol:'url(images/alertnotifications-round.png)',
                    distance: 90
                  },
                  enableMouseTracking: false
                }],

        exporting: {
            enabled: false
        }
           
    });
};
     });