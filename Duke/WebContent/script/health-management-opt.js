$(function(){
    var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'data-industrial-1',
            type: 'spline'
        },
        title: {
            text: 'YoY Production with Turbine'
        },
        colors: ['#000000', '#41E446'],
        xAxis: {

                tickInterval: 10,
                min:1980,
                max:2020
        },
        yAxis: {
            title: {
                text: 'Diameter of Rotor'
            },
            tickInterval:50
        },
       plotOptions: {
                spline: {
                    marker: {
                        enabled: false
                    }
                }
            }
        ,
        series: [{
                type:'spline',
                name:'first',
                data: [[1985,11.7],[1987,12],[1995,25],[1999,50],[2002,80],[2008,145]]
        },{
            type:'scatter',
            color: 'rgba(119, 152, 191, 0.498039)',
            name: 'Jane',
            data: [[1983,53],[1983,75],[1982,87],[1983.5,43],[1983.4,61],[1984,95],
            [1989, 73.9], [1991, 66.8], [1983.4, 72.3], [1999.3, 88.6],
                [1994, 75.5], [1980, 91.1], [2010, 67.3], [1995, 117.7],
                [1994.5, 76.6], [1983.4, 125.0],
                [1992, 102.5], [1991.5, 97.3],[1986,122],[1987,130],[198.5,42],[1988,160],[1983.4, 101.8], [1989, 87.9], [2000, 94.3],
                [1989, 70.9], [1996, 104.5], 
                [1991, 100.0], [2000, 82.3], [1991, 93.6], [1982, 74.1], [1997, 95.9],
                [1999.7, 73.2],  [1992, 105.9], [2000.5, 90.9], [1989, 89.1],
                [1997, 62.3], [2000, 82.7], [1999, 109.1], [2011, 98.2], [1993, 84.1],
                [1982, 83.2], [1992, 83.2]],
            
            marker:{
                radius:5,
                symbol:'square'
            }
          }, {  
            type:'scatter',
             name: 'mark',
                data: [[1987,09],[1995,31],[1999,56],[2002,85],[2008,150]],
                marker:{
                    symbol:'url(img/windmill-icon.png)'
                   /* symbol:'triangle'*/
                }
             },
            {
             type:'scatter',
             color: 'rgba(223, 83, 83, 0.498039)',
             name: 'fourth',
             
             data: [ [2005.6, 190], [2004, 167.3], 
                [1994, 145.6], [2003,115],
                [2000, 97.5],[1999, 80.1], [1996.5, 84.1],
                [1992.7, 43.2], [1997, 83.2]],
            marker:{
                radius:6
            }
            }
        ],
    });

 /*data 2 rendered */

    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-2",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });



    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-3",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });



    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-4",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-5",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-6",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-7",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });


    var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-8",
            type: 'pie'
        },
         title: {
                text:'Overall Turbine Status Summary'
            },
        colors: ['#59bd59', '#d8d855', '#ff4000'],
       
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
        series: [{
            name: 'WindPower',
            colorByPoint: true,
            data: [{
                name: 'Working',
                y: 56.33
            }, {
                name: 'Not Working',
                y: 24.03,
                sliced: true,
                selected: true
            }, {
                name: 'Alarm',
                y: 10.38,
                sliced: true
            }]
        }],
    });




var chart = new Highcharts.Chart({
        chart: {
            renderTo: "data-industrial-9",
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







/*
function end */
 });
  





