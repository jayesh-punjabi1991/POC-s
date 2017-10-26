define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.value('version', '0.1');

    return   sampleModule.factory('fetchData2',['$http',function($http){
     var dataFactory={};
     
     dataFactory.get= function(startDate,endDate,machinesName){
           return $http.get('https://komatsu-event-service.run.aws-usw02-pr.ice.predix.io/komatsu/eventHistory?startDate=23-Aug-2014&endDate=27-Aug-2014&machineName=1&eventList=event4,event8')
           
        }                

    return dataFactory;
   }
]);
});
