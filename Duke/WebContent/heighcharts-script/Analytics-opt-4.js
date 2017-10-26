$(function () {
    var chart = new Highcharts.Chart({
        chart: {
            renderTo:'criticalparts',
            type: 'column'
        },
        title: {
            text: 'Crtical Parts Failure Forecast'
        },
        subtitle: {
            text: 'Downtime Cost Impact($)/Failure'
        },
        colors:['#7CB5EC','#e74a06'],
        xAxis: {
            categories: [
                'Electrical',
                'Down Tower',
                'Down Tower',
                'Main Shaft',
                'Down Tower',
                'Pitch System',
                'Top Box',
                'Hub/Blades',
                'Pitch System',
                'Down Tower',
                'Yaw System',
                'Down Tower'
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            max:800,
            tickInterval:200,
            
        labels: {
                format: '{value}k',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Downtime Cost Impact',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

        } ,{
            type: 'line',
            name: 'Failure',
            data: [[0, 100], [10, 550.51]]
            
            }]
    });
});
