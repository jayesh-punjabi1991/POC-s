
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

   cisco.controller('AssetAlertCtrl', function ($scope, $filter,$http ) {

    // Adding for default selection -- Praveen
     $('#MenuBar1 a').removeClass("activemenu");
     $('#liAssetOperational a').addClass("activemenu");
     // End
     
    $scope.OperationalStatusdata=[{'id':2,'label':'OK'},{'id':3,'label':'CRITICAL'},{'id':4  ,'label':'SOFT_DELETED'}];
    $scope.OperationalStatusModel=[];
    $scope.CamOperationalData=[];
    $scope.CamOperationalModel=[];
    $scope.Rowlables=[];
    var cisco_6000P_temp_OK=[];
    var cisco_6400_temp_OK=[];
    var cisco_6400E_temp_OK=[];
    var cisco_6930_temp_OK=[];   

    var cisco_6000P_temp_Critical=[];
    var cisco_6400_temp_Critical=[];
    var cisco_6400E_temp_Critical=[];
    var cisco_6930_temp_Critical=[];   

    var cisco_6000P_temp_SoftDeleted=[];
    var cisco_6400_temp_SoftDeleted=[];
    var cisco_6400E_temp_SoftDeleted=[];
    var cisco_6930_temp_SoftDeleted=[]; 

    var cisco_6000P=[];
    var cisco_6400=[];
    var cisco_6400E=[];
    var cisco_6930=[]; 

    $(function() {
  $(document).ready(function() {
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
                color: '#000000',                 
                 fontSize: '15px'
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
$http.get("Submenu/Json/CAMOperationalStatus2.json").success(function (data, status) {
      $scope.CAMOperationalfilter=data;

     $scope.CamUniqueName = $filter('unique')($scope.CAMOperationalfilter, 'Name');
     
     $scope.CamOrderBy = $filter('orderBy')($scope.CAMOperationalfilter, 'Name');
     var count=1;
             angular.forEach($scope.CamOrderBy,function (v,k) {
                $scope.CamOperationalData.push({'id':count,'label':v.Name});
                count++;
              });
    
});


//Value from Location Filter
 $scope.CamOperationalDataFirstMultiSelect=function(){
    console.log($scope.CamOperationalModel);
   $scope.drawCAMOperationalStatusDashboard($scope.OperationalStatusModel,$scope.CamOperationalModel);
  }

//Value from Operational Status Filter
$scope.OperationalStatusModelMultiSelect=function(){

  $scope.drawCAMOperationalStatusDashboard($scope.OperationalStatusModel,$scope.CamOperationalModel);
}

//Draw the CAM Operational Chart
$scope.drawCAMOperationalStatusDashboard=function(val1,val2){
$http.get("Submenu/Json/CAMOperationalStatus2.json").success(function (data, status) {



//ON Load
if(val1.length==0 && val2.length==0){
  
  //Important Note:-Make it Dynamic
  /*  var tempRowlables=[];
    $scope.Rowlables=[];
    tempRowlables=$filter('unique')(data, 'OperationalStatus');
    angular.forEach(tempRowlables,function(value,key){     
       $scope.Rowlables.push(value.OperationalStatus);
    })*/
$scope.Rowlables=["OK",'SOFT_DELETED',"CRITICAL"];


//cisco_6000P
    var cisco_6000P = [];
    var cisco_6000P_OK=[];
    var cisco_6000P_SOFTDELETED=[];
    var cisco_6000P_CRITICAL=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6000P"){
        if(value.OperationalStatus=="OK"){
        cisco_6000P_OK.push(value);
      }
       else if(value.OperationalStatus=="SOFT_DELETED"){
        cisco_6000P_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="CRITICAL"){
        cisco_6000P_CRITICAL.push(value);
      }
    }
    })
    
    cisco_6000P.push(cisco_6000P_OK.length,cisco_6000P_SOFTDELETED.length,cisco_6000P_CRITICAL.length);
    
// cisco_6400    
    var cisco_6400 = [];
    var cisco_6400_OK=[];
    var cisco_6400_SOFTDELETED=[];
    var cisco_6400_CRITICAL=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6400"){
        if(value.OperationalStatus=="OK"){
        cisco_6400_OK.push(value);
      }
       else if(value.OperationalStatus=="SOFT_DELETED"){
        cisco_6400_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="CRITICAL"){
        cisco_6400_CRITICAL.push(value);
      }
    }
    })
    
    cisco_6400.push(cisco_6400_OK.length,cisco_6400_SOFTDELETED.length,cisco_6400_CRITICAL.length);

//cisco_6400E
    var cisco_6400E = [];
    var cisco_6400E_OK=[];
    var cisco_6400E_SOFTDELETED=[];
    var cisco_6400E_CRITICAL=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6400E"){
        if(value.OperationalStatus=="OK"){
        cisco_6400E_OK.push(value);
      }
       else if(value.OperationalStatus=="SOFT_DELETED"){
        cisco_6400E_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="CRITICAL"){
        cisco_6400E_CRITICAL.push(value);
      }
    }
    })
    
    cisco_6400E.push(cisco_6400E_OK.length,cisco_6400E_SOFTDELETED.length,cisco_6400E_CRITICAL.length);

//cisco_6930
    var cisco_6930 = [];
    var cisco_6930_OK=[];
    var cisco_6930_SOFTDELETED=[];
    var cisco_6930_CRITICAL=[];
    angular.forEach(data,function(value,key){
      if (value.Model=="cisco_6930"){
        if(value.OperationalStatus=="OK"){
        cisco_6930_OK.push(value);
      }
       else if(value.OperationalStatus=="SOFT_DELETED"){
        cisco_6930_SOFTDELETED.push(value);
      }
       else if(value.OperationalStatus=="CRITICAL"){
        cisco_6930_CRITICAL.push(value);
      }
    }
    })
    
    cisco_6930.push(cisco_6930_OK.length,cisco_6930_SOFTDELETED.length,cisco_6930_CRITICAL.length);
   
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

    cisco_6000P_temp_OK=[];
    cisco_6400_temp_OK=[];
    cisco_6400E_temp_OK=[];
    cisco_6930_temp_OK=[];   

    cisco_6000P_temp_Critical=[];
    cisco_6400_temp_Critical=[];
    cisco_6400E_temp_Critical=[];
    cisco_6930_temp_Critical=[];   

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
        if(val5.OperationalStatus=="OK"){
          if(val5.Model=="cisco_6930"){
                 cisco_6930_temp_OK.push(val5);   
          }
          else if(val5.Model=="cisco_6000P"){
                 cisco_6000P_temp_OK.push(val5);   
          }
          else if(val5.Model=="cisco_6400"){
                 cisco_6400_temp_OK.push(val5);   
          }
          else if(val5.Model=="cisco_6400E"){
                 cisco_6400E_temp_OK.push(val5);   
          }
        }


        if(val5.OperationalStatus=="CRITICAL"){
          if(val5.Model=="cisco_6930"){
                 cisco_6930_temp_Critical.push(val5);   
          }
          else if(val5.Model=="cisco_6000P"){
                 cisco_6000P_temp_Critical.push(val5);   
          }
          else if(val5.Model=="cisco_6400"){
                 cisco_6400_temp_Critical.push(val5);   
          }
          else if(val5.Model=="cisco_6400E"){
                 cisco_6400E_temp_Critical.push(val5);   
          }
        }

        if(val5.OperationalStatus=="SOFT_DELETED"){
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
    cisco_6000P.push(cisco_6000P_temp_OK.length,cisco_6000P_temp_SoftDeleted.length,cisco_6000P_temp_Critical.length);
    cisco_6400.push(cisco_6400_temp_OK.length,cisco_6400_temp_SoftDeleted.length,cisco_6400_temp_Critical.length);
    cisco_6400E.push(cisco_6400E_temp_OK.length,cisco_6400E_temp_SoftDeleted.length,cisco_6400E_temp_Critical.length);
    cisco_6930.push(cisco_6930_temp_OK.length,cisco_6930_temp_SoftDeleted.length,cisco_6930_temp_Critical.length);

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

        if(val1[i].id=="OK"){
          cisco_6000P.push(cisco_6000P_temp_OK.length);
          cisco_6400.push(cisco_6400_temp_OK.length);
          cisco_6400E.push(cisco_6400E_temp_OK.length);
          cisco_6930.push(cisco_6930_temp_OK.length);
        }
         if(val1[i].id=="CRITICAL"){
          cisco_6000P.push(cisco_6000P_temp_Critical.length);
          cisco_6400.push(cisco_6400_temp_Critical.length);
          cisco_6400E.push(cisco_6400E_temp_Critical.length);
          cisco_6930.push(cisco_6930_temp_Critical.length);
        }
         if(val1[i].id=="SOFT_DELETED"){
          cisco_6000P.push(cisco_6000P_temp_SoftDeleted.length);
          cisco_6400.push(cisco_6400_temp_SoftDeleted.length);
          cisco_6400E.push(cisco_6400E_temp_SoftDeleted.length);
          cisco_6930.push(cisco_6930_temp_SoftDeleted.length);
        }
      }*/
 }  
  }
   
        Highcharts.chart('container3', {
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
                color: '#000000',                 
                 fontSize: '15px'
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


