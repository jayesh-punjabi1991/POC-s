  define(['angular','ngMap', './sample-module'], function (angular,ngMap, controllers) {
    'use strict';
    // Controller definition
  controllers.controller('DashboardsCtrl', ['$state','$rootScope','$scope','$http', '$log','fetchData','SelectedUnits','$filter','fetchData3',function ($state,$rootScope, $scope, $http, $log, fetchData,SelectedUnits,$filter,fetchData3) {
        $scope.dataNotLoaded=true;
        $scope.view="Data View";
        $scope.v='!Map View';
        $rootScope.affiliationString='Mountain A';
         $rootScope.machinearr=[];
        $scope.velocityFirst=[];
        $scope.velocitySecond=[];
        $scope.Occured=[];
        $scope.Hours=[];
        $scope.information=[];
        $scope.AvgLat=40.708163125;
        $scope.AvgLon=-89.567617;
        $scope.spinner='!running';
        $rootScope.sDate='01-Aug-2012';
        $rootScope.eDate='01-Aug-2015';
        $scope.mwStart="undefined";
        $scope.mwEnd="undefined";
        $rootScope.locoID="undefined";
        $rootScope.techID="undefined";
        $rootScope.LocoArraytoService=[];
        $scope.convertDates=function(startDate,endDate){
          $rootScope.sDate= $filter('date')(startDate,'dd-MMM-yyyy');
          $rootScope.eDate=$filter('date')(endDate,'dd-MMM-yyyy');
        }
        $scope.results='hide';
        var picker = document.getElementById('rangePicker');
        picker.addEventListener('px-datetime-range-submitted', function (ev) {
        var date=ev.currentTarget;
        var selectedDate=date.range;
        var FromDate=selectedDate.from;
        var ToDate=selectedDate.to;
        $scope.convertDates(FromDate,ToDate);
        });

        $scope.data2='[{"key":1,"val":"8835"},{"key":2,"val":"8842"},{"key":3,"val":"8849"},{"key":4,"val":"8850"},{"key":5,"val":"73450"},{"key":6,"val":"73409"},{"key":7,"val":"73409"},{"key":8,"val":"73411"},{"key":9,"val":"73421"},{"key":10,"val":"7342"},{"key":11,"val":"73425"}]';
        $scope.affData='[{"key":"0", "val": "fdl"}, {"key":"1", "val": "evo"}]';

        //select:
        var expanded = false;
        $scope.showCheckboxes=function() {
              var checkboxes = document.getElementById("checkboxes");
              if (!expanded) {
                  checkboxes.style.display = "block";
                  expanded = true;
              } else {
                  checkboxes.style.display = "none";
                  expanded = false;
              }
        }

        $scope.items=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12}];

        //code for multi select for Affiliations
        $scope.selectedCheckbox = [];
        $scope.arrayToRender=[];
        $scope.example2data = [ {id:1},{id:2},{id:3}];

        $scope.functionData=function(val){
          $scope.arrayToRender.push(val);
        }
        if($scope.arrayToRender.length >= 0){
          angular.forEach($scope.selectedCheckbox,function(v,k){

          });
        }

        //code for multi-select for Machines:
        $scope.checkedVal=[];
        $scope.machineData=[{id:1},{id:2},{id:3},{id:4},{id:5},{id:6},{id:7},{id:8},{id:9},{id:10},{id:11},{id:12}];

        $scope.arrayWithVal=[];
          $scope.functionData1=function(value){
            $scope.arrayWithVal.push(value);
          }

        if($scope.arrayWithVal.length>=0){
          angular.forEach($scope.arrayWithVal,function(val,key){

           })
        }


       document.getElementById("mytable").addEventListener("px-row-click", function(e) {
        var clickedRow = e.detail.row;
        sessionStorage.setItem("SelectedLoco",clickedRow.row.locoId);
        $state.go('maintenance');
      });

        $scope.swapView=function(){
          if($('#toggle').hasClass('fa-toggle-off')){
                  $scope.view="Map View";
                  $('#toggle').removeClass('fa-toggle-off');
                  $('#toggle').addClass('fa-toggle-on');
                  $scope.v='Map View';
                  $scope.view="Map View";
                  setTimeout(function(){ $scope.func($scope.coords1); }, 1000);
               }
               else{
                $scope.v='View';
                $scope.view="Data View";
                $('#toggle').removeClass('fa-toggle-on');
                  $('#toggle').addClass('fa-toggle-off');
               }
        }

$rootScope.locoIDArray=[];
     $scope.locoArray=function(val){ 
       var loco=val;
      if($rootScope.locoIDArray.indexOf(loco)===-1){
        $rootScope.locoIDArray.push(loco);
      }  
      else if($rootScope.locoIDArray.indexOf(loco)!==-1){
        var index=$rootScope.locoIDArray.indexOf(loco);
              $rootScope.locoIDArray.splice(index,loco);
      }    
      
      $rootScope.LocoArraytoService=$rootScope.locoIDArray.toString();
      
     }

     $rootScope.techArrayID=[];
     $rootScope.techArraytoService=[];
     $scope.techArray=function(val){ 
       var tech=val;
      if($rootScope.techArrayID.indexOf(tech)===-1){
        $rootScope.techArrayID.push(tech);
      }  
      else if($rootScope.techArrayID.indexOf(tech)!==-1){
              var index = $.inArray(tech,$rootScope.techArrayID);
              $rootScope.techArrayID.splice(index, 1);
      }    
      $rootScope.techArraytoService=$rootScope.techArrayID.toString();
     }
   
    var locomotive=document.getElementById('element');
          
      function getEventTarget(e) {
        e = e || window.event;
       return e.target || e.srcElement; 
      }

      locomotive.onclick=function(ev){
               
        var target = getEventTarget(ev);
                 
          if(target.localName==='li'){
          $rootScope.locoID=target.innerText;
          
          }
          else if(target.localName==='input'){
          $rootScope.locoID=target.parentNode.innerText; 
                  }
         var passloco=$rootScope.locoID;
         
          $scope.locoArray(passloco);
      }

      var technology=document.getElementById('tech');

         technology.onclick=function(event){
          var target = getEventTarget(event);
            
          if(target.localName==='li'){
          $rootScope.techID=target.innerText;
        
          }
          else if(target.localName==='input'){
          $rootScope.techID=target.parentNode.innerText;
         
                  }

          $scope.techArray($rootScope.techID);
      }
 $scope.sendFilterValues=function(){


  $scope.spinner='running';
  $scope.results='show';
      sessionStorage.setItem('StartDate',$rootScope.sDate);
      sessionStorage.setItem('EndDate',$rootScope.eDate);
      sessionStorage.setItem('MwStart',$scope.mwStart);
      sessionStorage.setItem('MwEnd',$scope.mwEnd);
    

     if($rootScope.LocoArraytoService.length==0){
        $rootScope.LocoArraytoService="undefined";
     }
     if($rootScope.techArraytoService.length==0){
       $rootScope.techArraytoService="undefined";
     }

       sessionStorage.setItem('LocoID',$rootScope.LocoArraytoService);
      sessionStorage.setItem('TechID',$rootScope.techArraytoService);
    console.log('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/locoSearch?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&mwStart='+$scope.mwStart+'&mwEnd='+$scope.mwEnd+'&locoID='+$rootScope.LocoArraytoService+'&technology='+$rootScope.techArraytoService);
    $http.get('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/locoSearch?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&mwStart='+$scope.mwStart+'&mwEnd='+$scope.mwEnd+'&locoID='+$rootScope.LocoArraytoService+'&technology='+$rootScope.techArraytoService).then(
        function(response){
         $scope.information =response.data;    
         $scope.spinner='!running';   
      })
$http.get('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/locoSearch?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&mwStart='+$scope.mwStart+'&mwEnd='+$scope.mwEnd+'&locoID='+$rootScope.LocoArraytoService+'&technology='+$rootScope.techArraytoService).then(function(response){
        $scope.coords1 = response.data;
        if($scope.v=='Map View'){
 $scope.spinner='running';
        $scope.func($scope.coords1);
        
      }
});
  }

//Map
 $scope.coords1=[];
$scope.coords2=[];
$scope.lineCoordinatesArray = [];
$scope.count=1;

$scope.func=function(val){

     $scope.initialize=function()
{

  var icons = {
    Parked: {
      icon: '../images/oie-transparent-parked.gif'
    },
    Running: {
      icon: '../images/oie-transparent-running.gif'
    }
  };

    var map = new google.maps.Map(document.getElementById("map"),
   
    {
        zoom: 3,
        center: new google.maps.LatLng(50.959525, -113.954044),
        mapTypeId: google.maps.MapTypeId.ROADMAP

    });

  function addMarker(coord1) {
    $scope.marker = new google.maps.Marker({
      position: new google.maps.LatLng(coord1.latitude, coord1.longitude),
      icon: icons[coord1.runningStatus].icon,
      title:coord1.runningStatus,   
      map: map
    });
  }
  for (var i = 0, coord1; coord1 = $scope.coords1[i]; i++) {
    addMarker(coord1);
  }
$scope.spinner='!running';  
}
$scope.initialize();
}

}]);
});