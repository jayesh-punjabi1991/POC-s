cisco.service("global", function(){
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
        var httpfreq = new XMLHttpRequest();
        var scrcontent="";
        try {
        httpfreq.open("GET", "data/sheet1.json", false);
        httpfreq.send(null);
        var status = httpfreq.status;
        if((status === 200) || (status === 0) || (status === 1100)) {
          scrcontent = httpfreq.responseText;
        }    
        } catch (e) {
        }
      return JSON.parse(scrcontent);
        }

   });
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
cisco.controller('VSMUsageCtrl', function ($scope, $filter,$http,global ) {
  $scope.hiddenr=true;  
  
    $scope.reason= function(){     
     if($scope.hiddenr){
       $('#filterPanelr .panel-body > .row').addClass("activepnl");
         $('#filterpanelhr .panel-title > .row').addClass("activepnl");
       $($(".panel-collapse-clickable")[0]).find('i').removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up");     
     }else{
       $('filterPanelr .panel-body > .row').removeClass("activepnl");
         $('#filterpanelhr .panel-title > .row').removeClass("activepnl");      
       $($(".panel-collapse-clickable")[0]).find('i').removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
     }
     $scope.hiddenr=!$scope.hiddenr;
     
   };

   // Adding for default selection -- Praveen
     $('#MenuBar1 a').removeClass("activemenu");
     $('#liVSMUsage a').addClass("activemenu");
     // End
     
   $scope.allData=global.getAllData();
     var logtimearray=[];
     var logtimedata=[];    
     var useriparray=[];
     var useripdata=[];
     var acttypearray=[];
     var acttypedata=[];
  
    $scope.objectnamemodel = [];
    $scope.objectypemodel = [];
    $scope.logtimemodel = [];
    $scope.useripmodel = [];
    $scope.usermodel = [];
    $scope.acttypemodel = [];
    $scope.filterObj={
                      "objectnameFilters": [],                    
                      "objectypeFilters": [],
                      "logtimeFilters": [],
                      "useripFilters": [],
                      "userFilters": [],
                      "acttypeFilters": []
                     };


    angular.forEach($scope.allData, function(value, key) {      
     if(logtimearray.indexOf(value.LogTime) ==-1){
      logtimearray.push(value.LogTime)
      var lobj={id: logtimearray.length, label: value.LogTime}
      logtimedata.push(lobj);
     }
     if(useriparray.indexOf(value.UserIp) ==-1){
      useriparray.push(value.UserIp)
      var ldevobj={id: useriparray.length, label: value.UserIp}
      useripdata.push(ldevobj);
     }
   if(acttypearray.indexOf(value.ActivityType) ==-1){
      acttypearray.push(value.ActivityType)
      var ldevobj={id: acttypearray.length, label: value.ActivityType}
      acttypedata.push(ldevobj);
     }
   });
   
   $scope.objectnamedata = [ {id: 1, label: "* AlbertHall-02"},{id: 2, label: "* RamniwasBagh-15"},{id: 3, label: "AmberFort-01"},{id: 4, label: "SASD"},{id: 5, label: "blank"}];
   $scope.objectypedata = [{id: 1, label: "vs_auditLog"}];        
   $scope.logtimedata = logtimedata;
   $scope.useripdata = useripdata;
   $scope.acttypedata = acttypedata;   
   $scope.userdata = [ {id: 1, label: "admin"},{id: 2, label: "JDA-IT"},{id: 3, label: "*****"},{id: 4, label: "blank"}];
   
    function getFiltearr(filtercondarr,srcoffilter){        
        var filtarr3=[];      
        angular.forEach(filtercondarr, function(value, key) {
           
             var temp=$filter('filter')(srcoffilter, value,true); 
                        
             filtarr3=filtarr3.concat(temp);
        });
      
        console.log("filtlen"+filtarr3.length);
        return filtarr3;
    };
   
   
   function getUserleveldata(src){ 
       
      var  criticalarr=[];      
    $scope.filterObj.acttypeFilters=[];
    var users=[];
    var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    angular.forEach($scope.userdata, function(value, key) {
      users.push(value.label);
      
    });
    var seriesdata=[];
    angular.forEach(users, function(value, key) {
        var lobj={};
          lobj.name=value;
        lobj.data =[];
        var luser=value;
         if(luser=="blank"){
           luser=null;
         }
            var userFilters={"User":luser};
      angular.forEach(lacttypeFilters, function(valuex, key) {
             
            
            criticalarr= getFiltearr([userFilters],$scope.allData);
            criticalarr= getFiltearr(valuex,criticalarr);
            lobj["data"].push(criticalarr.length);
      });
      seriesdata.push(lobj);
      
    });
    
    
        return seriesdata;
      };
    
    var labeldata=[];
    angular.forEach(acttypedata, function(value, key) {
      labeldata.push(value.label);      
    });
    
     $scope.barchartdata=getUserleveldata();
    

    
    drawBarchart($scope.barchartdata,labeldata);
  
  $scope.objectypeMultiSelData = function(){    
  }
  
  $scope.acttypeMultiSelData = function(){    
     var temp=[]; 
   var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    var users=[];   
    angular.forEach($scope.userdata, function(value, key) {
      var search=null;
            if(value.label=="blank"){
        search=null;
      }else{
        search=value.label;
      }  
      
      var lobj={"User":search};
      users.push(lobj);
      
    });
      angular.forEach($scope.acttypemodel, function(val, key){        
          var sm=$filter('filter')($scope.acttypedata,val.id);
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
             var obj={"ActivityType":search};
             return obj;
      }
          );

      }           
      var seriesdata=[];
    var userfilters;
    $scope.filterObj.acttypeFilters=temp;
    if($scope.filterObj.userFilters.length >0){
     userfilters=$scope.filterObj.userFilters;
    }else{
      userfilters=users;
    }
    var acttypeFilters;
    if($scope.filterObj.acttypeFilters.length >0){
     acttypeFilters=$scope.filterObj.acttypeFilters;
    }else{
      acttypeFilters=lacttypeFilters;
    }
     
      var seriesdata=[];
    var basicfilterarr=["objectnameFilters","objectypeFilters","logtimeFilters","useripFilters"];
     angular.forEach(userfilters, function(value, key) { 
        var lobj={};
           var lname="";
         if(value.User==null){
          lname="blank";
         }else{
           lname=value.User;
         }
          lobj.name=lname;
        lobj.data =[];
        var luser=value.User;
         if(luser=="blank"){
           luser=null;
         }
         var luserFilters={"User":luser};
         
      
      angular.forEach(acttypeFilters, function(valuex, key) {
             var criticalarr=$scope.allData;            
            angular.forEach(basicfilterarr, function(value, key) {
              if($scope.filterObj[value].length!=0){  
               criticalarr= getFiltearr($scope.filterObj[value],criticalarr);
              }
             });
            criticalarr= getFiltearr([luserFilters],criticalarr);
            criticalarr= getFiltearr(valuex,criticalarr);
            //if(criticalarr.length >0){
              lobj["data"].push(criticalarr.length);
            //}
            
      });
      var len=0;
      var found=false;
      angular.forEach(lobj.data,function(value,key){
        len=value;
        if(len>0){
         found=true;  
        }
      });
      if(found){
         seriesdata.push(lobj); 
      }
      
      
        
      
    }); 

var actexists=[];
  var actarr=[];
  var modseries=[];
         
       
       angular.forEach(acttypeFilters, function(value, key) {
        var acctype=value.ActivityType;
        var actfound=false;       
        angular.forEach(seriesdata, function(valuex, keyx) {
          var lenn=valuex["data"][key]
          if(lenn>0){
            actfound=true;
          }
          });
        actexists.push(actfound);
        if(actfound){
          actarr.push(acctype);
        }
        
      }); 
          
      angular.forEach(seriesdata, function(value, key) {
        var lobj={};
        lobj.name=value.name;
        lobj.data=[];
        angular.forEach(actexists, function(valuex, keyx) {
          if(valuex){
           lobj.data.push(value["data"][keyx]) 
          }
          
        });
        modseries.push(lobj);
        
        
      });
      var labeldata=[];
      angular.forEach(actarr, function(value, key) {
          labeldata.push(value);      
        });
      drawBarchart(modseries,labeldata); 

 






  
       
  }
  
  $scope.userMultiSelData = function(){
    
     var temp=[]; 
   var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    var users=[];   
    angular.forEach($scope.userdata, function(value, key) {
      var search=null;
            if(value.label=="blank"){
        search=null;
      }else{
        search=value.label;
      }  
      
      var lobj={"User":search};
      users.push(lobj);
      
    });
      angular.forEach($scope.usermodel, function(val, key){        
          var sm=$filter('filter')($scope.userdata,val.id);
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
             var obj={"User":search};
             return obj;
      }
          );

      }           
      var seriesdata=[];
    var userfilters;
    $scope.filterObj.userFilters=temp;
    if($scope.filterObj.userFilters.length >0){
     userfilters=$scope.filterObj.userFilters;
    }else{
      userfilters=users;
    }
    var acttypeFilters;
    if($scope.filterObj.acttypeFilters.length >0){
     acttypeFilters=$scope.filterObj.acttypeFilters;
    }else{
      acttypeFilters=lacttypeFilters;
    }
     
      var seriesdata=[];
    var basicfilterarr=["objectnameFilters","objectypeFilters","logtimeFilters","useripFilters"];
     angular.forEach(userfilters, function(value, key) { 
        var lobj={};
           var lname="";
         if(value.User==null){
          lname="blank";
         }else{
           lname=value.User;
         }
          lobj.name=lname;
        lobj.data =[];
        var luser=value.User;
         if(luser=="blank"){
           luser=null;
         }
         var luserFilters={"User":luser};
         
      
      angular.forEach(acttypeFilters, function(valuex, key) {
             var criticalarr=$scope.allData;            
            angular.forEach(basicfilterarr, function(value, key) {
              if($scope.filterObj[value].length!=0){  
               criticalarr= getFiltearr($scope.filterObj[value],criticalarr);
              }
             });
            criticalarr= getFiltearr([luserFilters],criticalarr);
            criticalarr= getFiltearr(valuex,criticalarr);
            //if(criticalarr.length >0){
              lobj["data"].push(criticalarr.length);
            //}
            
      });
      var len=0;
      var found=false;
      angular.forEach(lobj.data,function(value,key){
        len=value;
        if(len>0){
         found=true;  
        }
      });
      if(found){
         seriesdata.push(lobj); 
      }
      
        
      
    }); 
    
    var actexists=[];
  var actarr=[];
  var modseries=[];
        
       
       angular.forEach(acttypeFilters, function(value, key) {
        var acctype=value.ActivityType;
        var actfound=false;       
        angular.forEach(seriesdata, function(valuex, keyx) {
          var lenn=valuex["data"][key]
          if(lenn>0){
            actfound=true;
          }
          });
        actexists.push(actfound);
        if(actfound){
          actarr.push(acctype);
        }
        
      }); 
          
      angular.forEach(seriesdata, function(value, key) {
        var lobj={};
        lobj.name=value.name;
        lobj.data=[];
        angular.forEach(actexists, function(valuex, keyx) {
          if(valuex){
           lobj.data.push(value["data"][keyx]) 
          }
          
        });
        modseries.push(lobj);
        
        
      });
      var labeldata=[];
      angular.forEach(actarr, function(value, key) {
          labeldata.push(value);      
        });
      drawBarchart(modseries,labeldata); 
                
            
      
    

    
       
  }
  
  
  
  $scope.useripMultiSelData = function(){
    
     var temp=[];
   var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    var users=[];   
    angular.forEach($scope.userdata, function(value, key) {
      var search=null;
            if(value.label=="blank"){
        search=null;
      }else{
        search=value.label;
      }  
      
      var lobj={"User":search};
      users.push(lobj);
      
    });
     var criticalarr=$scope.allData; 
      angular.forEach($scope.useripmodel, function(val, key){        
          var sm=$filter('filter')($scope.useripdata,val.id);
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
             var obj={"UserIp":search};
             return obj;
          }
           );

      }       
     //console.log(angular.toJson(temp))
     $scope.filterObj.useripFilters=temp;
      var seriesdata=[];
    var userfilters;
    if($scope.filterObj.userFilters.length >0){
     userfilters=$scope.filterObj.userFilters;
    }else{
      userfilters=users;
    }
    var acttypeFilters;
    if($scope.filterObj.acttypeFilters.length >0){
     acttypeFilters=$scope.filterObj.acttypeFilters;
    }else{
      acttypeFilters=lacttypeFilters;
    }
    var basicfilterarr=["objectnameFilters","objectypeFilters","logtimeFilters","useripFilters"];
     angular.forEach(userfilters, function(value, key) { 
        var lobj={};
           var lname="";
         if(value.User==null){
          lname="blank";
         }else{
           lname=value.User;
         }
          lobj.name=lname;
        lobj.data =[];
        var luser=value.User;
         if(luser=="blank"){
           luser=null;
         }
         var luserFilters={"User":luser};
         
      
      angular.forEach(acttypeFilters, function(valuex, key) {
             var criticalarr=$scope.allData;            
            angular.forEach(basicfilterarr, function(value, key) {
              if($scope.filterObj[value].length!=0){  
               criticalarr= getFiltearr($scope.filterObj[value],criticalarr);
              }
             });
            criticalarr= getFiltearr([luserFilters],criticalarr);
            criticalarr= getFiltearr(valuex,criticalarr);
            //if(criticalarr.length >0){
              lobj["data"].push(criticalarr.length);
            //}
            
      });
      var len=0;
      var found=false;
      angular.forEach(lobj.data,function(value,key){
        len=value;
        if(len>0){
         found=true;  
        }
      });
      if(found){
         seriesdata.push(lobj); 
      }
      
        
      
    }); 

var actexists=[];
  var actarr=[];
  var modseries=[];
         
       
       angular.forEach(acttypeFilters, function(value, key) {
        var acctype=value.ActivityType;
        var actfound=false;       
        angular.forEach(seriesdata, function(valuex, keyx) {
          var lenn=valuex["data"][key]
          if(lenn>0){
            actfound=true;
          }
          });
        actexists.push(actfound);
        if(actfound){
          actarr.push(acctype);
        }
        
      }); 
          
      angular.forEach(seriesdata, function(value, key) {
        var lobj={};
        lobj.name=value.name;
        lobj.data=[];
        angular.forEach(actexists, function(valuex, keyx) {
          if(valuex){
           lobj.data.push(value["data"][keyx]) 
          }
          
        });
        modseries.push(lobj);
        
        
      });
      var labeldata=[];
      angular.forEach(actarr, function(value, key) {
          labeldata.push(value);      
        });
      drawBarchart(modseries,labeldata); 
                
            
      
   
   
       
  }
  
  $scope.logtimeMultiSelData = function(){
    
     var temp=[];
   var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    var users=[];   
    angular.forEach($scope.userdata, function(value, key) {
      var search=null;
            if(value.label=="blank"){
        search=null;
      }else{
        search=value.label;
      }  
      
      var lobj={"User":search};
      users.push(lobj);
      
    });
     var criticalarr=$scope.allData; 
      angular.forEach($scope.logtimemodel, function(val, key){        
          var sm=$filter('filter')($scope.logtimedata,val.id);
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
             var obj={"LogTime":search};
             return obj;
          }
           );

      }       
     //console.log(angular.toJson(temp))
     $scope.filterObj.logtimeFilters=temp;
      var seriesdata=[];
    var userfilters;
    if($scope.filterObj.userFilters.length >0){
     userfilters=$scope.filterObj.userFilters;
    }else{
      userfilters=users;
    }
    var acttypeFilters;
    if($scope.filterObj.acttypeFilters.length >0){
     acttypeFilters=$scope.filterObj.acttypeFilters;
    }else{
      acttypeFilters=lacttypeFilters;
    }
    var basicfilterarr=["objectnameFilters","objectypeFilters","logtimeFilters","useripFilters"];
     angular.forEach(userfilters, function(value, key) { 
        var lobj={};
           var lname="";
         if(value.User==null){
          lname="blank";
         }else{
           lname=value.User;
         }
          lobj.name=lname;
        lobj.data =[];
        var luser=value.User;
         if(luser=="blank"){
           luser=null;
         }
         var luserFilters={"User":luser};
         
      
      angular.forEach(acttypeFilters, function(valuex, key) {
             var criticalarr=$scope.allData;            
            angular.forEach(basicfilterarr, function(value, key) {
              if($scope.filterObj[value].length!=0){  
               criticalarr= getFiltearr($scope.filterObj[value],criticalarr);
              }
             });
            criticalarr= getFiltearr([luserFilters],criticalarr);
            criticalarr= getFiltearr(valuex,criticalarr);
            //if(criticalarr.length >0){
              lobj["data"].push(criticalarr.length);
            //}
            
      });
      var len=0;
      var found=false;
      angular.forEach(lobj.data,function(value,key){
        len=value;
        if(len>0){
         found=true;  
        }
      });
      if(found){
         seriesdata.push(lobj); 
      }
      
        
      
    }); 
    

    var actexists=[];
  var actarr=[];
  var modseries=[];
          
       
       angular.forEach(acttypeFilters, function(value, key) {
        var acctype=value.ActivityType;
        var actfound=false;       
        angular.forEach(seriesdata, function(valuex, keyx) {
          var lenn=valuex["data"][key]
          if(lenn>0){
            actfound=true;
          }
          });
        actexists.push(actfound);
        if(actfound){
          actarr.push(acctype);
        }
        
      }); 
          
      angular.forEach(seriesdata, function(value, key) {
        var lobj={};
        lobj.name=value.name;
        lobj.data=[];
        angular.forEach(actexists, function(valuex, keyx) {
          if(valuex){
           lobj.data.push(value["data"][keyx]) 
          }
          
        });
        modseries.push(lobj);
        
        
      });
      var labeldata=[];
      angular.forEach(actarr, function(value, key) {
          labeldata.push(value);      
        });
      drawBarchart(modseries,labeldata); 
                
            
      
    
       
  }
  
  $scope.objectnameMultiSelData = function(){
   
     var temp=[];
   var lacttypeFilters=[]
    angular.forEach(acttypedata, function(value, key) {
      var lobj={"ActivityType":value.label};
      lacttypeFilters.push(lobj);
    });
    var users=[];   
    angular.forEach($scope.userdata, function(value, key) {
      var search=null;
            if(value.label=="blank"){
        search=null;
      }else{
        search=value.label;
      }  
      
      var lobj={"User":search};
      users.push(lobj);
      
    });
     var criticalarr=$scope.allData; 
      angular.forEach($scope.objectnamemodel, function(val, key){        
          var sm=$filter('filter')($scope.objectnamedata,val.id);
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
             var obj={"ObjectName":search};
             return obj;
          }
           );

      }       
     //console.log(angular.toJson(temp))
     $scope.filterObj.objectnameFilters=temp;
      var seriesdata=[];
    var userfilters;    
    if($scope.filterObj.userFilters.length >0){
     userfilters=$scope.filterObj.userFilters;
    }else{
      userfilters=users;
    }
    var acttypeFilters;
    if($scope.filterObj.acttypeFilters.length >0){
     acttypeFilters=$scope.filterObj.acttypeFilters;
    }else{
      acttypeFilters=lacttypeFilters;
    }
    var basicfilterarr=["objectnameFilters","objectypeFilters","logtimeFilters","useripFilters"];
     angular.forEach(userfilters, function(value, key) { 
        var lobj={};
           var lname="";
         if(value.User==null){
          lname="blank";
         }else{
           lname=value.User;
         }
          lobj.name=lname;
        lobj.data =[];
        var luser=value.User;
         if(luser=="blank"){
           luser=null;
         }
         var luserFilters={"User":luser};
         
      
      angular.forEach(acttypeFilters, function(valuex, key) {
             var criticalarr=$scope.allData;            
            angular.forEach(basicfilterarr, function(value, key) {
              if($scope.filterObj[value].length!=0){  
               criticalarr= getFiltearr($scope.filterObj[value],criticalarr);
              }
             });
            criticalarr= getFiltearr([luserFilters],criticalarr);
            criticalarr= getFiltearr(valuex,criticalarr);
            //if(criticalarr.length >0){
              lobj["data"].push(criticalarr.length);
            //}
            
      });
      var len=0;
      var found=false;
      angular.forEach(lobj.data,function(value,key){
        len=value;
        if(len>0){
         found=true;  
        }
      });
      
      if(found){
         seriesdata.push(lobj); 
      }
    });

    var actexists=[];
  var actarr=[];
  var modseries=[];
         
       
       angular.forEach(acttypeFilters, function(value, key) {
        var acctype=value.ActivityType;
        var actfound=false;       
        angular.forEach(seriesdata, function(valuex, keyx) {
          var lenn=valuex["data"][key]
          if(lenn>0){
            actfound=true;
          }
          });
        actexists.push(actfound);
        if(actfound){
          actarr.push(acctype);
        }
        
      }); 
          
      angular.forEach(seriesdata, function(value, key) {
        var lobj={};
        lobj.name=value.name;
        lobj.data=[];
        angular.forEach(actexists, function(valuex, keyx) {
          if(valuex){
           lobj.data.push(value["data"][keyx]) 
          }
          
        });
        modseries.push(lobj);
        
        
      });
      var labeldata=[];
      angular.forEach(actarr, function(value, key) {
          labeldata.push(value);      
        });
      drawBarchart(modseries,labeldata); 
  }




 function  drawBarchart(dataSet,labeldata){
   
   var chart = new Highcharts.Chart(
                  {
        chart: {
            type: 'bar',
      renderTo: 'barchart'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: labeldata
        },
        exporting:{
          enabled:false
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: dataSet
    
    }
  );
 }


 // Praveen Created for bar chart //
  
  $scope.myObj = [  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 21:15",
    "type": "Device Status",
    "extended": null,
    "description": "Error in * AmberFort-04 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "* AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-05 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-11 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-11",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-12 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-12",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-10 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-18 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-18",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamNivasBagh-04 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNivasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-14 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-14",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:46",
    "type": "Reachability",
    "extended": null,
    "description": "* RamniwasBagh-15 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:45",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-16 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-16",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-13 New Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13 New",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-09 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-09",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-13 New device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13 New",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-09 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-09",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-17 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-17",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamniwasBagh-17 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-17",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-06 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-07 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-06 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-07 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-08 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Reachability",
    "extended": null,
    "description": "RamNiwasBagh-08 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-11 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-11",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-12 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-12",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-14 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-14",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-05 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNiwasBagh-10 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-18 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-18",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* RamniwasBagh-15 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-06 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamniwasBagh-16 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-16",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-05 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-11 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-11",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-14 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-14",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-10 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-09 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-09",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-18 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-18",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-07 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNiwasBagh-08 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNiwasBagh-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-17 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-17",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "* RamniwasBagh-15 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-12 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-12",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-13 New Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13 New",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-16 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-16",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Device Stream Status",
    "extended": null,
    "description": "RamNivasBagh-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNivasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 17:44",
    "type": "Recording Status",
    "extended": null,
    "description": "RamNivasBagh-04 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamNivasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "11/23/2016 15:46",
    "type": "Device Status",
    "extended": null,
    "description": "Error in * RamNiwasBagh-04 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamNiwasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 14:19",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-04",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 10:57",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* RamNiwasBagh-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamNiwasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/23/2016 10:52",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamNiwasBagh-04",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamNiwasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:35",
    "type": "Reachability",
    "extended": null,
    "description": "AmberFort-06 device is unreachable",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:34",
    "type": "Reachability",
    "extended": null,
    "description": "AmberFort-08 device is unreachable",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:34",
    "type": "Device Stream Status",
    "extended": null,
    "description": "AmberFort-06 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:34",
    "type": "Device Stream Status",
    "extended": null,
    "description": "AmberFort-08 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:34",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-06 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 17:34",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-08 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:41",
    "type": "Reachability",
    "extended": null,
    "description": "SciencePark-04 device is unreachable",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:41",
    "type": "Reachability",
    "extended": null,
    "description": "SciencePark-02 device is unreachable",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:41",
    "type": "Reachability",
    "extended": null,
    "description": "* SciencePark-01 device is unreachable",
    "location": "Jaipur.Park-Science",
    "device": "* SciencePark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* SciencePark-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Science",
    "device": "* SciencePark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Device Stream Status",
    "extended": null,
    "description": "SciencePark-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Device Stream Status",
    "extended": null,
    "description": "SciencePark-02 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Recording Status",
    "extended": null,
    "description": "* SciencePark-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Science",
    "device": "* SciencePark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Recording Status",
    "extended": null,
    "description": "SciencePark-04 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 15:39",
    "type": "Recording Status",
    "extended": null,
    "description": "SciencePark-02 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/22/2016 1:14",
    "type": "Core Dump",
    "extended": null,
    "description": "MediaOut.6311 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/21/2016 17:37",
    "type": "Reachability",
    "extended": null,
    "description": "* RamNiwasBagh-04 device is unreachable",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamNiwasBagh-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/19/2016 10:51",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JantarMantar-10 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JantarMantar-05 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* JantarMantar-02 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "* JantarMantar-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JantarMantar-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "DwarakadasPark-07 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Dwarakadas",
    "device": "DwarakadasPark-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* Rose Garden-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Rose Garden",
    "device": "* Rose Garden-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "GroundFloor_JDA-07 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Parking Area - JDA",
    "device": "GroundFloor_JDA-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "WoodlandPark-02 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Woodland",
    "device": "WoodlandPark-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:25",
    "type": "Device Stream Status",
    "extended": null,
    "description": "HawaMahal-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Hawa Mahal",
    "device": "HawaMahal-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* WoodlandPark-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Woodland",
    "device": "* WoodlandPark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "DwarakadasPark-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Dwarakadas",
    "device": "DwarakadasPark-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "HawaMahal-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Hawa Mahal",
    "device": "HawaMahal-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "JantarMantar-09 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-09",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* Baghat Singh park-02 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Baghat Singh",
    "device": "* Baghat Singh park-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "JantarMantar-10 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Reachability",
    "extended": null,
    "description": "* Baghat Singh park-02 device is unreachable",
    "location": "Jaipur.Park-Baghat Singh",
    "device": "* Baghat Singh park-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "JantarMantar-03 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "JantarMantar-08 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "* JantarMantar-07 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "* JantarMantar-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Recording Status",
    "extended": null,
    "description": "JantarMantar-04 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 17:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JantarMantar-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 13:58",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NurseryPark-05",
    "location": "Jaipur.Park-Nursery",
    "device": "NurseryPark-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/18/2016 13:54",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/17/2016 17:00",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamniwasBagh-15",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/17/2016 15:47",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/17/2016 15:36",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/17/2016 15:35",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-01",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/17/2016 15:06",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 21:33",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 14:36",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 14:14",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* JalMahal-05 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 14:08",
    "type": "Recording Status",
    "extended": null,
    "description": "* JalMahal-05 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 14:06",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * JalMahal-05",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 9:07",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/16/2016 9:06",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/15/2016 8:56",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * NurseryPark-07",
    "location": "Jaipur.Park-Nursery",
    "device": "* NurseryPark-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/15/2016 8:07",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/14/2016 11:24",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* JalMahal-06 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/14/2016 11:18",
    "type": "Recording Status",
    "extended": null,
    "description": "* JalMahal-06 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/14/2016 11:17",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * JalMahal-06",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/14/2016 11:16",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/12/2016 11:36",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/11/2016 12:10",
    "type": "Camera App Installation Status",
    "extended": null,
    "description": "Camera app ObjectTaken_V2.4.2 is not installed on the camera",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-11",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/11/2016 11:32",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * JantarMantar-07",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "* JantarMantar-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/11/2016 9:09",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamniwasBagh-15",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/11/2016 8:58",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/10/2016 14:50",
    "type": "Device Status",
    "extended": null,
    "description": "Error in * JantarMantar-07 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "* JantarMantar-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/9/2016 8:51",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NurseryPark-06",
    "location": "Jaipur.Park-Nursery",
    "device": "NurseryPark-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/8/2016 14:06",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * SMSHospital-04",
    "location": "Jaipur.Hospital-SMS",
    "device": "* SMSHospital-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/8/2016 10:26",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:11",
    "type": "Reachability",
    "extended": null,
    "description": "JalMahal-01 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:11",
    "type": "Reachability",
    "extended": null,
    "description": "JalMahal-03 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:11",
    "type": "Reachability",
    "extended": null,
    "description": "JalMahal-04 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:11",
    "type": "Reachability",
    "extended": null,
    "description": "JalMahal-02 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Reachability",
    "extended": null,
    "description": "* JalMahal-06 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Reachability",
    "extended": null,
    "description": "* JalMahal-05 device is unreachable",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JalMahal-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JalMahal-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JalMahal-02 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JalMahal-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Recording Status",
    "extended": null,
    "description": "JalMahal-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Recording Status",
    "extended": null,
    "description": "JalMahal-04 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Recording Status",
    "extended": null,
    "description": "JalMahal-02 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/7/2016 12:09",
    "type": "Recording Status",
    "extended": null,
    "description": "JalMahal-03 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/6/2016 18:03",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AlbertHall-02",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "* AlbertHall-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:57",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-08",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-08",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:57",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-06",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:54",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:50",
    "type": "Device Stream Status",
    "extended": null,
    "description": "* AmberFort-04 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "* AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:48",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AmberFort-04",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "* AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:47",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:44",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:44",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AmberFort-04",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "* AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 14:34",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-05",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 9:57",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MGFParking-01",
    "location": "Jaipur.Mall-MGF Parking",
    "device": "MGFParking-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 8:43",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device JalMahal-01",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 8:43",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * JalMahal-05",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "* JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 8:17",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/4/2016 8:16",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/3/2016 9:26",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamniwasBagh-15",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/2/2016 19:08",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/2/2016 19:07",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/2/2016 12:56",
    "type": "Recording Status",
    "extended": null,
    "description": "RamniwasBagh-13 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/2/2016 12:54",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamniwasBagh-13",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/1/2016 17:08",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamniwasBagh-15",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/1/2016 12:29",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-05",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/1/2016 12:27",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/1/2016 12:22",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-05",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "11/1/2016 12:22",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/31/2016 3:12",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.24557 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/27/2016 18:44",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * RamniwasBagh-15",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "* RamniwasBagh-15",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/27/2016 16:37",
    "type": "Device Status",
    "extended": null,
    "description": "Error in RamniwasBagh-13 device configuration, the following configuration(s) failed EnableCameraAppMgmt",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/27/2016 16:37",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Camera Hardware Id in Media Server does not match with the camera",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/27/2016 10:56",
    "type": "Recording Status",
    "extended": null,
    "description": "SMSHospital-02 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/27/2016 9:09",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device * AmberFort-04",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "* AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/26/2016 22:50",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5227 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/26/2016 18:34",
    "type": "Device Status",
    "extended": null,
    "description": "Error in SciencePark-03 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/25/2016 9:41",
    "type": "Device Stream Status",
    "extended": null,
    "description": "SciencePark-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/25/2016 8:40",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamNiwasBagh-03",
    "location": "Jaipur.Ram Niwas Bagh",
    "device": "RamNiwasBagh-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/24/2016 16:41",
    "type": "Reachability",
    "extended": null,
    "description": "SciencePark-03 device is unreachable",
    "location": "Jaipur.Park-Science",
    "device": "SciencePark-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/24/2016 14:27",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamniwasBagh-13",
    "location": "Jaipur.Park-Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/24/2016 13:57",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/24/2016 11:32",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamniwasBagh-13",
    "location": "Jaipur.Ram Niwas Bagh",
    "device": "RamniwasBagh-13",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/23/2016 17:33",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/22/2016 19:49",
    "type": "Reachability",
    "extended": null,
    "description": "AmberFort-01 device is unreachable",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/22/2016 19:47",
    "type": "Device Stream Status",
    "extended": null,
    "description": "AmberFort-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/22/2016 18:29",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.23067 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/22/2016 17:48",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device JantarMantar-10",
    "location": "Jaipur.Tourist Place-Jantar Mantar",
    "device": "JantarMantar-10",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:59",
    "type": "Reachability",
    "extended": null,
    "description": "JANAK-MARG-03 device is unreachable",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:59",
    "type": "Reachability",
    "extended": null,
    "description": "JANAK-MARG-01 device is unreachable",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:57",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JANAK-MARG-03 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:57",
    "type": "Device Stream Status",
    "extended": null,
    "description": "JANAK-MARG-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:57",
    "type": "Recording Status",
    "extended": null,
    "description": "JANAK-MARG-03 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/20/2016 9:57",
    "type": "Recording Status",
    "extended": null,
    "description": "JANAK-MARG-01 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/19/2016 14:27",
    "type": "Recording Status",
    "extended": null,
    "description": "AmberFort-04 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/19/2016 9:19",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device SMSHospital-03",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/17/2016 15:50",
    "type": "Device Status",
    "extended": null,
    "description": "Error in JalMahal-01 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/17/2016 10:14",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-05",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/17/2016 9:22",
    "type": "Device Status",
    "extended": null,
    "description": "Error in AmberFort-05 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "10/17/2016 3:27",
    "type": "Device Status",
    "extended": null,
    "description": "Error in AmberFort-05 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/16/2016 9:32",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device SMSHospital-03",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/13/2016 21:32",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5625 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/13/2016 16:23",
    "type": "Device Status",
    "extended": null,
    "description": "Error in TechnologyPark-01 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Park-Technology",
    "device": "TechnologyPark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/13/2016 10:26",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device SMSHospital-04",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/13/2016 10:22",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device SMSHospital-04",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/8/2016 13:09",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MGFParking-02",
    "location": "Jaipur.Mall-MGF Parking",
    "device": "MGFParking-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/8/2016 13:08",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MGFParking-01",
    "location": "Jaipur.Mall-MGF Parking",
    "device": "MGFParking-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/8/2016 11:44",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device Inox Parking -3",
    "location": "Jaipur.Mall-Inox Parking",
    "device": "Inox Parking -3",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/8/2016 8:39",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-04",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/7/2016 14:40",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device Inox Parking -3",
    "location": "Jaipur.Mall-Inox Parking",
    "device": "Inox Parking -3",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/7/2016 14:38",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device Inox Parking -3",
    "location": "Jaipur.Mall-Inox Parking",
    "device": "Inox Parking -3",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/7/2016 14:17",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device Inox Parking -3",
    "location": "Jaipur.Inox Parking",
    "device": "Inox Parking -3",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/6/2016 18:43",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device SMSHospital-03",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/6/2016 11:09",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NehruBal-07",
    "location": "Jaipur.Park-Nehru Bal",
    "device": "NehruBal-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 19:21",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NehruBal-07",
    "location": "Jaipur.Park-Nehru Bal",
    "device": "NehruBal-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 16:08",
    "type": "Device Stream Status",
    "extended": null,
    "description": "TechnologyPark-01 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Park-Technology",
    "device": "TechnologyPark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 16:07",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device TechnologyPark-04",
    "location": "Jaipur.Park-Technology",
    "device": "TechnologyPark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 15:54",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Tourist Place-Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 15:49",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AmberFort-03",
    "location": "Jaipur.Amber Fort",
    "device": "AmberFort-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 14:28",
    "type": "Reachability",
    "extended": null,
    "description": "TechnologyPark-01 device is unreachable",
    "location": "Jaipur.Park-Technology",
    "device": "TechnologyPark-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 8:23",
    "type": "Device Stream Status",
    "extended": null,
    "description": "DwarakadasPark-06 Video Stream 1 Streaming connection loss occurred",
    "location": "Jaipur.Dwarakadas Park",
    "device": "DwarakadasPark-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 8:23",
    "type": "Recording Status",
    "extended": null,
    "description": "DwarakadasPark-06 Video Stream 1 Recording status is critical",
    "location": "Jaipur.Dwarakadas Park",
    "device": "DwarakadasPark-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 8:20",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device DwarakadasPark-04",
    "location": "Jaipur.Park-Dwarakadas",
    "device": "DwarakadasPark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 8:17",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device DwarakadasPark-04",
    "location": "Jaipur.Park-Dwarakadas",
    "device": "DwarakadasPark-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/5/2016 8:16",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device DwarakadasPark-06",
    "location": "Jaipur.Park-Dwarakadas",
    "device": "DwarakadasPark-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "10/3/2016 11:08",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "9/30/2016 10:16",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device JalMahal-05",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/30/2016 10:16",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device JalMahal-02",
    "location": "Jaipur.Tourist Place-Jal Mahal",
    "device": "JalMahal-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/29/2016 12:45",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AlbertHall-04",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "AlbertHall-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "9/29/2016 12:40",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NehruBal-05",
    "location": "Jaipur.Park-Nehru Bal",
    "device": "NehruBal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "9/29/2016 12:39",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NehruBal-05",
    "location": "Jaipur.Park-Nehru Bal",
    "device": "NehruBal-05",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/29/2016 12:29",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AlbertHall-04",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "AlbertHall-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/29/2016 12:02",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device AlbertHall-04",
    "location": "Jaipur.Tourist Place-Albert Hall",
    "device": "AlbertHall-04",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/29/2016 11:58",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device Rose Garden-01",
    "location": "Jaipur.Park-Rose Garden",
    "device": "Rose Garden-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/29/2016 0:02",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.12355 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/28/2016 13:11",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/27/2016 10:55",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/27/2016 10:45",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/27/2016 8:20",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/27/2016 8:17",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device MahilaHospital-02",
    "location": "Jaipur.Hospital-Mahila",
    "device": "MahilaHospital-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/24/2016 9:21",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device NehruBal-07",
    "location": "Jaipur.Park-Nehru Bal",
    "device": "NehruBal-07",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/24/2016 7:54",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5565 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/24/2016 6:26",
    "type": "Device Status",
    "extended": null,
    "description": "Error in JANAK-MARG-03 device configuration, the following configuration(s) failed EnableCameraAppMgmt",
    "location": "Jaipur.Park-Janakg Marg",
    "device": "JANAK-MARG-03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/24/2016 0:37",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5710 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer02",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/23/2016 0:02",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5137 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer03",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/21/2016 17:41",
    "type": "Device Status",
    "extended": null,
    "description": "Error in SMSHospital-01 device configuration, the following configuration(s) failed CameraHealthEventConfig",
    "location": "Jaipur.Hospital-SMS",
    "device": "SMSHospital-01",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/19/2016 15:23",
    "type": "Camera Reported Health",
    "extended": "Camera Apps Health",
    "description": "Apps: ZoneIntrusion stopped - Camera Health is critical",
    "location": "Jaipur.Nursery Park",
    "device": "NurseryPark-02",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/19/2016 6:21",
    "type": "Core Dump",
    "extended": null,
    "description": "msghandler.5324 core dump critical",
    "location": "Jaipur",
    "device": "MediaServer01",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/15/2016 18:06",
    "type": "Reachability",
    "extended": null,
    "description": "DwarakadasPark-06 device is unreachable",
    "location": "Jaipur.Dwarakadas Park",
    "device": "DwarakadasPark-06",
    "falsealarm": null,
    "ackedby": null,
    "closed": null
  },
  {
    "status": "NEW",
    "severity": "CRITICAL",
    "time": "9/15/2016 13:01",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamniwasBagh-17",
    "location": "Jaipur.Ram Niwas Bagh",
    "device": "RamniwasBagh-17",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  },
  {
    "status": "CLR",
    "severity": "CRITICAL",
    "time": "9/15/2016 13:01",
    "type": "Configuration Mismatch Status",
    "extended": null,
    "description": "Configuration in VSOM is not the same as in media server for device RamniwasBagh-18",
    "location": "Jaipur.Ram Niwas Bagh",
    "device": "RamniwasBagh-18",
    "falsealarm": null,
    "ackedby": null,
    "closed": "admin"
  }];
  $scope.selStatus = "All";
  $scope.selDevice = "All";
  $scope.selFalseAlarm = "All";
  $scope.selAckBy = "All";
  $scope.selClosed = "All";
  $scope.selSeverity = "All";
  $scope.selType = "All";
  //$scope.selExtendedType = "All";

  /*$http.get("json/sheet4security.json").then(function (data) {
        
        $scope.myObj = data.data;
        
        console.log("data ==>"+$scope.myObj);

        $scope.statusData = $filter('unique')($scope.myObj, 'status');
        $scope.deviceData = $filter('unique')($scope.myObj, 'device');
        $scope.severityData = $filter('unique')($scope.myObj, 'severity');
        $scope.typeData = $filter('unique')($scope.myObj, 'type');
        $scope.eTypeData = $filter('unique')($scope.myObj, 'extended');
  }); */

        $scope.statusData = $filter('unique')($scope.myObj, 'status');
        $scope.deviceData = $filter('unique')($scope.myObj, 'device');

        $scope.falseAlarmData = $filter('unique')($scope.myObj, 'falsealarm');
        $scope.ackByData = $filter('unique')($scope.myObj, 'ackedby');
        $scope.closedData = $filter('unique')($scope.myObj, 'closed');

        $scope.severityData = $filter('unique')($scope.myObj, 'severity');
        $scope.typeData = $filter('unique')($scope.myObj, 'type');
        //$scope.eTypeData = $filter('unique')($scope.myObj, 'extended');


  $scope.onChgStatus = function(){

    console.log("$scope.selStatus =>"+$scope.selStatus); 

  }
  $scope.onChgDevice = function(){
    
    console.log("$scope.selDevice =>"+$scope.selDevice); 
  }
  $scope.onChgSeverity = function(){

    console.log("$scope.selSeverity =>"+$scope.selSeverity); 
  }
  $scope.onChgType = function(){
    
    console.log("$scope.selType =>"+$scope.selType); 
  }
 


 $scope.mainSheet1 = [
 {
   "Log Time": "11/17/2016 23:52",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user admin successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 23:08",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user admin successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 19:56",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "42.111.70.224"
 },
 {
   "Log Time": "11/17/2016 19:05",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:36",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.80"
 },
 {
   "Log Time": "11/17/2016 18:33",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:24",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:23",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:12",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "42.111.70.224"
 },
 {
   "Log Time": "11/17/2016 18:12",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user admin successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.70.224"
 },
 {
   "Log Time": "11/17/2016 18:11",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:07",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 18:06",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 17:56",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.70.224"
 },
 {
   "Log Time": "11/17/2016 17:55",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.70.224"
 },
 {
   "Log Time": "11/17/2016 17:52",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "172.30.101.1"
 },
 {
   "Log Time": "11/17/2016 17:45",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "72.163.220.26"
 },
 {
   "Log Time": "11/17/2016 17:39",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:38",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:38",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:38",
   "Activity Type": "ACCEPT_LICENSE",
   "Description": "User JDA-IT accepted the SASD download license agreement",
   "Object Location": "",
   "Object Name": "SASD",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:38",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:38",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 17:35",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "1.186.58.2"
 },
 {
   "Log Time": "11/17/2016 17:27",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 17:04",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Park-Ram Niwas Bagh",
   "Object Name": "* RamniwasBagh-15",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 17:04",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 17:04",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user admin",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 17:00",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Park-Ram Niwas Bagh",
   "Object Name": "* RamniwasBagh-15",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 16:57",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Park-Ram Niwas Bagh",
   "Object Name": "* RamniwasBagh-15",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 16:57",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 16:57",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Park-Ram Niwas Bagh",
   "Object Name": "* RamniwasBagh-15",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 16:56",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Park-Ram Niwas Bagh",
   "Object Name": "* RamniwasBagh-15",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 16:46",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:37",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:36",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:36",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user admin successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.92.76"
 },
 {
   "Log Time": "11/17/2016 15:36",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:36",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.92.76"
 },
 {
   "Log Time": "11/17/2016 15:36",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user admin",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.92.76"
 },
 {
   "Log Time": "11/17/2016 15:35",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:35",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:35",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:34",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:32",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:32",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "42.111.92.76"
 },
 {
   "Log Time": "11/17/2016 15:32",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:13",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:12",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:12",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:11",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:11",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:10",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:09",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:05",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 15:04",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:03",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 15:02",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Amber Fort",
   "Object Name": "AmberFort-01",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 14:42",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:42",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:41",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:41",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:40",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:39",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:39",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:34",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 14:32",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user admin successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 14:25",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 13:55",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 13:49",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 13:34",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 13:25",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user admin as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 13:18",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 13:05",
   "Activity Type": "APPLY_CONFIGURATION",
   "Description": "Apply Configuration",
   "Object Location": "Jaipur.Tourist Place-Albert Hall",
   "Object Name": "* AlbertHall-02",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 13:03",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 12:55",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.231"
 },
 {
   "Log Time": "11/17/2016 12:08",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 12:06",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 12:03",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 12:03",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 11:55",
   "Activity Type": "LOGOUT_EXPIRED_SESSION",
   "Description": "Logging out user JDA-IT as session expired",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 11:40",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:39",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:37",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:37",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:37",
   "Activity Type": "ACCEPT_LICENSE",
   "Description": "User JDA-IT accepted the SASD download license agreement",
   "Object Location": "",
   "Object Name": "SASD",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:37",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:37",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:36",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:36",
   "Activity Type": "ACCEPT_LICENSE",
   "Description": "User JDA-IT accepted the SASD download license agreement",
   "Object Location": "",
   "Object Name": "SASD",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:36",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:36",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:35",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "220.225.221.145"
 },
 {
   "Log Time": "11/17/2016 11:29",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "1.186.58.2"
 },
 {
   "Log Time": "11/17/2016 11:28",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "1.186.58.2"
 },
 {
   "Log Time": "11/17/2016 11:27",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user JDA-IT",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "1.186.58.2"
 },
 {
   "Log Time": "11/17/2016 11:26",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user JDA-IT",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "1.186.58.2"
 },
 {
   "Log Time": "11/17/2016 11:21",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "72.163.220.19"
 },
 {
   "Log Time": "11/17/2016 11:21",
   "Activity Type": "LOGOUT",
   "Description": "Logged out user JDA-IT successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "72.163.220.19"
 },
 {
   "Log Time": "11/17/2016 11:17",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User JDA-IT logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "JDA-IT",
   "User Ip": "72.163.220.19"
 },
 {
   "Log Time": "11/17/2016 8:28",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 8:27",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user *****",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "*****",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 8:27",
   "Activity Type": "LOGIN_FAILED",
   "Description": "Operation failed: Credentials are incorrect for the user *****",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "*****",
   "User Ip": "10.10.10.26"
 },
 {
   "Log Time": "11/17/2016 8:21",
   "Activity Type": "LOGIN_SUCCESS",
   "Description": "User admin logged in successfully",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "admin",
   "User Ip": "10.10.10.81"
 },
 {
   "Log Time": "11/17/2016 6:15",
   "Activity Type": "PARTITION_DB",
   "Description": "creating new partition p346 for partition time 1479513600000 on table auditchanges",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 6:15",
   "Activity Type": "PARTITION_DB",
   "Description": "creating new partition p346 for partition time 1479513600000 on table auditlog",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 6:10",
   "Activity Type": "PARTITION_DB",
   "Description": "creating new partition 437 for partition time 1487289600000 on table USERCOMMENT",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 6:10",
   "Activity Type": "PARTITION_DB",
   "Description": "creating new partition 437 for partition time 1487289600000 on table ALERT",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "",
   "User Ip": "localhost"
 },
 {
   "Log Time": "11/17/2016 6:05",
   "Activity Type": "PARTITION_DB",
   "Description": "creating new partition 437 for partition time 1487289600000 on table EVENT",
   "Object Location": "",
   "Object Name": "",
   "Object Type": "vs_auditLog",
   "User": "",
   "User Ip": "localhost"
 }
];

var userAccessArr=[{
  "SASD":{
    "JDA-IT":
    {
      "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":3,
      "PARTITION_DB":0

    }
  },
  "AmberFort-01":{
    "admin":
    {
      "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":1,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0

    }
  },
  "* RamniwasBagh-15":{
    "admin":
    {
      "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":5,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0

    }
  },
  "* AlbertHall-02":{
    "admin":{
       "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":1,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0
    }
  },
  "":{
    "admin":
    {
      "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":23,
      "LOGOUT":5,
      "LOGOUT_EXPIRED_SESSION":19,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0

    },
    "JDA-IT":{
      "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":15,
      "LOGOUT":8,
      "LOGOUT_EXPIRED_SESSION":7,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0

    },
    "blank":{
      "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":5
    },
    "asterict":{
     "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0
    }
  },
  "All":{
   "admin":
    {
      "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":23,
      "LOGOUT":5,
      "LOGOUT_EXPIRED_SESSION":19,
      "APPLY_CONFIGURATION":18,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0

    },
    "JDA-IT":{
      "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":15,
      "LOGOUT":8,
      "LOGOUT_EXPIRED_SESSION":7,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":3,
      "PARTITION_DB":0

    },
    "blank":{
      "LOGIN_FAILED" :0,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":5
    },
    "asterict":{
     "LOGIN_FAILED" :2,
      "LOGIN_SUCCESS":0,
      "LOGOUT":0,
      "LOGOUT_EXPIRED_SESSION":0,
      "APPLY_CONFIGURATION":0,
      "ACCEPT_LICENSE":0,
      "PARTITION_DB":0
    }
  }
}];

// Variables for piechart
var sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];

  $scope.selObj = "All";
  $scope.selActivity = "All";
  $scope.selUser = "All";
  
  $scope.activityTypeData = $filter('unique')($scope.mainSheet1, 'Activity Type');
  $scope.objectNameData = $filter('unique')($scope.mainSheet1, 'Object Name');
  console.log($scope.objectnamedata);
  $scope.userData = $filter('unique')($scope.mainSheet1, 'User');

// Variables for Bar Chart
  $scope.logTimeData = $filter('unique')($scope.mainSheet1, 'Log Time');
  $scope.objectTypeData = $filter('unique')($scope.mainSheet1, 'Object Type');
  $scope.userIpData = $filter('unique')($scope.mainSheet1, 'User Ip');

  $scope.selObjBar = "All";
  $scope.selActivityBar = "All";
  $scope.selUserBar = "All";
  $scope.selObjTypeBar = "All";
  $scope.selLogTimeBar = "All";
  $scope.selUserIpBar = "All";
  

// Onchange function for Pie Dropdown
  $scope.onChgObjectNameData = function(){

    console.log("$scope.selObj =>"+$scope.selObj);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawUserAccessPieChart($scope.selObj,$scope.selActivity,$scope.selUser);
  }

  $scope.onChgActivityData = function(){

    console.log("$scope.selActivity =>"+$scope.selActivity);

    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawUserAccessPieChart($scope.selObj,$scope.selActivity,$scope.selUser);
  }

  $scope.onChgUser = function(){

    console.log("$scope.selUser =>"+$scope.selUser);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawUserAccessPieChart($scope.selObj,$scope.selActivity,$scope.selUser);
  }

// Onchange function for stacked Bar chart Dropdown //

  $scope.onChgObjectNameBarData = function(){

    console.log("$scope.selObjBar =>"+$scope.selObjBar);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

  $scope.onChgActivityBarData = function(){

    console.log("$scope.selActivityBar =>"+$scope.selActivityBar);

    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

  $scope.onChgUserBar = function(){

    console.log("$scope.selUserBar =>"+$scope.selUserBar);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

   $scope.onChgObjectTypeBarData = function(){

    console.log("$scope.selObjTypeBar =>"+$scope.selObjTypeBar);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

  $scope.onChgLogTimeBarData = function(){

    console.log("$scope.selLogTimeBar =>"+$scope.selLogTimeBar);

    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

  $scope.onChgUserIpBar = function(){

    console.log("$scope.selUserIpBar =>"+$scope.selUserIpBar);
    
    sumOfAllValues=[],pieYValues,sumArr=[],xyz,summationFinal=[],pieNames,flag=false,mainObj,pieDataAll,pieDataArr=[];
    $scope.drawAccessLevelBarCahrt($scope.selObjBar,$scope.selActivityBar,$scope.selUserBar,$scope.selObjTypeBar,$scope.selLogTimeBar,$scope.selUserIpBar);
  }

// Bar chart ends //


// Draw Piechart function
$scope.drawUserAccessPieChart = function(selectedObjName,selectedActivity,selectedUser){
          if(selectedUser == "*****"){
            selectedUser = "asterict";
          }else if(selectedUser == ""){
            selectedUser = "blank";
          }

          //object name
          selectedObject = userAccessArr[0][selectedObjName];
          var keys = Object.keys(selectedObject);
                    
            for(var key in selectedObject){
              if(keys.length >= 4 && selectedUser == "All"){
                  pieYValues = Object.values(selectedObject[key]);
                  pieNames = Object.keys(selectedObject[key]);
                  sumOfAllValues.push(pieYValues);              
              }else{

                  if(key == selectedUser || selectedUser == "All"){
                    pieYValues = Object.values(selectedObject[key]);
                    pieNames = Object.keys(selectedObject[key]);
                    sumOfAllValues.push(pieYValues);
                  }

              } 
            }
            //console.log(pieNames);
            if(sumOfAllValues.length != 0){
              for(var i=0;i<sumOfAllValues[0].length;i++){

              flag=true;
                for(var j=0;j<sumOfAllValues.length;j++){
                  sumArr.push(sumOfAllValues[j][i]);
                  flag=false;
                 
                }
                if(flag==false){
                  xyz = sumArr.reduce(function(a, b) {
                    return a + b;
                  }, 0);
              }
                summationFinal.push(xyz);
                sumArr.length=0;
              }
            
            

           //console.log(summationFinal);


            // Till here User and Object Name Drill down done (using Object Name filtering data)
            if(selectedActivity != 'All'){
               angular.forEach(pieNames,function (v,k) {
                pieDataAll={};
                if(summationFinal[k] != 0){
                    if(v == selectedActivity){
                      pieDataAll.name=v;
                      pieDataAll.y=summationFinal[k];
                      pieDataArr.push(pieDataAll)  
                    }     
                }
              });
    
            }else{
                angular.forEach(pieNames,function (v,k) {
                pieDataAll={};
                if(summationFinal[k] != 0){
                    pieDataAll.name=v;
                    pieDataAll.y=summationFinal[k];
                    pieDataArr.push(pieDataAll)  
                }           

              });
           }

         } 
        //Array displaing chart 
        console.log(pieDataArr);

          // Charting code starts here //

      $scope.chart4= new Highcharts.Chart({
        chart: {
                    renderTo: 'container3',
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
        },
        title: {
            text: ''
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: ': <b>{point.y:.1f} </b>'
        }, 
        credits: {
            enabled: false
        },
        series: [{
           
            data: pieDataArr
            
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

}
var catVal = [];
var objData = [];
var objData1 = [],barYValues=[],barNames=[],sumOfBarValues=[],sumBarArr=[];

$scope.drawAccessLevelBarCahrt = function(selectedObjName,selectedObjType,selectedLogTime,selectedUserIp,selectedActivity,selectedUser){
     
     //object name
      selectedBarObject = userAccessArr[0][selectedObjName];
      catVal = Object.keys(selectedObject);


      for (var key in selectedBarObject) {
          barYValues = Object.values(selectedBarObject[key]);
          barNames = Object.keys(selectedBarObject[key]);
          sumOfBarValues.push(barYValues);
         
      }

      for (var i = 0; i < sumOfBarValues[0].length; i++) {
                for (var j = 0; j < sumOfBarValues.length; j++) {
                    sumBarArr.push(sumOfBarValues[j][i]);   
                    //console.log(sumArr);
            }
            objData1.push(sumBarArr);
              sumBarArr= [];
              console.log(objData1);  
            
      }



}

$scope.drawUserAccessPieChart('All','All','All');
$scope.drawAccessLevelBarCahrt('All','All','All','All','All','All');       

 // Praveen Code End

});
