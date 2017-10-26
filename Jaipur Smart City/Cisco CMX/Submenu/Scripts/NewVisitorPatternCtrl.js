
   cisco.controller('NewVisitorPatternCtrl', function ($scope, $filter,$http ) {

     // Adding for default selection - Praveen
    $('#MenuBar1 a').removeClass("activemenu");
    $('#liNewVisitorPattern a').addClass("activemenu")
    // End 
    $scope.d=new Date();
    $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +$scope.d.getDate();
    $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
$scope.DurationTitle="Time";
$scope.month=['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];
  document.getElementById("Day").onchange = function() {
   var dayvalue=document.getElementById("Day").value;
   if(dayvalue=="today"){
        $scope.selectDate('today');
            $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +$scope.d.getDate();
   }
   else if(dayvalue=="yesterday"){
        $scope.selectDate('yesterday');
            $scope.Date1=$scope.d.getFullYear() + "/" + ($scope.d.getMonth()+1) + "/" +($scope.d.getDate()-1);
   }
   else if(dayvalue=="this week"){    
     $scope.DurationTitle=$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;    
        $scope.selectDate('this week');
   }
 
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


    //Font of Highcharts
    Highcharts.setOptions({
            global: {
                useUTC: false
            },
            chart: {
            style: {
            fontFamily: 'geInspira',
            fontWeight:'bold'
           
            }
         }
        });



//GetData for Visitors Chart
$scope.getDataforVisitorChart=function(val1,val2){

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

 $scope.Date1=$scope.SdateMonth+","+$scope.SdateDay+"  -  "+$scope.month[$scope.d.getMonth()]+","+$scope.d.getDate() ;
    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');
    var year=$filter('date')(new Date($scope.rows1.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.rows1.startDate),"M"); 
    var day=$filter('date')(new Date($scope.rows1.startDate),"d");
            for(var i=0;i<$scope.rows1.results[0].data.length;i++)
            {
                
                $scope.data_for_chart.push({'x':Date.UTC(year,month-1,day++,-5,0),'y':$scope.rows1.results[0].data[i].value});
              
            }
            console.log($scope.data_for_chart);
            $scope.drawVisitorschart();

    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
    });

    //api call for number of visitor
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
    $scope.NumberOfTotalVisitor = response.data.value.primary.value;
    $scope.PercentVisitor=response.data;
            // console.log(JSON.stringify($scope.test,null,4))
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=(($scope.PercentVisitor.value.primary.breakdown[0]['value'])-$scope.NewVistoNumberCount);
   if($scope.TotalRepeatVisitorCount<0){
              $scope.TotalRepeatVisitorCount=0;
              $scope.NewVistoNumberCount=0;
            }
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);

            $scope.TotalRepeatVisitorPercent=Math.ceil((($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount));
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent);


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

    // console.log($scope.SdateMonth+","+ $scope.SdateDay);
    $scope.EdateMonth=$filter('date')(new Date($scope.rows1.endDate),'MMM');
    $scope.EdateDay=$filter('date')(new Date($scope.rows1.endDate),'dd');

     // console.log($scope.EdateMonth+","+ $scope.EdateDay);
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

    })
    .error(function(data, status, headers, config) {
        $scope._error = data;
    });

    //api call for number of visitor
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas='+val2+'&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
    $scope.NumberOfTotalVisitor = response.data.value.primary.value;
    $scope.PercentVisitor=response.data;
            // console.log(JSON.stringify($scope.test,null,4))
            $scope.ToatlVisitorCount=$scope.PercentVisitor.value.primary["value"];
            $scope.TotalRepeatVisitorCount=(($scope.PercentVisitor.value.primary.breakdown[0]['value'])-$scope.NewVistoNumberCount);
            if($scope.TotalRepeatVisitorCount<0){
              $scope.TotalRepeatVisitorCount=0;
              $scope.NewVistoNumberCount=0;
            }
            $scope.TotalNewVisitor=($scope.ToatlVisitorCount- $scope.TotalRepeatVisitorCount);

            $scope.TotalRepeatVisitorPercent=Math.ceil((($scope.TotalRepeatVisitorCount*100)/ $scope.ToatlVisitorCount))
            $scope.TotalNewVisitorPercent=(100-$scope.TotalRepeatVisitorPercent)

    });

}
}

//By Default Data for Visitors Chart
$scope.getDataforVisitorChart('today',$scope.areacode);



$scope.newVisitorPattern=function(val2){
        if(val2=='today'){
           
          $http.get('Json/NewVisitorPatternHourly.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
    // console.log($scope.NumberOfVisitor);
       $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
      $scope.NewVistoNumberCount=10;
      $scope.NewVistorNumberCountRepeat=0;
      $scope.NewVistoNumberCountPercent=100;
      $scope.NewVistorNumberCountRepeatPercent=0;

    $scope.rows1 = $scope.NumberOfVisitor;
       // console.log($scope.rows1);
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
    });
      }
      else if(val2=='yesterday'){
        $http.get('Json/NewVisitorPatternHourlyyesterday.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
       $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
    // console.log($scope.NumberOfVisitor);
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
    });
      }
      else if(val2=='this week'){
        $http.get('Json/NewVisitorweekly.json').then(function(response){ 
    $scope.NumberOfVisitor = response.data;
     $scope.data_for_chart_NewVisitor_Hourly_Scatter=[];
    // console.log($scope.NumberOfVisitor);
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
                // tickInterval: 60 * 60 * 1000,
                
            },

     title: {
                text: ''
            }, 
            credits: {
            enabled: false
             },

            series: [{
                name: 'Hourly Trend', 
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
                // tickInterval: 60 * 60 * 1000,
                
            },

     title: {
                text: ''
            }, 
            credits: {
            enabled: false
             },

            series: [{
                name: 'Hourly Trend',
                data: $scope.data_for_chart_NewVisitor_Hourly,
                type: 'area',
                tooltip: {
                    valueDecimals: 2
                }/*,
                 zones: [{
            color: '#9dc7f1',
            value: 5
          },{
            color: '#FF0000'/*'#FF0000'
          }]*/
            },
                {
                  name:'   Alert',
                  data:$scope.data_for_chart_NewVisitor_Hourly_Scatter,
                  type:'scatter',
                  marker:{
                    symbol:'url(images/untitled.png)',
                    distance: 90
                  },
                  enableMouseTracking: false
                }],

        exporting: {
            enabled: false
        }
           
    });
};



// var count = 0;
//     $(document).ready(function () {
//     $("#menu-toggle").click(function(e) {
//        e.preventDefault();
         
//         $("#wrapper").toggleClass("active");
//          count++;
//          if(count % 2==0)
//          {
// $scope.chart1.setSize(488,270);
// $scope.chart2.setSize(488,270);
// $scope.chart3.setSize(488,270);
// $scope.chart4.setSize(488,270);
//          }
//          else
//          {
// $scope.chart1.setSize(618,270);
// $scope.chart2.setSize(618,270);
// $scope.chart3.setSize(618,270);
// $scope.chart4.setSize(618,270);

//          }
//     });
// });

 
     });


