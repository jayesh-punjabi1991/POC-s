  define(['angular','ngMap', './sample-module'], function (angular,ngMap, controllers) {
    'use strict';
    // Controller definition
  controllers.controller('RealtimeTrackingCtrl', ['$state','$rootScope','$scope','$http', '$log','fetchData','SelectedUnits','$filter','fetchData3',function ($state,$rootScope, $scope, $http, $log, fetchData,SelectedUnits,$filter,fetchData3) {
$scope.coords1=[];
$scope.DataforTable=[];
$scope.lineCoordinatesArray = [];
$scope.count=0;
$scope.Data=[];
$scope.image="../../images/oie-transparent-running.jpg";
$scope.data='loading';
$scope.data1='loading';
$rootScope.sDate=sessionStorage.getItem('StartDate');
if($rootScope.sDate==null){
     $rootScope.sDate='01-Aug-2012';
}
$rootScope.eDate=sessionStorage.getItem('EndDate');
if($rootScope.eDate==null){
  $rootScope.eDate='01-Aug-2015';
}
$scope.mwStart=sessionStorage.getItem('MwStart');
if($scope.mwStart==null){
     $scope.mwStart="undefined";
}
$scope.mwEnd=sessionStorage.getItem('MwEnd');
if($scope.mwEnd==null){
     $scope.mwEnd="undefined";
}
$rootScope.locoID=sessionStorage.getItem('LocoID');
if($rootScope.locoID==null){
    $rootScope.locoID="undefined";
}
$rootScope.techID=sessionStorage.getItem('TechID');
if($rootScope.techID==null){
    $rootScope.techID="undefined";
}


//Onload Map
$scope.initialize=function()
{
    $scope.map = new google.maps.Map(document.getElementById("map1"),
    {
        zoom: 11,
        center: new google.maps.LatLng(50.959525,-113.954044),
        mapTypeId: google.maps.MapTypeId.ROADMAP
   });
}
$scope.initialize();

//Table Data
console.log('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/locoSearch?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&mwStart='+$scope.mwStart+'&mwEnd='+$scope.mwEnd+'&locoID='+$rootScope.locoID+'&technology='+$rootScope.techID);
$http.get('https://cbm-loco-service.run.aws-usw02-pr.ice.predix.io/cbm/locoSearch?startDate='+$rootScope.sDate+'&endDate='+$rootScope.eDate+'&mwStart='+$scope.mwStart+'&mwEnd='+$scope.mwEnd+'&locoID='+$rootScope.locoID+'&technology='+$rootScope.techID).then(function(response){
        $scope.Data=response.data;
        $scope.getRunningloco();

});


$scope.getRunningloco=function(){
 angular.forEach($scope.Data,function(value,key){
          if(value.runningStatus==="Running"){
              $scope.DataforTable.push(value);
              $scope.data='!loading';
          }
        })
      }

 document.getElementById("mytable").addEventListener("px-row-click", function(e) {
             var clickedRow = e.detail.row;
             var statusFlag=event.detail.row["_selected"];
             if(statusFlag== false){
             $scope.latitude=clickedRow.row.latitude;
             $scope.longitude=clickedRow.row.longitude;
             $scope.coords1.push({'latitude':clickedRow.row.latitude,'longitude':clickedRow.row.longitude})
             $scope.PlotMap($scope.coords1);
           }
              });
//Tracking Geolocation
$scope.PlotMap=function(val){
  $scope.lat=$scope.coords1[0].latitude;
  $scope.longi=$scope.coords1[0].longitude;
     $scope.initialize=function()
{
    var map = new google.maps.Map(document.getElementById("map1"),{
      center: {lat:50.959525, lng: -113.954044},
      zoom: 7,
      mapTypeId: google.maps.MapTypeId.ROADMAP 
    });
    
    $scope.getDirections(map); 
}

$scope.moveMarker=function(map, marker, latlng) {
    marker.setPosition(latlng);
    map.panTo(latlng);
}

$scope.autoRefresh=function(map, pathCoords) {
    var i, route, marker;
    
    route = new google.maps.Polyline({
        path: [],
        geodesic : true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
        editable: false,
        map:map
    });
    
    marker=new google.maps.Marker({map:map, icon:"../images/oie-transparent-running.gif"});

    for (i = 0; i < pathCoords.length; i++) {                
        setTimeout(function(coords) {
            route.getPath().push(coords);
            $scope.moveMarker(map, marker, coords);
        }, 2000 * i, pathCoords[i]);
    }
}

$scope.getDirections=function(map) {
    var directionsService = new google.maps.DirectionsService();

    var request = {
        origin: new google.maps.LatLng(51.048243, -114.057795),
        destination: new google.maps.LatLng(45.049149 , -83.443909),
        travelMode: google.maps.TravelMode.DRIVING 
    };
    directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            $scope.autoRefresh(map, result.routes[0].overview_path);
        }
    });
}
$scope.initialize();
}


    }]);
});


