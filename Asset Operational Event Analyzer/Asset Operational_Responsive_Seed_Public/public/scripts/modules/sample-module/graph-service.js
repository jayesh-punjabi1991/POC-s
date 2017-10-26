define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';

    sampleModule.value('version', '0.1');

    return   sampleModule.factory('goToGraphService',['$http',function($http){
     var goToGraph={};

     goToGraph.get= function(startDate,endDate,machines){
            ///var machine1=machines.join("%2c");

           // var machineString=machine1.toString();
              // debugger

            //get startDat,endDate and machine list form dashboard ctl rootscpoe into graphCtrl and pass them to this service:
            return $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/eventTabulation?startDate=22-Aug-2016&endDate=31-Dec-2016&machineName=1').then(function success(response){
                 console.log(response);

                 goToGraph.tableData=response.data;

             return goToGraph.tableData;

            },function error(response){

              console.log('Error fetching data');
            })
        };

     goToGraph.getGraph=function(){

        return $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/histogramResult?startDate=22-Aug-2016&sensor=ALTI_PMR_1&machineNumber=1&tagLmt=50').then(function success(response){
                 //console.log(response);

                 goToGraph.graphData=response.data;

             return goToGraph.graphData;

            },function error(response){

              console.log('Error fetching data');
            })

     }

       goToGraph.getGraph1=function(){
                return $http.get('https://mchnoprtn-graph-service.run.aws-usw02-pr.ice.predix.io/mchnoprtn/graph/trendAnalysis?startDate=22-Aug-2016&endDate=31-Dec-2016&tagName=ALTI_PMR_1&machineName=1').then(function success(response){
                // console.log(angular.toJson(response.data[0]) +'pkkkkldklsdklsdklsd');

                 goToGraph.graphData1=response.data[0];

             return goToGraph.graphData1;

            },function error(response){

              console.log('Error fetching data');
            })
            }




    return goToGraph;
   }
]);
});
