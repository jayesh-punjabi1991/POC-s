define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.value('version', '0.1');

    return   sampleModule.factory('fetchData1',['$http',function($http){
     var dataFactory={};

     dataFactory.get= function(startDate,endDate,machines){
           return $http.get('https://mchnoprtn-event-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/eventLocations?startDate=22-Aug-2016&endDate=31-Dec-2016&machineName=1&eventList=event4,event8')

        }

    return dataFactory;
   }
]);
});
