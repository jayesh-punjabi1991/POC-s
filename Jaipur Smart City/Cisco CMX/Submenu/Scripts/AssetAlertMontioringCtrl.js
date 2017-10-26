
   cisco.service("global1", function(){
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
             console.log(scrcontent);   
                   
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


   cisco.controller('AssetAlertMontioringCtrl', function ($rootScope,$scope,$filter,$http,global1 ) { 
    $scope.hidden=true;
  $scope.hiddenc=true;
  $scope.hiddenh=true;
  
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
    $scope.severitydata = [ {id: 1, label: "INFO"},{id: 2, label: "CRITICAL"}];        
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
      $scope.filterObj.severityFilters=[{"severity":"INFO"}];
       infoarray= getChartData($scope.filterObj,src);
    
       var lobj={
                name: 'INFO',
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
          console.log("b4filtarr"+finalarray.length);
          if(key=="severityFilters"){
            $scope.datawos=finalarray;
            console.log("$scope.datawos"+$scope.datawos.length);
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
      
        console.log("filtlen"+filtarr3.length);
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
      var sfiltersarr=[{"severity":"INFO"}];
      
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   
                 }
                  
            });

      };
      
     
      if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
      if(filterarray.length>0){
       var lobj={
                name: 'INFO',
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
      console.log($scope.filterObj);

       var piedata=[];
       var  filterarray=[];
      if($scope.devicemodel.length==$scope.devicedata.length){
        $scope.filterObj.deviceFilters=[];
      }
      var sfiltersarr=[{"severity":"INFO"}];
      
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   
                 }
                  
            });

      };
   
     if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
      if(filterarray.length>0){
         var lobj={
                  name: 'INFO',
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
        $scope.filterObj.severityFilters=[{"severity":"INFO"}];
        filterarray= getChartData($scope.filterObj,$scope.allData1);
        if(filterarray.length>0){
        var lobj={
                name: 'INFO',
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
      console.log($scope.filterObj);


      var piedata=[];
       var  filterarray=[];
      if($scope.typesmodel.length==$scope.typesdata.length){
        $scope.filterObj.typesFilters=[];
      }
      var sfiltersarr=[{"severity":"INFO"}];
      var found=0;
     if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
   

   if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'INFO',
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
    console.log("deselect case"+ $scope.statusmodel.length);
    console.log( $scope.filterObj.statusFilters);
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
      console.log( $scope.filterObj.statusFilters);
    

    if($scope.statusmodel.length==0 ||($scope.statusmodel.length== $scope.statusdata.length)){                    
        $scope.filterObj.statusFilters=[];
    }
    
    var piedata=[];
    var  infoarray=[];
    var sfiltersarr=[{"severity":"INFO"}];
      var found=0;
    if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
    
   
      if(sessionStorage.getItem("severity")==null){
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'INFO',
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
      
     // console.log(angular.toJson(temp))
      $scope.filterObj.deviceFilters=temp;
      console.log( $scope.filterObj.deviceFilters);
    

    if($scope.devicemodel.length==0 ||($scope.devicemodel.length== $scope.devicedata.length)){                    
        $scope.filterObj.deviceFilters=[];
    }

    var piedata=[];
       var  filterarray=[];
      
      var sfiltersarr=[{"severity":"INFO"}];
      var found=0;
     if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
      if(sessionStorage.getItem("severity")==null){
        filterarray= getChartData($scope.filterObj,$scope.allData1);
         var lobj={
                  name: 'INFO',
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
      
     // console.log(angular.toJson(temp))
      $scope.filterObj.typesFilters=temp;
      console.log( $scope.filterObj.typesFilters);
    

    if($scope.typesmodel.length==0 ||($scope.typesmodel.length== $scope.typesdata.length)){                    
        $scope.filterObj.typesFilters=[];
    }

    
    var piedata=[];
       var  filterarray=[];
      
      var sfiltersarr=[{"severity":"INFO"}];
      var found=0;
      if(sessionStorage.getItem("severity")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObj.severityFilters, value); 
                 if(temp.length==0){
                   found=0;
                   $scope.filterObj.severityFilters=[{"severity":"INFO"}];
                 }else{
                   found=1;
                 }
                  
            });

      };
      if(sessionStorage.getItem("severity")==null){
   
      filterarray= getChartData($scope.filterObj,$scope.allData1);
       var lobj={
                name: 'INFO',
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
      $scope.filterObjal.severityFilters=[{"severity":"INFO"}];
      infoarray= getFiltearr($scope.filterObjal.severityFilters,src);      
       var lobj={
                name: 'INFO',
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
    $scope.severityaldata = [ {id: 1, label: "INFO"},{id: 2, label: "CRITICAL"}];        
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
 $scope.labeldata=['INFO','CRITICAL'];
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
      console.log(angular.toJson(temp))
      $scope.filterObjal.devicealFilters=temp;
    
    if($scope.devicealmodel.length==0 ||($scope.devicealmodel.length== $scope.devicealdata.length)){                    
      $scope.filterObjal.devicealFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"INFO"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"INFO"}];
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
                  name: 'INFO',
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
      console.log(angular.toJson(temp))
      $scope.filterObjal.typesalFilters=temp;
    
    if($scope.typesalmodel.length==0 ||($scope.typesalmodel.length== $scope.typesaldata.length)){                    
      $scope.filterObjal.typesalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"INFO"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"INFO"}];
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
                  name: 'INFO',
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
      console.log(angular.toJson(temp))
      $scope.filterObjal.extypesalFilters=temp;
    
    if($scope.extypesalmodel.length==0 ||($scope.extypesalmodel.length== $scope.extypesaldata.length)){                    
      $scope.filterObjal.extypesalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"INFO"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"INFO"}];
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
                  name: 'INFO',
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
      console.log(angular.toJson(temp))
      $scope.filterObjal.statusalFilters=temp;
    
    if($scope.statusalmodel.length==0 ||($scope.statusalmodel.length== $scope.statusaldata.length)){                    
      $scope.filterObjal.statusalFilters=[];
    }

       var coldata=[];
       var  filterarray=[];      
       var sfiltersarr=[{"severity":"INFO"}];      
       if(sessionStorage.getItem("severityal")==null){
        angular.forEach(sfiltersarr, function(value, key) {          
                 var temp=$filter('filter')($scope.filterObjal.severityalFilters, value); 
                 if(temp.length==0){                   
                   $scope.filterObjal.severityalFilters=[{"severity":"INFO"}];
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
                  name: 'INFO',
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
        $scope.filterObjal.severityalFilters=[{"severity":"INFO"}];
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
                  name: 'INFO',
                  y: finalarray.length
                  };
         coldata.push(lobj);
          lobj={
                  name: 'CRITICAL',
                  y: $scope.total.length-finalarray.length
                  };
          coldata.push(lobj);
          $scope.labeldata = ['INFO','CRITICAL'];  

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
    console.log($scope.barchartdata);
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
     console.log(angular.toJson(temp))
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
     console.log(angular.toJson(temp))
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
     console.log(angular.toJson(temp))
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
     console.log(angular.toJson(temp))
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
    colors: ['#2ca02c', '#8c564b', '#e276c1', '#d62728', '#9467bd', '#ff7f0e', 
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(255, 255, 255)'],
                [1, 'rgb(240, 240, 255)']
            ]
        },
    },
       exporting:{
      enabled:false
    },
    title: {
        style: {
            color: '#000',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    exporting:{
      enabled:false
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'black'
        },
        itemHoverStyle:{
            color: 'gray'
        }   
    }
};


Highcharts.setOptions(Highcharts.theme);


function  drawBarchart(dataSet,labeldata){ 
    var chart = new Highcharts.Chart({
        chart: {
            type: 'bar',
            renderTo: 'barchart'
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
            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF')
            
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
                      if(clickedItem =="INFO"  || clickedItem =="CRITICAL"){
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
                                              name: 'INFO',
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
                      if(clickedItem =="INFO"  || clickedItem =="CRITICAL"){                        
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
                                              name: 'INFO',
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


