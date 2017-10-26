function spendByMeterialGroup() {
	var DDValue = document.getElementById('spendByMeterialGroupId').value;
	alert(DDValue);
	if (DDValue == "Corporate") {
		document.getElementById('spendByMeterialGroupCorporate').style.display = 'block';
		document.getElementById('spendByMeterialGroupIdAll').style.display = 'none';

	} else {
		alert('hi');
		document.getElementById('spendByMeterialGroupCorporate').style.display = 'none';
		document.getElementById('spendByMeterialGroupIdAll').style.display = 'block';
	}
}
function spendByMonthChange(){
	 
	 
	var styleVal=document.getElementById("spendByMonthIDHide").style.display;
	
	if (styleVal == "inline"||styleVal == "none") {
		document.getElementById('spendByMonthIDNorm').style.display = 'none';
		document.getElementById('spendByMonthIDHide').style.display = 'block';
		
	}else{
		document.getElementById('spendByMonthIDHide').style.display = 'none';
		document.getElementById('spendByMonthIDNorm').style.display = 'block';
	}
	
}
function spendByGeoGrapicChange(){
var styleVal=document.getElementById("spendByGeoIDHide").style.display;
	
	if (styleVal == "inline"||styleVal == "none") {
		document.getElementById('spendByGeoIDNorm').style.display = 'none';
		document.getElementById('spendByGeoIDHide').style.display = 'block';
		
	}else{
		document.getElementById('spendByGeoIDHide').style.display = 'none';
		document.getElementById('spendByGeoIDNorm').style.display = 'block';
		
		
		
	}
}
function spendByLOBChange(){
	
	
	var styleVal=document.getElementById("SpendByLOBIdHide").style.display;
	
	if (styleVal == "inline"||styleVal == "none") {
		document.getElementById('SpendByLOBIdNorm').style.display = 'none';
		document.getElementById('SpendByLOBIdHide').style.display = 'block';
		
	}else{
		document.getElementById('SpendByLOBIdHide').style.display = 'none';
		document.getElementById('SpendByLOBIdNorm').style.display = 'block';
		
		
		
	}
	
	
}
function spendByCategoryChange(){
	
	
	var styleVal=document.getElementById("spendByCategoryIDHide").style.display;
	
	if (styleVal == "inline"||styleVal == "none") {
		document.getElementById('spendByCategoryIDNorm').style.display = 'none';
		document.getElementById('spendByCategoryIDHide').style.display = 'block';
		
	}else{
		document.getElementById('spendByCategoryIDHide').style.display = 'none';
		document.getElementById('spendByCategoryIDNorm').style.display = 'block';
		
		
		
	}
	
	
}
function spendBylobcost(from) {	
	
	if(from='1st'){
		var DDValue = document.getElementById('dd1').value;
		
	if (DDValue == "All") {
		document.getElementById('Gcodiv').style.display = 'none';
		document.getElementById('Chartlob1_sub').style.display = 'none';
		document.getElementById('Alldiv').style.display = 'block';		
		document.getElementById('Chartlob1').style.display = 'block';		

	} else if(DDValue == "GCO") {	
		
		document.getElementById('Alldiv').style.display = 'none';		
		document.getElementById('Chartlob1').style.display = 'none';
		document.getElementById('Gcodiv').style.display = 'block';
		document.getElementById('Chartlob1_sub').style.display = 'block';
	} else  {		
		document.getElementById('Gcodiv').style.display = 'none';
		document.getElementById('Chartlob1_sub').style.display = 'none';
		document.getElementById('Alldiv').style.display = 'block';		
		document.getElementById('Chartlob1').style.display = 'block';
	}
	
	} 
	
	
	if(from='2nd'){
		
		var DDValue1 = document.getElementById('dd2').value;
		
		
		if (DDValue1 == "All") {
			document.getElementById('Gcodiv1').style.display = 'none';
			document.getElementById('Chartlob2_sub').style.display = 'none';
			document.getElementById('Alldiv1').style.display = 'block';		
			document.getElementById('Chartlob2').style.display = 'block';		

		} else if(DDValue1 == "GCO") {	
			
			document.getElementById('Alldiv1').style.display = 'none';		
			document.getElementById('Chartlob2').style.display = 'none';
			document.getElementById('Gcodiv1').style.display = 'block';
			document.getElementById('Chartlob2_sub').style.display = 'block';
		} else  {		
			document.getElementById('Gcodiv1').style.display = 'none';
			document.getElementById('Chartlob2_sub').style.display = 'none';
			document.getElementById('Alldiv1').style.display = 'block';		
			document.getElementById('Chartlob2').style.display = 'block';
		}
		
		
		
	}
	
	if(from='3rd'){
		var DDValue2 = document.getElementById('dd3').value;
		if (DDValue2 == "All") {
			document.getElementById('Gcodiv2').style.display = 'none';
			document.getElementById('Chartlob3_sub').style.display = 'none';
			document.getElementById('Alldiv2').style.display = 'block';		
			document.getElementById('Chartlob3').style.display = 'block';		

		} else if(DDValue2 == "GCO") {	
			
			document.getElementById('Alldiv2').style.display = 'none';		
			document.getElementById('Chartlob3').style.display = 'none';
			document.getElementById('Gcodiv2').style.display = 'block';
			document.getElementById('Chartlob3_sub').style.display = 'block';
		} else  {		
			document.getElementById('Gcodiv2').style.display = 'none';
			document.getElementById('Chartlob3_sub').style.display = 'none';
			document.getElementById('Alldiv2').style.display = 'block';		
			document.getElementById('Chartlob3').style.display = 'block';
		}
		
		
		
	}
	if(from='4th'){
		var DDValue3 = document.getElementById('dd4').value;
		if (DDValue3 == "All") {
			document.getElementById('Gcodiv3').style.display = 'none';
			document.getElementById('Chartlob4_sub').style.display = 'none';
			document.getElementById('Alldiv3').style.display = 'block';		
			document.getElementById('Chartlob4').style.display = 'block';		

		} else if(DDValue3 == "GCO") {	
			
			document.getElementById('Alldiv3').style.display = 'none';		
			document.getElementById('Chartlob4').style.display = 'none';
			document.getElementById('Gcodiv3').style.display = 'block';
			document.getElementById('Chartlob4_sub').style.display = 'block';
		} else  {		
			document.getElementById('Gcodiv3').style.display = 'none';
			document.getElementById('Chartlob4_sub').style.display = 'none';
			document.getElementById('Alldiv3').style.display = 'block';		
			document.getElementById('Chartlob4').style.display = 'block';
		}		
		
	}
}

function executivesummarytabchange(from) {	
	
	if(from='1st'){
		var DDValue = document.getElementById('dd1').value;		
	if (DDValue == "Spend by LOB") {
		document.getElementById('spendbymaterial').style.display = 'none';
		document.getElementById('spendbytop10').style.display = 'none';
		document.getElementById('spendbygeo').style.display = 'none';		
		document.getElementById('spendbylob').style.display = 'block';		

	} else if(DDValue == "Spend by Material Group") {			
		document.getElementById('spendbytop10').style.display = 'none';
		document.getElementById('spendbygeo').style.display = 'none';		
		document.getElementById('spendbylob').style.display = 'none';	
		document.getElementById('spendbymaterial').style.display = 'block';
		
	} else if(DDValue == "Spend by Geography") {		
		document.getElementById('spendbymaterial').style.display = 'none';
		document.getElementById('spendbytop10').style.display = 'none';		
		document.getElementById('spendbylob').style.display = 'none';
		document.getElementById('spendbygeo').style.display = 'block';		
	}	
	
	else if(DDValue == "Spend by Top 10 Supplier") {		
		document.getElementById('spendbymaterial').style.display = 'none';		
		document.getElementById('spendbygeo').style.display = 'none';		
		document.getElementById('spendbylob').style.display = 'none';
		document.getElementById('spendbytop10').style.display = 'block';
	}
	
	} 
	
	
	
}


function popUpOne(){
	
    $( "#basicModal" ).dialog({
        modal: true,
        height: 375,
        width: 475
    });
 
}
function popUpOneNew(){
    $( "#basicModal" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
 
}

function popUpForConfirm(){
    $( "#basicModal1" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
 
}
 
function popUpBrowse(){
    $( "#basicModalBrowse" ).dialog({
        modal: true,
        height: 150,
        width: 300
    });
 
}
function profilePopUp1(){
	$( "#basicModal" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
}

function vendorPagePopUp1(){
	$( "#vendor_group" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
}

function profilePopUp2(){
	$( "#basicModal1" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
}
function profilePopUp3(){
	
	$( "#basicModal3" ).dialog({
        modal: true,
        height: 340,
        width: 400
    });
	
}
function closePopUpOne(){
	
	
	$( "#basicModal" ).dialog( "close" );
	
}
function closePopUpTwo(){
	
	
	$( "#basicModal1" ).dialog( "close" );
	
}
function closePopUpThree(){
	
	
	$( "#basicModal3" ).dialog( "close" );
	
}
function closePopUpUpdNum(){
	
	
	$( "#basicModalUpdNum" ).dialog( "close" );
	
}
function closePopUpBrowse(){
	
	
	$( "#basicModalUpdNum" ).dialog( "close" );
	
}


function closePopUpTwo(){
	
	
	$( "#basicModal1" ).dialog( "close" );
	
}

function initiatedDateCal(){
	var selectedDate=$('#dateDueId').val();
	var date2 = $('#dateDueId').datepicker('getDate');
	var date = new Date(selectedDate);
    var newdate = new Date(date);
    newdate.setDate(newdate.getDate() + 10);
    var dd = newdate.getDate();
    var mm = newdate.getMonth() + 1;
    var y = newdate.getFullYear();
	document.getElementById('dateInitiatedId').value = mm+"/"+dd+"/"+y;
    $( "#dateInitiatedId" ).datepicker();
 
}
function createFunctionPopUpOne(){
	$('#popUpCrtBtn').hide();
	$('#popUpUpdateBtn').show();
	
	
}
function updateFunctionPopUpOne(){
	$('#popUpCrtBtn').show();
	$('#popUpUpdateBtn').hide();
	
	
}

function deleteAlert(){
	
    if (confirm("Are you sure you want to delete the selected item?") == true) {
       
    } else {
        
    }
}


function runAlert(){
	
    if (confirm("Do you want to Run the selected workflow ?") == true) {
    
    } else {
    	
    }
}
function popUpCntPrsUpdate(){
    $( "#basicModal" ).dialog({
        modal: true,
        height: 150,
        width: 300
    });
 
}

function popUpCntNumUpdate(){
    $( "#basicModalUpdNum" ).dialog({
        modal: true,
        height: 450,
        width: 300
    });
 
}
function changeOvrValue(){
	
	
	var DDValue = document.getElementById('Zscore').value;
	
	if(DDValue==1){
		
		document.getElementById('ors1').style.display = 'block';
		document.getElementById('ors2').style.display = 'none';		
		document.getElementById('ors3').style.display = 'none';
		
	}else if(DDValue==2){
		
		document.getElementById('ors2').style.display = 'block';
		document.getElementById('ors1').style.display = 'none';		
		document.getElementById('ors3').style.display = 'none';
		
	}else if(DDValue==3){
		
		document.getElementById('ors3').style.display = 'block';
		document.getElementById('ors2').style.display = 'none';		
		document.getElementById('ors1').style.display = 'none';
		
	}

}
