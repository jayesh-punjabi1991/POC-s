$(function(){
    var chart = new Highcharts.Chart({
        chart: {
        	 renderTo: 'homeOne',        
	            zoomType: 'xy'
	        },
	        title: {
	            text: 'YoY Power Production with Turbine',
	            style: {
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                  	fontSize: '13px'
                  	
                  	
                  }
	        },
	       
	        xAxis: {
	        	
	        	 min:1980,
	              max:2015,
	              title: {
	                enabled: true,
	                text: ''
	            },
	            startOnTick: true,
	            endOnTick: true,
	            showLastLabel: true
	        },
	        yAxis: {
	        	min:0,
	              max:120,
	            title: {
	                text: 'Diameter of Rotor'
	            }
	        },
	        legend: {
		          
	            verticalAlign: 'bottom',
	            borderWidth: 0,    
                   
                  	
                
	        },
	        
	        exporting: { enabled: false },

	        credits: {

	            enabled: false

	        },
	        
	         
	        plotOptions: {
	            scatter: {
	                marker: {
	                    radius: 5,
	                    states: {
	                        hover: {
	                            enabled: true,
	                            lineColor: 'rgb(100,100,100)'
	                        }
	                    }
	                },
	                states: {
	                    hover: {
	                        marker: {
	                            enabled: false
	                        }
	                    }
	                },
	                tooltip: {
	                    headerFormat: '<b>{series.name}</b><br>',
	                    pointFormat: '{point.x}, {point.y}'
	                }
	            }
	        
	        
	        
	            
	        },
	       
	        
	        
	        
	        
	        series: [{
	        	
	        	
	        name: 'Turbine (KW)',
	        style: {
	        	fontFamily: 'Arial',
                fontWeight: 'bold',
              	fontSize: '13px'
              },
              
	        linewidth:0,
	            marker: {
	                symbol: 'url(content/images/green_transparency.gif)',
	                lineWidth: 'white',
	                
	                
	            },
	            data: [
	                   
	                   [1985,25],
	                  
	                   [1995,50],
	                  
	                   [2005,75],
	                   [2015,100] ],
	                   showInLegend: false,
	                   
	                   lineWidth : 0,
	                   
	                   
	            
	            
	        },
	        
	            {
	       		 type: 'spline',
	       		 style: {
	       			fontFamily: 'Arial',
                    fontWeight: 'bold',
                  	fontSize: '13px'
	               },
	              
	            name: 'Regression Line',
	            data: [[1984,13],
	                   [1989,17],
	                   [1995,25],
	                   [2000,35],
	                   [2004,45],
	                   [2008,56],
	                   [2012,67],
	                   [2015,77],
	                   ],
	                   showInLegend: false,
	            marker: {
	                enabled: false
	            },
	            states: {
	                hover: {
	                    lineWidth: 0
	                }
	            },
	            enableMouseTracking: false
	            
	            },{
	        type: 'scatter',
	            name: 'Mass Production',
	            showInLegend: false,
	            style: {
	                fontFamily: 'Arial',
	              	fontSize: '11px'
	              },
	            color: 'rgba(223, 83, 83, .5)',
	            data: [[1985,19],[1989,30],
	                   [1993,39],
	                   [1994,42],
	                   [1998,65],
	                   [2002,112],
	                   [2003,119],
	                  
	                   [2008,128]]

	        }, {
	        type: 'scatter',
	        style: {
                fontFamily: 'Arial',
              	fontSize: '11px'
              	
              },
	            name: 'Prototypes',
	            showInLegend: false,
	            color: 'rgba(119, 152, 191, .5)',
	            data: [[1980,87],	[1981,73],	[1982,20],	[1983,61],	[1984,84],	[1985,100],	[1986,42],	
	                   [1987,45],	[1988,60],	[1989,55],	[1990,90],	[1991,50],	[1992,45],	[1993,83],	
	                   [1994,80],	[1995,82],	[1996,85],	[1997,88],	[1998,93]]
	        }]
	    });
	});


   
$(function () {
  		
  		$.post('GreenTurbine.html', 

                $("form").serialize(), function(data) {

        if (data != "") {

        	var dataSetOne=$(data).find('.dataSetOne').val()  ;
        	var dataSetTwo=$(data).find('.dataSetTwo').val()  ;
			 
			var dataSetArrayOne = dataSetOne.split(","); 
			var dataSetArray1=[];
		
		 
			for(var i = 0; i < dataSetArrayOne.length; i++)
			{
				var tempVal1= parseFloat(parseFloat(dataSetArrayOne[i]));
				
				dataSetArray1.push(tempVal1 );
			}

		 
			var dataSetArrayTwo = dataSetTwo.split(","); 
			var dataSetArray2=[];
		
		 
			for(var i = 0; i < dataSetArrayTwo.length; i++)
			{
				var tempVal2=parseFloat(parseFloat(dataSetArrayTwo[i]));
				dataSetArray2.push(tempVal2);
			}
			
			
			
			
			
			var chart = new Highcharts.Chart({
		            chart: {
		            	renderTo: 'homeTwo',  
		                zoomType: 'x'
		                	
		            },
		            title: {
		                text: 'Forecast Vs Actual Wind Power',
		                	 style: {
		                		 fontFamily: 'Arial',
		                         fontWeight: 'bold',
		                       	fontSize: '13px'
		                       	
		                       }
		            },
		            
		            xAxis: {
		            gridLineWidth: 1,
		        gridLineDashStyle: 'dot',
		               gridLineColor: 'grey',
		              min:0,
		              max:600,
		              
		               
		            },
		            yAxis: {
		            gridLineWidth: 1,
		          gridLineDashStyle: 'dot',
		               gridLineColor: 'grey',
		                 min : -1,
		                 max : 300,
		                
		                title: {
		                    text: 'Wind Power(MW)'
		                }
		                
		            },
		           legend: {
		          
		            verticalAlign: 'bottom',
		            borderWidth: 0
		        },
		        
		        exporting: { enabled: false },

		        credits: {

		            enabled: false

		        },
		            plotOptions: {
		            
		                area: {
		                    fillColor: {
		                        linearGradient: {
		                            x1: 0,
		                            y1: 0,
		                            x2: 0,
		                            y2: 1
		                        },
		                        stops: [
		                            [0, Highcharts.getOptions().colors[0]],
		                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
		                        ]
		                    },
		                    marker: {
		                        radius: 2
		                    },
		                    lineWidth: 5,
		                    states: {
		                        hover: {
		                            lineWidth: 1
		                        }
		                    },
		                    threshold: null
		                }
		            },

		            series: [{
		            color: '#FF0000',
		                name: 'Forecast Wind Power',
		                style: {
		                	fontFamily: 'Arial',
		                    fontWeight: 'bold',
		                  	fontSize: '13px'
		                  },

		                  pointInterval: 1.5,
		                  data:dataSetArray1,			
		             lineWidth :2
		                
		            },{
		                 color :'#0000CD',
		                
		                 name : 'Actual Wind Power',
		                 style: {
		                     fontFamily: 'Arial',
		                   	fontSize: '13px'
		                   },

		                 pointInterval : 1.5,
		                 data:dataSetArray2,
		                
		                lineWidth : 1
		                }],
		   
		        });
        }
		    });
		});


var chart = new Highcharts.Chart({
    chart: {
    	 renderTo: 'homeThree',     
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Overall Turbine Status Summary',
        
        style: {
        	fontFamily: 'Arial',
            fontWeight: 'bold',
          	fontSize: '13px'
          	
          }
        
    },
    tooltip: {
        pointFormat: ' <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    
    exporting: { enabled: false },

    credits: {

        enabled: false

    },
    series: [{
        name: '',
        colorByPoint: true,
         data: [{
        name: 'Working',
       
        style: {
        	fontFamily: 'Arial',
            fontWeight: 'bold',
          	fontSize: '13px'
          },
         
     
        y: 81.89,
        sliced: true,
        color: '#00CC66', 
    }, {
        name: 'Not Working',
        style: {
        	fontFamily: 'Arial',
            fontWeight: 'bold',
          	fontSize: '13px'
          },
         
        y: 12.33,
        color: '#C8C8C8',
        style: {
        	fontFamily: 'Arial',
            fontWeight: 'bold',
          	fontSize: '13px'
          }

       
    }, {
        name: 'Alarm (alert)',
        style: {
        	fontFamily: 'Arial',
            fontWeight: 'bold',
          	fontSize: '13px'
          },
         
        y: 3.454,
        color: '#FF3333', 
       

    

    }]
    }]
});


var chart = new Highcharts.Chart({
    chart: {
        renderTo: "data-industrial-3",
         zoomType: 'x',
    },
     title: {
        text: 'Forecast Vs Actual Wind Power'
    },
    
    colors: ['#9768E2', '#41E446', '#FF905C','#43B5E0','#4D70F1'],
    xAxis: {
     gridLineWidth: 1,
        gridLineDashStyle: 'ShortDot',  
        lineColor: 'black',
        tickInterval:200,
        min:0,
        max:600
    },
   yAxis: {
        gridLineWidth: 1,
        gridLineDashStyle: 'ShortDot',
         tickInterval:100,
        min:-100,
        max:300 ,
        title: {
            text: 'Wind Power(MW)'
        }
    },
   
    series: [{
        name: 'Forecast Wind Power',
        data:[[0,99.1],
        [0,99.3],
        [0.1,100],
        [0.5,99.5],
        [1,78],
        [0.9,99.8],
        [1.2,95.7],
        [1.4,99.9],
        [1.7,100],
        [2.2,95.7],
        [2.4,99.9],
        [2.7,100],
        [3.2,95.7],
        [3.4,99.9],
        [3.7,100],
        [4.2,95.7],
        [4.4,99.9],
        [4.7,100],
        [5.1,100.6],
        [12.5,109],
        [12.7,120],
        [13,101],
        [14,120],
        [15,130],
        [15,100],
        [15,189],
        [15.5,199],
        [15.7,299],
        [15.72,298],
        [15.75,298],
        [16.78,298],
        [16.79,298],
        [16.80,298],
        [16.81,298],
        [16.82,298],
        [16.83,298],
        [16.84,298],
        [16.85,298],
        [16.91,199],
        [16.92,169],
        [17.15,135],
        [17.39,101],
        [17.41,120],
        [17.45,134],
        [17.56,77],
        [17.69,108],
        [17.99,49],
        [18.11,65],
        [18.29,79],
        [19.30,69],
        [20.55,199],
        [21,99.1],
        [21.5,99.3],
        [23.1,100],
        [24.5,99.5],
        [24.7,78],
        [24.9,99.8],
        [25.1,95.7],
        [36.1,99.9],
        [36.7,100],
        [37.2,100.6],
        [37.5,109],
        [37.7,120],
        [39,101],
        [40,120],
        [41.9,130],
        [42.1,100],
        [43.1,189],
        [44.2,199],
        [44.5,299],
        [45.6,199],
        [46.7,169],
        [46.8,135],
        [46.9,101],
        [46.99,120],
        [47.1,134],
        [48.6,77],
        [48.7,108],
        [49.1,49],
        [49.5,165],
        [50.1,79],
        [51.1,69],
        [52.1,199],
        [53,101],
        [54,120],
        [55,130],
        [55,100],
        [55,189],
        [55.5,199],
        [55.7,299],
        [55.9,199],
        [56.3,169],
        [56.7,135],
        [56.9,101],
        [57.1,120],
        [57.5,134],
        [57.6,77],
        [57.9,108],
        [57.99,49],
        [58.1,65],
        [58.9,79],
        [59.0,69],
        [60.5,199],
        [61,99.1],
        [61.5,99.3],
        [63.1,100],
        [64.5,99.5],
        [64.7,78],
        [64.9,99.8],
        [65.1,95.7],
        [66.1,99.9],
        [66.7,100],
        [67.2,100.6],
        [67.5,109],
        [67.7,120],
        [69,101],
        [70,120],
        [71.9,130],
        [72.1,100],
        [73.1,189],
        [74.2,199],
        [74.5,299],
        [75.6,199],
        [76.7,169],
        [76.8,135],
        [76.9,101],
        [76.99,120],
        [77.1,134],
        [78.6,77],
        [78.7,108],
        [79.1,49],
        [79.5,165],
        [80.1,79],
        [81.1,69],
        [82.1,199],[100,200],[105,120],[108.7,134],
        [108.7,77],
        [108.7,108],
        [108.7,49],
        [108.7,165],
        [108.7,79],
        [108.7,69],[108,128],[108.6,97],
        [108.7,108],
        [109.1,49],
        [109.5,165],
        [110.1,79],
        [111.1,169],[112,165],[113.6,165],[123,100],[200,256],[250,79],[256,90],[350,250],[389,167],[421,307],[450,120],[467,222],[589,100]]
    },{
        name: 'Actual Wind Power',
        data:[[0,99.1],
        [0,99],
        [0.1,100],
        [0.5,99.5],
        [1,78],
        [0.9,99.8],
        [1.2,95.7],
        [1.4,99.9],
        [1.7,100],
        [2.2,95.7],
        [2.4,99.9],
        [2.7,100],
        [3.2,95.7],
        [3.4,95.7],
        [3.7,95.7],
        [4.2,100],
        [4.4,99.9],
        [4.7,100],
        [5.1,100.6],
        [12.5,109],
        [12.7,120],
        [13,100],
        [14,100],
        [15,130],
        [24.5,99.5],
        [24.7,78],
        [24.9,100],
        [25.1,100],
        [36.1,99.9],
        [36.7,100],
        [37.2,100.6],
        [37.5,109],
        [37.7,100],
        [39,101],
        [40,120],
        [41.9,130],
        [42.1,100],
        [43.1,189],
        [44.2,199],
        [44.5,299],
        [45.6,199],
        [46.7,169],
        [46.8,135],
        [46.9,101],
        [46.99,120],
        [47.1,134],
        [48.6,77],
        [48.7,108],
        [49.1,49],
        [49.5,165],
        [50.1,79],
        [51.1,69],
        [52.1,199],
        [53,101],
        [54,120],
        [55,130],
        [55,100],
        [55,189],
        [55.5,199],
        [55.7,299],
        [55.9,199],
        [56.3,169],
        [56.7,135],
        [56.9,101],
        [57.1,120],
        [57.5,134],
        [57.6,77],
        [57.9,108],
        [57.99,49],
        [58.1,65],
        [58.9,79],
        [59.0,69],
        [60.5,199],
        [61,99.1],
        [61.5,199],
        [63.1,100],
        [64.5,199],
        [64.7,197],
        [64.9,99.8],
        [65.1,95.7],
        [66.1,99.9],
        [66.7,100],
        [67.2,100.6],
        [67.5,109],
        [67.7,120],
        [69,101],
        [70,120],
        [71.9,130],
        [72.1,100],
        [73.1,189],
        [74.2,199],
        [74.5,299],
        [75.6,199],
        [76.7,169],
        [76.8,135],
        [76.9,101],
        [76.99,120],
        [77.1,134],
        [78.6,77],
        [78.7,108],
        [79.1,49],
        [79.5,165],
        [80.1,79],
        [81.1,69],
        [82.1,199],[100,200],[105,120],[108.7,134],
        [108.7,77],
        [108.7,108],
        [108.7,49],
        [108.7,165],
        [108.7,79],
        [108.7,69],[108,128],[108.6,97],
        [108.7,108],
        [109.1,49],
        [109.5,165],
        [110.1,79],
        [111.1,269],[112,199],[113.6,79],[123,165],[200,77],[256,120],[350,250],[389,167],[421,250],[450,120],[467,250],[589,250]]
    }]
});



		
		