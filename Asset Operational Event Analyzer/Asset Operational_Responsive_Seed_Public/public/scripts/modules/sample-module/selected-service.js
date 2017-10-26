define(['angular', './sample-module'], function(angular, samplemodule) {
    'use strict';

	//service to store the Units selected at the dashboard page
	 return samplemodule.factory('SelectedUnits',['$http','$q',function($http,$q){
	 	

		var MachineNumber=[];
		var startDate=[];
		var endDate=[];
		var string;

  		var addMachineNumber = function(newObj) {
      		//MachineNumber.push(newObj);
			  MachineNumber=newObj;
  			};

  			var addString = function(newObj) {
      		//MachineNumber.push(newObj);
			  string=newObj;
  			};

  		var addstartDate = function(newObj) {
      		//startDate.push(newObj);
			startDate=newObj;
  			};

  		var addendDate = function(newObj) {
      		//endDate.push(newObj);
			 endDate=newObj;
  			};
  			
		  var getMachineNumber = function(){
		      return MachineNumber;
		  };

		var getString = function(){
		      return string;
		  };

		  var getstartDate = function(){
		      return startDate;
		  };


		  var getendDate = function(){
		      return endDate;
		  };

		  return {
		    addMachineNumber: addMachineNumber,
		    addstartDate: addstartDate,
		    addendDate: addendDate,
		    getMachineNumber: getMachineNumber,
		    getstartDate: getstartDate,
		    getendDate: getendDate,
		    addString:addString,
		    getString:getString
		  };

		
         
	}]);
    	 
   
});


