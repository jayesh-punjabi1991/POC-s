smartcity.controller('BusiestDayCtrl', function ($scope, $filter,$http ) {
 
 $scope.d=new Date();
 $scope.month=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
 $scope.Date1=$scope.d.getDate() + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();

 /*To change the highlighter*/
 $('.Submenu li').removeClass("active");
 $('#liBusiestDay').addClass("active");

 /*On Change of Date Dropdown*/
 document.getElementById("Day").onchange = function() {
   var dayvalue=document.getElementById("Day").value;
   if(dayvalue=="today"){
        document.getElementById("styleofdate").style.marginLeft ="33%";
        $scope.DurationTitle="Time";
        $scope.Date1=$scope.d.getDate() + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();
        $scope.selectDate('today');
   }
   else if(dayvalue=="yesterday"){
        document.getElementById("styleofdate").style.marginLeft ="33%";
        $scope.DurationTitle="Time";
        $scope.Date1=($scope.d.getDate()-1) + " " + ($scope.month[$scope.d.getMonth()]) + " " +$scope.d.getFullYear();
        $scope.selectDate('yesterday');
   }
   else if(dayvalue=="this week"){ 
     document.getElementById("styleofdate").style.marginLeft ="21%";
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

     $scope.areacode="16,25,44";
     $scope.day='today';
 
    //For Dummy Json Data
    $scope.datayesterday=[];
    var currentDate=new Date();
    var year=$filter('date')(new Date(currentDate),"yyyy"); 
    var month=$filter('date')(new Date(currentDate),"M"); 
    var day=$filter('date')(new Date(currentDate),"d");    

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
         color: '#E0E0E3',
         fontWeight: 'normal'
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

   if(val1=='this week'){
       $scope.loading=true;
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

    $scope.SdateMonth=$filter('date')(new Date($scope.rows1.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.rows1.startDate),'dd');   
    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');
    

    $scope.data_for_chart=[];
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");

            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                $scope.data_for_chart.push({'x':Date.UTC(year,month-1,day++,-5,0),'y':$scope.rows1.results[0].data[i].value});
           
                
            }
            $scope.drawVisitorschart();
            $scope.loading=false;
    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
        $scope.loading=false;
    });
     //api call for number of visitor
  $scope.loading=true;   
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
    $scope.NumberOfVisitor = response.data.value.primary.value;
         $scope.PercentVisitor=response.data;
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=$scope.PercentVisitor.value.primary.breakdown[0]['value'];
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);

            $scope.TotalRepeatVisitorPercent=(($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount)
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent)
            $scope.loading=false;
    });


    }
    else{
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
     
    $scope.SdateMonth=$filter('date')(new Date($scope.rows1.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.rows1.startDate),'dd');

    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');


    $scope.data_for_chart=[];
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
     $scope.loading=true;
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
    $scope.NumberOfVisitor = response.data.value.primary.value;
         $scope.PercentVisitor=response.data;
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=$scope.PercentVisitor.value.primary.breakdown[0]['value'];
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);

            $scope.TotalRepeatVisitorPercent=(($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount)
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent)
            $scope.loading=false;
    });
}
   
}

//By Default Data for Visitors Chart
$scope.getDataforVisitorChart('today',$scope.areacode);
$scope.DwellTimeArrayPercent = [];
$scope.progressBars = ["progress-bar-primary", "progress-bar-success"];

//For Dwell Time Chart
$scope.getDataforDwellTimeChart=function(val1,val2){

         
$scope.loading=true;

//api call
 if(val1=='this week')
{
    //api call for number of visitor for dwelltimebreakdown
         $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=dwellBreakdown&dwellLimits=%3E120min%3A-1&_=1480422265138').then(function(response){ 
            $scope.DwellTimeVisitor = response.data.value.primary[">120min"];

            $scope.test=response.data;
            $scope.ToalDwellCount=$scope.test.value.primary[">120min"];
            $scope.RepeatVisitorCount=$scope.test.value.primary.breakdown[0]['>120min'];
            $scope.NewTotalVisitorDwell=( $scope.ToalDwellCount-$scope.RepeatVisitorCount);

            $scope.RepeatVisitorPercent=(($scope.RepeatVisitorCount*100)/ $scope.ToalDwellCount)
            $scope.NewVisitorPercent=(100-$scope.RepeatVisitorPercent)
            $scope.loading=false;

    });
     $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/dwellBreakdown?areas='+val2+'&granularity=daily&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&dwellLimits=0-5min%3A5%2C5-20min%3A20%2C20-60min%3A60%2C60-120min%3A120%2C%3E120min%3A-1&_=1480576410346').then(function(response){ 
    $scope.dwelltimechart = response.data;

    $scope.data_for_dwell_time_chart_0_to_5=[];
    $scope.data_for_dwell_time_chart_5_to_20=[];
    $scope.data_for_dwell_time_chart_20_to_60=[];
    $scope.data_for_dwell_time_chart_60_to_120=[];
    $scope.data_for_dwell_time_chart_greaterthan_120=[];
    $scope.data_for_dwell_time_chart_total=[];
    $scope.data_for_dwell_time_chart_max_points=[];
    $scope.data_for_dwell_time_chart_max_points_for_table=[];
    var max=0;

    $scope.SdateMonth=$filter('date')(new Date($scope.dwelltimechart.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.dwelltimechart.startDate),'dd');
    $scope.EdateMonth=$filter('date')(new Date($scope.dwelltimechart.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.dwelltimechart.endDate),'dd');

    
    var year=$filter('date')(new Date($scope.dwelltimechart.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.dwelltimechart.startDate),"M"); 
    var day=$filter('date')(new Date($scope.dwelltimechart.startDate),"d");
    var count=0;
    var count1=-5;
    var count2=0;
    var count3="";
            for(var i=0;i<$scope.dwelltimechart.results[0].data.length;i++)
            {
                // $scope.global.push({})
                 $scope.data_for_dwell_time_chart_0_to_5.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']});
                 $scope.data_for_dwell_time_chart_5_to_20.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['5-20min']});
                 $scope.data_for_dwell_time_chart_20_to_60.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['20-60min']});
                 $scope.data_for_dwell_time_chart_60_to_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['60-120min']});
                 $scope.data_for_dwell_time_chart_greaterthan_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['>120min']});
                 $scope.data_for_dwell_time_chart_total.push({'x':Date.UTC(year,month-1,day++,-4,-30),'count2':count2,'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']+$scope.dwelltimechart.results[0].data[count].values['5-20min']+$scope.dwelltimechart.results[0].data[count].values['20-60min']+$scope.dwelltimechart.results[0].data[count].values['60-120min']+$scope.dwelltimechart.results[0].data[count].values['>120min']});
              
                count++;
                count1++;
                count2++;
            }
            angular.forEach($scope.data_for_dwell_time_chart_total,function(val,key)
            {                
                if(val.y>max){
                    max=val.y;
                }         

            });

            angular.forEach($scope.data_for_dwell_time_chart_total,function(val,key)
            {                
                if(val.y==max){
                    $scope.data_for_dwell_time_chart_max_points.push({'x':val.x,'y':val.y});
                }
            }); 
              angular.forEach($scope.data_for_dwell_time_chart_total,function(val,key)
            {                
                if(val.y==max){               
                    $scope.data_for_dwell_time_chart_max_points_for_table.push({'x':new Date(val.x),'y':val.y,'count1':"12-Dec-16"});
                }
            });

            $scope.drawRecommendationchart();
            $scope.drawDwellTimechart();
            $scope.loading=false;
});
}
else{
    //api call for number of visitor for dwelltimebreakdown
         $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=dwellBreakdown&dwellLimits=%3E120min%3A-1&_=1480422265138').then(function(response){ 
            $scope.DwellTimeVisitor = response.data.value.primary[">120min"];
            $scope.test=response.data;
            $scope.ToalDwellCount=$scope.test.value.primary[">120min"];
            $scope.RepeatVisitorCount=$scope.test.value.primary.breakdown[0]['>120min'];
            $scope.NewTotalVisitorDwell=( $scope.ToalDwellCount-$scope.RepeatVisitorCount);

            $scope.RepeatVisitorPercent=(($scope.RepeatVisitorCount*100)/ $scope.ToalDwellCount)
            $scope.NewVisitorPercent=(100-$scope.RepeatVisitorPercent)
            $scope.loading=false;
             
    });
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/dwellBreakdown?areas='+val2+'&granularity=hourly&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=5-480&includeStationary=false&connectionState=all&dwellLimits=0-5min%3A5%2C5-20min%3A20%2C20-60min%3A60%2C60-120min%3A120%2C%3E120min%3A-1&_=1480065279569').then(function(response){ 
    $scope.dwelltimechart = response.data;

    $scope.data_for_dwell_time_chart_0_to_5=[];
    $scope.data_for_dwell_time_chart_5_to_20=[];
    $scope.data_for_dwell_time_chart_20_to_60=[];
    $scope.data_for_dwell_time_chart_60_to_120=[];
    $scope.data_for_dwell_time_chart_greaterthan_120=[];
    $scope.data_for_dwell_time_chart_total=[];
    $scope.data_for_dwell_time_chart_max_points=[];
    $scope.data_for_dwell_time_chart_max_points_for_table=[];
    $scope.data_for_dwell_time_chart_total1=[];
    var max=0;
    $scope.SdateMonth=$filter('date')(new Date($scope.dwelltimechart.startDate),'MMM');
    $scope.SdateDay=$filter('date')(new Date($scope.dwelltimechart.startDate),'dd');

    $scope.EdateMonth=$filter('date')(new Date($scope.dwelltimechart.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.dwelltimechart.endDate),'dd');


    var year=$filter('date')(new Date($scope.dwelltimechart.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.dwelltimechart.startDate),"M"); 
    var day=$filter('date')(new Date($scope.dwelltimechart.startDate),"d");
    var count=0;
    var count1=-5;
    var count2=0;
    var count3="";
            for(var i=0;i<$scope.dwelltimechart.results[0].data.length;i++)
            {
                
                 $scope.data_for_dwell_time_chart_0_to_5.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']});
                 $scope.data_for_dwell_time_chart_5_to_20.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['5-20min']});
                 $scope.data_for_dwell_time_chart_20_to_60.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['20-60min']});
                 $scope.data_for_dwell_time_chart_60_to_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['60-120min']});
                 $scope.data_for_dwell_time_chart_greaterthan_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['>120min']});
                 $scope.data_for_dwell_time_chart_total.push({'x':Date.UTC(year,month-1,day,count1,-30),'count2':count2,'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']+$scope.dwelltimechart.results[0].data[count].values['5-20min']+$scope.dwelltimechart.results[0].data[count].values['20-60min']+$scope.dwelltimechart.results[0].data[count].values['60-120min']+$scope.dwelltimechart.results[0].data[count].values['>120min']});  
                 $scope.data_for_dwell_time_chart_total1.push({'x':Date.UTC(year,month-1,day,count1,-30),'count2':count2,'first':$scope.dwelltimechart.results[0].data[count].values['0-5min'],'second':$scope.dwelltimechart.results[0].data[count].values['5-20min'],'third':$scope.dwelltimechart.results[0].data[count].values['20-60min'],'fourth':$scope.dwelltimechart.results[0].data[count].values['60-120min'],'fifth':$scope.dwelltimechart.results[0].data[count].values['>120min'],'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']+$scope.dwelltimechart.results[0].data[count].values['5-20min']+$scope.dwelltimechart.results[0].data[count].values['20-60min']+$scope.dwelltimechart.results[0].data[count].values['60-120min']+$scope.dwelltimechart.results[0].data[count].values['>120min']});  
                count++;
                count1++;
                count2++;
            }
            angular.forEach($scope.data_for_dwell_time_chart_total,function(val,key)
            {                
                if(val.y>max){
                    max=val.y;
                }         

            });

            angular.forEach($scope.data_for_dwell_time_chart_total,function(val,key)
            {                
                if(val.y==max){
                    $scope.data_for_dwell_time_chart_max_points.push({'x':val.x,'y':val.y});
                }
            });  
              angular.forEach($scope.data_for_dwell_time_chart_total1,function(val,key)
            {                
                if(val.y==max){
            
                    if (val.count2<=9){
                      count3="0"+val.count2+":00 Hrs";  
                    }
                    else if(val.count2>9 && val.count2<=12){
                      count3=val.count2+":00 Hrs";  
                    }
                    else if(val.count2>12){
                      count3=val.count2+":00 Hrs";  
                    }
                    $scope.data_for_dwell_time_chart_max_points_for_table.push({'x':new Date(val.x),'y':val.y,'first':val.first,'second':val.second,'third':val.third,'fourth':val.fourth,'fifth':val.fifth,'count1':count3});
                }
            });    
            $scope.drawDwellTimechart();
            $scope.drawRecommendationchart();
            $scope.loading=false;
});
}
}

$scope.getDataforDwellTimeChart('today',$scope.areacode);

 $scope.sort = function (keyname) {
                $scope.sortKey = keyname;
                $scope.reverse = !$scope.reverse;
            } 
//Switch views on toggle of dropdown for Visitors chart
    $scope.selectDate=function(val){
        $scope.dataforchart="loading";

        if(val=='today'){
         $scope.day='today';
         $scope.getDataforVisitorChart($scope.day,$scope.areacode);
         $scope.getDataforDwellTimeChart($scope.day,$scope.areacode);

      }
      else if(val=='yesterday'){
        $scope.day='yesterday';
        $scope.getDataforVisitorChart($scope.day,$scope.areacode);
        $scope.getDataforDwellTimeChart($scope.day,$scope.areacode);
      }
      else if(val=='this week'){
        $scope.day="this week";
        $scope.getDataforVisitorChart($scope.day,$scope.areacode);
        $scope.getDataforDwellTimeChart($scope.day,$scope.areacode);
       
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
                 labels: {
                style: {
                    fontSize:'13px'
                }
            },
            min: 0,
            title: {
                text: 'Number Of visitor'
            }
        },
        tooltip: {
            split: true,
            formatter: function(){

                return  $scope.day=='this week' ? "daily trend" : ""
            }

        },
            xAxis: {
               labels: {
                style: {
                    fontSize:'11px'
                }
            },
               ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },                
                 tickInterval: $scope.day=='today' ? 60 * 60 * 1000 : $scope.day=='yesterday' ? 60 * 60 * 1000  : 24 * 60 * 60 * 1000 ,
                
            },

     title: {
                text: ''
            },     
             legend: {
            itemStyle: {
                //color: '#000000',                 
                 //fontSize: '13px'
              }
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
$scope.drawDwellTimechart=function(){
     $scope.chart3=  new Highcharts.Chart({
 chart: {
        renderTo: 'container1',
        type: 'area',
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
    }, title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
           labels: {
                style: {
                    fontSize:'11px'
                }
            },
              ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },                
                tickInterval: $scope.day=='today' ? 60 * 60 * 1000 : $scope.day=='yesterday' ? 60 * 60 * 1000  : 24 * 60 * 60 * 1000 ,
        },
            credits: {
            enabled: false
             },
        yAxis: {

             title: {
                text: 'Number of Visitors'
            },
             labels: {
                style: {
                    fontSize:'13px'
                }
            },
        },
        tooltip: {
            split: true

        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                }
            }
        },     legend: {
            itemStyle: {
                //color: '#000000',                 
                 //fontSize: '13px'
              }
        },
        series: [{
            name: '0-5 Min',
            data: $scope.data_for_dwell_time_chart_0_to_5
        },{
            name: '5-20min',
            data: $scope.data_for_dwell_time_chart_5_to_20
        },{
            name: '20-60min',
            data:  $scope.data_for_dwell_time_chart_20_to_60
        },{
            name: '60-120min',
            data:  $scope.data_for_dwell_time_chart_60_to_120
        }
        ,{
            name: '>120min',
            data:  $scope.data_for_dwell_time_chart_greaterthan_120
        }],

                exporting: {
                enabled: false
                },
           
        responsive: {
            rules: [{
                condition: {
                    maxWidth:600
                },
                chartOptions: {
                    chart: {
                        className: 'small-chart'
                    }
                }
            }]
        }
    });
};

//Recommendation Chart
$scope.drawRecommendationchart=function(){
     $scope.chart4=  new Highcharts.Chart({
            chart: {
            renderTo:'container2',
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },
        tooltip:{
          enabled:false
        },
        title: {
            text: ''
        },
         credits: {
            enabled: false
             },
             exporting:{
              enabled:false
             },

         xAxis: {
           labels: {
                style: {
                    fontSize:'13px'
                }
            },
              ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },                
                tickInterval: $scope.day=='today' ? 60 * 60 * 1000 : $scope.day=='yesterday' ? 60 * 60 * 1000  : 24 * 60 * 60 * 1000 ,
        },

        yAxis: {
           labels: {
                style: {
                    fontSize:'13px'
                }
            },
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Number of Visitors'
            }
        },
            legend: {
            itemStyle: {
                //color: '#000000',                 
                 //fontSize: '13px'
              }
        },
             plotOptions: {
            series: {
                cursor: 'pointer',
                events: {
                    click: function (event) {
                        $scope.display1="show";
                        $scope.$apply();
                        $scope.selectedDate=[];
                        $scope.selectedDate.push(event.point.x);
                        $scope.getDataforBarchart($scope.selectedDate);

                    }
                }
            },
              bubble: {
                minSize: 3,
                maxSize: 50
            }
        },

        series: [{
          name:'Recommended Time for Promotion',
          data: $scope.data_for_dwell_time_chart_max_points,
          marker: {
                fillColor: {
                    radialGradient: { cx: 0.5, cy: 0.5, r: 0.4},                    
                    stops: [
                        [0, '#FFF'],
                        [1, '#8e4fc8']
                    ]
                }
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth:600
                },
                chartOptions: {
                    chart: {
                        className: 'small-chart'
                    }
                }
            }]
        }
    });
};

$scope.getDataforBarchart=function(val){
    $scope.display1="show";

var d=new Date($scope.selectedDate[0]);
$scope.hours=0;
 $scope.hours=d.getHours();

                    if ($scope.hours<=9){
                      $scope.hours="0"+$scope.hours+":00 Hrs";  
                    }
                    else if($scope.hours>9 && $scope.hours<=12){
                      $scope.hours=$scope.hours+":00 Hrs";  
                    }
                    else if($scope.hours>12){
                      $scope.hours=$scope.hours+":00 Hrs";  
                    }
               
                    $scope.$apply();
   
  $scope.data_for_Bar_Chart=[];
 

  angular.forEach($scope.data_for_dwell_time_chart_total1,function(val1,key){
      if(val1.x==val[0]){
        // $scope.data_for_Bar_Chart.push([{'first':val1.first,'second':val1.second,'third':val1.third,'fourth':val1.fourth,'fifth':val1.fifth}]);
         $scope.data_for_Bar_Chart.push(['0-5 Min',val1.first]);
          $scope.data_for_Bar_Chart.push(['5-20 Min',val1.second]);
           $scope.data_for_Bar_Chart.push(['20-60 Min',val1.third]);
            $scope.data_for_Bar_Chart.push(['60-120 Min',val1.fourth]);
             $scope.data_for_Bar_Chart.push(['>120 Min',val1.fifth]);
      }
     
  })
 
$scope.drawOnClickOfRecommendationchart();
}


//Onclick of Recommendation
$scope.drawOnClickOfRecommendationchart=function(){
     $scope.chart5=  new Highcharts.Chart({
            chart: {
            renderTo:'container3',
            type: 'column'
        },
      title: {
            text: ''
        },
        subtitle: {
            text: ''
        }, credits: {
            enabled: false
             },
             exporting:{
              enabled:false
             },

        xAxis: {
            type: 'category',
            labels: {
                rotation: 0,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: false
                },
                colorByPoint: true
            }
        },
         /* colors: [
                '#7cb5ec',
                '#434348',
                '#acf19d',
                '#f7a35c',
                '#8085e9'
            ],*/
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Visitors'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ': <b>{point.y} </b>'
        },
        series: [{
            data: $scope.data_for_Bar_Chart,
            dataLabels: {
                enabled: false,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }],

        responsive: {
            rules: [{
                condition: {
                    maxWidth:600
                },
                chartOptions: {
                    chart: {
                        className: 'small-chart'
                    }
                }
            }]
        }
    });
};

var count = 0;
    $(document).ready(function () {
    $("#menu-toggle").click(function(e) {
       e.preventDefault();
         
        $("#wrapper").toggleClass("active");
         count++;
         if(count % 2==0)
         {
$scope.chart1.setSize(488,260);
$scope.chart2.setSize(488,270);
$scope.chart3.setSize(488,270);
$scope.chart4.setSize(488,270);
$scope.chart5.setSize(488,270);
         }
         else
         {
$scope.chart1.setSize(618,260);
$scope.chart2.setSize(618,270);
$scope.chart3.setSize(618,270);
$scope.chart4.setSize(618,270);
$scope.chart5.setSize(488,270);
         }
    });
});

     });