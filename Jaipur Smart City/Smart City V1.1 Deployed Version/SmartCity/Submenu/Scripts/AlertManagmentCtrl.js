
   smartcity.service("global1", function(){

            this.formatAMPM = function(date){
                  var date = new Date(date);
                  var hours = date.getHours();
                  var minutes = date.getMinutes();
                  var ampm = hours >= 12 ? 'pm' : 'am';
                  hours = hours % 12;
                  hours = hours ? hours : 12; // the hour '0' should be '12'
                  minutes = minutes < 10 ? '0'+minutes : minutes;
                  var strTime = hours + ampm;
                  return strTime;
        },
        this.getAllData= function(pfname){
          //$scope.loading=true;
          var httpfreq = new XMLHttpRequest();
          try {
            httpfreq.open("GET", "data/sheet4alldata.json", false);
            httpfreq.send(null);
            var status = httpfreq.status;
            if((status === 200) || (status === 0) || (status === 1100)) {
              scrcontent = httpfreq.responseText;
               
                   
            }    
          } catch (e) {
          }
        return JSON.parse(scrcontent);
        //$scope.loading=false; 
        },
        this.getAlertData= function(pfname){
          // $scope.loading=true;
          var httpfreq = new XMLHttpRequest();
          try {
            httpfreq.open("GET", "data/sheet4security.json", false);
            httpfreq.send(null);
            var status = httpfreq.status;
            if((status === 200) || (status === 0) || (status === 1100)) {
              scrcontent = httpfreq.responseText;
             //onsole.log(scrcontent);   
                  
            }    
          } catch (e) {
          }
        return JSON.parse(scrcontent);
        //$scope.loading=false;  
        },
        this.getHealthData= function(pfname){
          // $scope.loading=true;
          var httpfreq = new XMLHttpRequest();
          try {
            httpfreq.open("GET", "data/sheet4health.json", false);
            httpfreq.send(null);
            var status = httpfreq.status;
            if((status === 200) || (status === 0) || (status === 1100)) {
              scrcontent = httpfreq.responseText;
             //onsole.log(scrcontent);   
                    
            }    
          } catch (e) {
          }
        return JSON.parse(scrcontent);
        //$scope.loading=false;
        };

   });


   smartcity.controller('AlertManagmentCtrl', function ($rootScope,$scope,$filter,$http,global1 ) { 
    $scope.hidden=true;
  $scope.hiddenc=true;
  $scope.hiddenh=true;

$('.Submenu li').removeClass("active");
$('#liAlertManagementDiag').addClass("active");
  

Highcharts.theme = {
   colors: ['#8e4fc8', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
      '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#2a2a2b'],
            [1, '#3e3e40']
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
         color: '#E0E0E3'
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
  
    $scope.callme= function(){     
     if($scope.hidden){
       $('#filterPanel .panel-body > .row').addClass("activepnl");
         $('#filterpanelh .panel-title > .row').addClass("activepnl");
       $($(".panel-collapse-clickable")[0]).find('i').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");     
     }else{
       $('filterPanel .panel-body > .row').removeClass("activepnl");
         $('#filterpanelh .panel-title > .row').removeClass("activepnl");     
       $($(".panel-collapse-clickable")[0]).find('i').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
     }
     $scope.hidden=!$scope.hidden;
     
   };
   
   $scope.classify= function(){    
     if($scope.hiddenc){
       $('#filterPanelc .panel-body > .row').addClass("activepnl");
         $('#filterpanelhc .panel-title > .row').addClass("activepnl");
       $($(".panel-collapse-clickable")[1]).find('i').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
     }else{
       $('filterPanelc .panel-body > .row').removeClass("activepnl");
         $('#filterpanelhc .panel-title > .row').removeClass("activepnl");
       $($(".panel-collapse-clickable")[1]).find('i').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
     }
     $scope.hiddenc=!$scope.hiddenc;
     
   };
   
   $scope.healthstatus= function(){    
     if($scope.hiddenh){
       $('#filterPanelh .panel-body > .row').addClass("activepnl");
         $('#filterpanelhh .panel-title > .row').addClass("activepnl");
       $($(".panel-collapse-clickable")[2]).find('i').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");
     }else{
       $('filterPanelh .panel-body > .row').removeClass("activepnl");
         $('#filterpanelhh .panel-title > .row').removeClass("activepnl");
      $($(".panel-collapse-clickable")[2]).find('i').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
     }
     $scope.hiddenh=!$scope.hiddenh;     
   };
   
   
 
   
     // Adding for default selection -- Praveen
     $('#MenuBar1 a').removeClass("activemenu");
     $('#liAssetAlertMontioring a').addClass("activemenu");
     // End
     
    $scope.allData=global1.getAllData();
    $scope.securityData=global1.getAlertData();
    $scope.healthData=global1.getHealthData();
    sessionStorage.removeItem("severity");
    sessionStorage.removeItem("severityal");
    sessionStorage.removeItem("severityh");
   
    var typesarray=[];
    var typesdata=[];
    var devicesarray=[];
    var devicesdata=[];
    angular.forEach($scope.allData, function(value, key) {      
     if(typesarray.indexOf(value.type) ==-1){
      typesarray.push(value.type)
      var lobj={id: typesarray.length, label: value.type}
      typesdata.push(lobj);
     }
     if(devicesarray.indexOf(value.device) ==-1){
      devicesarray.push(value.device)
      var ldevobj={id: devicesarray.length, label: value.device}
      devicesdata.push(ldevobj);
     }
     
   });

    $scope.statusmodel = [];
    $scope.devicemodel = [];
    $scope.severitymodel = [];
    $scope.typesmodel = [];
       
    $scope.statusdata = [ {id: 1, label: "New"},{id: 2, label: "CLR"}];
    $scope.severitydata = [ {id: 1, label: "No Action"},{id: 2, label: "CRITICAL"}];        
    $scope.typesdata = typesdata;
    $scope.devicedata = devicesdata;

    $scope.filterObj={
                      "statusFilters": [],                    
                      "deviceFilters": [],                      
                      "typesFilters": [],
                      "severityFilters": []
                     };

    $rootScope.filterObj=$scope.filterObj;


   $scope.allData1=$scope.allData;
   $scope.chartdata=getChartDataLoad($scope.allData1);
    drawPichart($scope.chartdata,$rootScope);



   function getChartDataLoad(src){
    
      var  infoarray=[];
      var piedataonload=[];
      $scope.filterObj.severityFilters=[{"severity":"No Action"}];
       infoarray= getChartData($scope.filterObj,src);
    
       var lobj={
                name: 'No Action',
                y: infoarray.length
                };
       piedataonload.push(lobj);
        lobj={
                name: 'CRITICAL',
                y: src.length-infoarray.length
                };
        piedataonload.push(lobj);      
        
        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj)); 
        $scope.filterObj.severityFilters=[];
        return piedataonload;

      };

    function getChartData(fobj,src){
      var finalarray=src; 
      for (var key in fobj) {        
         if(fobj[key].length!=0){
          
          if(key=="severityFilters"){
            $scope.datawos=finalarray;
           
          }

          finalarray= getFiltearr(fobj[key],finalarray);
        }
      }
      return finalarray;
    };


    function getFiltearr(filtercondarr,srcoffilter){        
        var filtarr3=[];      
        angular.forEach(filtercondarr, function(value, key) {
           
             var temp=$filter('filter')(srcoffilter, value); 
                        
             filtarr3=filtarr3.concat(temp);
        });
      
      
        return filtarr3;
    };

    
    
    

   $scope.statusMultiSelData= function(){
       var  infoarray=[];
       

      var temp=[]   
      angular.forEach($scope.statusmodel, function(val, key){        
          var sm=$filter('filter')($scope.statusdata,val.id);
          temp.push(sm[0]);
      });
      
      temp=temp.map(function(item,index){          
           var obj={"status":item.label};
           return obj;
      }
      );
     
      $scope.filterObj.statusFilters=temp;
      
    
       var piedata=[];
       var  filterarray=[];
      if($scope.statusmodel.length==$scope.statusdata.length){
        $scope.filterObj.statusFilters=[];
      }
      var sfiltersarr=[{"severity":"No Action"}];
      
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   
                 }
                  
            });

      };
      
     
      if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
      if(filterarray.length>0){
       var lobj={
                name: 'No Action',
                y: filterarray.length
                };
       piedata.push(lobj);
      } 
      if(($scope.datawos.length-filterarray.length)>0){
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj);  
      }
      }else{
        filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
       piedata.push(lobj);

      }
        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj));     
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);
   };
   $scope.deviceMultiSelData= function(){    
      var temp=[]   
      angular.forEach($scope.devicemodel, function(val, key){        
          var dm=$filter('filter')($scope.devicedata,val.id);
          temp.push(dm[0]);
      });
      temp=temp.map(function(item,index){          
           var obj={"device":item.label};
           return obj;
      }
      );
    
      $scope.filterObj.deviceFilters=temp;
     

       var piedata=[];
       var  filterarray=[];
      if($scope.devicemodel.length==$scope.devicedata.length){
        $scope.filterObj.deviceFilters=[];
      }
      var sfiltersarr=[{"severity":"No Action"}];
      
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   
                 }
                  
            });

      };
   
     if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
      if(filterarray.length>0){
         var lobj={
                  name: 'No Action',
                  y: filterarray.length
                  };
         piedata.push(lobj);
      }
      if(($scope.datawos.length-filterarray.length)>0){
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj); 

      }
         

      }else{
        filterarray= getChartData($scope.filterObj,$scope.allData1);
       if(filterarray.length>0){ 
       var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
       piedata.push(lobj);
     }

      }
        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj)); 
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);






   };
   $scope.severityMultiSelData= function(){    
      var temp=[]   
      /* if($scope.severitymodel.length==$scope.severitydata.length){
        $scope.filterObj.severityFilters=[];
        $scope.severitymodel=[];
      } */
      angular.forEach($scope.severitymodel, function(val, key){        
          var svm=$filter('filter')($scope.severitydata,val.id);
          temp.push(svm[0]);
           
      })
      if(temp.length>0){
        temp=temp.map(function(item,index){          
             var obj={"severity":item.label};
             if (typeof(Storage) !== "undefined") {
              sessionStorage.setItem("severity", item.label);              
             }
             return obj;
        }
        );

      }
      
     
      $scope.filterObj.severityFilters=temp;
      if($scope.severitymodel.length==$scope.severitydata.length || $scope.severitymodel.length==0){
        sessionStorage.removeItem("severity");        
      }

      var piedata=[];
      var  filterarray=[];
      if(sessionStorage.getItem("severity")!=null){
        filterarray= getChartData($scope.filterObj,$scope.allData1);
        if(filterarray.length>0){
         var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
           piedata.push(lobj);
         }

      }else{
        $scope.filterObj.severityFilters=[{"severity":"No Action"}];
        filterarray= getChartData($scope.filterObj,$scope.allData1);
        if(filterarray.length>0){
        var lobj={
                name: 'No Action',
                y: filterarray.length
                };
       piedata.push(lobj);
     }
        if(($scope.datawos.length-filterarray.length)>0){
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj); 
      }

      }
      sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj)); 
      $scope.chartdata=piedata;
        drawPichart($scope.chartdata);
   };
   $scope.typesMultiSelData= function(){    
      var temp=[]   
      angular.forEach($scope.typesmodel, function(val, key){        
          var tm=$filter('filter')($scope.typesdata,val.id);
          temp.push(tm[0]);
      })
      temp=temp.map(function(item,index){          
           var obj={"type":item.label};
           return obj;
      }
      );
      $scope.filterObj.typesFilters=temp;
     


      var piedata=[];
       var  filterarray=[];
      if($scope.typesmodel.length==$scope.typesdata.length){
        $scope.filterObj.typesFilters=[];
      }
      var sfiltersarr=[{"severity":"No Action"}];
      var found=0;
     if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
   

   if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'No Action',
                y: filterarray.length
                };
       piedata.push(lobj);
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj);  
      }else{
        filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
       piedata.push(lobj);

      }
       sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj));
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);
   };

   

  $scope.statusMultiDeselData = function(){
   
      var temp=[]   
      angular.forEach($scope.statusmodel, function(val, key){        
          var sm=$filter('filter')($scope.statusdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"status":item.label};
             return obj;
        }
        );

      }
      
     
      $scope.filterObj.statusFilters=temp;
    
    

    if($scope.statusmodel.length==0 ||($scope.statusmodel.length== $scope.statusdata.length)){                    
        $scope.filterObj.statusFilters=[];
    }
    
    var piedata=[];
    var  infoarray=[];
    var sfiltersarr=[{"severity":"No Action"}];
      var found=0;
    if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
    
   
      if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'No Action',
                y: filterarray.length
                };
       piedata.push(lobj);
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj);  
     
       }else{
        filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
       piedata.push(lobj);

       }

        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj)); 
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);


  };
  $scope.deviceMultiDeselData = function(){
  var temp=[]   
      angular.forEach($scope.devicemodel, function(val, key){        
          var sm=$filter('filter')($scope.devicedata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"device":item.label};
             return obj;
        }
        );

      }
      
    
      $scope.filterObj.deviceFilters=temp;
     
    

    if($scope.devicemodel.length==0 ||($scope.devicemodel.length== $scope.devicedata.length)){                    
        $scope.filterObj.deviceFilters=[];
    }

    var piedata=[];
       var  filterarray=[];
      
      var sfiltersarr=[{"severity":"No Action"}];
      var found=0;
     if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
      if(sessionStorage.getItem("severity")==null){
        filterarray= getChartData($scope.filterObj,$scope.allData1);
         var lobj={
                  name: 'No Action',
                  y: filterarray.length
                  };
         piedata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.datawos.length-filterarray.length
                  };
          piedata.push(lobj); 
        }else{
          filterarray= getChartData($scope.filterObj,$scope.allData1);
         var lobj={
                  name: sessionStorage.getItem("severity"),
                  y: filterarray.length
                  };
         piedata.push(lobj);

        }
        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj)); 
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);
    
  };
  $scope.severityMultiDeselData = function(){  
  };
  $scope.typesMultiDeselData = function(){ 
    var temp=[]   
      angular.forEach($scope.typesmodel, function(val, key){        
          var sm=$filter('filter')($scope.typesdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"type":item.label};
             return obj;
        }
        );

      }
      
     
      $scope.filterObj.typesFilters=temp;
    
    

    if($scope.typesmodel.length==0 ||($scope.typesmodel.length== $scope.typesdata.length)){                    
        $scope.filterObj.typesFilters=[];
    }

    
    var piedata=[];
       var  filterarray=[];
      
      var sfiltersarr=[{"severity":"No Action"}];
      var found=0;
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"No Action"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
      if(sessionStorage.getItem("severity")==null){
   
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'No Action',
                y: filterarray.length
                };
       piedata.push(lobj);
        lobj={
                name: 'CRITICAL',
                y: $scope.datawos.length-filterarray.length
                };
        piedata.push(lobj); 
      }else{
        filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: sessionStorage.getItem("severity"),
                y: filterarray.length
                };
       piedata.push(lobj);

      }
        sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj));
        $scope.chartdata=piedata;
        drawPichart($scope.chartdata);
  };


//security mod starts


    var typesalarray=[];
    var typesaldata=[];
    var extypesalarray=[];
    var extypesaldata=[];
    var devicesalarray=[];
    var devicesaldata=[];

    angular.forEach($scope.securityData, function(value, key) {      
     if(typesalarray.indexOf(value.type) ==-1){
      typesalarray.push(value.type)
      var lobj={id: typesalarray.length, label: value.type}
      typesaldata.push(lobj);
     }
     if(devicesalarray.indexOf(value.device) ==-1){
      devicesalarray.push(value.device)
      var ldevobj={id: devicesalarray.length, label: value.device}
      devicesaldata.push(ldevobj);
     }
     if(extypesalarray.indexOf(value.extended) ==-1){
      extypesalarray.push(value.extended)
      var ldevobj={id: extypesalarray.length, label: value.extended}
      extypesaldata.push(ldevobj);
     }
     
   });

    function getChartDataLoadal(src){     
      var  infoarray=[];
      var coldataonload=[];
      $scope.filterObjal.severityFilters=[{"severity":"No Action"}];
      infoarray= getFiltearr($scope.filterObjal.severityFilters,src);      
       var lobj={
                name: 'No Action',
                y: infoarray.length
                };
       coldataonload.push(lobj);
        lobj={
                name: 'CRITICAL',
                y: src.length-infoarray.length
                };
        coldataonload.push(lobj);
        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal)); 
        $scope.filterObjal.severityFilters=[];
        return coldataonload;
      };

    $scope.statusalmodel = [];
    $scope.devicealmodel = [];
    $scope.severityalmodel = [];
    $scope.typesalmodel = [];
    $scope.extypesalmodel = [];
       
    $scope.statusaldata = [ {id: 1, label: "NEW"}];
    $scope.severityaldata = [ {id: 1, label: "No Action"},{id: 2, label: "CRITICAL"}];        
    $scope.typesaldata = typesaldata;
    $scope.devicealdata = devicesaldata;
    $scope.extypesaldata = extypesaldata;

    $scope.filterObjal={
                      "statusalFilters": [],                    
                      "devicealFilters": [],                      
                      "typesalFilters": [],
                      "extypesalFilters": [],
                      "severityalFilters": []
                     };


$scope.alertData1=$scope.securityData;
$scope.colchartdata=getChartDataLoadal($scope.alertData1);
 $scope.labeldata=['No Action','CRITICAL'];
drawColumnchart($scope.colchartdata,$scope.labeldata);

$scope.devicealMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.devicealmodel, function(val, key){        
          var sm=$filter('filter')($scope.devicealdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"device":item.label};
             return obj;
          }
           );

      }      
    
      $scope.filterObjal.devicealFilters=temp;
    
    if($scope.devicealmodel.length==0 ||($scope.devicealmodel.length== $scope.devicealdata.length)){                    
      $scope.filterObjal.devicealFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"No Action"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"No Action"}];
                 }                  
            });

      };
      var finalarray=$scope.alertData1;   
         if($scope.filterObjal["statusalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["statusalFilters"],finalarray);
           }
         if($scope.filterObjal["devicealFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["devicealFilters"],finalarray);
           }
         if($scope.filterObjal["typesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["typesalFilters"],finalarray);
           }
         if($scope.filterObjal["extypesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["extypesalFilters"],finalarray);
           }
         $scope.total=finalarray;
         if($scope.filterObjal["severityalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["severityalFilters"],finalarray);
           }

      if(sessionStorage.getItem("severityal")==null){
         var lobj={
                  name: 'No Action',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);          
        }else{
          // filterarray= getChartData($scope.filterObj,$scope.alertData1);
         var lobj={
                  name: sessionStorage.getItem("severityal"),
                  y: finalarray.length
                  };
         coldata.push(lobj);

        }
        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal));

        $scope.colchartdata=coldata;

        drawColumnchart($scope.colchartdata,$scope.labeldata);
    
  };


  $scope.typesalMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.typesalmodel, function(val, key){        
          var sm=$filter('filter')($scope.typesaldata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"type":item.label};
             return obj;
          }
           );

      }      
     
      $scope.filterObjal.typesalFilters=temp;
    
    if($scope.typesalmodel.length==0 ||($scope.typesalmodel.length== $scope.typesaldata.length)){                    
      $scope.filterObjal.typesalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"No Action"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"No Action"}];
                 }                  
            });

      };
      var finalarray=$scope.alertData1;   
         if($scope.filterObjal["statusalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["statusalFilters"],finalarray);
           }
         if($scope.filterObjal["devicealFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["devicealFilters"],finalarray);
           }
         if($scope.filterObjal["typesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["typesalFilters"],finalarray);
           }
          if($scope.filterObjal["extypesalFilters"].length!=0){  
            finalarray= getFiltearr($scope.filterObjal["extypesalFilters"],finalarray);
         }
         $scope.total=finalarray;
         if($scope.filterObjal["severityalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["severityalFilters"],finalarray);
           }

      if(sessionStorage.getItem("severityal")==null){
         var lobj={
                  name: 'No Action',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);          
        }else{
          // filterarray= getChartData($scope.filterObj,$scope.alertData1);
         var lobj={
                  name: sessionStorage.getItem("severityal"),
                  y: finalarray.length
                  };
         coldata.push(lobj);

        }
        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal));
        $scope.colchartdata=coldata;

        drawColumnchart($scope.colchartdata,$scope.labeldata);
    
  };

  $scope.extypesalMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.extypesalmodel, function(val, key){        
          var sm=$filter('filter')($scope.extypesaldata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"extended":item.label};
             return obj;
          }
           );

      }      
      
      $scope.filterObjal.extypesalFilters=temp;
    
    if($scope.extypesalmodel.length==0 ||($scope.extypesalmodel.length== $scope.extypesaldata.length)){                    
      $scope.filterObjal.extypesalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"No Action"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"No Action"}];
                 }                  
            });

      };
      var finalarray=$scope.alertData1;   
         if($scope.filterObjal["statusalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["statusalFilters"],finalarray);
           }
         if($scope.filterObjal["devicealFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["devicealFilters"],finalarray);
           }
         if($scope.filterObjal["typesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["typesalFilters"],finalarray);
           }
           if($scope.filterObjal["extypesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["extypesalFilters"],finalarray);
           }
         $scope.total=finalarray;
         if($scope.filterObjal["severityalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["severityalFilters"],finalarray);
           }

      if(sessionStorage.getItem("severityal")==null){
         var lobj={
                  name: 'No Action',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);          
        }else{
          // filterarray= getChartData($scope.filterObj,$scope.alertData1);
         var lobj={
                  name: sessionStorage.getItem("severityal"),
                  y: finalarray.length
                  };
         coldata.push(lobj);

        }
        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal));
        $scope.colchartdata=coldata;
        drawColumnchart($scope.colchartdata,$scope.labeldata);
    
  };
  $scope.statusalMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.statusalmodel, function(val, key){        
          var sm=$filter('filter')($scope.statusaldata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"status":item.label};
             return obj;
          }
           );

      }      
     
      $scope.filterObjal.statusalFilters=temp;
    
    if($scope.statusalmodel.length==0 ||($scope.statusalmodel.length== $scope.statusaldata.length)){                    
      $scope.filterObjal.statusalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"No Action"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"No Action"}];
                 }                  
            });

      };

      var finalarray=$scope.alertData1;   
         if($scope.filterObjal["statusalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["statusalFilters"],finalarray);
           }
         if($scope.filterObjal["devicealFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["devicealFilters"],finalarray);
           }
         if($scope.filterObjal["typesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["typesalFilters"],finalarray);
           }
           if($scope.filterObjal["extypesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["extypesalFilters"],finalarray);
           }
         $scope.total=finalarray;
         if($scope.filterObjal["severityalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["severityalFilters"],finalarray);
           }

      if(sessionStorage.getItem("severityal")==null){
         var lobj={
                  name: 'No Action',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);          
        }else{
          // filterarray= getChartData($scope.filterObj,$scope.alertData1);
         var lobj={
                  name: sessionStorage.getItem("severityal"),
                  y: finalarray.length
                  };
         coldata.push(lobj);

        }
        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal));
        $scope.colchartdata=coldata;
        drawColumnchart($scope.colchartdata,$scope.labeldata);
    
  };

  $scope.severityalMultiSelData= function(){    
      var temp=[]   
      /* if($scope.severityalmodel.length==$scope.severityaldata.length){
        $scope.filterObjal.severityalFilters=[];
        $scope.severityalmodel=[];
      } */
      angular.forEach($scope.severityalmodel, function(val, key){        
          var svm=$filter('filter')($scope.severityaldata,val.id);
          temp.push(svm[0]);
           
      })
      if(temp.length>0){
        temp=temp.map(function(item,index){          
             var obj={"severity":item.label};
             if (typeof(Storage) !== "undefined") {
              sessionStorage.setItem("severityal", item.label);              
             }
             return obj;
        }
        );

      }
      
     
      $scope.filterObjal.severityalFilters=temp;
      if($scope.severityalmodel.length==$scope.severityaldata.length || $scope.severityalmodel.length==0){
        $scope.filterObjal.severityalFilters=[{"severity":"No Action"}];
        sessionStorage.removeItem("severityal");        
      }
    
         var finalarray=$scope.alertData1;  
         var coldata=[];

         if($scope.filterObjal["statusalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["statusalFilters"],finalarray);
           }
         if($scope.filterObjal["devicealFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["devicealFilters"],finalarray);
           }
         if($scope.filterObjal["typesalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["typesalFilters"],finalarray);
           }
         if($scope.filterObjal["extypesalFilters"].length!=0){  
            finalarray= getFiltearr($scope.filterObjal["extypesalFilters"],finalarray);
          }
         $scope.total=finalarray;
         if($scope.filterObjal["severityalFilters"].length!=0){  
              finalarray= getFiltearr($scope.filterObjal["severityalFilters"],finalarray);
           }

      $scope.labeldata = [];

      if(sessionStorage.getItem("severityal")==null){
         var lobj={
                  name: 'No Action',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);
          $scope.labeldata = ['No Action','CRITICAL'];  

        }else{
          // filterarray= getChartData($scope.filterObj,$scope.alertData1);
         var lobj={
                  name: sessionStorage.getItem("severityal"),
                  y: finalarray.length
                  };
         coldata.push(lobj);
         $scope.labeldata.push(sessionStorage.getItem("severityal"));

        }

        sessionStorage.setItem("filterobjectsal", JSON.stringify($scope.filterObjal));
        $scope.colchartdata=coldata;
        drawColumnchart($scope.colchartdata,$scope.labeldata);

      
   };
   //health starts

     var typesharray=[];
     var typeshdata=[];    
     var devicesharray=[];
     var deviceshdata=[];
  
    $scope.statushmodel = [];
    $scope.devicehmodel = [];
    $scope.severityhmodel = [];
    $scope.typeshmodel = [];
    $scope.falmodel = [];
    $scope.ackbymodel = [];
    $scope.closedmodel = [];
    
       
    
    

    $scope.filterObjh={
                      "statushFilters": [],                    
                      "devicehFilters": [],                      
                      "typeshFilters": [],
                      "falFilters": [],
                      "ackbyFilters": [],
                      "closedFilters": [],
                      "severityhFilters": []
                     };


    angular.forEach($scope.healthData, function(value, key) {      
     if(typesharray.indexOf(value.type) ==-1){
      typesharray.push(value.type)
      var lobj={id: typesharray.length, label: value.type}
      typeshdata.push(lobj);
     }
     if(devicesharray.indexOf(value.device) ==-1){
      devicesharray.push(value.device)
      var ldevobj={id: devicesharray.length, label: value.device}
      deviceshdata.push(ldevobj);
     }
   });
   
   $scope.statushdata = [ {id: 1, label: "NEW"},{id: 2, label: "CLR"}];
   $scope.severityhdata = [{id: 2, label: "CRITICAL"}];        
   $scope.typeshdata = typeshdata;
   $scope.devicehdata = deviceshdata;
   $scope.falhdata = [{id: 1, label: "blank"}];
   $scope.ackbyhdata = [{id: 1, label: "blank"}];
   $scope.closedhdata = [ {id: 1, label: "admin"},{id: 2, label: "blank"}];


   function getHealthData(src){     
      var  criticalarr=[];
      var  bardataonload=[];
      $scope.filterObjh.severityhFilters=[{"severity":"CRITICAL"}];
      criticalarr= getFiltearr($scope.filterObjh.severityhFilters,src);      
       var lobjs={
                name: 'CRITICAL',
                data: [criticalarr.length]
                };
        bardataonload.push(lobjs);        
        sessionStorage.setItem("filterObjh", JSON.stringify($scope.filterObjh)); 
        $scope.filterObjh.severityhFilters=[];
        return bardataonload;
      };

    

    $scope.healthData1=$scope.healthData;
    $scope.barchartdata=getHealthData($scope.healthData1);
    $scope.labeldatas=['CRITICAL'];
    
    drawBarchart($scope.barchartdata,$scope.labeldatas);


    $scope.statushMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.statushmodel, function(val, key){        
          var sm=$filter('filter')($scope.statushdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"status":item.label};
             return obj;
          }
           );

      }      
     
     $scope.filterObjh.statushFilters=temp;
    
    if($scope.statushmodel.length==0 ||($scope.statushmodel.length== $scope.statushdata.length)){                    
      $scope.filterObjh.statushFilters=[];
    }
    
        var finalarray=$scope.healthData1;
        var basicntarr={};
                                                  
    var basicfilterarr=["statushFilters","devicehFilters","typeshFilters","closedFilters","severityhFilters"]
    angular.forEach(basicfilterarr, function(value, key) {
      if($scope.filterObjh[value].length!=0){  
       finalarray= getFiltearr($scope.filterObjh[value],finalarray);
      }
       basicntarr[value]=finalarray;     
    });
    var bardata=[];
    
    var lobj={
                name: 'CRITICAL',
                data: [basicntarr["severityhFilters"].length]
                };
        bardata.push(lobj); 

        
      
        sessionStorage.setItem("filterObjh", JSON.stringify($scope.filterObjh));
        $scope.barchartdata=bardata;
    $scope.labeldatas=['CRITICAL'];
        drawBarchart($scope.barchartdata,$scope.labeldatas);
    
  };
  
  
  $scope.typeshMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.typeshmodel, function(val, key){        
          var sm=$filter('filter')($scope.typeshdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"type":item.label};
             return obj;
          }
           );

      }      
    
     $scope.filterObjh.typeshFilters=temp;
    
    if($scope.typeshmodel.length==0 ||($scope.typeshmodel.length== $scope.typeshdata.length)){                    
      $scope.filterObjh.typeshFilters=[];
    }
    
        var finalarray=$scope.healthData1;
        var basicntarr={};
                                                  
    var basicfilterarr=["statushFilters","devicehFilters","typeshFilters","closedFilters","severityhFilters"]
    angular.forEach(basicfilterarr, function(value, key) {
      if($scope.filterObjh[value].length!=0){  
       finalarray= getFiltearr($scope.filterObjh[value],finalarray);
      }
       basicntarr[value]=finalarray;     
    });
    var bardata=[];
    
    var lobj={
                name: 'CRITICAL',
                data: [basicntarr["severityhFilters"].length]
                };
        bardata.push(lobj); 

        
      
        sessionStorage.setItem("filterObjh", JSON.stringify($scope.filterObjh));
        $scope.barchartdata=bardata;
    $scope.labeldatas=['CRITICAL'];
        drawBarchart($scope.barchartdata,$scope.labeldatas);
    
  };
  
  $scope.devicehMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.devicehmodel, function(val, key){        
          var sm=$filter('filter')($scope.devicehdata,val.id);
          temp.push(sm[0]);
      });     
      if(temp.length >0){
          temp=temp.map(function(item,index){          
             var obj={"device":item.label};
             return obj;
          }
           );

      }      
    
     $scope.filterObjh.devicehFilters=temp;
    
    if($scope.devicehmodel.length==0 ||($scope.devicehmodel.length== $scope.devicehdata.length)){                    
      $scope.filterObjh.devicehFilters=[];
    }
    
        var finalarray=$scope.healthData1;
        var basicntarr={};
                                                  
    var basicfilterarr=["statushFilters","devicehFilters","typeshFilters","closedFilters","severityhFilters"]
    angular.forEach(basicfilterarr, function(value, key) {
      if($scope.filterObjh[value].length!=0){  
       finalarray= getFiltearr($scope.filterObjh[value],finalarray);
      }
       basicntarr[value]=finalarray;     
    });
    var bardata=[];
    
    var lobj={
                name: 'CRITICAL',
                data: [basicntarr["severityhFilters"].length]
                };
        bardata.push(lobj); 

        
      
        sessionStorage.setItem("filterObjh", JSON.stringify($scope.filterObjh));
        $scope.barchartdata=bardata;
    $scope.labeldatas=['CRITICAL'];
        drawBarchart($scope.barchartdata,$scope.labeldatas);
    
  };
  $scope.closedMultiSelData = function(){
      var temp=[]   
      angular.forEach($scope.closedmodel, function(val, key){        
          var sm=$filter('filter')($scope.closedhdata,val.id);
          temp.push(sm[0]);
      });
     if(temp.length >0){
          temp=temp.map(function(item,index){ 
        var search=null;
            if(item.label=="blank"){
        search=null;
      }else{
        search=item.label;
      }  
             var obj={"closed":search};
             return obj;
          }
           );

      }       
     
     $scope.filterObjh.closedFilters=temp;
    
    if($scope.closedmodel.length==0 ||($scope.closedmodel.length== $scope.closedhdata.length)){                    
      $scope.filterObjh.closedFilters=[];
    }
    
        var finalarray=$scope.healthData1;
        var basicntarr={};
                                                  
    var basicfilterarr=["statushFilters","devicehFilters","typeshFilters","closedFilters","severityhFilters"]
    angular.forEach(basicfilterarr, function(value, key) {
      if($scope.filterObjh[value].length!=0){  
       finalarray= getFiltearr($scope.filterObjh[value],finalarray);
      }
       basicntarr[value]=finalarray;     
    });
    var bardata=[];
    
    var lobj={
                name: 'CRITICAL',
                data: [basicntarr["severityhFilters"].length]
                };
        bardata.push(lobj); 

        
      
        sessionStorage.setItem("filterObjh", JSON.stringify($scope.filterObjh));
        $scope.barchartdata=bardata;
    $scope.labeldatas=['CRITICAL'];
        drawBarchart($scope.barchartdata,$scope.labeldatas);
    
  };
  $scope.falMultiSelData = function(){
  };
  $scope.ackbyMultiSelData = function(){
      /*
     if(temp.length >0){
          temp=temp.map(function(item,index){ 
        var search=null;
            if(item.label=="blank"){
        search=null;
      }else{
        search=item.label;
      }  
             var obj={"closed":search};
             return obj;
          }
           );

      }       
     */
    
  };
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







function  drawBarchart(dataSet,labeldata){ 
    var chart = new Highcharts.Chart({
        chart: {
            type: 'bar',
            renderTo: 'barchart',
      backgroundColor: '#2d3345'
        },
        title: {
            text: ''
        },
           exporting:{
      enabled:false
    },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: labeldata,
            title: {
                text: null
            }
        },
           exporting:{
      enabled:false
    },
        yAxis: {
            min: 0,
            title: {
                text: '',
                align: 'high'
            },
            labels: {
                overflow: 'justify'
            }
        },
        tooltip: {
            valueSuffix: ''
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            },
      series: {
                cursor: 'pointer',
                events: {
                    click: function (event) {           
                        var clickedItem = event.point.category;
                        function getFiltearr(filtercondarr,srcoffilter){        
                              var filtarr3=[];      
                              angular.forEach(filtercondarr, function(value, key) {                                 
                                   var temp=$filter('filter')(srcoffilter, value);                                               
                                   filtarr3=filtarr3.concat(temp);
                              });
                              return filtarr3;
                      }; 
                      function  getHealthData(){
                              var httpfreq = new XMLHttpRequest();
                              try {
                                httpfreq.open("GET", "../data/sheet4health.json", false);
                                httpfreq.send(null);
                                var status = httpfreq.status;
                                if((status === 200) || (status === 0) || (status === 1100)) {
                                  scrcontent = httpfreq.responseText;
                                }    
                              } catch (e) {
                              }
                            return JSON.parse(scrcontent);
                          };
                        if(clickedItem =="CRITICAL"){
              var filterobjects=JSON.parse(sessionStorage.getItem("filterObjh"));
              var healthdata=getHealthData();
              var finalarray=healthdata;
              var basicntarr={};
              filterobjects.severityalFilters=[{"severity":clickedItem}];
                     

              var basicfilterarr=["statushFilters","devicehFilters","typeshFilters","closedFilters","severityhFilters"]
              angular.forEach(basicfilterarr, function(value, key) {
                if(filterobjects[value].length!=0){  
                        finalarray= getFiltearr(filterobjects[value],finalarray);
                       }
               basicntarr[value]=finalarray;
               
              });
              var clickedarray=basicntarr["severityhFilters"];
              var ptypesarray=[];
              var ptypesdata=[];
              var typeobjcount={};
              var temparray=[];
              var bardata=[];

              angular.forEach(healthdata, function(value, key) {      
                 if(ptypesarray.indexOf(value.type) ==-1){
                ptypesarray.push(value.type)
                var lobj={type: value.type}
                ptypesdata.push(lobj);
                 }
              });
              angular.forEach(ptypesdata, function(value, key) {
                temparray= getFiltearr(value,clickedarray);
                typeobjcount[value.type]=temparray;
              });

              var ldata=[];
              var labeldata=[]; 
              angular.forEach(typeobjcount, function(value, key) {
                             if(value.length!=0){
                              ldata.push(value.length);
                              labeldata.push(key);
                             }
                 });
              bardata.push({name: "CRITICAL",
                      data: ldata
                    });

                            
              drawBarchart(bardata,labeldata);
              }
          }
        }
      }
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',            
           backgroundColor: '#2d3345'

            
        },
        credits: {
            enabled: false
        },
        series: dataSet
        // [{
        //     name: 'critical',
        //     data: [239]
        // } ]
    });


};


function  drawPichart(dataSet,$rootScope){
         var chart = new Highcharts.Chart({
        chart: {
            type: 'pie',
            renderTo: 'piechart',
      backgroundColor: '#2d3345',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
           exporting:{
      enabled:false
    },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.y}</b>'
        },
        legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true                   
                },
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,                                
                showInLegend: true
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function (event) {
                        var clickedItem = event.point.name;
                      if(clickedItem =="No Action"  || clickedItem =="CRITICAL"){
                        var filterobjects=JSON.parse(sessionStorage.getItem("filterobjects"));

                         function  getAllData(){
                              var httpfreq = new XMLHttpRequest();
                              try {
                                httpfreq.open("GET", "../data/sheet4alldata.json", false);
                                httpfreq.send(null);
                                var status = httpfreq.status;
                                if((status === 200) || (status === 0) || (status === 1100)) {
                                  scrcontent = httpfreq.responseText;
                                 //onsole.log(scrcontent);   
                                       
                                }    
                              } catch (e) {
                              }
                            return JSON.parse(scrcontent);
                          };
                          function getFiltearr(filtercondarr,srcoffilter){        
                              var filtarr3=[];      
                              angular.forEach(filtercondarr, function(value, key) {                                 
                                   var temp=$filter('filter')(srcoffilter, value);                                               
                                   filtarr3=filtarr3.concat(temp);
                              });
                              return filtarr3;
                          };                          

                          var alldata=getAllData();
                          var finalarray=alldata;  
                           if(filterobjects["statusFilters"].length!=0){  
                                finalarray= getFiltearr(filterobjects["statusFilters"],finalarray);
                             }
                           if(filterobjects["deviceFilters"].length!=0){  
                                finalarray= getFiltearr(filterobjects["deviceFilters"],finalarray);
                             }
                           if(filterobjects["typesFilters"].length!=0){  
                                finalarray= getFiltearr(filterobjects["typesFilters"],finalarray);
                             }
                           var total=finalarray;
                           filterobjects.severityFilters=[{"severity":clickedItem}];
                           if(filterobjects["severityFilters"].length!=0){  
                                finalarray= getFiltearr(filterobjects["severityFilters"],finalarray);
                             }
                            var clickedarray=finalarray;
                            var ptypesarray=[];
                            var ptypesdata=[];

                            angular.forEach(alldata, function(value, key) {      
                               if(ptypesarray.indexOf(value.type) ==-1){
                                ptypesarray.push(value.type)
                                var lobj={type: value.type}
                                ptypesdata.push(lobj);
                               }
                            });

                            var typeobjcount={};
                            var temparray=[];
                           

                            angular.forEach(ptypesdata, function(value, key) {
                              temparray= getFiltearr(value,clickedarray);
                              typeobjcount[value.type]=temparray;
                            });
                            var cpiedata=[];
                            if(clickedItem=='CRITICAL'){
                              if(sessionStorage.getItem("severity")==null){
                                cpiedata.push({
                                              name: 'No Action',
                                              y: total.length-clickedarray.length
                                             });

                              }
                                
                            }else{
                              if(sessionStorage.getItem("severity")==null){
                               cpiedata.push({
                                              name: 'CRITICAL',
                                              y: total.length-clickedarray.length
                                             });
                             };


                            }

                            angular.forEach(typeobjcount, function(value, key) {
                             if(value.length!=0){
                              cpiedata.push({
                                              name: key,
                                              y: value.length
                                             });

                             }
                              

                            });
                            drawPichart(cpiedata);
                            // chart.legend.update({ 
                            //       width: 950
                            //   });

                       }


                    }
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: 'Alert classification',
            data: dataSet,
            dataLabels: {
                format: '{point.y}',
                color: '#000000',
                fontSize: "10px"
          
            }

        }]
    });

};

function  drawColumnchart(dataSet,labeldata){
         var chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo: 'columnchart',
      backgroundColor: '#2d3345'
        },
           exporting:{
      enabled:false
    },
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: labeldata,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        tooltip: {
            // headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                dataLabels: {
                    enabled: true
                },
                pointPadding: 0.2,
                borderWidth: 0
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function (event) {
                      var clickedItem = event.point.name;
                      function getFiltearr(filtercondarr,srcoffilter){        
                              var filtarr3=[];      
                              angular.forEach(filtercondarr, function(value, key) {                                 
                                   var temp=$filter('filter')(srcoffilter, value);                                               
                                   filtarr3=filtarr3.concat(temp);
                              });
                              return filtarr3;
                      }; 
                      function  getAlertData(){
                              var httpfreq = new XMLHttpRequest();
                              try {
                                httpfreq.open("GET", "../data/sheet4security.json", false);
                                httpfreq.send(null);
                                var status = httpfreq.status;
                                if((status === 200) || (status === 0) || (status === 1100)) {
                                  scrcontent = httpfreq.responseText;
                                }    
                              } catch (e) {
                              }
                            return JSON.parse(scrcontent);
                          };
                      if(clickedItem =="No Action"  || clickedItem =="CRITICAL"){                        
                         var filterobjects=JSON.parse(sessionStorage.getItem("filterobjectsal"));

                            var alertdata=getAlertData();
                            var finalarray=alertdata;
                            var basicntarr={};
                                        filterobjects.severityalFilters=[{"severity":clickedItem}];             
                            var basicfilterarr=["statusalFilters","devicealFilters","typesalFilters","extypesalFilters","severityalFilters"]
                            angular.forEach(basicfilterarr, function(value, key) {
                              if(filterobjects[value].length!=0){  
                                              finalarray= getFiltearr(filterobjects[value],finalarray);
                                           }
                             basicntarr[value]=finalarray;
                             
                            });
                            var clickedarray=basicntarr["severityalFilters"];
                            var ptypesarray=[];
                            var ptypesdata=[];
                            var typeobjcount={};
                            var temparray=[];
                            var ccoldata=[];

                            angular.forEach(alertdata, function(value, key) {      
                               if(ptypesarray.indexOf(value.type) ==-1){
                                ptypesarray.push(value.type)
                                var lobj={type: value.type}
                                ptypesdata.push(lobj);
                               }
                            });
                            angular.forEach(ptypesdata, function(value, key) {
                              temparray= getFiltearr(value,clickedarray);
                              typeobjcount[value.type]=temparray;
                            });
              
                            
                            if(clickedItem=='CRITICAL'){
                              if(sessionStorage.getItem("severityal")==null){
                                ccoldata.push({
                                              name: 'No Action',
                                              y: basicntarr["extypesalFilters"].length-basicntarr["severityalFilters"].length
                                             });

                              }
                                
                            }else{
                              if(sessionStorage.getItem("severityal")==null){
                               ccoldata.push({
                                              name: 'CRITICAL',
                                              y: basicntarr["extypesalFilters"].length-basicntarr["severityalFilters"].length
                                             });
                             };


                            }

                            angular.forEach(typeobjcount, function(value, key) {
                             if(value.length!=0){
                              ccoldata.push({
                                              name: key,
                                              y: value.length
                                             });

                             }
                              

                            });
                            var labeldata=[];
                            angular.forEach(ccoldata, function(value, key){
                               labeldata.push(value.name);                            
                            });
                            drawColumnchart(ccoldata,labeldata);
                            var others={};
                             angular.forEach(ccoldata, function(value, key){
                               others[value.name]= value.y;                         
                            });
                            sessionStorage.setItem("typeobjcount",JSON.stringify(typeobjcount));
                            sessionStorage.setItem("others",JSON.stringify(others));
                            //sessionStorage.setItem("filterobjects", JSON.stringify($scope.filterObj));
                      }else{
                         if(clickedItem =="Camera App"  || clickedItem =="Camera Security"){
                              var typeobject= JSON.parse(sessionStorage.getItem("typeobjcount"));
                              var others= JSON.parse(sessionStorage.getItem("others"));
                              var pextypesarray=[];
                              var pextypesdata=[];
                              var extypeobjcount={};
                              var temparray=[];
                              var ccoldata=[];

                            angular.forEach(typeobject[clickedItem], function(value, key) {      
                               if(pextypesarray.indexOf(value.extended) ==-1){
                                pextypesarray.push(value.extended)
                                var lobj={extended: value.extended}
                                pextypesdata.push(lobj);
                               }
                            });
                            angular.forEach(pextypesdata, function(value, key) {
                              temparray= getFiltearr(value,typeobject[clickedItem]);
                              extypeobjcount[value.extended]=temparray;
                            });
                            angular.forEach(extypeobjcount, function(value, key) {
                             if(value.length!=0){
                              ccoldata.push({
                                              name: key,
                                              y: value.length
                                             });

                             }
                            });
                             angular.forEach(others, function(value, key) {
                                 if(key!=clickedItem){
                                  ccoldata.push({
                                              name: key,
                                              y: value
                                             });
                                }
                            });
                            var labeldata=[];
                            angular.forEach(ccoldata, function(value, key){
                               labeldata.push(value.name);                            
                            });
                            drawColumnchart(ccoldata,labeldata);

                         }

                      }

                    }
                  }
            }
        },
        series: [{
            name: 'Total',
            data: dataSet,
            dataLabels: {
                format: '{point.y}',
                color: '#000000',
                fontSize: "10px"
                
            }


        }]
    });

};
   
     


});


