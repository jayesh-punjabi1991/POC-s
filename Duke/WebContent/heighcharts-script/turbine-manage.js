$(function () {
    var chart = new Highcharts.Chart({
            chart: {
                type: 'spline',
                renderTo:'dynamicSpline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,

                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getMinutes(), // current time
                                y = Math.random();
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            colors: ['#006400','#ddd'],
            title: {
                text: 'Turbine Operating Metrics'
            },
            subtitle:{
                text:'Design v/s Actual Energy Production'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text:'Minutes'
                },
            },
            yAxis: {
                title: {
                    text:'Kwh'
                },
                tickInterval:250,
                min:-250,
                
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                       
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Actual Energy Production',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getMinutes(),
                        i;

                        for (i = -10; i <=100; i += 1) {
                            
                        data.push({
                            x: time + i * 1000,
                            y: 800 * Math.random()
                        });
                    }
                    
                    return data;
                }())
            }
            /*{
                name: 'Design Energy Production',
                data: (function () {
                    // generate an array of random data
                    var data1 = [],
                        time1 = (new Date()).getMinutes(),
                        i;

                        for (j = -10; j <=200; j += 1) {
                            
                        data1.push({
                            x: time1 + j * 1050,
                            y: 900 * Math.random()
                        });
                    }
                    
                    return data1;
                }())
            }*/]
        });
    
 var chart = new Highcharts.Chart({
        chart: {
            renderTo: "piechart",
            type: 'pie'
        },
         title: {
                text:'Rotor Speed'
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
            renderTo: "direction",
            type: 'pie'
        },
         title: {
                text:'Direction'
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
             renderTo: "Power Curve",
            type: 'scatter',
            margin: [70, 50, 60, 80],
            events: {
                click: function (e) {
                    // find the clicked values and the series
                    var x = e.xAxis[0].value,
                        y = e.yAxis[0].value,
                        series = this.series[0];

                    // Add it
                    series.addPoint([x, y]);

                }
            }
        },
        title: {
            text: 'Power Curve'
        },
        subtitle: {
            text: 'Click the plot area to add a point. Click a point to remove it.'
        },
        xAxis: {
            gridLineWidth: 1,
            minPadding: 0.2,
            maxPadding: 0.2,
            maxZoom: 60
        },
        yAxis: {
            title: {
                text: 'Value'
            },
            minPadding: 0.2,
            maxPadding: 0.2,
            maxZoom: 60,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 1,
                point: {
                    events: {
                        'click': function () {
                            if (this.series.data.length > 1) {
                                this.remove();
                            }
                        }
                    }
                }
            }
        },
        series: [{
            data: [[20, 20], [80, 80]]
        }]
    });







    });
