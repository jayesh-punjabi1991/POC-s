
   cisco.controller('ciscoctrl', function ($scope, $filter,$http ) {
   function newDoc() {
    debugger
    }
     $scope.rows1=[];
     $scope.dwelltimechart=[];
     $scope.UTCofCurrentDate=[];
     $scope.data_for_chart = [];
     $scope.Dwell=108;
     $scope.dataforchart="!loading";

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
$scope.getDataforVisitorChart=function(val1){
    var body = {
            "areas":"(90,98,76,77,86,92,91,93,94)",
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
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/overview?areas=90%2C98%2C76%2C77%2C86%2C92%2C91%2C93%2C94&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=0-1440&includeStationary=false&connectionState=all&type=deviceCount&_=1480136440410').then(function(response){ 
    $scope.NumberOfVisitor = response.data.value.primary.value;

    });
}

/*//By Default Data for Visitors Chart
$scope.getDataforVisitorChart('today');

//For Dwell Time Chart
$scope.getDataforDwellTimeChart=function(val1){


//api call
  $http.get('https://msesandbox.cisco.com:8081/api/analytics/v1/dwellBreakdown?areas=(16)&granularity=hourly&yAxis=absoluteVisits&timeRange=00%3A00-23%3A59&period='+val1+'&durationCategories=5-480&includeStationary=false&connectionState=all&dwellLimits=0-5min%3A5%2C5-20min%3A20%2C20-60min%3A60%2C60-120min%3A120%2C%3E120min%3A-1&_=1480065279569').then(function(response){ 
    $scope.dwelltimechart = response.data;
    $scope.data_for_dwell_time_chart_0_to_5=[];
    $scope.data_for_dwell_time_chart_5_to_20=[];
    $scope.data_for_dwell_time_chart_20_to_60=[];
    $scope.data_for_dwell_time_chart_60_to_120=[];
    $scope.data_for_dwell_time_chart_greaterthan_120=[];
    $scope.data_for_dwell_time_chart_total=[];
    $scope.data_for_dwell_time_chart_max_points=[];
    var max=0;
    var year=$filter('date')(new Date($scope.dwelltimechart.startDate),"yyyy"); 
    var month=$filter('date')(new Date($scope.dwelltimechart.startDate),"M"); 
    var day=$filter('date')(new Date($scope.dwelltimechart.startDate),"d");
    var count=0;
    var count1=-5;
            for(var i=0;i<$scope.dwelltimechart.results[0].data.length;i++)
            {
                
                 $scope.data_for_dwell_time_chart_0_to_5.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']});
                 $scope.data_for_dwell_time_chart_5_to_20.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['5-20min']});
                 $scope.data_for_dwell_time_chart_20_to_60.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['20-60min']});
                 $scope.data_for_dwell_time_chart_60_to_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['60-120min']});
                 $scope.data_for_dwell_time_chart_greaterthan_120.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['>120min']});
                 $scope.data_for_dwell_time_chart_total.push({'x':Date.UTC(year,month-1,day,count1,-30),'y':$scope.dwelltimechart.results[0].data[count].values['0-5min']+$scope.dwelltimechart.results[0].data[count].values['5-20min']+$scope.dwelltimechart.results[0].data[count].values['20-60min']+$scope.dwelltimechart.results[0].data[count].values['60-120min']+$scope.dwelltimechart.results[0].data[count].values['>120min']});
                
                count++;
                count1++;
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

            $scope.drawDwellTimechart();

});
}

$scope.getDataforDwellTimeChart('today');


//Switch views on toggle of dropdown for Visitors chart
    $scope.selectDate=function(val){
        $scope.dataforchart="loading";
        if(val=='today'){
            $scope.Dwell=108;
         $scope.getDataforVisitorChart(val);
         $scope.getDataforDwellTimeChart(val);
         
      }
      else if(val=='yesterday'){
        $scope.Dwell=113;
         $scope.getDataforVisitorChart(val);
        $scope.getDataforDwellTimeChart(val);
      }
      else if(val=='this+week'){
            console.log(val);
       
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
                tickInterval: 60 * 60 * 1000,
                
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
              ordinal:false,
                type: 'datetime',
                dateTimeLabelFormats: {
                hour: '%I %P',
                month: ' %e. %b.',
                year: '%b'
                },                
                tickInterval: 60 * 60 * 1000,
        },
            credits: {
            enabled: false
             },
        yAxis: {
        
           
        },
        tooltip: {
            split: true,

        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                }
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
        },{
            type:"scatter",
            name: 'Recommendation for Promotion/Event time',
            data:  $scope.data_for_dwell_time_chart_max_points,
             enableMouseTracking: false
           
            
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
//Pending//

    $scope.chart2= new Highcharts.Chart({
            rangeSelector: {
                selected: 1
            },
             chart: {
                    renderTo: 'container2'
              },    
              yAxis: {
            min: 0,
            title: {
                text: 'Number of visitor'
            }
        },
            xAxis:  {
                type: 'area',
                labels:  {
                formatter: function () {
                    //return this.value; 
                  return global.formatAMPM(this.value);// clean, unformatted number for year
                }
            }
            },
     title: {
                text: ''
            }, 
            credits: {
            enabled: false
             },

            series: [{
                name: 'Hourly Trend',
                data: $scope.data_for_dwell_time_chart,
                type: 'area',
        
                tooltip: {
                    valueDecimals: 2
                }
            }],
                exporting: {
                enabled: false
                }
           
            
          });
        
  

 
$scope.chart4= new Highcharts.Chart({
         chart: {
                    renderTo: 'container3',
                    type: 'donut'
              },
        subtitle: {
            text: ''
        },
         plotOptions: {
            pie: {
                innerSize: '70%',
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        
        title: {
            verticalAlign: 'middle',
            floating: true
        },
       
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ': <b>{point.y:.1f} </b>'
        }, 
            credits: {
            enabled: false
             },
            series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox', 45.0],
                ['IE', 26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari', 8.5],
                ['Opera', 6.2],
                ['Others', 0.7]
            ]
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
*/


var count = 0;
    $(document).ready(function () {
    $("#menu-toggle").click(function(e) {
       e.preventDefault();
         
        $("#wrapper").toggleClass("active");
         count++;
         if(count % 2==0)
         {
$scope.chart1.setSize(488,270);
$scope.chart2.setSize(488,270);
$scope.chart3.setSize(488,270);
$scope.chart4.setSize(488,270);
         }
         else
         {
$scope.chart1.setSize(618,270);
$scope.chart2.setSize(618,270);
$scope.chart3.setSize(618,270);
$scope.chart4.setSize(618,270);

         }
    });
});

 
     });


