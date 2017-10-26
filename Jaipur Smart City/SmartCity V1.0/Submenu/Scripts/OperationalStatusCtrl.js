
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

   smartcity.controller('OperationalStatusCtrl', function ($scope, $filter,$http ) {

    /*To change the highlighter*/
 $('.Submenu li').removeClass("active");
 $('#liOperationalStatus').addClass("active");
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

    $scope.OperationalStatusdata=[{'id':2,'label':'Device_Functional'},{'id':3,'label':'Critical_Alert'},{'id':4  ,'label':'Under_Service'}];
    $scope.OperationalStatusModel=[];
    $scope.CamOperationalData=[];
    $scope.CamOperationalModel=[];
    $scope.Rowlables=[];
    var cisco_6000P_temp_Device_Functional=[];
    var cisco_6400_temp_Device_Functional=[];
    var cisco_6400E_temp_Device_Functional=[];
    var cisco_6930_temp_Device_Functional=[];

    var cisco_6000P_temp_Critical_Alert=[];
    var cisco_6400_temp_Critical_Alert=[];
    var cisco_6400E_temp_Critical_Alert=[];
    var cisco_6930_temp_Critical_Alert=[];

    var cisco_6000P_temp_SoftDeleted=[];
    var cisco_6400_temp_SoftDeleted=[];
    var cisco_6400E_temp_SoftDeleted=[];
    var cisco_6930_temp_SoftDeleted=[];

    var cisco_6000P=[];
    var cisco_6400=[];
    var cisco_6400E=[];
    var cisco_6930=[];



//Value from Location Filter
 $scope.CamOperationalDataFirstMultiSelect=function(){

   $scope.drawCAMOperationalStatusDashboard($scope.OperationalStatusModel,$scope.CamOperationalModel);
  }

//Value from Operational Status Filter
$scope.OperationalStatusModelMultiSelect=function(){

  $scope.drawCAMOperationalStatusDashboard($scope.OperationalStatusModel,$scope.CamOperationalModel);
}

    $(function() {
  $(document).ready(function() {



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
         symbolStrDevice_Functionale: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#505053',
         strDevice_Functionale: '#000000',
         style: {
            color: '#CCC'
         },
         states: {
            hover: {
               fill: '#707073',
               strDevice_Functionale: '#000000',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#000003',
               strDevice_Functionale: '#000000',
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

//Cam Activity Summary
  Highcharts.chart('container1', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',

            },
               legend: {
            itemStyle: {

                 //fontSize: '15px'
              }
        },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    showInLegend: true,
                      data: [
                ['Start Live Streaming', 940],
                ['Start Recorded Streaming', 1052],
                ['Stop Live Streaming', 941],
                ['Stop Recorded Streaming', 1045]
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
                name: 'Activity Count',
             dataLabels: {
                            color:'black',
                            distance: -20,
                            formatter: function () {
                                return this.y;

                            }
                        }
            }]
        });


//Values for Filters
$http.get("Json/CAMOperationalStatus2.json").success(function (data, status) {
      $scope.CAMOperationalfilter=data;

     $scope.CamUniqueName = $filter('unique')($scope.CAMOperationalfilter, 'Name');

     $scope.CamOrderBy = $filter('orderBy')($scope.CAMOperationalfilter, 'Name');
     var count=1;
             angular.forEach($scope.CamOrderBy,function (v,k) {
                $scope.CamOperationalData.push({'id':count,'label':v.Name});
                count++;
              });

});



//Draw the CAM Operational Chart
$scope.drawCAMOperationalStatusDashboard=function(val1,val2){
$http.get("Json/CAMOperationalStatus2.json").success(function (data, status) {



//ON Load
if(val1.length==0 && val2.length==0){

  //Important Note:-Make it Dynamic
  /*  var tempRowlables=[];
    $scope.Rowlables=[];
    tempRowlables=$filter('unique')(data, 'OperationalStatus');
    angular.forEach(tempRowlables,function(value,key){
       $scope.Rowlables.push(value.OperationalStatus);
    })*/
$scope.Rowlables=["Device_Functional",'Under_Service',"Critical_Alert"];


//cisco_6000P
    var cisco_6000P = [];
    var cisco_6000P_Device_Functional=[];
    var cisco_6000P_SOFTDELETED=[];
    var cisco_6000P_Critical_Alert=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6000P"){
        if(value.OperationalStatus=="Device_Functional"){
        cisco_6000P_Device_Functional.push(value);
      }
       else if(value.OperationalStatus=="Under_Service"){
        cisco_6000P_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="Critical_Alert"){
        cisco_6000P_Critical_Alert.push(value);
      }
    }
    })

    cisco_6000P.push(cisco_6000P_Device_Functional.length,cisco_6000P_SOFTDELETED.length,cisco_6000P_Critical_Alert.length);

// cisco_6400
    var cisco_6400 = [];
    var cisco_6400_Device_Functional=[];
    var cisco_6400_SOFTDELETED=[];
    var cisco_6400_Critical_Alert=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6400"){
        if(value.OperationalStatus=="Device_Functional"){
        cisco_6400_Device_Functional.push(value);
      }
       else if(value.OperationalStatus=="Under_Service"){
        cisco_6400_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="Critical_Alert"){
        cisco_6400_Critical_Alert.push(value);
      }
    }
    })

    cisco_6400.push(cisco_6400_Device_Functional.length,cisco_6400_SOFTDELETED.length,cisco_6400_Critical_Alert.length);

//cisco_6400E
    var cisco_6400E = [];
    var cisco_6400E_Device_Functional=[];
    var cisco_6400E_SOFTDELETED=[];
    var cisco_6400E_Critical_Alert=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6400E"){
        if(value.OperationalStatus=="Device_Functional"){
        cisco_6400E_Device_Functional.push(value);
      }
       else if(value.OperationalStatus=="Under_Service"){
        cisco_6400E_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="Critical_Alert"){
        cisco_6400E_Critical_Alert.push(value);
      }
    }
    })

    cisco_6400E.push(cisco_6400E_Device_Functional.length,cisco_6400E_SOFTDELETED.length,cisco_6400E_Critical_Alert.length);

//cisco_6930
    var cisco_6930 = [];
    var cisco_6930_Device_Functional=[];
    var cisco_6930_SOFTDELETED=[];
    var cisco_6930_Critical_Alert=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6930"){
        if(value.OperationalStatus=="Device_Functional"){
        cisco_6930_Device_Functional.push(value);
      }
       else if(value.OperationalStatus=="Under_Service"){
        cisco_6930_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="Critical_Alert"){
        cisco_6930_Critical_Alert.push(value);
      }
    }
    })

    cisco_6930.push(cisco_6930_Device_Functional.length,cisco_6930_SOFTDELETED.length,cisco_6930_Critical_Alert.length);

  }

//For Select Options of Dropdowns
  else{

    //If Operational Status Dropdowns are selected and Not Location Dropdown
    if(val2.length==0 && val1.length!=0){
    cisco_6000P = [];
    cisco_6400 = [];
    cisco_6400E = [];
    cisco_6930 = [];
    $scope.Rowlables=[];

    for(var i=0;i<val1.length;i++){
    $scope.Rowlables.push(val1[i].id);
    eval("var cisco_6000P_" + val1[i].id + "=[]");
    eval("var cisco_6400_" + val1[i].id + "=[]");
    eval("var cisco_6400E_" + val1[i].id + "=[]");
    eval("var cisco_6930_" + val1[i].id + "=[]");
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6000P"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6000P_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6400"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6400_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6400E"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6400E_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6930"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6930_" + val1[i].id).push(value);
      }
    }

    })

    cisco_6000P.push(eval("cisco_6000P_" + val1[i].id).length);
    cisco_6400.push(eval("cisco_6400_" + val1[i].id).length);
    cisco_6400E.push(eval("cisco_6400E_" + val1[i].id).length);
    cisco_6930.push(eval("cisco_6930_" + val1[i].id).length);
    }
}

 //If Location Dropdowns are selected and Not Operational Status Dropdown
    if(val1.length==0 && val2.length!=0){

    var tempRowlables=[];
    $scope.Rowlables=[];
    tempRowlables=$filter('unique')(data, 'OperationalStatus');
    angular.forEach(tempRowlables,function(value,key){
       $scope.Rowlables.push(value.OperationalStatus);
    })

    cisco_6000P_temp_Device_Functional=[];
    cisco_6400_temp_Device_Functional=[];
    cisco_6400E_temp_Device_Functional=[];
    cisco_6930_temp_Device_Functional=[];

    cisco_6000P_temp_Critical_Alert=[];
    cisco_6400_temp_Critical_Alert=[];
    cisco_6400E_temp_Critical_Alert=[];
    cisco_6930_temp_Critical_Alert=[];

    cisco_6000P_temp_SoftDeleted=[];
    cisco_6400_temp_SoftDeleted=[];
    cisco_6400E_temp_SoftDeleted=[];
    cisco_6930_temp_SoftDeleted=[];

    cisco_6000P=[];
    cisco_6400=[];
    cisco_6400E=[];
    cisco_6930=[];



    for(var i=0;i<val2.length;i++){
      angular.forEach(data,function(val5,key5){
        if(val5.Name==val2[i].id){
        if(val5.OperationalStatus=="Device_Functional"){
          if(val5.Model=="cisco_6930"){
                 cisco_6930_temp_Device_Functional.push(val5);
          }
          else if(val5.Model=="cisco_6000P"){
                 cisco_6000P_temp_Device_Functional.push(val5);
          }
          else if(val5.Model=="cisco_6400"){
                 cisco_6400_temp_Device_Functional.push(val5);
          }
          else if(val5.Model=="cisco_6400E"){
                 cisco_6400E_temp_Device_Functional.push(val5);
          }
        }


        if(val5.OperationalStatus=="Critical_Alert"){
          if(val5.Model=="cisco_6930"){
                 cisco_6930_temp_Critical_Alert.push(val5);
          }
          else if(val5.Model=="cisco_6000P"){
                 cisco_6000P_temp_Critical_Alert.push(val5);
          }
          else if(val5.Model=="cisco_6400"){
                 cisco_6400_temp_Critical_Alert.push(val5);
          }
          else if(val5.Model=="cisco_6400E"){
                 cisco_6400E_temp_Critical_Alert.push(val5);
          }
        }

        if(val5.OperationalStatus=="Under_Service"){
          if(val5.Model=="cisco_6930"){
                 cisco_6930_temp_SoftDeleted.push(val5);
          }
          else if(val5.Model=="cisco_6000P"){
                 cisco_6000P_temp_SoftDeleted.push(val5);
          }
          else if(val5.Model=="cisco_6400"){
                 cisco_6400_temp_SoftDeleted.push(val5);
          }
          else if(val5.Model=="cisco_6400E"){
                 cisco_6400E_temp_SoftDeleted.push(val5);
          }
        }

        }
      })
    }
    cisco_6000P.push(cisco_6000P_temp_Device_Functional.length,cisco_6000P_temp_SoftDeleted.length,cisco_6000P_temp_Critical_Alert.length);
    cisco_6400.push(cisco_6400_temp_Device_Functional.length,cisco_6400_temp_SoftDeleted.length,cisco_6400_temp_Critical_Alert.length);
    cisco_6400E.push(cisco_6400E_temp_Device_Functional.length,cisco_6400E_temp_SoftDeleted.length,cisco_6400E_temp_Critical_Alert.length);
    cisco_6930.push(cisco_6930_temp_Device_Functional.length,cisco_6930_temp_SoftDeleted.length,cisco_6930_temp_Critical_Alert.length);

    }

 //If both Dropdowns are selected
 else if(val1.length!=0 && val2.length!=0){

    var tempRowlables=[];
    $scope.Rowlables=[];

  var temp_arr=[];
  var temp_arr1=[];

  cisco_6000P=[];
  cisco_6400=[];
  cisco_6400E=[];
  cisco_6930=[];


  for(var i=0;i<val1.length;i++){
    angular.forEach(data,function(value,key){
      if(value.OperationalStatus==val1[i].id){
        temp_arr.push(value);
      }
    })
  }

  for(var j=0;j<val2.length;j++){
  angular.forEach(temp_arr,function(val,key){
    if(val.Name==val2[j].id){
      temp_arr1.push(val);
    }
  })
}



  for(var i=0;i<val1.length;i++){
    $scope.Rowlables.push(val1[i].id);
    eval("var cisco_6000P_" + val1[i].id + "=[]");
    eval("var cisco_6400_" + val1[i].id + "=[]");
    eval("var cisco_6400E_" + val1[i].id + "=[]");
    eval("var cisco_6930_" + val1[i].id + "=[]");
    angular.forEach(temp_arr1,function(value,key){
      if (value.Model=="cisco_6000P"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6000P_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6400"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6400_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6400E"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6400E_" + val1[i].id).push(value);
      }
    }
     if (value.Model=="cisco_6930"){
        if(value.OperationalStatus==val1[i].id){
        eval("cisco_6930_" + val1[i].id).push(value);
      }
    }

    })

    cisco_6000P.push(eval("cisco_6000P_" + val1[i].id).length);
    cisco_6400.push(eval("cisco_6400_" + val1[i].id).length);
    cisco_6400E.push(eval("cisco_6400E_" + val1[i].id).length);
    cisco_6930.push(eval("cisco_6930_" + val1[i].id).length);
    }


//Working Piece
  /*  var cisco_6000P=[];
    var cisco_6400=[];
    var cisco_6400E=[];
    var cisco_6930=[];
    $scope.Rowlables=[];
      for(var i=0;i<val1.length;i++){
        $scope.Rowlables.push(val1[i].id);

        if(val1[i].id=="Device_Functional"){
          cisco_6000P.push(cisco_6000P_temp_Device_Functional.length);
          cisco_6400.push(cisco_6400_temp_Device_Functional.length);
          cisco_6400E.push(cisco_6400E_temp_Device_Functional.length);
          cisco_6930.push(cisco_6930_temp_Device_Functional.length);
        }
         if(val1[i].id=="Critical_Alert"){
          cisco_6000P.push(cisco_6000P_temp_Critical_Alert.length);
          cisco_6400.push(cisco_6400_temp_Critical_Alert.length);
          cisco_6400E.push(cisco_6400E_temp_Critical_Alert.length);
          cisco_6930.push(cisco_6930_temp_Critical_Alert.length);
        }
         if(val1[i].id=="Under_Service"){
          cisco_6000P.push(cisco_6000P_temp_SoftDeleted.length);
          cisco_6400.push(cisco_6400_temp_SoftDeleted.length);
          cisco_6400E.push(cisco_6400E_temp_SoftDeleted.length);
          cisco_6930.push(cisco_6930_temp_SoftDeleted.length);
        }
      }*/
 }
  }

        Highcharts.chart('container', {
        chart: {
            type: 'column',
            options3d: {
                enabled: true,
                alpha: 0,
                beta: -20,
                viewDistance: 25,
                depth: 200
            }
        },

         legend: {
            itemStyle: {
                //color: '#000000',
                 //fontSize: '15px'
              }
        },
             exporting: {
        enabled: false
      },
       credits: {
            enabled: false
             },
        title: {
            text: ''
        },

        xAxis: {
            categories: $scope.Rowlables,
              labels: {
                style: {
                    fontSize:'13px'
                }
            }

        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            title: {
                text: 'Values'
            },
              labels: {
                style: {
                    fontSize:'13px'
                }
            },
        stackLabels: {
                    enabled: true,
                    style: {
                        fontWeight: 'bold',
                        fontSize:'14px',
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'red'
                    }
                }
        },

        tooltip: {
            headerFormat: '<b>{point.key}</b><br>',
            pointFormat: '<span style="color:{series.color}">\u25CF</span> {series.name}: {point.y} '
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                depth: 40,
                     dataLabels: {
                        enabled: true,
                        color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'black',
                        formatter: function () {
                             return this.y.toFixed(2);
                        }
                    }
            },

        },

        series: [{
            name: 'Cisco_6000P',
            data: cisco_6000P
        }, {
            name: 'Cisco_6400',
            data: cisco_6400
        }, {
            name: 'Cisco_6400E',
            data: cisco_6400E
        }, {
            name: 'Cisco_6930',
            data: cisco_6930
        }]
    });
});
}

 $scope.drawCAMOperationalStatusDashboard($scope.OperationalStatusModel,$scope.CamOperationalModel);
});
});
});
