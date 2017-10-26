$(document).ready(function() {
	
	
	
$('#radioBtnsContainer input:radio').click(function() {

    if ($(this).val() === 'Target') {
      window.open("main.html","_self");
    } else if ($(this).val() === 'LastYear') {
      window.open("main-year.html","_self");
    } else if ($(this).val() === 'PriorSubmit') {
		window.open("main-submit.html","_self");
    } 
  });
	$(document).foundation({
  accordion: {
    // allow multiple accordion panels to be active at the same time
    multi_expand: true,
    // allow accordion panels to be closed by clicking on their headers
    // setting to false only closes accordion panels when another is opened
    toggleable: true
  }
});

	
	$('#regionSelect').change(function() {

		
    	//$('#inteConnectionType').prop('selectedIndex',0);
		

        var value = $('select#regionSelect option:selected').val();
        if (value == 'APAC') {
            $('#apac-select').show();
			$('#Americas-select').hide();
            $('#emea-select').hide();
			$('#row-select').hide();
			
        } else if(value == 'AMERICAS'){
			$('#apac-select').hide();
			$('#Americas-select').show();
            $('#emea-select').hide();
			$('#row-select').hide();
        } else if(value == 'EMEA'){
			$('#apac-select').hide();
			$('#Americas-select').hide();
            $('#emea-select').show();
			$('#row-select').hide();
		}else if(value == 'ROW'){
			$('#apac-select').hide();
			$('#Americas-select').hide();
            $('#emea-select').hide();
			$('#row-select').show();

		}
    });
	
	
	
	
	
	
	
	
//product portfolio gmroi graph	
	$(function () {
   	 $('#ppgmroi').highcharts({

        chart: {
            type: 'bubble',
            zoomType: 'xy'
        },
		xAxis: {
			title: {
				  text: "Turnover"
			}
		},
		yAxis: {
			title: {
				  text: "Margins"
			},labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
		},

        title: {
            text: 'GMROI – Plan vs Actuals'
        },

        series: [{
			name:'Product 1',
            data: [[19,12,16]]
        }, {
			name:'Product 2',			
            data: [[25, 10, 7]]
        }, {
			name:'Product 3',			
            data: [[5, 20, 17]]
        }, {
			name:'Product 4',			
            data: [[7, 17, 11]]
        }, {
			name:'Product 5',			
            data: [[7, 17, 21]]
        }, {
			name:'Product 6',			
            data: [[30, 27, 12]]
        }, {
			name:'Product 7',			
            data: [[3, 27, 21]]
        }, {
			name:'Product 8',			
            data: [[12, 27, 31]]
        }]
    });
});
	
// demand review region pie chart

 $(function () {
    $('#drregion').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Regionwise Forecast Accuracy'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['APAC', 'EMEA', 'Americas', 'ROW']
        }],
        yAxis: [{ // Primary yAxis
		title: {
                        text: '',
                        align: 'high'
                    }
            
        }, { // Secondary yAxis
		labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },title: {
                        text: '',
                        align: 'high'
                    }
           
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Forecast Accuracy',
            type: 'column',
            yAxis: 1,
            data: [98, {y: 60, color: 'red'}, 85, 88],
            tooltip: {
                valueSuffix: ''
            }
        }]
    });
});	
	
// demand review country pie chart
$(function () {
    $('#drcountry').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Countrywise Forecast Accuracy'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['Germany', 'UAE', 'Uganda']
        }],
        yAxis: [{ // Primary yAxis
		
		title: {
                        text: '',
                        align: 'high'
                    }
		
            
        }, { // Secondary yAxis
		labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },title: {
                        text: '',
                        align: 'high'
                    }
           
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Forecast Accuracy',
            type: 'column',
            yAxis: 1,
            data: [70, {y: 32, color: 'red'}, 78],
            tooltip: {
                valueSuffix: ''
            }
        }]
    });
});		

	
	
//demand review forecast value add
$(function () {
    $('#drfcvalueadd').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Forecast Value Add'
        },
        subtitle: {
            text: 'Countrywise Forecast Accuracy'
        },
        xAxis: [{
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }],
        yAxis: [{ // Primary yAxis
            title: {
                text: 'Forecast Error',
                style: {
                    color: Highcharts.getOptions().colors[2]
                }
            },
			labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
            title: {
                text: 'Forecast Units',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value}',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            }

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
				enabled:false,
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '',
				enabled:false,
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
			
            opposite: false
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'top',
            x: 90,
            verticalAlign: 'top',
            y: 10,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Actual',
            type: 'column',
            yAxis: 1,
            data: [600, 650, 720, 540, 600, 700, 350, 450, 700, 680, 500, 510],
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: 'Statistical forecast',
            type: 'spline',
            yAxis: 2,
            data: [35, 40, 32, 48, 46, 32, 45, 40, 40, 32, 31, 21],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: 'Sales forecast',
            type: 'spline',
            yAxis: 2,
            data: [41, 45, 46, 50, 41, 41, 48, 47, 52, 50, 41, 48],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ''
            }

        }, {
            name: 'Consensus forecast',
            type: 'spline',
            yAxis: 2,
            data: [25, 21, 28, 18, 16 ,15 , 20, 22, 20, 18, 24,20 ],
            marker: {
                enabled: false
            },
            dashStyle: 'shortdot',
            tooltip: {
                valueSuffix: ' '
            }

        }, {
            name: 'Marketing Forecast',
            type: 'spline',
            data: [35,42,48,36,31,41,38,37,35,42,51,46],
            tooltip: {
                valueSuffix: ' '
            }
        }]
    });
});	
	
	
	// supply review capacity utilization region pie chart
$(function () {

    $('#srcuregion').highcharts({

        chart: {
            polar: true,
            type: 'line'
        },

        title: {
            text: 'Regionwise Capacity Utilization',
            x: -80
        },

        pane: {
            size: '80%'
        },

        xAxis: {
            categories: ['APAC', 'Americas', 'EMEA', 'ROW'],
            tickmarkPlacement: 'on',
            lineWidth: 0
        },

        yAxis: {
            gridLineInterpolation: 'polygon',
            lineWidth: 0,
            min: 0
        },

        tooltip: {
            shared: true,
            pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}%</b><br/>'
        },

        legend: {
            align: 'right',
            verticalAlign: 'top',
            y: 70,
            layout: 'vertical'
        },

        series: [{
            name: 'Target',
            data: [{y: 85, color: 'red'}, 85, 85, 85],
            pointPlacement: 'on'
        }, {
            name: 'Actual',
            data: [70, 88, 90, 85],
            pointPlacement: 'on'
        }]

    });
});
	
// supply review capacity utilization country pie chart
$(function () {
    $('#srcucountry').highcharts({
        chart: {
            zoomType: 'xy'
        },
        title: {
            text: 'Countrywise Capacity Utilization'
        },
        subtitle: {
            text: ''
        },
        xAxis: [{
            categories: ['Korea', 'China', 'Japan', 'India', 'SriLanka']
        }],
        yAxis: [{ // Primary yAxis
            
        }, { // Secondary yAxis
           
        }],
        tooltip: {
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 40,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: 'Capacity Utilization',
            type: 'column',
            yAxis: 1,
            data: [85, {y: 55, color: 'red'}, 90, 95, 85],
            tooltip: {
                valueSuffix: ''
            }
        }]
    });
});	



//supply review inventory vs plan prodcut family

$(function () {
    $('#csatregiondrivers').highcharts({
        chart: {
            type: 'waterfall'
        },

        title: {
            text: 'CSAT Review Regionwise Drivers'
        },

        xAxis: {
            type: 'category'
        },

        yAxis: {
			labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: ''
            },
        },

        legend: {
            enabled: false
        },

        tooltip: {
            pointFormat: '<b>{point.y:,.2f}%</b>'
        },

        series: [{
            upColor: Highcharts.getOptions().colors[3],
            color: Highcharts.getOptions().colors[3],
            data: [{
                name: 'Current QTD',
                y: 45
            }, {
                name: 'Customer',
                y: 5
            },  {
                name: 'Commercial',
				y: 15,
				color: Highcharts.getOptions().colors[8]
            },{
                name: 'Supply Chain',
                y: 20
            }, {
                name: 'Logistics',
                y: 10
            }, {
                name: 'OTD Target',
                y: 95,
				isIntermediateSum: true,
                color: Highcharts.getOptions().colors[3]
            }],
            dataLabels: {
                enabled: true,
                
                style: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    textShadow: '0px 0px 3px black'
                }
            },
            pointPadding: 0
        }]
    });
});
























//supply review inventory vs plan prodcut family

$(function () {
    $('#sriprodfamily').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Product family - Inventory vs Plan'
        },
        xAxis: {
            categories: ['Canada', 'India']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            },labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
			
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
					format: '{y} %',
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        },
        series: [{
            name: 'Product Family 1',
            data: [10, 30]
        }, {
            name: 'Product Family 2',
            data: [20, 10]
        }, {
            name: 'Product Family 3',
            data: [5, 5]
        }]
    });
});

// supply review Inventory vs plan region pie chart
$(function () {
    $('#sripregion').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
		colors: ['#808080', '#006666', '#336600', '#D00000'],
        title: {
            text: 'Regionwise Capacity Utilization'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Regionwise share',
			point: {
			events: {
				click: function(e) {
					location.href = e.point.url;
					e.preventDefault();
				}
			}
		},
            data: [
                ['APAC',   25.0],
                ['ROW',       26.8],
				['Americas',    8.5],
                {
                    name: 'EMEA',
                    y: 32.8,
                    sliced: true,
                    selected: true,
					url: '../IOSC/sr-cu-country.html'
                }
            ]
        }]
    });
});	






	// Finance review gross margin product family pie chart
	$(function () {
    $('#frgmproduct').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Product Familywise Gross Margin'
        },
        xAxis: {
            categories: [
                'Product Family 1',
                'Product Family 2',
                'Product Family 3'
            ]
        },
        yAxis: [{
            min: 0,
			labels: {
                format: '{value} %',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                text: ''
            }
        }, {
            title: {
                text: ''
            },
            opposite: true
        }],
        legend: {
            shadow: false
        },
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                grouping: false,
                shadow: false,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Target',
            color: 'rgba(165,170,217,1)',
            data: [45, 45, 45],
            pointPadding: 0.3,
            pointPlacement: -0.2
        }, {
            name: 'Actual',
            color: 'rgba(126,86,134,.9)',
            data: [5, 15, 30],
            pointPadding: 0.4,
            pointPlacement: -0.2
        }]
    });
});

	
// Finance review gross margin regionwise pie chart
$(function () {
    $('#frgmRegion').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
		colors: ['#a27ac3', '#336600', '#D00000', '#0e99a0'],
        title: {
            text: 'Gross Margin Regionwise'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Countrywise share',
			point: {
			events: {
				click: function(e) {
					location.href = e.point.url;
					e.preventDefault();
				}
			}
		},
            data: [
                ['EMEA',       26.8],
				['ROW',    8.5],
                {
                    name: 'APAC',
                    y: 6.5,
                    sliced: true,
                    selected: true,
					url: '../IOSC/fr-gm-country.html'
                },
				['Americas',    32.8]
            ]
        }]
    });
});	

// Finance review gross margin country pie chart
$(function () {
    $('#frgmCountry').highcharts({
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
		colors: ['#a27ac3', '#336600', '#D00000', '#0e99a0', '#42bdc2', '#ff8a3c'],
        title: {
            text: 'Gross Margin Countrywise'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                depth: 35,
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Countrywise share',
			point: {
			events: {
				click: function(e) {
					location.href = e.point.url;
					e.preventDefault();
				}
			}
		},
            data: [
                ['Srilanka',       26.8],
				['Korea',    8.5],
                {
                    name: 'India',
                    y: 5.5,
                    sliced: true,
                    selected: true,
					url: '../IOSC/fr-gm-drivers.html'
                },
				['Japan',    8.5],
				['Malaysia',   32.8],
				['China',    8.5]
            ]
        }]
    });
});	
	
// Finance review gross margin drivers	
	$(function () {
    $('#frgmDrivers').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: ['Direct Material', 'Direct Labour', 'Obsolescence Cost', 'Warehousing Cost', 'Freight', 'Others']
        },
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Drivers',
            data: [30, 25, 20, 15, 8, 2]
        }]
    });
});
	
	
	
    $("#login-btn").click(function() {
        $(".login-section").hide();
        $(".user-login").show();
        $(".module-nav-links").show();
    });
    $("#log-out-btn").click(function() {
        $(".login-section").show();
        $(".user-login").hide();
        $(".module-nav-links").hide();
    });
	
	$('.left-nav-main dl dd').on('click', function() {
		if($("#left-nav-bi").hasClass("active")){
			$(".dfdesc").hide();
			$(".ipdesc").hide();
			$(".sopdesc").hide();
			$(".bidesc").show();	
								
		} else if($("#left-nav-df").hasClass("active")){
			$(".bidesc").hide();
			$(".ipdesc").hide();
			$(".sopdesc").hide();
			$("#bimainheading").hide();
			$("#smallGraphs").hide();
			$("#bigGraphs").hide();
			$(".headingDescription").show();			
			$(".dfdesc").show();
		} else if($("#left-nav-ip").hasClass("active")){
			$(".dfdesc").hide();
			$(".bidesc").hide();
			$(".sopdesc").hide();
			$("#bimainheading").hide();
			$("#smallGraphs").hide();
			$("#bigGraphs").hide();
			$(".headingDescription").show();			
			$(".ipdesc").show();			
		} else if($("#left-nav-sop").hasClass("active")){
			$(".ipdesc").hide();
			$(".dfdesc").hide();
			$(".bidesc").hide();
			$("#bimainheading").hide();
			$("#smallGraphs").hide();
			$("#bigGraphs").hide();
			$(".headingDescription").show();			
			$(".sopdesc").show();
		}


	});
	
	$('ul.square li a').on('click', function() {
		$('ul.square li a').removeClass('active');
		$(this).closest('a').addClass('active');
		$(".headingDescription").hide();
		$("#smallGraphs").hide();
		$("#bimainheading").show();
		
		if( $(this).attr('id') == 'biViewAll' ){
			$(".headingDescription").hide();
			$("#smallGraphs").show();
			$("#bimainheading").show();
			$("#bigGraphs").hide();
			$("ul.breadcrumbs li.current").text('All Graphs');
			$("#sub-heading-display").text('All Graphs');
			
		}
	
		if( $(this).attr('id') == 'biInventoryTurns' ){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").show();
			$("#mL1grossMarginbig").hide();
			$("#bigGraphs h5").text("Inventory Turns");
			$("ul.breadcrumbs li.current").text('Inventory Turns');
			$("#sub-heading-display").text('Inventory Turns');			
		}

		if( $(this).attr('id') == 'biSalesActual' ){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").hide();
			$("#mL1grossMarginbig").show();
			$("#bigGraphs h5").text("Sales Actual vs Plan");
			$("ul.breadcrumbs li.current").text('Sales Actual vs Plan');
			$("#sub-heading-display").text('Sales Actual vs Plan');			
		}
		
		if( $(this).attr('id') == 'biServiceLevel' ){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").show();
			$("#mL1grossMarginbig").hide();
			$("#bigGraphs h5").text("Service Level");
			$("ul.breadcrumbs li.current").text('Service Level');			
			$("#sub-heading-display").text('Service Level');						
		}

		if( $(this).attr('id') == 'biGrossMargin' ){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").hide();
			$("#mL1grossMarginbig").show();
			$("#bigGraphs h5").text("Gross Margin");
			$("ul.breadcrumbs li.current").text('Gross Margin');					
			$("#sub-heading-display").text('Gross Margin');										
		}

		if( $(this).attr('id') == 'biroce' ){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").show();
			$("#mL1grossMarginbig").hide();
			$("#bigGraphs h5").text("ROCE");
			$("ul.breadcrumbs li.current").text('ROCE');									
			$("#sub-heading-display").text('ROCE');													
		}

		if( $(this).attr('id') == 'biCashFlow'){
			$("#bigGraphs").show();
			$("#mL1inventoryTurnsbig").hide();
			$("#mL1grossMarginbig").show();
			$("#bigGraphs h5").text("Cash Flow");
			$("ul.breadcrumbs li.current").text('Cash Flow');									
			$("#sub-heading-display").text('Cash Flow');																
		}


    });



	$(".widget-container a").click(function() {		
		if($(this).closest('div').parent().attr('class') == 'small-12 medium-6 large-6 columns left'){
			$(this).closest('div').parent().removeClass('small-12 medium-6 large-6 columns left').addClass('small-12 medium-12 large-12 columns left'); 			
		}else if($(this).closest('div').parent().attr('class') == 'small-12 medium-12 large-12 columns left'){
			$(this).closest('div').parent().removeClass('small-12 medium-12 large-12 columns left').addClass('small-12 medium-6 large-6 columns left'); 
		}
	});
	
	
	
	
//document ready end
});



//Inventory Turns
$('#mL1inventoryTurns').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 2,
            max: 11,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 3,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 2,
                to: 5,
                color: '#DF5353' // green
            }, {
                from: 5,
                to: 8,
                color: '#DDDF0D' // yellow
            }, {
                from: 8,
                to: 11,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '',
            data: [2.31],
            tooltip: {
                valueSuffix: ''
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });
	



//Inventory Turns
$('#mL1inventoryTurnsbig').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 2,
            max: 11,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 3,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 2,
                to: 5,
                color: '#DF5353' // green
            }, {
                from: 5,
                to: 8,
                color: '#DDDF0D' // yellow
            }, {
                from: 8,
                to: 11,
                color: '#55BF3B' // red
            }]
        },

        series: [{
            name: '',
            data: [2.31],
            tooltip: {
                valueSuffix: ''
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });	


//Gross Maring
$('#mL1grossMargin').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0.4,
            max: 3,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0.4,
                to: 1.1,
                color: '#DF5353' // green
            }, {
                from: 1.1,
                to: 2.4,
                color: '#DDDF0D' // yellow
            }, {
                from: 2.4,
                to: 3,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [2.27],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });	
	
//Gross Maring
$('#mL1grossMarginbig').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0.4,
            max: 3,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0.4,
                to: 1.1,
                color: '#DF5353' // green
            }, {
                from: 1.1,
                to: 2.4,
                color: '#DDDF0D' // yellow
            }, {
                from: 2.4,
                to: 3,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [2.27],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });	

	
	
//Sales Actual vs Plan
$('#mL1salesAcutalPlan').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 15000,
            max: 100000,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 15000,
                to: 36250,
                color: '#DF5353' // green
            }, {
                from: 36250,
                to: 78750,
                color: '#DDDF0D' // yellow
            }, {
                from: 78750,
                to: 100000,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [64693],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });	
	
	
//ROCE
$('#mL1roce').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 50,
            max: 190,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 1,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 50,
                to: 85,
                color: '#DF5353' // green
            }, {
                from: 85,
                to: 155,
                color: '#DDDF0D' // yellow
            }, {
                from: 155,
                to: 190,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [111],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });	
	
//Service Level
$('#mL1serviceLevel').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 25,
                color: '#DF5353' // green
            }, {
                from: 25,
                to: 60,
                color: '#DDDF0D' // yellow
            }, {
                from: 60,
                to: 100,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [50],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });		
	
//Cash Flow
$('#mL1cashFlow').highcharts({
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },

        title: {
            text: '',
            style: {
                fontSize: '11px'
            }
        },

        pane: {
            startAngle: -120,
            endAngle: 120,
            background: [{
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '115%'
            }, {
                backgroundColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, '#FFF'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 0,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#FFF',
                borderWidth: 0,
                outerRadius: '100%',
                innerRadius: '100%'
            }]
        },

        // the value axis
        yAxis: {
            min: 0,
            max: 100,

            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',

            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            title: {
                text: ''
            },
            plotBands: [{
                from: 0,
                to: 25,
                color: '#DF5353' // green
            }, {
                from: 25,
                to: 60,
                color: '#DDDF0D' // yellow
            }, {
                from: 60,
                to: 100,
                color: '#55BF3B' // re
            }]
        },

        series: [{
            name: '',
            data: [80],
            tooltip: {
                valueSuffix: 'M'
            }
        }, {
            showInLegend: true,
            name: "Previous",
            color: '#DF5353' // green   
        }, {
            showInLegend: true,
            name: "Current Plan",
            color: '#DDDF0D' // yellow   
        }, {
            showInLegend: true,
            name: "To Achive",
            color: '#55BF3B' // red
        }]

    },
    // Add some life
    function(chart) {

    });		