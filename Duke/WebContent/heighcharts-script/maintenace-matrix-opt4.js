$(function () {
      var chart = new Highcharts.Chart({
        chart: {
            renderTo:'pieChart1',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Parts Failure Distribution (Onshore)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> of total'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Series1',
            colorByPoint: true,
            data: [{
                name: 'BrakeSystem',
                y:3
            }, {
                name: 'Cables',
                y: 24.03,
                
                selected: true
            }, {
                name: 'Generator',
                y: 10.38
            }, {
                name: 'Main Frame',
                y: 4.77
            }, {
                name: 'Main Shaft',
                y: 0.91
            }, {
                name: 'Nocelle Housing',
                y: 0.2
            },
            {
                name: 'Pitch System',
                y: 0.2
            },{
                name: 'Power Convertor',
                y: 20.38
            },{
                name: 'Rotor Bearings',
                y: 5.38
            },{
                name: 'Rotor Blades',
                y: 6.38
            },{
                name: 'Rotor Hub',
                y: 5.38
            },{
                name: 'Screws',
                y: 4.38
            },{
                name: 'Tower',
                y: 0.38
            },{
                name: 'Transformer',
               y: 13.38
            },{
                name: 'Yaw System',
                y: 2.38
            },{
                name: 'Other',
                y: 1.38
            },
            ]
        }]
    });


 var chart2 = new Highcharts.Chart({
        chart: {
            renderTo:'pieChart2',
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Parts Failure Distribution (Offshore)'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b> of total'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} ',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            name: 'Series1',
            colorByPoint: true,
            data: [{
                name: 'BrakeSystem',
                y:3.5
            }, {
                name: 'Cables',
                y: 14.03,
                selected: true
            }, {
                name: 'Generator',
                y: 6.38
            }, {
                name: 'Main Frame',
                y: 3.77
            }, {
                name: 'Main Shaft',
                y: 0.91
            }, {
                name: 'Nocelle Housing',
                y: 0.2
            },
            {
                name: 'Pitch System',
                y: 0.7
            },{
                name: 'Power Convertor',
                y: 13.38
            },{
                name: 'Rotor Bearings',
                y: 6.38
            },{
                name: 'Rotor Blades',
                y: 10.38
            },{
                name: 'Rotor Hub',
                y: 5.38
            },{
                name: 'Screws',
                y: 3.38
            },{
                name: 'Tower',
                y: 4
            },{
                name: 'Transformer',
                y: 5.38
            },{
                name: 'Yaw System',
                y: 3.38
            },{
                name: 'Other',
                y: 5.38
            },
            ]
        }]
    });



});
