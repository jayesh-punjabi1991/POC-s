define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.value('version', '0.1');

    return   sampleModule.factory('fetchData3',['$http',function($http){
     var dataFactory={};
     
    dataFactory.shareData= {"fromDate": "", "ToDate": "", "machineNumber": []}
    /*$scope.fromDate=$rootScope.fDate; 
    $scope.ToDate=$rootScope.tDate;
    $scope.machineNumber=$rootScope.machineName; */             

    return dataFactory;
   }
]);
});
