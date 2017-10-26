$(function(){
var chart = new Highcharts.Chart({
    chart: {
    	 renderTo:'keyMatrix',
        backgroundColor: 'white',
    
        
        
        events: {
            load: function () {

                // Draw the flow chart
                var ren = this.renderer,
                    colors = Highcharts.getOptions().colors,
                    rightArrow = ['M', 0, 0, 'L', 00, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
                    leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

                ren.label('Budget', 20, 40)
                    .css({
                        
                    })
                    .add();
                    
                ren.label('-81.1', 20, 70)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();     
                    
                  ren.label('Raw Avail', 20, 150)
                    .css({
                       
                      
                    })
                    .add();
                    
                ren.label('95.8%', 20, 180)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();     
                        
                  ren.label('Capacity', 20, 270)
                    .css({
                       
                       

                    })
                    .add();
                    
                ren.label('80.5', 20, 310)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();     
                           
                    
                    
                ren.label('Wind ', 140, 40)
                    .css({
                                              })
                    .add();
                    
                 ren.label('5.2 ', 140, 70)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();   
                    
                      
                ren.label('Contr Avail. ', 140, 150)
                    .css({
                       
                    })
                    .add();
                    
                 ren.label('98.4% ', 140, 180)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();       
                    
                    
              ren.label('Wind Farm. ', 140, 270)
                    .css({
                        
                    })
                    .add();
                    
                 ren.label('4', 140, 310)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();             



                ren.label('Lost Prod Factor', 210, 40)
                    .css({
                       
                    })
                    .add();
                 ren.label('2.4%', 250, 70)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();
                    
              ren.label('IEC Avail', 250, 150)
                    .css({
                       
                    })
                    .add();
                 ren.label('97.1%', 250, 180)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();
                    

						ren.label('Turbines', 250, 270)
                    .css({
                       
                    })
                    .add();
                 ren.label('37', 250, 310)
                    .css({
                        fontWeight: 'bold',
                        fontSize: '20px'

                    })
                    .add();
                    



            }
        }
    },
    
    
    exporting: {
  	  enabled: false
  	  },

    credits: {
        enabled: false
  	  },
  	
    title: {
        text: 'Key Metrics',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px',
        	align : 'left'
       
        }
    }

});

				




var chart = new Highcharts.Chart({
    chart: {
    	 renderTo:'wind03',
        type: 'bar'
    },
    title: {
        text: 'Wind Resource',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
    	
    	
    	    gridLineWidth: 0,
  	        tickLength: 1,
  	        tickWidth: 1,
  	        tickPosition: 'outside',
  	        labels: {
  	            align: 'right',
  	            x:-10,
  	            y:5
  	        },
  	        
  	     
  	        lineWidth:1,
  	        
  	    
        categories: [
            '3.8',
            '5.2',
            '4.6',
            '6.6',
            '5.2'
          
        ],visible : false
      
        
    },
    yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	
    	
    
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + 'm/s</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
  
   
    plotOptions: {
        bar: {
            pointPadding: 0.3,
            borderWidth:-8
        }
    },
    series: [  {
       name : 'Wind Resource',
        data: [4, 5, 5, 6, 5],
        showInLegend: false


    }]
});



var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind04',
        type: 'bar'
    },
    title: {
        text: 'Availability',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
        categories: [
            '97,2%',
            '96.9%',
            '97.9%',
            '98.0%',
            '97.25'
          
        ],
        crosshair: true
    },
yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + '%</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
   
    plotOptions: {
        bar: {
            pointPadding: 0.3,
            borderWidth:-8
        }
    },
    series: [  {
    	 name : 'Availability',
        data: [5, 5, 5, 5, 5],
        showInLegend: false

    }]
});



var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind05',
        type: 'bar'
    },
    title: {
        text: 'Lost Prod.Factor',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
        categories: [
            '3.8%',
            '5.2%',
            '4.6%',
            '6.6%',
            '2.8%'
          
        ],
        crosshair: true
    },
yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + '%</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
   
    plotOptions: {
        bar: {
            pointPadding: 0.3,
            borderWidth:-8
        }
    },
    series: [  {
    	name : 'Lost Prod.Factor',
        data: [3, 3, 3, 3, 3],
        showInLegend: false

    }]
});


var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind06',
        type: 'bar'
    },
    title: {
        text: 'Lost Prod ',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
        categories: [
            '57',
            '18',
            '37',
            '59',
            '92'
          
        ],
        crosshair: true
    },
yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + 'MWh</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
   
    plotOptions: {
        bar: {
            pointPadding: 0.3,
            borderWidth:-8
        }
    },
    series: [  {
       name : 'Lost Prod ',
        data: [2.8, 2.8, 2.8, 2.8, 2.8],
        showInLegend: false

    }]
});


var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind07',
        type: 'bar'
    },
    title: {
        text: 'Maintainance',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
       categories: [
            '131/151',
            '87/122',
            '201/175',
            '205/200',
            '201/180'
          
        ],
        
        crosshair: true
    },
yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + '</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
    	    plotOptions: {
                bar: {
                    pointPadding: 0.1,
                    borderWidth:-8
                }
            },
    series: [  {
       name : 'Maintainance',
        data: [3, 3, 0, 0, 3],
        showInLegend: false
        
        }, {
       
        data: [0, 0, 3,3,0 ],
        color: '#D0828C',
        showInLegend: false
        
        

    }]
});


var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind08',
        type: 'bar'
    },
    title: {
        text: 'Forecast Accuracy',
        style: {
            fontFamily: 'Arial',
        	fontSize: '14px'
        }
    },
    exporting: {
    	  enabled: false
    	  },

      credits: {
          enabled: false
    	  },
   
    xAxis: {
        categories: [
            '87,2%',
            '92.5%',
            '95.0%',
            '91.1%',
            '97.2%'
          
        ],
        crosshair: true
    },
yAxis: {
    	
    	title: {
            text: '',
        },
    
    	        gridLineWidth: 0,
    	   //     tickColor: 'black',
    	        tickLength: 5,
    	        tickWidth: 1,
    	        tickPosition: 'outside',
    	        labels: {
    	            align: 'right',
    	            x:-10,
    	            y:5
    	        },
    	        lineWidth:1,
    	      //  lineColor:'black'
    	    },
    	
    	    tooltip: {
            	formatter: function () {
                    return '<b>' + this.series.name + ' : ' + this.y + '%</b>';
                }
               /*  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{black};fontWeight:{Bold};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y:.1f} m/s</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true */
            },
   
    plotOptions: {
        bar: {
            pointPadding: 0.3,
            borderWidth:-8
        }
    },
    series: [  {
       name :'Forecast Accuracy',
        data: [3, 3, 3, 3, 3],
        showInLegend: false

    }]
});



var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind11',
            backgroundColor: 'white',
            events: {
                load: function () {

                    // Draw the flow chart
                    var ren = this.renderer,
                        colors = Highcharts.getOptions().colors,
                        rightArrow = ['M', 0, 0, 'L', 100, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
                        leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];

  


                    // Headers
                    ren.label('Wind Farm', 10, 40)
                        .css({
                        	  fontFamily: 'Arial',
                          	fontSize: '14px',
                          	 color: 'black',
                        	 
                         	
                          
                        })
                        .add();
                    
                  
                    ren.label('Turbines', 100, 40)
                        .css({
                        	  fontFamily: 'Arial',
                          	fontSize: '14px',
                          	 color: 'black',
                        	
                           
                        
                        })
                        .add();
                   

                    // SaaS client label
                    ren.label('AKERSBERGA', 10, 95)
                        .attr({
                            
                           
                            

                            
                        })
                        .css({
                            color: 'black',
                            fontFamily: 'Arial',
                        	
                        })
                        .add()
                        .shadow(true);
                         
                     ren.label('   PERSTORP    ', 10, 135)
                        .attr({
                            
                          
                          
                           
                        })
                        .css({
                            color: 'black',
                            fontFamily: 'Arial',
                        	
                          
                        })
                        .add()
                        .shadow(true);
                        
                     ren.label('BRUNNSAKER', 10, 175)
                        .attr({
                           
                           
                           
                        })
                        .css({
                            color: 'black',
                            fontFamily: 'Arial'
                       
                          
                        })
                        .add()
                        .shadow(true);
                    
                  ren.label('SKOGYSBYN', 10, 215)
                        .attr({
                           
                           
                        })
                        .css({
                            color: 'black',
                            fontFamily: 'Arial',
                        	
                          
                        })
                        .add()
                        .shadow(true);       
                        

               ren.label('Total/Avg.', 10, 253)
                        .css({
                            fontWeight: 'bold',
                            fontFamily: 'Arial'
                        })
                        .add();

                //turbines
                
               ren.label('4 Vestas V90', 100, 95)
                     .css({
                     fontWeight: 'bold',
                     fontFamily: 'Arial'
                        })
               .add();

						 ren.label('13 Energon G-75', 100, 135)
                     .css({
                     fontWeight: 'bold',
                     fontFamily: 'Arial'
                        })
               .add();
               
              ren.label('24 GE 570-T', 100, 175)
                     .css({
                     fontWeight: 'bold',
                     fontFamily: 'Arial'
                        })
                        
               .add(); 
               
               ren.label('8 Gamesa B85', 100, 215)
                     .css({
                     fontWeight: 'bold',
                     fontFamily: 'Arial'
                        })
               .add();  
 					 ren.label('49 Turbines', 100, 253)
                     .css({
                     fontWeight: 'bold',
                     fontFamily: 'Arial'
                        })
               .add();  
               
               
           //budget
           
        ren.label('Budget', 200, 40)
                        .css({
                        	fontFamily: 'Arial',
                            fontSize: '16px',
                            color: 'black',
                        })
                        .add();

  ren.label('-320.1', 200, 95)
                        .css({
                            fontWeight: 'bold',
                             color: '#7A3E48'
                        })
                        .add();

  ren.label('+20.5', 200, 135)
                        .css({
                            fontWeight: 'bold',
                            color: '#90EE90'
                        })
                        .add();

  ren.label('-225.0', 200, 175)
                        .css({
                            fontWeight: 'bold',
                            color: '#7A3E48'
                        })
                        .add();

  ren.label('-119.4', 200, 215)
                        .css({
                            fontWeight: 'bold',
                            color: '#7A3E48'
                        })
                        .add();



   ren.label('-81.1', 200, 253)
                        .css({
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: '#7A3E48'
                            
           

                        })
                        .add();




            

                }
            }
        },
        
        exporting: {
        	  enabled: false
        	  },

          credits: {
              enabled: false
        	  },
        title: {
            text: '',
            
            
            
            style: {
                fontFamily: 'Arial',
            	fontSize: '20px'
            }
        }
         
        

    });




var chart = new Highcharts.Chart({
    chart: {
    	renderTo:'wind12',
            backgroundColor: 'white',
            events: {
                load: function () {

                    // Draw the flow chart
                    var ren = this.renderer,
                        colors = Highcharts.getOptions().colors,
                        rightArrow = ['M', 0, 0, 'L', 100, 0, 'L', 95, 5, 'M', 100, 0, 'L', 95, -5],
                        leftArrow = ['M', 100, 0, 'L', 0, 0, 'L', 5, 5, 'M', 0, 0, 'L', 5, -5];
        
          
           
       					
 						 ren.label('12', 24, 40)
                        .css({
                            fontWeight: 'bold',
                           
                        })
                        .add();

  						ren.label('13', 24,82)
                        .css({
                            fontWeight: 'bold',
                           
                        })
                        .add();

  						ren.label('11', 24, 122)
                        .css({
                            fontWeight: 'bold',
                           
                        })
                        .add();

  						ren.label('8', 28, 162)
                        .css({
                            fontWeight: 'bold',
                            
                        })
                        .add();



   						ren.label('15', 24, 232)
                        .css({
                            fontWeight: 'bold',
                            
                           
                            
           

                        })
                        .add();




            

                }
            }
        },
        
        exporting: {
        	  enabled: false
        	  },

          credits: {
              enabled: false
        	  },
        title: {
            text: 'Temp',
            
            
            
            style: {
                fontFamily: 'Arial',
            	fontSize: '14px'
            }
        }

    });

});






