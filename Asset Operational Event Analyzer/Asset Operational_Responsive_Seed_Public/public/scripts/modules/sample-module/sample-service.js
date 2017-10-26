define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.value('version', '0.1');

    return   sampleModule.factory('fetchData',['$http',function($http){
     var dataFactory={};

     dataFactory.get= function(velocityone,velocitytwo,affiliation,eventvalue,occur,hour,startDate,endDate,machines){
            var machine1=machines.join("%2c");

            var machineString=machine1.toString();

            //return $http.get('https://komatsu-eventlocation-service.run.aws-usw02-pr.ice.predix.io/komatsu/search?startDate='+startDate+'&endDate='+endDate+'&machineList='+machineString).then(function success(response){
            //return $http.get('https://komatsu-eventlocation-service.run.aws-usw02-pr.ice.predix.io/komatsu/getSearchResults?machineList='+machineString+'&affilations='+affiliation+'&startDate='+startDate+'&endDate='+endDate+'&velocityStart='+velocityone+'&velocityEnd='+velocitytwo+'&event='+eventvalue+'&occurance='+occur+'&hrs='+hour).then(function success(response){
             return $http.get('https://mchnoprtn-eventlocation-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/search?machineList='+machineString+'&affilations='+affiliation+'&startDate='+startDate+'&endDate='+endDate+'&velocityStart='+velocityone+'&velocityEnd='+velocitytwo+'&event='+eventvalue+'&occurance='+occur+'&hrs='+hour).then(function success(response){
             dataFactory.fetchedData=response.data;
             return dataFactory.fetchedData;


            },function error(response){

              console.log('Error fetching data');
            })
        }


    return dataFactory;
   }
]);
});
