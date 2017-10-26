define(['angular', './sample-module'], function(angular, sampleModule) {
    'use strict';
    return sampleModule.controller('analysisCtrl', ['$scope','$http', function($scope,$http) {
            
   //         $scope.draw1chart=function(dataToRender){

   //       	 var chart = new Highcharts.Chart({
   //       	 	chart: {
		 //            renderTo:'chart1',
		 //            type: 'column',
   //                  margin: [60, 10, 40, 40],
			//         zoomType: 'x'
			// 	    },
			// 	    title: {
			// 	      text: 'Symmetrical Distribution',
			// 	      x: 25
			// 	    },
			// 	    subtitle: {
			// 	      text: 'Fisher\'s Iris Data: Sepal Width',
			// 	      x: 25
			// 	    },
			// 	    legend: {
			// 	      enabled: false
			// 	    },
			// 	    credits: {
			// 	      enabled: false
			// 	    },
			// 	    exporting: {
			// 	      enabled: false
			// 	    },
			// 	    tooltip: {},
			// 	    plotOptions: {
			// 	      series: {
			// 	        pointPadding: 0,
			// 	        groupPadding: 0,
			// 	        borderWidth: 0.5,
			// 	        borderColor: 'rgba(255,255,255,0.5)',
			// 	        color: Highcharts.getOptions().colors[1]
			// 	      }
			// 	    },
			// 	    xAxis: {
			// 	      title: {
			// 	        text: 'Sepal Width (cm)'
			// 	      }
			// 	    },
			// 	    yAxis: {
			// 	      title: {
			// 	        text: ''
			// 	      }
			// 	    },credits: {
			// 			enabled: false
			// 			},
			// 		exporting: {
			// 		   enabled: false
			// 		    },
			// 		annotationsOptions: {
			// 		    enabledButtons: false
			// 		    }
			// 	  });

   //       	 chart.addSeries({
			// 		    name: 'Distribution',
			// 		    data: dataToRender
			// 		  });
             
   //          };
          


   //          var dataToBin=[3.5, 3, 3.2, 3.1, 3.6, 3.9, 3.4, 3.4, 2.9, 3.1, 3.7, 3.4,
   //           3, 3, 4, 4.4, 3.9, 3.5, 3.8, 3.8, 3.4, 3.7, 3.6, 3.3, 3.4, 3, 3.4, 3.5, 3.4, 3.2,
   //            3.1, 3.4, 4.1, 4.2, 3.1, 3.2, 3.5, 3.6, 3, 3.4, 3.5, 2.3, 3.2, 3.5, 3.8, 3, 3.8, 
   //            3.2, 3.7, 3.3, 3.2, 3.2, 3.1, 2.3, 2.8, 2.8, 3.3, 2.4, 2.9, 2.7, 2, 3, 2.2, 2.9, 
   //            2.9, 3.1, 3, 2.7, 2.2, 2.5, 3.2, 2.8, 2.5, 2.8, 2.9, 3, 2.8, 3, 2.9, 2.6, 2.4, 
   //            2.4, 2.7, 2.7, 3, 3.4, 3.1, 2.3, 3, 2.5, 2.6, 3, 2.6, 2.3, 2.7, 3, 2.9, 2.9, 2.5,
   //             2.8, 3.3, 2.7, 3, 2.9, 3, 3, 2.5, 2.9, 2.5, 3.6, 3.2, 2.7, 3, 2.5, 2.8, 3.2, 3, 
   //             3.8, 2.6, 2.2, 3.2, 2.8, 2.8, 2.7, 3.3, 3.2, 2.8, 3, 2.8, 3, 2.8, 3.8, 2.8, 2.8,
   //           2.6, 3, 3.4, 3.1, 3, 3.1, 3.1, 3.1, 2.7, 3.2, 3.3, 3, 2.5, 3, 3.4, 3];

   //          $scope.binData=function(data) {

			//   var hData = new Array(), //the output array
			//     size = data.length, //how many data points
			//     bins = Math.round(Math.sqrt(size)); //determine how many bins we need
			//   bins = bins > 50 ? 50 : bins; //adjust if more than 50 cells
			//   var max = Math.max.apply(null, data), //lowest data value
			//     min = Math.min.apply(null, data), //highest data value
			//     range = max - min, //total range of the data
			//     width = range / bins, //size of the bins
			//     bin_bottom, //place holders for the bounds of each bin
			//     bin_top;

			//   //loop through the number of cells
			//   for (var i = 0; i < bins; i++) {

			//     //set the upper and lower limits of the current cell
			//     bin_bottom = min + (i * width);
			//     bin_top = bin_bottom + width;

			//     //check for and set the x value of the bin
			//     if (!hData[i]) {
			//       hData[i] = new Array();
			//       hData[i][0] = bin_bottom + (width / 2);
			//     }

			//     //loop through the data to see if it fits in this bin
			//     for (var j = 0; j < size; j++) {
			//       var x = data[j];

			//       //adjust if it's the first pass
			//       i == 0 && j == 0 ? bin_bottom -= 1 : bin_bottom = bin_bottom;

			//       //if it fits in the bin, add it
			//       if (x > bin_bottom && x <= bin_top) {
			//         !hData[i][1] ? hData[i][1] = 1 : hData[i][1]++;
			//       }
			//     }
			//   }
			//   $.each(hData, function(i, point) {
			//     if (typeof point[1] == 'undefined') {
			//       hData[i][1] = 0;
			//     }
			//   });
			//   return hData;
			// }

			// var dataToRender=$scope.binData(dataToBin);

   //          console.log(dataToRender);

   //          $scope.draw1chart(dataToRender);
            $scope.dataForTable=[
							      {
							         "Units": "A101",
							         "Model": "010A",
							         "Notification": "ABC",
							         "Analysis": "1",
							         "Date":"01/01/1990"
							      },
							      {
							         "Units": "B101",
							         "Model": "020B",
							         "Notification": "XYZ",
							         "Analysis": "2",
							         "Date":"02/01/1990"
							       },
							      {
							        "Units": "C101",
							         "Model": "020C",
							         "Notification": "PQR",
							         "Analysis": "3",
							         "Date":"03/01/1990"
							      },
							      {
							         
							         "Units": "D101",
							         "Model": "020D",
							         "Notification": "LMN",
							         "Analysis": "4",
							         "Date":"04/01/1990"
							      }
								];


            $scope.data1='[{"key":"one", "val": "senser 0"}, {"key":"one", "val": "senser 1"}, {"key":"two", "val": "senser 2"}, {"key":"three", "val": "senser 3"}]';
            $scope.drawchart1=function(){

            	 var chart = new Highcharts.Chart({
	         	 	chart: {
			            renderTo:'chart1',
				        zoomType: 'x'
					    },
	            	title: {
			            text: 'Monthly Average Temperature',
			            x: -20 ,//center,
			            style: {
            				fontSize: '1.2em'
        					}
			        },
			        /*subtitle: {
			            text: 'Source: WorldClimate.com',
			            x: -20
			        },*/
			        xAxis: {
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			        },
			        yAxis: {
			            title: {
			                text: 'Temperature (°C)'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: '°C'
			        },
			        // legend: {
			        //     layout: 'vertical',
			        //     align: 'right',
			        //     verticalAlign: 'middle',
			        //     borderWidth: 0
			        // },
			        credits: {
						enabled: false
						},
					exporting: {
						enabled: false
						},
					annotationsOptions: {
						enabledButtons: false
						},
			        series: [{
			            name: 'New York',
			            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
			        }]
                 });
            }

            $scope.drawchart1();


            $scope.draw2Chart=function(){
              
                   var chart = new Highcharts.Chart({
	         	 	chart: {
			            type: 'line',
			            zoomType: 'x',
			            renderTo:'chart2'
			        },
				    title: {
			            text: 'Historic and Estimated Worldwide Population Growth by Region',
			            //center,
			            style: {
            				fontSize: '1.2em'
        					}
			        },
			       /* subtitle: {
			            text: 'Source: Wikipedia.org'
			        },*/
			        xAxis: {
			            categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
			            tickmarkPlacement: 'on',
			            title: {
			                enabled: false
			            }
			        },
			        yAxis: {
			            title: {
			                text: 'Billions'
			            },
			            labels: {
			                formatter: function () {
			                    return this.value / 1000;
			                }
			            }
			        },
			        tooltip: {
			            shared: true,
			            valueSuffix: ' millions'
			        },
			        plotOptions: {
			            area: {
			                stacking: 'normal',
			                lineColor: '#666666',
			                lineWidth: 1,
			                marker: {
			                    lineWidth: 1,
			                    lineColor: '#666666'
			                }
			            }
			        },
			         credits: {
						enabled: false
						},
					exporting: {
						enabled: false
						},
					annotationsOptions: {
						enabledButtons: false
						},
			        series: [{
			            name: 'Asia',
			            data: [502, 635, 809, 947, 1402, 3634, 5268]
			        }, {
			            name: 'Africa',
			            data: [106, 107, 111, 133, 221, 767, 1766]
			        }, {
			            name: 'Europe',
			            data: [163, 203, 276, 408, 547, 729, 628]
			        }]
                 });
            }
           
            $scope.draw2Chart();

            $scope.draw3Chart=function(){
            
			     var chart = new Highcharts.Chart({
			        chart: {
			            zoomType: 'xy',
			            renderTo:'chart4'
			        },
			        title: {
			            text: 'Average Monthly Weather Data for Tokyo'
			            ,//center,
			            style: {
            				fontSize: '1.2em'
        					}
			        }/*,
			        subtitle: {
			            text: 'Source: WorldClimate.com'
			        }*/,
			        xAxis: [{
			            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
			                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			            crosshair: true
			        }],
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}°C',
			                style: {
			                    color: Highcharts.getOptions().colors[2]
			                }
			            },
			            title: {
			                text: 'Temperature',
			                style: {
			                    color: Highcharts.getOptions().colors[2]
			                }
			            },
			            opposite: true

			        }, { // Secondary yAxis
			            gridLineWidth: 0,
			            title: {
			                text: 'Rainfall',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            },
			            labels: {
			                format: '{value} mm',
			                style: {
			                    color: Highcharts.getOptions().colors[0]
			                }
			            }

			        }, { // Tertiary yAxis
			            gridLineWidth: 0,
			            title: {
			                text: 'Sea-Level Pressure',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            labels: {
			                format: '{value} mb',
			                style: {
			                    color: Highcharts.getOptions().colors[1]
			                }
			            },
			            opposite: true
			        }],
			        tooltip: {
			            shared: true
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'left',
			            x: 80,
			            verticalAlign: 'top',
			            y: 55,
			            floating: true,
			            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
			        },
			        credits: {
						enabled: false
						},
					exporting: {
						enabled: false
						},
					annotationsOptions: {
						enabledButtons: false
						},
			        series: [{
			            name: 'Rainfall',
			            type: 'column',
			            yAxis: 1,
			            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
			            tooltip: {
			                valueSuffix: ' mm'
			            }

			        }]
			    });

            }
 
           $scope.draw3Chart();

           //code for  table:
             $http.get('analysis.json').success(function(data){
                $scope.information=data;

                $scope.checkAll = function () {
                    if (!$scope.selectedAll) {
                        $scope.selectedAll = true;
                    } else {
                        $scope.selectedAll = false;
                    }
                    angular.forEach($scope.information, function (information) {
                        information.selected = $scope.selectedAll;
                    });
                };  

                    $scope.reverse = false;
                      $scope.sortKey = 'title';

                        $scope.sort = function (keyname) {
                            $scope.sortKey = keyname;
                            $scope.reverse = !$scope.reverse;
                        } 
            //Highlight when selected                        
                    $scope.changeColor=function(x){
                      if(document.getElementById('change').checked)
                      x.bgColor='blue';
                      else
                      x.bgColor='white';
                    return true;
                  }
                
             });

           $scope.ChangeChart=function(){
           	console.log($scope.checked);

           }
    }]);
});
