var isHide = "Yes";

var isOrderHide = "Yes";
var isModalityHide = "Yes";
var isHistoryHide = "Yes";

var isActualMarketOrderHide = "Yes";
var isActualGEOrdersHide = "Yes";
var isActualGEShareHide = "Yes";
var isEstimateMarketOrderHide = "Yes";
var isEstimateGEOrdersHide = "Yes";
var isEstimateGEShareHide = "Yes";


function selectTemplateType()
{
	var templateType = document.getElementById("templateType").value;
	if(templateType=='Data file Template')
	{
		document.getElementById('serviceRegionID').style.display = 'none';
		document.getElementById('subRegionID').style.display = 'none';
		document.getElementById('groupID').style.display = 'none';
		document.getElementById('fxID').style.display = 'none';
		document.getElementById('dataFileTemplateID').style.display = 'block';
		document.getElementById('tableTemplateID').style.display = 'none';
		document.getElementById('dataDownloadTypeID').style.display = 'block';
		document.getElementById('tableDownloadTypeID').style.display = 'none';
		document.getElementById('dataDownloadId').style.display = 'block';
		document.getElementById('tableDownloadId').style.display = 'none';
		
		document.getElementById('geographyID').style.display = 'none';
		document.getElementById('businessModalityID').style.display = 'none';
		
	}
	else
	{
		document.getElementById('serviceRegionID').style.display = 'block';
		document.getElementById('subRegionID').style.display = 'block';
		document.getElementById('groupID').style.display = 'block';
		document.getElementById('fxID').style.display = 'block';
		document.getElementById('dataFileTemplateID').style.display = 'none';
		document.getElementById('tableTemplateID').style.display = 'block';
		document.getElementById('tableDownloadTypeID').style.display = 'block';
		document.getElementById('dataDownloadTypeID').style.display = 'none';
		document.getElementById('dataDownloadId').style.display = 'none';
		document.getElementById('tableDownloadId').style.display = 'block';
		
		document.getElementById('geographyID').style.display = 'block';
		document.getElementById('businessModalityID').style.display = 'block';
		
		$('#blankSpaceID').animate({height: '-=40'}, 500);
	}
}


function getOriginalValue(obj,originalValue)
{
	if(originalValue!='-')
		obj.value = originalValue;
}

function hideUnhideOrder(){
	if(isOrderHide=='No'){
		isOrderHide="Yes";
		$("#orderDIVID").show();
		$("#orderIDImg").attr('src', 'content/images/minus.png');
    }else{
    	isOrderHide="No";
    	$("#orderDIVID").hide();
    	$("#orderIDImg").attr('src', 'content/images/plus.png');

    }
}

function hideUnhideModality(){
	if(isModalityHide=='No'){
		isModalityHide="Yes";
		$("#modalityDIVID").show();
		$("#modalityIDImg").attr('src', 'content/images/minus.png');
    }else{
    	isModalityHide="No";
    	$("#modalityDIVID").hide();
    	$("#modalityIDImg").attr('src', 'content/images/plus.png');

    }
}

function hideUnhideHistory(){
	if(isHistoryHide=='No'){
		isHistoryHide="Yes";
		$("#historyDIVID").show();
		$("#historyIDImg").attr('src', 'content/images/minus.png');
    }else{
    	isHistoryHide="No";
    	$("#historyDIVID").hide();
    	$("#historyIDImg").attr('src', 'content/images/plus.png');

    }
}

function validateNumber(str) {
    return /^.*[0-9]+ *$/.test(str);
}

function getMPRFXFile()
{
	document.forms[0].action="excelDownloadMprFXData.jpage";
	document.forms[0].submit();
}

function onRowChange(type,obj,currentRow,originalValue,replacedValue){	
	if(originalValue==obj.value)
	{
	}
	else
	{
		if(!validateNumber(obj.value)){
			alert("Please enter only numeric values.");
			obj.value=originalValue;
		}
		else
		{
		document.forms[0].anyChanges.value="true";
		if(document.forms[0].rowChanged[currentRow-1].value==null || document.forms[0].rowChanged[currentRow-1].value=="" || document.forms[0].rowChanged[currentRow-1].value=="{}"){
			document.forms[0].rowChanged[currentRow-1].value=type;
		}
		else{
			document.forms[0].rowChanged[currentRow-1].value="Both";
		}
		var row= obj.parentNode;
		if(currentRow==1)
			 row= obj.parentNode.parentNode;
		$(row).css({"background-color": "#CCFFCC"});
		}
	}
	
}


function getSubRegionData(region)
{
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	$("div#mprMainDivID").mask("");
	$.post("viewBySubRegion.jpage?region="+region+"&subRegionList="+subRegionList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function drillBackToRegion()
{
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	$("div#mprMainDivID").mask("");
	document.forms[0].region.value = "";
	$.post("viewByRegion.jpage?subRegionList="+subRegionList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}



function onRowChangeCalculate(type,obj,currentRow,originalValue){
	if(originalValue==obj.value){
	}
	else
	{
		if(!validateNumber(obj.value)){
			alert("Please enter only numeric values.");
			obj.value=originalValue;
		}
		else
		{
		document.forms[0].anyChanges.value="true";
		if(document.forms[0].rowChanged[currentRow-1].value==null || document.forms[0].rowChanged[currentRow-1].value=="" || document.forms[0].rowChanged[currentRow-1].value=="{}"){
			document.forms[0].rowChanged[currentRow-1].value=type;
		}
		else{
			document.forms[0].rowChanged[currentRow-1].value="Both";
		}
		var row= obj.parentNode;
		if(currentRow==1)
			 row= obj.parentNode.parentNode;
		$(row).css({"background-color": "#CCFFCC"});
		
		
		var marketPostConf = document.getElementById("column12_"+currentRow).value;
		var addSubAdjValue = document.getElementById("column13_"+currentRow).value;
		
if(marketPostConf=='-')
	marketPostConf = 0;

if(addSubAdjValue=='-')
	addSubAdjValue = 0;
	
		var marketFinal = Number(marketPostConf)+Number(addSubAdjValue);
		var geShareValue = "0";
		
		if(marketFinal!=0 && marketFinal!='-' && document.getElementById("column9_"+currentRow).value!='-')
		{
		geShareValue = Number(document.getElementById("column9_"+currentRow).value)/(marketFinal);
		geShareValue = geShareValue*100;
		}
		
		
		document.getElementById("column14_"+currentRow).value = marketFinal;
		document.getElementById("column15_"+currentRow).value = geShareValue;
		
		$(document.getElementById("marketFinal_"+currentRow)).css({"background-color": "#CCFFCC"});
		$(document.getElementById("geShare_"+currentRow)).css({"background-color": "#CCFFCC"});
		
		}
	}
	
}

function onRowChangeForComments(type,obj,currentRow,originalValue){
	if(originalValue==obj.value)
	{
	}
	else
	{
		document.forms[0].anyChanges.value="true";
		if(document.forms[0].rowChanged[currentRow-1].value==null || document.forms[0].rowChanged[currentRow-1].value=="" || document.forms[0].rowChanged[currentRow-1].value=="{}"){
			document.forms[0].rowChanged[currentRow-1].value=type;
		}
		else{
			document.forms[0].rowChanged[currentRow-1].value="Both";
		}
		var row= obj.parentNode;
		if(currentRow==1)
			 row= obj.parentNode.parentNode;
		$(row).css({"background-color": "#CCFFCC"});
		
	}
	
}




function onRowChangeSavePreAdjust(type,obj,currentRow,originalValue,modality,country){
	var url = "savePreAdjustmentValue.jpage?modality="+modality+"&country="+country+"&preAdjustValue="+obj.value;
	if(originalValue==obj.value){
	}
	else
	{
		if(!validateNumber(obj.value)){
			alert("Please enter only numeric values.");
			obj.value="CONF";
		}
		else
		{
		document.forms[0].anyChanges.value="true";
		if(document.forms[0].rowChanged[currentRow-1].value==null || document.forms[0].rowChanged[currentRow-1].value=="" || document.forms[0].rowChanged[currentRow-1].value=="{}"){
			document.forms[0].rowChanged[currentRow-1].value=type;
		}
		else{
			document.forms[0].rowChanged[currentRow-1].value="Both";
		}
		var row= obj.parentNode;
		if(currentRow==1)
			 row= obj.parentNode.parentNode;
		$(row).css({"background-color": "#CCFFCC"});
		
		$.post(url,
				$("form").serialize(),function(data){
			if (data != "") {
				
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
		});	
		}
	}
	
}




function submitMPRData(){

	if(document.forms[0].anyChanges.value!="")
	{
		$("div#mprMainDivID").mask("");
		$.post("submitMPRData.jpage",
				$("form").serialize(),function(data){
			if (data != "") {
				
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
		});
	}else{
		alert('No Changes');
	}	
}

function saveHistoricData(){
	if(document.forms[0].anyChanges.value!="")
	{
		$("div#mprMainDivID").mask("");
		$.post("submitHistoricData.jpage",
				$("form").serialize(),function(data){
			if (data != "") {
				
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
		});
	}else{
		alert('No Changes');
	}	
}


function sceduleReport(){
	alert("Feature development is in progress..");
}

//changes done by murali
function activateMenu(){
	var reportPage = "";
	if(document.getElementById("reportPage")!=null)reportPage= document.getElementById("reportPage").value;
	
	
	if(reportPage=="prepareGEData" || reportPage=="mprData")
	{
		$( "#accordion" ).accordion({active: 0});
	}
	else if(reportPage=="prepareMarketData" || reportPage=="viewModifyHistoryPage"){
		
		$( "#accordion" ).accordion({active:1});
	}
	else if(reportPage=="regionView" || reportPage=="modalityView"){
		$( "#accordion" ).accordion({active:4});
	}
	else if(reportPage=="commentary"){
		$( "#accordion" ).accordion({active:3});
	}
	else if(reportPage=="comparision"){
		$( "#accordion" ).accordion({active:2});
	}
	else if(reportPage=="competitive"){
		$( "#accordion" ).accordion({active:5});
	}
	else if(reportPage=="manageFX" || reportPage=="myTasks" || reportPage=="group" || reportPage=="region" || reportPage=="usermgmt" ){
		$( "#accordion" ).accordion({active:6});
	}
	
	
	var menuId="menuTD_"+reportPage;
	//if(document.getElementById(menuId)!=null)document.getElementById(menuId).className="menuActive";
}


function uploadGEData(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function importForecastData()
{
		document.getElementById('fileUploadDivId').style.display= document.getElementById('fileUploadDivId').style.display =='none' ? 'inline' : 'none';
}
function uploadTemplateData(prepareDataID,fileId)
{
	document.forms[0].action="uploadGEExcelData.jpage?prepareDataID="+prepareDataID;
	var fileName = document.getElementById(fileId).value;
	var ext ="";
	if(fileName!=null && fileName!="")
		ext = fileName.substring(fileName.lastIndexOf('.') + 1);
	var objRE = new RegExp(/([^\/\\]+)$/);     
	var strName = objRE.exec(fileName); 
	if(fileName=="" || fileName == null){
		alert("Please browse the file.");
		return;
	}
	else if(ext!="xls"){
		alert("Please select the correct file.");
		return;
	}
	else{
	        $("form").ajaxForm(function(data) {
	        $('div#mprMainDivID').empty();
	        $("div#mprMainDivID").append(data);
	}).submit();
	}
	
}

function ManageFX(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function enableMPRFxUpload()
{
		document.getElementById('fileUploadDivId').style.display= document.getElementById('fileUploadDivId').style.display =='none' ? 'inline' : 'none';
}
function uploadMPRFXTemplateData()
{
	if(document.getElementById('file').value=="" || document.getElementById('file') == null){
		alert("Please browse the file.");
		return;
	}else{
		
	        $("form").ajaxForm(function(data) {
	        $('div#mprMainDivID').empty();
	        $("div#mprMainDivID").append(data);
	}).submit();
	}
	
}

function viewUploadedFXExcelData()
{
	//alert('hiii')
	$("div#mprMainDivID").mask("");
	$.post("viewFXUpldadedExcelData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function changeborderNew(id)
{
document.getElementById(id).className='forecastText1';
}
function changeborderOld(id)
{
document.getElementById(id).className='forecastText';
}

function confirmMPRFXData()
{
	
	var repID="repID";
	var geTab="geTab";
	var funCur="funCur";
	var usdOp="usdOp";
	var amtFunCur="amtFunCur";
	var excRat="excRat";
	var amtEuro="amtEuro";
	
	var repIDArray = new Array();
	var geTabArray =new Array();
	var funCurArray =new Array();
	var usdOpArray = new Array();
	var amtFunCurArray = new Array();
	var excRatArray = new Array();
	var amtEuroArray = new Array();
	
	var repIDValue=null;
	var geTabValue=null;
	var funCurValue=null;
	var usdOpValue=null;
	var amtFunCurValue=null;
	var excRatValue=null;
	var amtValue=null;
	
	
	var rowCount = document.getElementById("cphMain_cphMain_cphMain_GridView1").getElementsByTagName("TR").length;
	for(var i=0;i<rowCount-1;i++)
	{
		
		repID=repID+i;
		repIDValue=document.getElementById(repID).value;
		repIDArray.push(repIDValue);
		repID="repID";
	}
	document.getElementById('recordID').value=repIDArray.toString();
	
	
	for(var i=0;i<rowCount-1;i++)
	{
		geTab=geTab+i;
		geTabValue=document.getElementById(geTab).value;
		geTabArray.push(geTabValue);
		geTab="geTab";
	}
	document.getElementById('geTable').value=geTabArray.toString();
	
	for(var i=0;i<rowCount-1;i++)
	{
		funCur=funCur+i;
		funCurValue=document.getElementById(funCur).value;
		funCurArray.push(funCurValue);
		funCur="funCur";
	}
	document.getElementById('funCurrency').value=funCurArray.toString();
	
	
	for(var i=0;i<rowCount-1;i++)
	{
		usdOp=usdOp+i;
		usdOpValue=document.getElementById(usdOp).value;
		usdOpArray.push(usdOpValue);
		usdOp="usdOp";
	}
	document.getElementById('opRate').value=usdOpArray.toString();
	
	for(var i=0;i<rowCount-1;i++)
	{
		amtFunCur=amtFunCur+i;
		amtFunCurValue=document.getElementById(amtFunCur).value;
		amtFunCurArray.push(amtFunCurValue);
		amtFunCur="amtFunCur";
	}
	document.getElementById('amtFunCurrency').value=amtFunCurArray.toString();
	
	for(var i=0;i<rowCount-1;i++)
	{
		excRat=excRat+i;
		excRatValue=document.getElementById(excRat).value;
		excRatArray.push(excRatValue);
		excRat="excRat";
	}
	document.getElementById('exchangeRate').value=excRatArray.toString();
	
	for(var i=0;i<rowCount-1;i++)
	{
		amtEuro=amtEuro+i;
		amtValue=document.getElementById(amtEuro).value;
		amtEuroArray.push(amtValue);
		amtEuro="amtEuro";
	}
	document.getElementById('amtEuro').value=amtEuroArray.toString();
	
	/*alert(document.getElementById('amtEuro').value);
	alert(document.getElementById('exchangeRate').value);
	alert(document.getElementById('amtFunCurrency').value);
	alert(document.getElementById('opRate').value);
	alert(document.getElementById('funCurrency').value);
	alert(document.getElementById('geTable').value);
	alert(document.getElementById('recordID').value);*/
	
	$("div#mprMainDivID").mask("");
	$.post("confirmMPRFXData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}




function confirmMPRFXExportExcelData(year,quarter)
{
	
		document.forms[0].action="excelDownloadMprFXData.jpage?quarter="+quarter+"&year="+year;
		document.forms[0].submit();


}



function SettingsGroup(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function submitSettingsGroup()
{
		
	$("div#mprMainDivID").mask("");
	$.post("submitSettingsGroup.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function editSettingsGroup(groupID)
{
	document.getElementById('sGroupId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("editSettingsGroup.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function deleteSettingsGroup(groupID)
{
	
	document.getElementById('sGroupId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("deleteSettingsGroup.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});


}
function showhideStatic(divid,pagereq,pageset){
	
	var divTB = divid+"TB";
	
var obj=document.getElementById(divTB);
var curleft=850;
var curtop =162;
var div = divid+"CBDiv";

	thediv = document.getElementById(div);
	thediv.style.top=curtop+21+'px';
	thediv.style.left=curleft+'px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}else{
	thediv.style.display='none';
	}
	
	selectAllSubRegion();
}
function showhideStaticc(divid,pagereq,pageset){
	
	var divTB = divid+"TB";
	
var obj=document.getElementById(divTB);
var curleft=300;
var curtop =150;
var div = divid+"CBDiv";

	thediv = document.getElementById(div);
	thediv.style.top=curtop+21+'px';
	thediv.style.left=curleft+'px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}else{
	thediv.style.display='none';
	}
	
	selectAllSubRegion();
}


function showhide(divid,pagereq,pageset){
	var divTB = divid+"TB";
var obj=document.getElementById(divTB);
var curtop=0;
var curleft=0;
if (obj.offsetParent) {
	curleft = obj.offsetLeft;
	curtop = obj.offsetTop;
	while (obj = obj.offsetParent) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	}
}

var div = divid+"CBDiv";
//alert(div);
	thediv = document.getElementById(div);
	thediv.style.top=curtop+21+'px';
	thediv.style.left=curleft+'px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}else{
		//alert(div);
	thediv.style.display='none';
	}
}


function showhideModality(divid,pagereq,pageset){
	var divTB = divid+"TB";
var obj=document.getElementById(divTB);
var curtop=0;
var curleft=0;
if (obj.offsetParent) {
	curleft = obj.offsetLeft;
	curtop = obj.offsetTop;
	while (obj = obj.offsetParent) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	}
}

var div = divid+"CBDiv";

	thediv = document.getElementById(div);
	thediv.style.top=curtop+21+'px';
	thediv.style.left='360px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}else{
	thediv.style.display='none';
	}
}


function showhidePreGEForMod(divid,pagereq,pageset){
	var divTB = divid+"TB";
var obj=document.getElementById(divTB);
var curtop=0;
var curleft=0;
if (obj.offsetParent) {
	curleft = obj.offsetLeft;
	curtop = obj.offsetTop;
	while (obj = obj.offsetParent) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	}
}

var div = divid+"CBDiv";

	thediv = document.getElementById(div);
	thediv.style.top=curtop+21+'px';
	thediv.style.left=curleft+'px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}else{
	thediv.style.display='none';
	}
}

function closeListDiv(divid)
{


	var div = divid+"CBDiv";
	//alert(div);
	document.getElementById(div).style.display='none';
	var listNames="";
	var listCount=0;
	var myCheckBox = new Array();

	var chekcid=document.getElementsByName(divid);
	//alert(divid);
	
	for(var i=0;i<chekcid.length;i++)
	{
		if(chekcid[i].checked) 
		{ 
			listNames += chekcid[i].value + "~";
			listCount++;
		} 
	} 
	
	//alert("listCount  "+listCount);
	var idx = listNames.indexOf('~All Groups of Modality~');
    if (idx != -1)
    {
    	listNames = listNames.replace(/~All Groups of Modality~/g, ""); 
    	listCount--;
    }
    
    var idx1 = listNames.indexOf('~All Modalities~');
    if (idx1 != -1)
    {
    	listNames = listNames.replace(/~All Modalities~/g, "");
    	listCount--;
    }
	
    var idx2 = listNames.indexOf('~All Countries~');
    if (idx2 != -1)
    {
    	listNames = listNames.replace(/~All Countries~/g, ""); 
    	listCount--;
    }
    
    var idx3 = listNames.indexOf('~All Regions~');
    if (idx3 != -1)
    {
    	listNames = listNames.replace(/~All Regions~/g, "");
    	listCount--;
    }
    
	
	var selectdNumber=(listCount)+" "+divid+" selected";
	
	
	//alert(listNames);
	
	
	var divTB = divid+"TB";
	document.getElementById(divTB).value=selectdNumber;
	var arr = listNames.split("~");
	//alert(arr.length);
	
	var count=2;
	var colcount=0;
	var txt = '<TABLE width="90%" class="tblSelectedMenu">';
	for (var i=0; i<arr.length; i++){
		if(colcount==0)
		{
			txt += '<tr><td width="5%">';
		}
	
	txt += '<td class="tdVMenuValue" width="50%">'+arr[i]+'</td>';
	colcount++;
	if(colcount >= count)
	{
		colcount=0;
		txt += '</tr>';
	}
	
	}
	txt += '</table>';


	
	if(divid=='region')
	{
		//validateRegionSelect(year,listNames);
	}
	
	if(divid=='modality')
	{
		//validateBusinessSelect(listNames);
	}
	
}



function updateSettingsGroupData()
{
	//alert('Hiii')
	//document.getElementById('sGroupId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("updateSettingsGroupData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function SettingsRegion()
{
	
	$.post("settingsRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}


function submitSettingsRegion()
{
	
	$("div#mprMainDivID").mask("");
	$.post("submitSettingsRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}






function editSettingsRegion(groupID)
{
	document.getElementById('sCountryId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("editSettingsRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function deleteSettingsRegion(groupID)
{
	
	document.getElementById('sCountryId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("deleteSettingsRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});

}
function updateSettingsRegionData()
{
	//alert('Hiii')
	//document.getElementById('sGroupId').value=groupID;
	$("div#mprMainDivID").mask("");
	$.post("updateSettingsRegionData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}



function saveUserInfo()
{
	$("div#mprMainDivID").mask("");
	$.post("saveUserInfo.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}


function editUsersInfo(flag,ssoID)
{
	$("div#mprMainDivID").mask("");
	$.post("editUserInfo.jpage?userSso="+ssoID,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function deleteUserInfo(flag,ssoID)
{
	
	$("div#mprMainDivID").mask("");
	$.post("deleteUserInfo.jpage?userSso="+ssoID,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});

}
function updateUserInfo()
{

	
	var groupList="";
	var group=document.getElementsByName('hModality1');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	$("div#mprMainDivID").mask("");
	$.post("updateUserInfo.jpage?groupList="+groupList,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}


function hideCol($table, myIndex) {
	$table.find("tr").each(
	function() {
	$(this).find("th:eq(" + myIndex + "), td:eq(" + myIndex + ")")
	.not('.footer').hide();
	});
	}

function showCol($table, myIndex) {
	$table.find("tr").each(
	function() {
	$(this).find("th:eq(" + myIndex + "), td:eq(" + myIndex + "), tr:eq(" + myIndex + ")")
	.not('.footer').show();
	});
	}

function loadSubRegion(id){
	var regionId = id.value;
	//alert(regionId);
	$.post("loadRegionCheckBoxes.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#subRegionCBDivDIV').empty();
		    $("div#subRegionCBDivDIV").append(data);
		}
	});
}
function loadSubRegionView(id){
	var regionId = id.value;
	//alert(regionId);
	$.post("loadRegionCheckBoxesForView.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#subRegionCBDivDIV').empty();
		    $("div#subRegionCBDivDIV").append(data);
		}
	});
}
function loadSubModalityView(id){
	var regionId = id.value;
	//alert(regionId);
	$.post("loadSubModalityViewForView.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#subModalityCBDivDIV').empty();
		    $("div#subModalityCBDivDIV").append(data);
		}
	});
}
function loadSubRegionOnClick(id){
	id = document.getElementById(id);
	var regionId = id.value;
	$.post("loadRegionCheckBoxes.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#subRegionCBDivDIV').empty();
		    $("div#subRegionCBDivDIV").append(data);
		}
	});
}

function loadSubRegionNewUser(region){
	
	var regionId = region.value;
	alert(regionId);
	$.post("loadHomeSubRegion.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#hSubRegionCBDivDIV').empty();
		    $("div#hSubRegionCBDivDIV").append(data);
			/*$('div#newDivRegionID').empty();
			$("div#newDivRegionID").append(data);*/
		}
	});
}


function getCountriesDataHome(subRegion)
{
	sRegion=document.getElementById("hRegion").value;

	var subRegionList="";
	var subRegion=document.getElementsByName('hSubRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	} 

	$.post("loadCountryHomeData.jpage?region="+sRegion+"&subRegion="+subRegionList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#newHDivCountryID').empty();
			$("div#newHDivCountryID").append(data);
		}
	});
}

function getStatesDataHome(subRegion)
{
	 var hRegion=document.getElementById("hRegion").value;

	var subRegionList="";
	var subRegion=document.getElementsByName('hSubRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	} 
	var countryList="";
	var country=document.getElementsByName('hCountry');
	for(var i=0;i<country.length;i++)
	{
		if(country[i].checked) 
		{ 
			countryList += country[i].value + "~";
		} 
	}

	$.post("loadStateHomeData.jpage?region="+hRegion+"&subRegion="+subRegionList+"&country="+countryList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#newHDivStateID').empty();
			$("div#newHDivStateID").append(data);
		}
	});
}

function getSubRegionDependents(subRegion){
	var sRegion= "";
	if(document.getElementById("serviceRegion")!=null)
		sRegion = document.getElementById("serviceRegion").value;
	else if(document.getElementById("serviceRegionOne")!=null)
		sRegion = document.getElementById("serviceRegionOne").value;
	else if(document.getElementById("serviceRegionTwo")!=null)
		sRegion = document.getElementById("serviceRegionTwo").value;
	
	
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	} 
	$.post("loadCountryCheckBoxes.jpage?region="+sRegion+"&subRegion="+subRegionList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#newDivCountryID').empty();
			$("div#newDivCountryID").append(data);
		}
	});
	
	
}




function loadStates(){

	var sRegion= "";
	if(document.getElementById("serviceRegion")!=null)
		sRegion = document.getElementById("serviceRegion").value;
	else if(document.getElementById("serviceRegionOne")!=null)
		sRegion = document.getElementById("serviceRegionOne").value;
	else if(document.getElementById("serviceRegionTwo")!=null)
		sRegion = document.getElementById("serviceRegionTwo").value;

	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	} 
	var countryList="";
	var countries=document.getElementsByName('country');
	for(var i=0;i<countries.length;i++)
	{
		if(countries[i].checked) 
		{ 
			countryList += countries[i].value + "~";
		} 
	} 
	$.post("loadStatesCheckBoxes.jpage?region="+sRegion+"&subRegion="+subRegionList+"&country="+countryList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#newDivStateID').empty();
			$("div#newDivStateID").append(data);
		}
	});
}



function loadGroupDependentsCheck(){
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	//alert(groupList);
	$.post("loadModalityCheckBoxes.jpage?groupList="+groupList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#modalityDivID').empty();
			$("div#modalityDivID").append(data);
		}
	});
	
	//loadModalityDependentsCheck('');
}

function loadModalityOneDependent(){
	
	var groupList="";
	var group=document.getElementsByName('hModality1');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	//alert(groupList);
	$.post("loadModalityTwoHomeData.jpage?groupList="+groupList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#modality2DivID').empty();
			$("div#modality2DivID").append(data);
		}
	});
	
}
function loadModalityDependentsCheck(id){
	var modalityList="";
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	$.post("loadModality2CheckBoxes.jpage?group="+groupList+"&modality="+modalityList,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#modality2DivID').empty();
			$("div#modality2DivID").append(data);
		}
	});
	//loadModality2DependentsCheck('');
}


function loadModality2DependentsCheck(id){
	var modalityList="";
	var groupList="";
	var modality2List="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	var modality2=document.getElementsByName('modality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
	
	$.post("loadSubModalityCheckBoxes.jpage?group="+groupList+"&modality="+modalityList+"&modality2="+modality2List,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#subModalityDivID').empty();
			$("div#subModalityDivID").append(data);
		}
	});
	
	//loadSubModalityDependentsCheck('');
}



function loadSubModalityDependentsCheck(id){
	var modalityList="";
	var modality2List="";
	var groupList="";
	var subModalityList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	var modality2=document.getElementsByName('modality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
	
	
	var subModality=document.getElementsByName('subModality');
	for(var i=0;i<subModality.length;i++)
	{
		if(subModality[i].checked) 
		{ 
			subModalityList += subModality[i].value + "~";
		} 
	}
	$.post("loadSegmentCheckBoxes.jpage?group="+groupList+"&modality="+modalityList+"&subModality="+subModalityList+"&modality2="+modality2List,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#segmentDivID').empty();
			$("div#segmentDivID").append(data);
		}
	});
	//loadSegmentsDependent('');
}
function loadSegmentsDependent(id){
	var modalityList="";
	var modality2List="";
	var groupList="";
	var subModalityList="";
	var segmentList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	
	var modality2=document.getElementsByName('modality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
	
	
	
	var subModality=document.getElementsByName('subModality');
	for(var i=0;i<subModality.length;i++)
	{
		if(subModality[i].checked) 
		{ 
			subModalityList += subModality[i].value + "~";
		} 
	}
	var segment=document.getElementsByName('segment');
	for(var i=0;i<segment.length;i++)
	{
		if(segment[i].checked) 
		{ 
			segmentList += segment[i].value + "~";
		} 
	}
	//below is commented because of requirement (dont want to see product)
/*	$.post("loadProductCheckBoxes.jpage?group="+groupList+"&modality="+modalityList+"&subModality="+subModalityList+"&segment="+segmentList+"&modality2="+modality2List,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#productDivID').empty();
			$("div#productDivID").append(data);
		}
	});*/
}
function downloadXLSTemplate(){
	
	var regionList="";
	var region=document.getElementById("serviceRegion").value;
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var countryList="";
	var country=document.getElementsByName('country');
	for(var i=0;i<country.length;i++)
	{
		if(country[i].checked) 
		{ 
			countryList += country[i].value + "~";
		} 
	}
	var statesList="";
	var states=document.getElementsByName('state');
	for(var i=0;i<states.length;i++)
	{
		if(states[i].checked) 
		{ 
			statesList += states[i].value + "~";
		} 
	}
	
	var modalityList="";
	var groupList="";
	var subModalityList="";
	var segmentList="";
	var productList="";
	
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	var subModality=document.getElementsByName('subModality');
	for(var i=0;i<subModality.length;i++)
	{
		if(subModality[i].checked) 
		{ 
			subModalityList += subModality[i].value + "~";
		} 
	}
	var segment=document.getElementsByName('segment');
	for(var i=0;i<segment.length;i++)
	{
		if(segment[i].checked) 
		{ 
			segmentList += segment[i].value + "~";
		} 
	}
	var product=document.getElementsByName('product');
	for(var i=0;i<segment.length;i++)
	{
		if(product[i].checked) 
		{ 
			productList += product[i].value + "~";
		} 
	}

	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	
	var regionValue = region;
	
	var subRegionValue = subRegionList;	
	var countryValue = countryList;
	var statesValue = statesList;
	
	var groupValue = groupList ;
	var modalityValue = modalityList;
	var subModalityValue = subModalityList;
	var segmentValue = segmentList;
	var productValue = productList;
	
	
if(year ==""){
	alert("Please select the year");
		return false;
	}else if(quarter==""){
		alert("Please select the Quarter");
		return false;
	}else if(regionValue==""){
		alert("Please select the region");
		return false;
	}else if(groupValue==""){
		alert("Please select modality 1");
		return false;
	}
	else{
	document.forms[0].action="excelDownloadMprGEData.jpage?year="+year+"&quarter="+quarter+"&regionValue="+regionValue+"&subRegionValue="+subRegionValue+"&countryValue="+countryValue+"&statesValue="+statesValue+"&groupValue="+groupValue+"&modalityValue="+modalityValue+"&subModalityValue="+subModalityValue+"&segmentValue="+segmentValue+"&productValue="+productValue;
	document.forms[0].submit();
 }
}


function homePage(){
	document.forms[0].action="home.jpage";
	document.forms[0].submit();
}

function prepareGEDataAjax(url){
	
	if(document.getElementById("prepareDataName")!=null) document.getElementById("prepareDataName").value = "";
	if(document.getElementById("qtr")!=null) document.getElementById("qtr").value = "";
	if(document.getElementById("year")!=null) document.getElementById("year").value = "";
	if(document.getElementById("serviceRegion")!=null) document.getElementById("serviceRegion").value = "";
	if(document.getElementById("forexExchange")!=null) document.getElementById("forexExchange").value = "";
	if(document.getElementById("version")!=null) document.getElementById("version").value= "";
	
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}



function prepareMarketDataAjax(url){
	
	if(document.getElementById("prepareDataName")!=null) document.getElementById("prepareDataName").value = "";
	if(document.getElementById("qtr")!=null) document.getElementById("qtr").value = "";
	if(document.getElementById("year")!=null) document.getElementById("year").value = "";
	if(document.getElementById("serviceRegion")!=null) document.getElementById("serviceRegion").value = "";
	if(document.getElementById("forexExchange")!=null) document.getElementById("forexExchange").value = "";
	if(document.getElementById("version")!=null) document.getElementById("version").value= "";
	
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

//changes done by murali
function prepareGEData(){
	
	document.forms[0].action="prepareGEDataHome.jpage";
	document.forms[0].submit();
	
	if(document.getElementById("prepareDataName")!=null) document.getElementById("prepareDataName").value = "";
	if(document.getElementById("qtr")!=null) document.getElementById("qtr").value = "";
	if(document.getElementById("year")!=null) document.getElementById("year").value = "";
	if(document.getElementById("serviceRegion")!=null) document.getElementById("serviceRegion").value = "";
	if(document.getElementById("forexExchange")!=null) document.getElementById("forexExchange").value = "";
	if(document.getElementById("version")!=null) document.getElementById("version").value= "";
	
	
}


function clearGEData(){
	
	if(document.getElementById("prepareDataName")!=null) document.getElementById("prepareDataName").value = "";
	if(document.getElementById("qtr")!=null) document.getElementById("qtr").value = "";
	if(document.getElementById("year")!=null) document.getElementById("year").value = "";
	if(document.getElementById("serviceRegion")!=null) document.getElementById("serviceRegion").value = "";
	if(document.getElementById("forexExchange")!=null) document.getElementById("forexExchange").value = "";
	if(document.getElementById("subRegion")!=null) document.getElementById("subRegion").value= "";
	if(document.getElementById("group")!=null) document.getElementById("group").value= "";
	if(document.getElementById("modality")!=null) document.getElementById("modality").value= "";
	if(document.getElementById("subModality")!=null) document.getElementById("subModality").value= "";
	
	var prepareDataName = document.getElementById("prepareDataName").value;
	
	var regionList="";
	var sRegion= "";
	if(document.getElementById("serviceRegion")!=null)
		sRegion = document.getElementById("serviceRegion").value;
	else if(document.getElementById("serviceRegionOne")!=null)
		sRegion = document.getElementById("serviceRegionOne").value;
	else if(document.getElementById("serviceRegionTwo")!=null)
		sRegion = document.getElementById("serviceRegionTwo").value;
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	var regionValue = sRegion;
	var groupValue = groupList ;
	
	$("div#mprMainDivID").mask("");
	$.post("goToAdjustments.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function viewProblemStatementOnMouseHover(id,columnType){ 
	var variableTipContent = ajaxFetchProblemStatementForRead(id,columnType);
	$('a.clickTip1').aToolTip({
		clickIt: false,
		tipContent: variableTipContent
	});		
}

function showSupportNeeded(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function submitSupportNeededForm()
{
	 $("form").ajaxForm(function(data) {
	        $('div#mprMainDivID').empty();
	        $("div#mprMainDivID").append(data);
	}).submit();
}


function viewMPRData(){
	
	$("div#mprMainDivID").mask("");
	$.post("mprPage.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}



function createMPRData(url)
{
	var subRegionList = "";
	var subRegion = document.getElementsByName('subRegion');
	
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modalityList="";
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	if(subRegionList ==""){
		alert("Please select any Sub Region");
			return false;
	}else if(groupList==""){
			alert("Please select the Group");
			return false;
	}else if(modalityList==""){
			alert("Please select the Modality");
			return false;
	}
	else{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
	}
}


function openReportFromLanding(url){	
	//alert("hil");
	$("div#mprMainDivID").mask("");
	$.post("loadMyTasks.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}


function deleteMyTask(flag){
	
//	alert(flag);
	document.getElementById("deleteFlag").value=flag;
   // alert(document.getElementById("deleteFlag").value);
	$.post("deleteMyTasks.jpage",
			$("form").serialize(),function(data){
		if (data != "") {

			$('div#myTaskDivId').empty();
			$("div#myTaskDivId").append(data);
		}
	});
}
function submitTask(){
	
	
	$.post("submitMyTasks.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#myTaskDivId').empty();
			$("div#myTaskDivId").append(data);
			clearMyTask();
		}
	});
}

function clearMyTask(){
	document.getElementById("myTask").value="";
	document.getElementById("taskDescription").value="";
	document.getElementById("taskReminderDate").value="";
	document.getElementById("taskAssignedTo").value="";
	document.getElementById("taskScheduleDate").value="";
}

function popupPaginationNavigation()
{
	//alert('hioi'+document.getElementById('pageNo').value)
	//alert(document.getElementById('pNo'));
//document.getElementById('pNo').value=document.getElementById('pageNo').value;
//alert(document.getElementById('pNo').value);
	$.post("popupPaginationNavigation.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#PaginationDivId').empty();
			$("div#PaginationDivId").append(data);
		}
	});
}

function addNewApplicationUserAccess()
{
	var region=document.getElementById("hRegion").value;

	var subRegionList="";
	var subRegion=document.getElementsByName('hSubRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var countryList="";
	var country=document.getElementsByName('hCountry');
	for(var i=0;i<country.length;i++)
	{
		if(country[i].checked) 
		{ 
			countryList += country[i].value + "~";
		} 
	}
	var statesList="";
	var states=document.getElementsByName('hState');
	for(var i=0;i<states.length;i++)
	{
		if(states[i].checked) 
		{ 
			statesList += states[i].value + "~";
		} 
	}
	
	
	
	var modality2List="";
	var modality1List="";

	
	var modality1=document.getElementsByName('hModality1');
	for(var i=0;i<modality1.length;i++)
	{
		if(modality1[i].checked) 
		{ 
			modality1List += modality1[i].value + "~";
		} 
	}
	
	var modality2=document.getElementsByName('hModality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
	
	
/*	alert("region "+region);
	alert("subRegionList "+subRegionList);
	alert("countryList "+countryList);
	alert("statesList "+statesList);
	alert("modality1List "+modality1List);
	
	alert("modality2List "+modality2List);*/
	
	document.forms[0].action="useraccessrequest.jpage?region="+region+"&subRegionList="+subRegionList+"&countryList="+countryList+"&statesList="+statesList+"&modality1List="+modality1List+"&modality2List="+modality2List;
	document.forms[0].submit(); 
}

function userManagement(url){
	//userManagementSetting.jpage


	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function deleteUser(status,sso,role){
	var status=status;
	alert(document.getElementById(role).value);
	document.getElementById("sRole").value=document.getElementById(role).value;
	
	$("div#mprMainDivID").mask("");
	$.post("deleteOrApprove.jpage?status="+status+"&sso="+sso,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function viewByModality(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function getSubModalityData(modalityValue)
{
	
	$("div#mprMainDivID").mask("");
	$.post("viewBySubModality.jpage?modality="+modalityValue,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function viewByCountry(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function viewByQtrToQtr(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}


function getSubRegionDataSummary(region)
{

	$("div#mprMainDivID").mask("");
	$.post("viewBySummaryBySubRegion.jpage?reg="+region,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function viewBySummary(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function viewByv1v2Aanalysis(url)
{
	
	//alert("Under development.");
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function viewByRegion(url)
{
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	$("div#mprMainDivID").mask("");
	$.post("viewByRegion.jpage?subRegionList="+subRegionList,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function submitPrepareData(url)
{
	var regionList="";
	var region=document.getElementById("serviceRegion").value;
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var countryList="";
	var country=document.getElementsByName('country');
	for(var i=0;i<country.length;i++)
	{
		if(country[i].checked) 
		{ 
			countryList += country[i].value + "~";
		} 
	}
	var statesList="";
	var states=document.getElementsByName('state');
	for(var i=0;i<states.length;i++)
	{
		if(states[i].checked) 
		{ 
			statesList += states[i].value + "~";
		} 
	}
	
	var modalityList="";
	var groupList="";
	var subModalityList="";
	var segmentList="";
	var productList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	var subModality=document.getElementsByName('subModality');
	for(var i=0;i<subModality.length;i++)
	{
		if(subModality[i].checked) 
		{ 
			subModalityList += subModality[i].value + "~";
		} 
	}
	var segment=document.getElementsByName('segment');
	for(var i=0;i<segment.length;i++)
	{
		if(segment[i].checked) 
		{ 
			segmentList += segment[i].value + "~";
		} 
	}
	var product=document.getElementsByName('product');
	for(var i=0;i<segment.length;i++)
	{
		if(product[i].checked) 
		{ 
			productList += product[i].value + "~";
		} 
	}
	
	var prepareDataName = document.getElementById("prepareDataName").value;
	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	var regionValue = region;
	var subRegionValue = subRegionList;	
	var countryValue = countryList;
	var statesValue = statesList;
	var groupValue = groupList ;
	var modalityValue = modalityList;
	var subModalityValue = subModalityList;
	var segmentValue = segmentList;
	var productValue = productList;
	
   if(year ==""){
	alert("Please select the year");
		return false;
	}else if(quarter==""){
		alert("Please select the Quarter");
		return false;
	}else if(regionValue==""){
		alert("Please select the region");
		return false;
	}else if(groupValue==""){
		alert("Please select modality 1");
		return false;
	}
	else if(prepareDataName==""){
		alert("Please enter save name.");
		return false;
	}
	else{
	
		document.getElementById("prepareDataName").value = "";
		document.getElementById("qtr").value = "";
		document.getElementById("year").value = "";
		document.getElementById("serviceRegion").value = "";
		document.getElementById("forexExchange").value = "";
		document.getElementById("version").value= "";
		
	
		$("div#mprMainDivID").mask("");
		$.post(url+"?prepareDataName="+prepareDataName+"&year="+year+"&quarter="+quarter+"&regionValue="+regionValue+"&subRegionValue="+subRegionValue+"&countryValue="+countryValue+"&statesValue="+statesValue+"&groupValue="+groupValue+"&modalityValue="+modalityValue+"&subModalityValue="+subModalityValue+"&segmentValue="+segmentValue+"&productValue="+productValue,
				$("form").serialize(),function(data){
			if (data != "") {
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
	});	
	
	}
}


function modifyPrepareData(prepareID)
{
	var url = "modifyGEPrepareData.jpage?prepareDataID="+prepareID;
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}


function deletePrepareData(prepareID)
{
	var url = "deleteGEPrepareData.jpage?prepareDataID="+prepareID;
	var confirmSave = confirm("You're about to delete the saved template. Do you Want to continue?");
	if(confirmSave) 
	{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	}
	else{
	return false;	
	}
	
}

function updatePrepareData()
{
	document.getElementById("prepareDataID").value = document.getElementById("prepareDataID").value;
	var url = "updateGEPrepareData.jpage";
	var regionList="";
	var region=document.getElementById("serviceRegion").value;
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var countryList="";
	var country=document.getElementsByName('country');
	for(var i=0;i<country.length;i++)
	{
		if(country[i].checked) 
		{ 
			countryList += country[i].value + "~";
		} 
	}
	var statesList="";
	var states=document.getElementsByName('state');
	for(var i=0;i<states.length;i++)
	{
		if(states[i].checked) 
		{ 
			statesList += states[i].value + "~";
		} 
	}
	
	var modalityList="";
	var groupList="";
	var subModalityList="";
	var segmentList="";
	var productList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	var subModality=document.getElementsByName('subModality');
	for(var i=0;i<subModality.length;i++)
	{
		if(subModality[i].checked) 
		{ 
			subModalityList += subModality[i].value + "~";
		} 
	}
	var segment=document.getElementsByName('segment');
	for(var i=0;i<segment.length;i++)
	{
		if(segment[i].checked) 
		{ 
			segmentList += segment[i].value + "~";
		} 
	}
	var product=document.getElementsByName('product');
	for(var i=0;i<segment.length;i++)
	{
		if(product[i].checked) 
		{ 
			productList += product[i].value + "~";
		} 
	}

	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	var regionValue = region;
	var subRegionValue = subRegionList;	
	var countryValue = countryList;
	var statesValue = statesList;
	var groupValue = groupList ;
	var modalityValue = modalityList;
	var subModalityValue = subModalityList;
	var segmentValue = segmentList;
	var productValue = productList;
	

if(year ==""){
	alert("Please select the year");
		return false;
	}else if(quarter==""){
		alert("Please select the Quarter");
		return false;
	}else if(regionValue==""){
		alert("Please select the region");
		return false;
	}else if(groupValue==""){
		alert("Please select modality 1");
		return false;
	}
	else{
	$("div#mprMainDivID").mask("");
	$.post(url+"?year="+year+"&quarter="+quarter+"&regionValue="+regionValue+"&subRegionValue="+subRegionValue+"&countryValue="+countryValue+"&statesValue="+statesValue+"&groupValue="+groupValue+"&modalityValue="+modalityValue+"&subModalityValue="+subModalityValue+"&segmentValue="+segmentValue+"&productValue="+productValue,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	}
	
}

function downloadPrepareData(prepareID)
{
	document.forms[0].action="downloadGEPrepareData.jpage?prepareDataID="+prepareID;
	document.forms[0].submit();

}


function viewPrepareData(prepareID)
{
	var url = "viewMprPage.jpage?prepareDataID="+prepareID;
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	
}

function collapseAll()
{
	 isOrderHide="No";
	 $("#orderDIVID").hide();
	 $("#orderIDImg").attr('src', 'content/images/plus.png');

	 isModalityHide="No";
	 $("#modalityDIVID").hide();
	 $("#modalityIDImg").attr('src', 'content/images/plus.png');

	 isHistoryHide="No";
	 $("#historyDIVID").hide();
	 $("#historyIDImg").attr('src', 'content/images/plus.png');

}


function showAll()
{
	isOrderHide="Yes";
	$("#orderDIVID").show();
	$("#orderIDImg").attr('src', 'content/images/minus.png');
		
	isModalityHide="Yes";
	$("#modalityDIVID").show();
	$("#modalityIDImg").attr('src', 'content/images/minus.png');
	
	isHistoryHide="Yes";
	$("#historyDIVID").show();
	$("#historyIDImg").attr('src', 'content/images/minus.png');
	  
}


function viewOrderTableData(subRegionValue,countryValue,subModalityValue,segmentValue,year,quarter)
{
	
	$("#orderDIVID").show();
	$("#orderIDImg").attr('src', 'content/images/minus.png');
		
	$("#modalityDIVID").show();
	$("#modalityIDImg").attr('src', 'content/images/minus.png');
	
	$("#historyDIVID").show();
	$("#historyIDImg").attr('src', 'content/images/minus.png');
	 
	var url = "viewOrderTable.jpage";
	$("div#viewHistoricData").mask("");
	$.post(url+"?year="+year+"&qtr="+quarter+"&subRegion="+subRegionValue+"&countryZone="+countryValue+"&subModality="+subModalityValue+"&segment="+segmentValue,
		function(data){
		if (data != "") {
			$("#viewHistoricData").unmask();
			$('div#viewHistoricData').empty();
			$("div#viewHistoricData").append(data);
		}
	});	
	
	
}

function hideUnhideRefresh(module){
	if(isHide=='No'){
    	isHide="Yes";
		$("#"+module).show();
		$("#refreshIDImg").attr('src', 'content/images/plus.png');
    }else{
    	isHide="No";
    	$("#"+module).hide();
    	$("#refreshIDImg").attr('src', 'content/images/minus.png');
    }
}


function refreshMPRData()
{
	var url = "createMprPage.jpage";
	
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});		
}

function adjustmentDataAjax()
{
	$("div#mprMainDivID").mask("");
	$.post("adjustmentData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
	
}


function preAdjustmentAjax()
{
	$("div#mprMainDivID").mask("");
	$.post("preAdjustmentData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}


function adjustmentDataAjaxMarket() 
{
	$("div#mprMainDivID").mask("");
	$.post("adjustmentDataMarket.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
	
}


function viewModifyHistoricData()
{
	$("div#mprMainDivID").mask("");
	$.post("viewModifyHistoricData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
	
}


function getAdjustmentsData() {
	var subRegionList = "";
	var modality2List ="";
	var subRegion = document.getElementsByName('subRegion');
	
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modalityList="";
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	
	var modality2=document.getElementsByName('modality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
		
		$("div#mprMainDivID").mask("");
		$.post("goToAdjustments.jpage",
				$("form").serialize(),function(data){
			if (data != "") {
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
		});
}

function exportAdjustmentdata(reportType) {
	var subRegionList = "";
	var modality2List ="";
	var subRegion = document.getElementsByName('subRegion');
	
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modalityList="";
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	
	var modality2=document.getElementsByName('modality2');
	for(var i=0;i<modality2.length;i++)
	{
		if(modality2[i].checked) 
		{ 
			modality2List += modality2[i].value + "~";
		} 
	}
		
	document.forms[0].action="excelExportAdjustmentData.jpage";
	document.forms[0].submit();
}


function getPreAdjustmentsData() {
	var subRegionList = "";
	var subRegion = document.getElementById('subRegion');
	
	if(subRegion.value ==""){
		alert("Please select any Sub Region");
			return false;
	}
	else{	
		$("div#mprMainDivID").mask("");
		$.post("goToPreAdjustments.jpage",
				$("form").serialize(),function(data){
			if (data != "") {
				$("#mprMainDivID").unmask();
				$('div#mprMainDivID').empty();
				$("div#mprMainDivID").append(data);
			}
		});
	}
}





function prepareGEOptionOnePage()
{
	
	//alert(isOrderHide)
	//alert($('#blankSpaceID').height());
	
	var height = $('#blankSpaceID').height();
	
	if(isOrderHide=="No")
	{
		 $("#createTemplateDivID").hide();
		 $("#geDataUploadDivID").hide();
		 $("#createIDImg").attr('src', 'content/images/plus.png');
		 $("#orderIDImg").attr('src', 'content/images/plus.png');
		 isOrderHide = "Yes";
		 
		 if(height<200)
		 {
			 //alert($('#blankSpaceID').height());
		 $('#blankSpaceID').animate({height: '+=165'}, 500);
		 }
	}
	else
	{
		 $("#createTemplateDivID").hide();
		 $("#geDataUploadDivID").show();
		 $("#createIDImg").attr('src', 'content/images/plus.png');
		 $("#orderIDImg").attr('src', 'content/images/minus.png');
		 isOrderHide = "No";
		 
		 if(height>315)
		 {
			 //alert($('#blankSpaceID').height());
		 $('#blankSpaceID').animate({height: '-=170'}, 500);
		 }
	}
}

function prepareGEOptionTwoPage()
{
	var url = "viewGEOptionTwoPage.jpage?prepareDataName=2";
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	
}

function prepareGEOptionThreePage()
{
	/*var url = "viewGEOptionThreePage.jpage";
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	*/
	
	var height = $('#blankSpaceID').height();
	
	//alert(isModalityHide)
	//alert($('#blankSpaceID').height());
	if(isModalityHide=="No")
	{
		 $("#createTemplateDivID").hide();
		 $("#geDataUploadDivID").hide();
		 $("#createIDImg").attr('src', 'content/images/plus.png');
		 $("#orderIDImg").attr('src', 'content/images/plus.png');
		 isModalityHide = "Yes";
		 
		 if(height<200)
		 {
			// alert($('#blankSpaceID').height());
		 $('#blankSpaceID').animate({height: '+=195'}, 500);
		 }
	}
	else
	{
		 $("#createTemplateDivID").show();
		 $("#geDataUploadDivID").hide();
		 $("#createIDImg").attr('src', 'content/images/minus.png');
		 $("#orderIDImg").attr('src', 'content/images/plus.png');
		 isModalityHide = "No";
		 
		 if(height>315)
		 {
			// alert($('#blankSpaceID').height());
		 $('#blankSpaceID').animate({height: '-=150'}, 500);
		 }
	}
	
}

function saveOptionOneTemplate()
{
		document.forms[0].action="saveOptionOneGEPrepareData.jpage?prepareDataName=1";
		document.forms[0].submit();
}



function downloadGEOptionOneTemplate(prepareID){
	/*var downloadType = document.getElementById("downloadType").value;
	
	if(downloadType=='')
	{
		alert("Please select download type.");
	}
	else
	{*/
	document.forms[0].action="excelDownloadOptionOneDataTemplate.jpage?prepareDataID="+prepareID;
	document.forms[0].submit();
	//}
}


function downloadMPRFXTemplate()
{
	document.forms[0].action="excelDownloadOptionOneDataTemplate.jpage?prepareDataID="+prepareID;
	document.forms[0].submit();
}



function uploadGEDataFileTemplate(prepareDataID,fileId)
{
	loadingImage();
	document.forms[0].action="uploadOptionOneDataTemplate.jpage?prepareDataID="+prepareDataID;
	document.forms[0].submit();
}

function uploadGETableTemplate(prepareDataID,fileId)
{
	loadingImage();
	document.forms[0].reportTypeQA.value = document.getElementById('tableTemplateReportTypeQA').value;
	document.forms[0].action="uploadOptionOneTableTemplate.jpage?prepareDataID="+prepareDataID;
	document.forms[0].submit();
}




function errorLogsData()
{
	$(document).click(function (event) {    		
		$('#ValidatedTable').gridviewScroll({
             width: 980,
             height: 250,
             headerrowcount: 1 

         });
	});
	$("#validatedDivID").modal();
	return false;
}

function errorLogsTable()
{
	$(document).click(function (event) {    		
		$('#Table1').gridviewScroll({
             width: 900,
             height: 250,
             headerrowcount: 2

         });
	});
	$("#tableValidatedDivID").modal();
	return false;
}




function loadingImage()
{
	$('<div></div>').load('uploadImage.jpage').modal();
	{
	    		containerId : "simplemodal-container3";
	 }
}

function saveOptionTwoTemplate()
{
	var regionList="";
	var sRegion= "";
	if(document.getElementById("serviceRegion")!=null)
		sRegion = document.getElementById("serviceRegion").value;
	else if(document.getElementById("serviceRegionOne")!=null)
		sRegion = document.getElementById("serviceRegionOne").value;
	else if(document.getElementById("serviceRegionTwo")!=null)
		sRegion = document.getElementById("serviceRegionTwo").value;
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	var regionValue = sRegion;
	var groupValue = groupList ;
	
   if(year ==""){
	alert("Please select the year");
		return false;
	}else if(quarter==""){
		alert("Please select the Quarter");
		return false;
	}else if(regionValue==""){
		alert("Please select the region");
		return false;
	}else if(groupValue==""){
		alert("Please select modality 1");
		return false;
	}
	else{
		document.forms[0].action="saveOptionTwoGEPrepareData.jpage?prepareDataName=2";
		document.forms[0].submit();
	}
}


function downloadGEOptionTwoTemplate(prepareID){
	var subRegionList = "";
	var subRegion = document.getElementsByName('subRegion');
	
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var modalityList="";
	var modality=document.getElementsByName('modality');
	for(var i=0;i<modality.length;i++)
	{
		if(modality[i].checked) 
		{ 
			modalityList += modality[i].value + "~";
		} 
	}
	
	if(subRegionList ==""){
		alert("Please select any Sub Region");
			return false;
	}else if(groupList==""){
			alert("Please select the Group");
			return false;
	}else if(modalityList==""){
			alert("Please select the Modality");
			return false;
	}
	else{
	document.forms[0].action="excelDownloadOptionOneTableTemplate.jpage?prepareDataID="+prepareID;
	document.forms[0].submit();
	}
}

function saveOptionTwoTemplate()
{
	var regionList="";
	var sRegion= "";
	if(document.getElementById("serviceRegion")!=null)
		sRegion = document.getElementById("serviceRegion").value;
	else if(document.getElementById("serviceRegionOne")!=null)
		sRegion = document.getElementById("serviceRegionOne").value;
	else if(document.getElementById("serviceRegionTwo")!=null)
		sRegion = document.getElementById("serviceRegionTwo").value;
	
	var groupList="";
	var group=document.getElementsByName('group');
	for(var i=0;i<group.length;i++)
	{
		if(group[i].checked) 
		{ 
			groupList += group[i].value + "~";
		} 
	}
	
	var quarter = document.getElementById("qtr").value;
	var year = document.getElementById("year").value;
	var regionValue = sRegion;
	var groupValue = groupList ;
	
   if(year ==""){
	alert("Please select the year");
		return false;
	}else if(quarter==""){
		alert("Please select the Quarter");
		return false;
	}else if(regionValue==""){
		alert("Please select the region");
		return false;
	}else if(groupValue==""){
		alert("Please select modality 1");
		return false;
	}
	else{
		document.forms[0].action="saveOptionOneMarketData.jpage?prepareDataName=4";
		document.forms[0].submit();
	}
}

function prepareMarketOptionOnePage()
{
	var url = "viewMarketOptionOnePage.jpage?prepareDataName=4";
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	
}

function prepareMarketOptionTwoPage()
{
	var url = "viewMarketOptionTwoPage.jpage";
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
	
}



function downloadMarketOptionOneTemplate(prepareID){
	document.forms[0].action="excelDownloadOptionOneMarketData.jpage?prepareDataID="+prepareID;
	document.forms[0].submit();
}

function uploadMarketOptionOneData(prepareDataID,fileId)
{
		loadingImage();
		document.forms[0].action="uploadOptionOneMarketData.jpage?prepareDataID="+prepareDataID;
		document.forms[0].submit();
}


function associationDataAjax(url)
{
$("div#mprMainDivID").mask("");
$.post(url,
		$("form").serialize(),function(data){
	if (data != "") {
		$("#mprMainDivID").unmask();
		$('div#mprMainDivID').empty();
		$("div#mprMainDivID").append(data);
	}
});
}


function markerV1Data(url) 
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function marketV2Data(url) 
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}



function comparisionReport(url) 
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
			/*
			 * following method will deselect the selected modality while loading.
			 * */
			//deSelectAllModality();
		}
	});
}

function comparisionReportBySubModality(subModalityData) 
{
	var subModality = subModalityData;
	$("div#mprMainDivID").mask("");
	$.post('comparisionReportBySubModality.jpage?subModality='+subModality,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
			/*
			 * following method will deselect the selected modality while loading.
			 * */
			//deSelectAllModality();
		}
	});
}

function fourQuarterRolling(url) 
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
			/*
			 * to deselect the default selected modality while loading
			 * */
		//	deSelectAllModality();
		}
	});
}
function globalViewReport(url) 
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function competitiveReport(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}


function showCompetitiveReportUpload(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}



function openCommentaryFromLanding(url)
{
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function loadRegion(id){

	var regionId = id.value;
	//alert(regionId);
	$.post("loadRegionCheckBoxesOnly.jpage?regionId="+regionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$('div#subRegionCBDivDIV').empty();
		    $("div#subRegionCBDivDIV").append(data);
		}
	});
}


function generateCommentrayFomr()
{

	$.post("generateCommentarySheet.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#commentaryDivID').empty();
			$("div#commentaryDivID").append(data);
		}
	});	
}

function submitCommentaryData(year,quarter,region,country,modality,market,ge)
{

	
	document.getElementById('commentryFour').value=document.getElementById(year).value;
	document.getElementById('commentryFive').value=document.getElementById(quarter).value;
	document.getElementById('commentryOne').value=document.getElementById(region).value;
	document.getElementById('commentryTwo').value=document.getElementById(country).value;
	document.getElementById('commentryThree').value=document.getElementById(modality).value;
	document.getElementById('market').value=document.getElementById(market).value;
	document.getElementById('ge').value=document.getElementById(ge).value;
	
	
	
	$.post("submitCommentaryData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}



function viewByRegionData()
{
	$.post("viewByRegionData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}


function goToMarketV1OptionOneData(){
	$.post("goToMarkerV1OptionOneData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function goToMarketV1OptionTwoData(){
	$.post("goToMarkerV1OptionTwoData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function goToMarketV2Data(){
	$.post("goTomarketV2Data.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function goToMarketV2OptionOneData(){
	$.post("goToMarketV2OptionOneData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}

function goToMarketV2OptionTwoData(){
	$.post("goToMarketV2OptionTwoData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}





function goToMarkerV1Data(){
	document.forms[0].action="goToMarkerV1Data.jpage";
	document.forms[0].submit();
}

function goToMarkerV2Data(){
	document.forms[0].action="goTomarketV2.jpage";
	document.forms[0].submit();
}


function goToAdjustments(){
	document.forms[0].action="goToAdjustmentData.jpage";
	document.forms[0].submit();
}

function goToTrends(){
	document.forms[0].action="goToTrends.jpage";
	document.forms[0].submit();
}

function goToBusinessInsights(){
	document.forms[0].action="goToBusinessInsights.jpage";
	document.forms[0].submit();
}

function goToReporting(){
	document.forms[0].action="goToReporting.jpage";
	document.forms[0].submit();

}


function selectAllSubRegion(){
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("456");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	getSubRegionDependents('');
}


function deSelectAllSubRegion(){
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("123");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	getSubRegionDependents('');
}

function selectAllCountry(){
	var subRegion=document.getElementsByName('countryZone');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("countryUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
}


function deSelectAllCountry(){
	var subRegion=document.getElementsByName('countryZone');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("countryCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
}

function selectAllGroup(){
	var subRegion=document.getElementsByName('group');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("groupUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadGroupDependentsCheck();
}



function selectHcsAndSurgeryGroup(){
	deSelectAllGroup();
	var subRegion=document.getElementsByName('group');
	document.getElementById('groupHCS').checked = true;
	document.getElementById('groupSurgery').checked = true;
	/*for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} */
	var checkObj = document.getElementById("groupUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadGroupDependentsCheck();
}

function deSelectAllGroup(){
	var subRegion=document.getElementsByName('group');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("groupCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadGroupDependentsCheck();
}



function selectAllModality(){

	var subRegion=document.getElementsByName('modality');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("modalityUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadModalityDependentsCheck();
}


function deSelectAllModality(){
	var subRegion=document.getElementsByName('modality');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("modalityCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadModalityDependentsCheck();
}



function selectAllModality2(){

	var subRegion=document.getElementsByName('modality2');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("modality2UnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadModality2DependentsCheck();
}


function deSelectAllModality2(){
	var subRegion=document.getElementsByName('modality2');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("modality2CheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadModality2DependentsCheck();
}





function selectAllSubModality(){
	var subRegion=document.getElementsByName('subModality');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("subModalityUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadSubModalityDependentsCheck();
}


function deSelectAllSubModality(){
	var subRegion=document.getElementsByName('subModality');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("subModalityCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadSubModalityDependentsCheck();
}

function selectAllSegment(){
	var subRegion=document.getElementsByName('segment');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = true;
		 
	} 
	var checkObj = document.getElementById("segmentUnCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadSegmentsDependent();
}


function deSelectAllSegment(){
	var subRegion=document.getElementsByName('segment');
	for(var i=0;i<subRegion.length;i++)
	{
		subRegion[i].checked = false;
		 
	} 
	var checkObj = document.getElementById("segmentCheckAll");
	if(checkObj.checked){
		checkObj.checked = false;
	}
	loadSegmentsDependent();
}






function viewByRegionData()
{
	document.forms[0].action = "viewByRegionData.jpage";
	document.forms[0].submit();
}

function exportAssociationReport(){
	document.forms[0].action="associationReportExcel.jpage";
	document.forms[0].submit();
}
function firstPage(pNo,url) {
	document.getElementById("pNo").value=pNo;
	$("div#mprMainDivID").mask("");
	$.post(url,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});	
}
function pagination(url)
{	
if(document.forms[0].anyChanges.value!="")
{
	alert("Before Going to next page. please save the record you have changed.");
}
else
{	
$("div#mprMainDivID").mask("");
$.post(url,
		$("form").serialize(),function(data){
	if (data != "") {
		$("#mprMainDivID").unmask();
		$('div#mprMainDivID').empty();
		$("div#mprMainDivID").append(data);
	}
});
}
}


function goToViewModify()
{
	document.forms[0].action="goToViewModify.jpage";
	document.forms[0].submit();
	
}

function goToSettings()
{
	document.forms[0].action="goToSettings.jpage";
	document.forms[0].submit();
}

function goToComptitiveAnalysis()
{
	document.forms[0].action="goToComptitiveAnalysis.jpage";
	document.forms[0].submit();
}

function exportQuarterRollingXls(){
	document.forms[0].action="excelExportQuarterRolling.jpage";
	document.forms[0].submit();
}

function exportComparisionXls(){
	document.forms[0].action="excelExportComparision.jpage";
	document.forms[0].submit();
}

function exportViewRegionXls(type){
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	var reportType = type ;
	document.forms[0].action="excelExportViewByRegion.jpage?reportType="+reportType+"&subRegionList="+subRegionList;
	document.forms[0].submit();
}


function exportCommentaryXls(){
	document.forms[0].action="excelExportCommentary.jpage";
	document.forms[0].submit();
}



function exportViewSubRegionXls(type){
	
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	}
	
	var reportType = type ;
	document.forms[0].action="excelExportViewBySubRegion.jpage?reportType="+reportType+"&subRegionList="+subRegionList;
	document.forms[0].submit();
}


function exportViewModalityXls(type){
	var reportType = type ;
	document.forms[0].action="excelExportViewByModality.jpage?reportType="+reportType;
	document.forms[0].submit();
}

function exportViewByQtrToQtr(type){
	var reportType = type ;
	document.forms[0].action="excelExportViewByQtrToQtr.jpage?reportType="+reportType;
	document.forms[0].submit();
}

function exportViewByHeatMap(type){
	var reportType = type ;
	document.forms[0].action="excelExportViewByHeatMap.jpage?reportType="+reportType;
	document.forms[0].submit();
}

function exportViewBySummary(type){
	var reportType = type ;
	document.forms[0].action="excelExportViewBySummary.jpage?reportType="+reportType;
	document.forms[0].submit();
}
function exportv1v2AnalysisXls(type){
	var reportType = type ;
	document.forms[0].action="exportv1v2AnalysisXls.jpage?reportType="+reportType;
	document.forms[0].submit();
}
function hideUnhideMarketColumns(){
	var tableObj = document.getElementById("TableOptionThree");
	var noOfRows = tableObj.rows.length;
	noOfRows = noOfRows-1;
	for(var i=0;i<noOfRows;i++){
		if(document.getElementById('marketID').checked){
			document.getElementById("market_"+i).style.display = "block";
			document.getElementById("marketHeadID").style.display = "block";
		}
		else
		{
			document.getElementById("market_"+i).style.display = "none";
			document.getElementById("marketHeadID").style.display = "none";
		}
	}
}

function hideUnhideGEColumns(){
	var tableObj = document.getElementById("TableOptionThree");
	var noOfRows = tableObj.rows.length;
	noOfRows = noOfRows-1;
	for(var i=0;i<noOfRows;i++){
		if(document.getElementById('geID').checked){
			document.getElementById("ge_"+i).style.display = "block";
			document.getElementById("geHeadID").style.display = "block";
		}
		else
		{
			document.getElementById("ge_"+i).style.display = "none";
			document.getElementById("geHeadID").style.display = "none";
		}
	}
}


function getV1DataInPopup() {
	var year = document.getElementById("year").value;
	var qtr = document.getElementById("qtr").value;
	var region = document.getElementById("serviceRegion").value;
	var subRegion = document.getElementById("subRegion").value;
	popupWindow1 = window.open("preAdjustmentV1.jpage?year="+year+"&qtr="+qtr+"&serviceRegion="+region+"&subRegion="+subRegion,'popUpWindow1','height=600,width=500,left=10,top=10,resizable=yes,scrollbars=yes,addressbar=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
}


function getV2DataInPopup() {
	var year = document.getElementById("year").value;
	var qtr = document.getElementById("qtr").value;
	var region = document.getElementById("serviceRegion").value;
	var subRegion = document.getElementById("subRegion").value;
	popupWindow2 = window.open("preAdjustmentV2.jpage?year="+year+"&qtr="+qtr+"&serviceRegion="+region+"&subRegion="+subRegion,'popUpWindow2','height=600,width=500,left=10,top=10,resizable=yes,scrollbars=yes,addressbar=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
}


function getV2V1DataInPopup() {
	var year = document.getElementById("year").value;
	var qtr = document.getElementById("qtr").value;
	var region = document.getElementById("serviceRegion").value;
	var subRegion = document.getElementById("subRegion").value;
	popupWindow3 = window.open("preAdjustmentV2V1.jpage?year="+year+"&qtr="+qtr+"&serviceRegion="+region+"&subRegion="+subRegion,'popUpWindow3','height=600,width=500,left=10,top=10,resizable=yes,scrollbars=yes,addressbar=no,toolbar=no,menubar=no,location=no,directories=no,status=yes');
}

function collapseAllPreAdjust()
{
	isActualMarketOrderHide ="No";
	 $("#actualMarketOrdersDIVID").hide();
	 $("#actualMarketOrdersIDImg").attr('src', 'content/images/plus.png');

	 isActualGEOrdersHide ="No";
	 $("#actualGEOrdersDIVID").hide();
	 $("#actualGEOrdersIDImg").attr('src', 'content/images/plus.png');

	 isActualGEShareHide ="No";
	 $("#actualGEShareDIVID").hide();
	 $("#actualGEShareIDImg").attr('src', 'content/images/plus.png');
	 
	 
	 isEstimateMarketOrderHide ="No";
	 $("#estimateMarketOrdersDIVID").hide();
	 $("#estimateMarketOrdersIDImg").attr('src', 'content/images/plus.png');

	 isEstimateGEOrdersHide ="No";
	 $("#estimateGEOrdersDIVID").hide();
	 $("#estimateGEOrdersIDImg").attr('src', 'content/images/plus.png');

	 isEstimateGEShareHide ="No";
	 $("#estimateGEShareDIVID").hide();
	 $("#estimateGEShareIDImg").attr('src', 'content/images/plus.png');

}


function showAllPreAdjust()
{
	isActualMarketOrderHide ="No";
	 $("#actualMarketOrdersDIVID").show();
	 $("#actualMarketOrdersIDImg").attr('src', 'content/images/minus.png');

	 isActualGEOrdersHide ="No";
	 $("#actualGEOrdersDIVID").show();
	 $("#actualGEOrdersIDImg").attr('src', 'content/images/minus.png');

	 isActualGEShareHide ="No";
	 $("#actualGEShareDIVID").show();
	 $("#actualGEShareIDImg").attr('src', 'content/images/minus.png');
	 
	 
	 isEstimateMarketOrderHide ="No";
	 $("#estimateMarketOrdersDIVID").show();
	 $("#estimateMarketOrdersIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEOrdersHide ="No";
	 $("#estimateGEOrdersDIVID").show();
	 $("#estimateGEOrdersIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEShareHide ="No";
	 $("#estimateGEShareDIVID").show();
	 $("#estimateGEShareIDImg").attr('src', 'content/images/minus.png');

}


function collapseAllComparision()
{
	isActualMarketOrderHide ="No";
	 $("#marketOrderDIVID").hide();
	 $("#marketOrderIDImg").attr('src', 'content/images/plus.png');

	 isActualGEOrdersHide ="No";
	 $("#geOrderDIVID").hide();
	 $("#geOrderIDImg").attr('src', 'content/images/plus.png');

	 isActualGEShareHide ="No";
	 $("#geShareDIVID").hide();
	 $("#ggeShareIDImg").attr('src', 'content/images/plus.png');
	 
	 
	 isEstimateMarketOrderHide ="No";
	 $("#vPercentGEDIVID").hide();
	 $("#vPercentGEIDImg").attr('src', 'content/images/plus.png');

	 isEstimateGEOrdersHide ="No";
	 $("#vPtsGEShareGEDIVID").hide();
	 $("#vPtsGEShareGEIDImg").attr('src', 'content/images/plus.png');
	 
	 isEstimateGEOrdersHide ="No";
	 $("#vMarketVGEDIVID").hide();
	 $("#vMarketVGEIDImg").attr('src', 'content/images/plus.png');

	 isEstimateGEShareHide ="No";
	 $("#vMarket4QTRAvgGEDIVID").hide();
	 $("#vMarket4QTRAvgGEIDImg").attr('src', 'content/images/plus.png');
	 
	 isEstimateGEShareHide ="No";
	 $("#vGEShare4QTRAvgGEDIVID").hide();
	 $("#vGEShare4QTRAvgGEIDImg").attr('src', 'content/images/plus.png');

}


function showAllComparision()
{
	isActualMarketOrderHide ="No";
	 $("#marketOrderDIVID").show();
	 $("#marketOrderIDImg").attr('src', 'content/images/minus.png');

	 isActualGEOrdersHide ="No";
	 $("#geOrderDIVID").show();
	 $("#geOrderIDImg").attr('src', 'content/images/minus.png');

	 isActualGEShareHide ="No";
	 $("#geShareDIVID").show();
	 $("#ggeShareIDImg").attr('src', 'content/images/minus.png');
	 
	 
	 isEstimateMarketOrderHide ="No";
	 $("#vPercentGEDIVID").show();
	 $("#vPercentGEIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEOrdersHide ="No";
	 $("#vMarketVGEDIVID").show();
	 $("#vPtsGEShareGEIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEShareHide ="No";
	 $("#vMarket4QTRAvgGEDIVID").show();
	 $("#vMarket4QTRAvgGEIDImg").attr('src', 'content/images/minus.png');
	 
	 isEstimateGEShareHide ="No";
	 $("#vGEShare4QTRAvgGEDIVID").show();
	 $("#vGEShare4QTRAvgGEIDImg").attr('src', 'content/images/minus.png');

}



function showAllPreAdjust()
{
	isActualMarketOrderHide ="No";
	 $("#actualMarketOrdersDIVID").show();
	 $("#actualMarketOrdersIDImg").attr('src', 'content/images/minus.png');

	 isActualGEOrdersHide ="No";
	 $("#actualGEOrdersDIVID").show();
	 $("#actualGEOrdersIDImg").attr('src', 'content/images/minus.png');

	 isActualGEShareHide ="No";
	 $("#actualGEShareDIVID").show();
	 $("#actualGEShareIDImg").attr('src', 'content/images/minus.png');
	 
	 
	 isEstimateMarketOrderHide ="No";
	 $("#estimateMarketOrdersDIVID").show();
	 $("#estimateMarketOrdersIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEOrdersHide ="No";
	 $("#estimateGEOrdersDIVID").show();
	 $("#estimateGEOrdersIDImg").attr('src', 'content/images/minus.png');

	 isEstimateGEShareHide ="No";
	 $("#estimateGEShareDIVID").show();
	 $("#estimateGEShareIDImg").attr('src', 'content/images/minus.png');

}


function collapseAllRolling()
{
	isActualMarketOrderHide ="No";
	 $("#marketOrderDIVID").hide();
	 $("#marketOrderIDImg").attr('src', 'content/images/plus.png');

	 isActualGEOrdersHide ="No";
	 $("#geOrderDIVID").hide();
	 $("#geOrderIDImg").attr('src', 'content/images/plus.png');

	 isActualGEShareHide ="No";
	 $("#geShareDIVID").hide();
	 $("#ggeShareIDImg").attr('src', 'content/images/plus.png');

}


function showAllRolling()
{
	isActualMarketOrderHide ="No";
	 $("#marketOrderDIVID").show();
	 $("#marketOrderIDImg").attr('src', 'content/images/minus.png');

	 isActualGEOrdersHide ="No";
	 $("#geOrderDIVID").show();
	 $("#geOrderIDImg").attr('src', 'content/images/minus.png');

	 isActualGEShareHide ="No";
	 $("#geShareDIVID").show();
	 $("#ggeShareIDImg").attr('src', 'content/images/minus.png');
	 
}



function hideUnhideUserEntry()
{
	
	if(isActualMarketOrderHide=="Yes")
	{
	 $("#userEntryDIVID").hide();
	 $("#userEntryIDImg").attr('src', 'content/images/plus.png');
	 isActualMarketOrderHide = "No";
	}
	else
	{
		 $("#userEntryDIVID").show();
		 $("#userEntryIDImg").attr('src', 'content/images/minus.png');
		 isActualMarketOrderHide = "Yes";
	}

}


function hideUnhideUserApprove()
{
	
	if(isOrderHide=="Yes")
	{
	 $("#userApproveDIVID").hide();
	 $("#userApproveIDImg").attr('src', 'content/images/plus.png');
	 isOrderHide = "No";
	}
	else
	{
		 $("#userApproveDIVID").show();
		 $("#userApproveIDImg").attr('src', 'content/images/minus.png');
		 isOrderHide = "Yes";
	}
}
/*
 * setting start here
 * */
function addRegion(){
	var region = document.getElementById("region").value;
	if(region==""){
		alert("Please enter the region");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("regionId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#RegionResultDivId').empty();
			$("div#RegionResultDivId").append(data);
		}
	});
}
function cancelRegionDetails(){
	document.getElementById("addButtonId").value="Add";
	document.getElementById("region").value = "";
	SettingsRegion();
}
function editRegionData(regionId, regionValue){
	document.getElementById("region").value = regionValue;
	document.getElementById("regionId").value=regionId;
	document.getElementById("addButtonId").value="Update";
}

function deleteSelectedRegion(regionId){	
    //var regionId = document.forms[0].deleteRegion.length;
	var conf = confirm("Do you really want to delete?");
	var count = 0;
	if(conf == true){

	var selectedRegionId = regionId;
	
	
	$("div#mprMainDivID").mask("");
	$.post("deleteRegion.jpage?regionIds="+selectedRegionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#RegionResultDivId').empty();
			$("div#RegionResultDivId").append(data);
		}
	});
	return false;
	}
	else{
	return false;	
	}
}
function manageSubRegionSetting(){
	$("div#mprMainDivID").mask("");
	$.post("settingsSubRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}
function addSubRegion(){
	var subRegion = document.getElementById("subRegion").value;
	if(subRegion==""){
		alert("Please enter the Sub Region");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("subRegionId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addSubRegion.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#subRegionResultDivId').empty();
			$("div#subRegionResultDivId").append(data);
		}
	});
}
function deleteSelectedSubRegion(subRegionId){	
   
	var conf = confirm("Do you really want to delete?");
	var count = 0;
	if(conf == true){
	
	var selectedSubRegionId = subRegionId;
	
	
	$("div#mprMainDivID").mask("");
	$.post("deleteRegion.jpage?subRegionIds="+selectedSubRegionId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#RegionResultDivId').empty();
			$("div#RegionResultDivId").append(data);
		}
	});
	return false;
	}
	else{
	return false;	
	}
}

function editSubRegionData(subRegionId, regionId, subRegion, region){
	document.getElementById("subRegionId").value = subRegionId;
	document.getElementById("regionId").value=regionId;
	
	document.getElementById("ssubRegion").value=subRegion;
	document.getElementById("sRegion").value=region;
	document.getElementById("addButtonId").value="Update";
}
function cancelSubRegionDetails(){
	document.getElementById("addButtonId").value="Add";
	document.getElementById("subRegionId").value = "";
	document.getElementById("regionId").value="";
	document.getElementById("ssubRegion").value="";
	document.getElementById("addButtonId").value="Add";
	manageSubRegionSetting();
}

/*
 *country setting 
 *
 **/

function manageCountrySetting(){
	$("div#mprMainDivID").mask("");
	$.post("settingsCountries.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
	
}
function cancelCountryDetails(){
	document.getElementById("addButtonId").value="Add";
	document.getElementById("subRegionId").value = "";
	document.getElementById("sCountryId").value="";
	document.getElementById("ssCountry").value="";
	document.getElementById("addButtonId").value="Add";
	manageCountrySetting();
}
function editCountryData(countryId, subRegionId, country, subRegion){
	document.getElementById("subRegionId").value = subRegionId;
	document.getElementById("ssCountry").value=country;	
	document.getElementById("sCountryId").value=countryId;
	document.getElementById("addButtonId").value="Update";
}
function addCountry(){
	var sCountry = document.getElementById("ssCountry").value;
	if(sCountry==""){
		alert("Please enter the Sub Region");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sCountryId").value="0";
		document.getElementById("subRegionId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addCountry.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#subRegionResultDivId').empty();
			$("div#subRegionResultDivId").append(data);
		}
	});
}
function deleteSelectedCountry(countryId){	
   
	var conf = confirm("Do you really want to delete?");
	var count = 0;
	if(conf == true){
	
	var selectedCountryId = countryId;
	
	$("div#mprMainDivID").mask("");
	$.post("deleteCountry.jpage?countryIds="+selectedCountryId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#RegionResultDivId').empty();
			$("div#RegionResultDivId").append(data);
		}
	});
	return false;
	}
	else{
	return false;	
	}
}
/*
 * State Settings
 * */
function manageStateSetting(){
	$("div#mprMainDivID").mask("");
	$.post("settingsState.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}
function addState(){
	var sState = document.getElementById("sState").value;
	if(sState==""){
		alert("Please enter the state");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sCountryId").value="0";
		document.getElementById("sStateId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addState.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#subStateResultDivId').empty();
			$("div#subStateResultDivId").append(data);
		}
	});
}
function deleteStateData(stateId){
	var conf = confirm("Do you really want to delete?");
	if(conf == true){
		$("div#mprMainDivID").mask("");
		$.post("deleteState.jpage?stateIds="+stateId,
				$("form").serialize(),function(data){
			if (data != "") {
				$("#mprMainDivID").unmask();
				$('div#subStateResultDivId').empty();
				$("div#subStateResultDivId").append(data);
			}
		});
	}else{	
	return false;
	}
}
function editStateData(stateId, countryId, state, country){
	document.getElementById("sStateId").value=stateId;
	document.getElementById("sCountryId").value=countryId;
	document.getElementById("ssState").value=state;
	document.getElementById("addButtonId").value="Update";
}
function cancelStateDetails(stateId, countryId, state, country){
	document.getElementById("sStateId").value="";
	document.getElementById("sCountryId").value="";
	document.getElementById("ssState").value="";
	document.getElementById("addButtonId").value="Add";
	manageStateSetting();
}

/*
 * State Settings
 * */
function SettingsGroup(){
	$("div#mprMainDivID").mask("");
	$.post("settingsGroup.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}
function addGroup(){
	var group = document.getElementById("ssGroup").value;
	if(group==""){
		alert("Please enter the group");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sGroupId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addGroup.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#groupResultDivId').empty();
			$("div#groupResultDivId").append(data);
		}
	});
}
function deleteGroup(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteGroup.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#groupResultDivId').empty();
			$("div#groupResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editGroup(gruoupId, group){
	document.getElementById("sGroupId").value=gruoupId;
	document.getElementById("ssGroup").value=group;
	document.getElementById("addButtonId").value="Update";
}
function cancelGroupDetails(){
	document.getElementById("sGroupId").value="";
	document.getElementById("ssGroup").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	SettingsGroup();
}
/*
 *modalityONe
 * 
 **/

function settingsModalityOne(){
	$("div#mprMainDivID").mask("");
	$.post("settingsModalityOne.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}
function addModalityOne(){
	var ssModality1 = document.getElementById("ssModality1").value;
	if(ssModality1==""){
		alert("Please enter the modality 1");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sGroupId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addModalityOne.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modalityResultDivId').empty();
			$("div#modalityResultDivId").append(data);
		}
	});
}
function deleteModalityOne(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteModalityOne.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modalityResultDivId').empty();
			$("div#modalityResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editModalityOne(modalityOneId, groupId, modalityName, groupName,startD, endD){
	document.getElementById("addButtonId").value="Update";
	document.getElementById("sModality1Id").value=modalityOneId;
	document.getElementById("sGroupId").value=groupId;
	document.getElementById("ssModality1").value=modalityName;
	document.getElementById("sGroup").value=groupName;
	document.getElementById("businessStartDate").value=startD;
	document.getElementById("businessEndDate").value=endD;
	
}
function cancelModalityOneDetails(){
	document.getElementById("sModality1Id").value="";
	document.getElementById("sGroupId").value="";
	document.getElementById("ssModality1").value="";
	document.getElementById("sGroup").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	document.getElementById("addButtonId").value="Add";
	settingsModalityOne();
}
/*
 * modality 2
 * 
 */

function manageModTwo(){
	$("div#mprMainDivID").mask("");
	$.post("settingsModalityTwo.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}
function addModalityTwo(){
	var ssModality2 = document.getElementById("ssModality2").value;
	if(ssModality2==""){
		alert("Please enter the Modality 2");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sGroupId").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addModalityTwo.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
}
function deleteModalityTwo(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteModalityOne.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editModalityTwo(modalityOneId, modalityTwoId, modalityTwoName, modalityOneName,startD, endD){
	document.getElementById("sModality1Id").value=modalityOneId;
	document.getElementById("sModality2Id").value=modalityTwoId;
	document.getElementById("ssModality2").value=modalityTwoName;
	document.getElementById("sModality").value=modalityOneName;
	document.getElementById("businessStartDate").value=startD;
	document.getElementById("businessEndDate").value=endD;
	document.getElementById("addButtonId").value="Update";
	
}
function cancelModalityTwoDetails(){
	document.getElementById("sModality1Id").value="";
	document.getElementById("sModality2Id").value="";
	document.getElementById("ssModality2").value="";
	document.getElementById("sModality").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	document.getElementById("addButtonId").value="Add";
	settingsModalityOne();
}

/*
 * Sub Modality
 * 
 */

function manageSubModality(){
	$("div#mprMainDivID").mask("");
	$.post("settingsSubModality.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function addSubModality(){
	var ssSubModality = document.getElementById("ssSubModality").value;
	if(ssSubModality==""){
		alert("Please enter the Sub Modality");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sModality2Id").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addSubModality.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
}
function deleteSubModality(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteSubModality.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editSubModality(submodalityId, modalityTwoId, submodalityName, modalityTwo,startD, endD){
	document.getElementById("sModality2Id").value=modalityTwoId;
	document.getElementById("sSubModalityId").value=submodalityId;
	document.getElementById("ssSubModality").value=submodalityName;
	document.getElementById("sModality2").value=modalityTwo;
	document.getElementById("businessStartDate").value=startD;
	document.getElementById("businessEndDate").value=endD;
	document.getElementById("addButtonId").value="Update";
	
}
function cancelSubModality(){
	document.getElementById("sModality2Id").value="";
	document.getElementById("sSubModalityId").value="";
	document.getElementById("sModality2").value="";
	document.getElementById("ssSubModality").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	document.getElementById("addButtonId").value="Add";
	manageSubModality();
}

/*
 * Segment
 * 
 */

function manageSegment(){
	$("div#mprMainDivID").mask("");
	$.post("settingsSegment.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function addSegment(){
	var ssSubModality = document.getElementById("ssSubModality").value;
	if(ssSubModality==""){
		alert("Please enter the Sub Modality");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sModality2Id").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addSubModality.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
}
function deleteSegment(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteSegment.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editSegment(segmentId, modalityTwoId, segmentName, subModalityName,startD, endD){
	document.getElementById("sSegmentId").value=segmentId;
	document.getElementById("sSubModalityId").value=submodalityId;
	document.getElementById("sSubModality").value=subModalityName;
	document.getElementById("ssSegment").value=segmentName;
	document.getElementById("businessStartDate").value=startD;
	document.getElementById("businessEndDate").value=endD;
	document.getElementById("addButtonId").value="Update";
}
function cancelSegment(){
	document.getElementById("sSegmentId").value="";
	document.getElementById("sSubModalityId").value="";
	document.getElementById("sModality2").value="";
	document.getElementById("ssSubModality").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	document.getElementById("addButtonId").value="Add";
	manageSegment();
}

/*
 * product
 */

/*
 * Segment
 * 
 */

function manageProduct(){
	$("div#mprMainDivID").mask("");
	$.post("settingsProduct.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function addProduct(){
	var ssSubModality = document.getElementById("ssSubModality").value;
	if(ssSubModality==""){
		alert("Please enter the Sub Modality");
		document.getElementById("addButtonId").value="Add";
		return false;
	}
	var buttonValue = document.getElementById("addButtonId").value;
	if(buttonValue=="Add"){
		document.getElementById("sModality2Id").value="0";
	}
	$("div#mprMainDivID").mask("");
	$.post("addSubModality.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
}
function deleteProduct(stateId, countryId){

	var conf = confirm("Do you really want to delete?");
	if(conf == true){
	$("div#mprMainDivID").mask("");
	$.post("deleteSegment.jpage?stateIds="+stateId,
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#modality2ResultDivId').empty();
			$("div#modality2ResultDivId").append(data);
		}
	});
	}else{
	return false;
	}
}
function editProduct(productId, segmentId, productName, segmentName, startD, endD){
	document.getElementById("sProductId").value=productId;
	document.getElementById("sSegmentId").value=segmentId;
	document.getElementById("ssProduct").value=productName;
	document.getElementById("sSegment").value=segmentName;
	document.getElementById("businessStartDate").value=startD;
	document.getElementById("businessEndDate").value=endD;
	document.getElementById("addButtonId").value="Update";
}
function cancelProduct(){
	document.getElementById("sProductId").value="";
	document.getElementById("sSegmentId").value="";
	document.getElementById("ssProduct").value="";
	document.getElementById("sSegment").value="";
	document.getElementById("businessStartDate").value="";
	document.getElementById("businessEndDate").value="";
	document.getElementById("addButtonId").value="Update";
	manageProduct();
}
function hideAdjust(columnClass){

    $('table .'+columnClass).each(function(index) {
    	//alert("enter");
      $(this).hide();
    });
  
 //   document.getElementById("adjustmentHideShowId").src="content/images/Plus_New.png";
 //   document.getElementById("methodNameChange").onClick = showAdjustment('col11');
    var columnClassH = columnClass+"_headM";
    $('table .'+columnClassH).each(function(index) {
                      $(this).hide();
                    });  
    var columnClassH = columnClass+"_headP";
    $('table .'+columnClassH).each(function(index) {
                      $(this).show();
                    });
   // alert("enter");
  }
function changeMethodName1(){
    document.getElementById("adjustmentHideShowId").src="content/images/Plus_New.png";
	document.getElementById("methodNameChange").onClick = showAdjustment('col11');
}


function showAdjustment(columnClass){
    $('table .'+columnClass).each(function(index) {
      $(this).show();
    });
    var columnClassH = columnClass+"_headM";
    $('table .'+columnClassH).each(function(index) {
                      $(this).show();
                    });
    var columnClassH = columnClass+"_headP";
    $('table .'+columnClassH).each(function(index) {
                      $(this).hide();
                    });
  }

function showAdjDefaultHide(columnClass){

    var columnClassH = columnClass+"_headP";
    $('table .'+columnClassH).each(function(index) {
                      $(this).hide();
                    });
  }

function setDataType(objectType){
	var dataType = objectType.value;
	if(dataType=="Order"){
	}
	else{
		alert("Under Development");
	return false;	
	}
		
}
function getSubRegionDependentsForReport(){
	
	var subRegionList="";
	var subRegion=document.getElementsByName('subRegion');
	for(var i=0;i<subRegion.length;i++)
	{
		if(subRegion[i].checked) 
		{ 
			subRegionList += subRegion[i].value + "~";
		} 
	} 
	$.post("loadCountryForReport.jpage",
			$("form").serialize(),function(data){
		if (data != "") {			
			$('div#newDivCountryID').empty();
			$("div#newDivCountryID").append(data);
		}
	});
}

function getRegionDependentsForReport(objectType){
	
	$.post("loadSubRegionForReport.jpage",
			$("form").serialize(),function(data){
		if (data != "") {			
			$('div#subRegionCBDivDIV').empty();
			$("div#subRegionCBDivDIV").append(data);
		}
	});
}
function loadModality2CheckBox(){
	$.post("loadModality2ForReport.jpage",
			$("form").serialize(),function(data){
		if (data != "") {			
			$('div#modality2DivID').empty();
			$("div#modality2DivID").append(data);
		}
	});
}

function loadSubModalityCheckBox(){
	$.post("loadSubModalityForReport.jpage",
			$("form").serialize(),function(data){
		if (data != "") {			
			$('div#subModalityDivID').empty();
			$("div#subModalityDivID").append(data);
		}
	});
}

function showCHUData(){
	$("div#mprMainDivID").mask("");
	$.post("getChuData.jpage",
			$("form").serialize(),function(data){
		if (data != "") {
			$("#mprMainDivID").unmask();
			$('div#mprMainDivID').empty();
			$("div#mprMainDivID").append(data);
		}
	});
}

function uploadCompetitiveTemplate(fileId)
{	
	loadingImage();
	document.forms[0].action="uploadCompetitiveTemplate.jpage";
	document.forms[0].submit();
}

function graphTooltip(description){
    var variableTipContent = description;
    $('a.clickTip1').aToolTip({
            clickIt: false,
            tipContent: variableTipContent
    });
}

function saveRecords(){	
	var recordOne = document.getElementById(elementId).value;
	var recordTwo = document.getElementById(elementId).value;
	var recordThree = document.getElementById(elementId).value;
	var recordFour = document.getElementById(elementId).value;
	var recordFive = document.getElementById(elementId).value;		
	$.post("saveAllRecords.jpage",
			$("form").serialize(),function(data){
		if (data != "") {			
			$('div#chuvSavedDataId').empty();
			$("div#chuvSavedDataId").append(data);
		}
	});	
}

function nextRecord5(){	
	var recordNo = "1";
	var timeStamp= document.getElementById("timeStamp").value;
	//alert(timeStamp);
	document.forms[0].action="getNextRecords.jpage?recordNo="+recordNo+"&timeStamp="+timeStamp;
	document.forms[0].submit();
}
/*
function noNextRecords (){
	
	var recordCount= document.getElementById("resultListSize").value;
	var recordNo= document.getElementById("rowId").value;
	alert("recordId="+recordNo);
	if(recordCount==0){
	alert("no Records found for this region and modality");
	
	document.forms[0].action="getNextRecords.jpage?recordNo="+rowId+"&timeStamp="+timeStamp;
	document.forms[0].submit();
	}
	
}*/

function nextRecord(autoId,recordId){	
var flag="Next";
	var serviceRegion = document.getElementById("serviceRegion").value;
	var modalityS = document.getElementById("modalityS").value;
	var totalRecord = document.getElementById("chuvCount").value;
	totalRecord=parseFloat(totalRecord);
	var timeStamp= document.getElementById("timeStamp").value;
	var recordNo = parseFloat(recordId);

	if(totalRecord==recordNo){
		alert("This file have only "+totalRecord+" records.");
		return false;
	}else{	
		recordNo=parseFloat(recordNo)+1;
		document.forms[0].action="getNextRecords.jpage?recordNo="+recordNo+"&timeStamp="+timeStamp+"&serviceRegion="+serviceRegion+"&modalityS="+modalityS+"&recordFlag="+flag;
		document.forms[0].submit();	   	    
	}
}
function nextRecordGo(){
	var serviceRegion = document.getElementById("serviceRegion").value;
	var modalityS = document.getElementById("modalityS").value;
	if((serviceRegion == '') && (modalityS == '')){
	alert('Kindly select a filter');
	}else{
	document.getElementById("next_Record_button").click();
	}
}

function prviousRecord(rowNo, recordId){
	var flag="Previous";
	var recordNo = parseFloat(recordId);
	var timeStamp= document.getElementById("timeStamp").value;
	var serviceRegion = document.getElementById("serviceRegion").value;
	var modalityS = document.getElementById("modalityS").value;
	if(recordNo==1){
		alert("This is the first record. so you can not get previous record.");
		return false;
	}
	recordNo=parseFloat(recordNo)-1;

	document.forms[0].action="getNextRecords.jpage?recordNo="+recordNo+"&timeStamp="+timeStamp+"&serviceRegion="+serviceRegion+"&modalityS="+modalityS+"&recordFlag="+flag;
	document.forms[0].submit();	
	
}
function showCHURecordFive(divid,pagereq,pageset){
var divTB = divid+"TB";	
var obj=document.getElementById(divTB);
var curleft=810;
var curtop =170;
var div = divid+"CBDiv";
	thediv = document.getElementById(div);
	thediv.style.top=curtop+'px';
	thediv.style.left=curleft+'px';
	if(thediv.style.display== 'none' ){
	thediv.style.display='block';
	}/*else{
	thediv.style.display='none';
	}*/
}

function closeDivRecordFive(divid)
{
	var div = divid+"CBDiv";
	document.getElementById(div).style.display='none';
	var rValue = document.getElementById("rocordFiveValueId").value;
	document.getElementById("recordFive").value = rValue;	
}
//////////////////////////////////////////
function showCHURecordFour(divid,pagereq,pageset){
	var divTB = divid+"TB";	
	var obj=document.getElementById(divTB);
	var curleft=720;
	var curtop =170;
	var div = divid+"CBDiv";
		thediv = document.getElementById(div);
		thediv.style.top=curtop+'px';
		thediv.style.left=curleft+'px';
		if(thediv.style.display== 'none' ){
		thediv.style.display='block';
		}/*else{
		thediv.style.display='none';
		}*/
	}
	function closeDivRecordFour(divid)
	{
		var div = divid+"CBDiv";
		document.getElementById(div).style.display='none';
		var rValue = document.getElementById("rocordFourValueId").value;
		document.getElementById("recordFour").value = rValue;	
	}
//////////////////////////////////////
	function showCHURecordThree(divid,pagereq,pageset){
		var divTB = divid+"TB";	
		var obj=document.getElementById(divTB);
		var curleft=500;
		var curtop =170;
		var div = divid+"CBDiv";
			thediv = document.getElementById(div);
			thediv.style.top=curtop+'px';
			thediv.style.left=curleft+'px';
			if(thediv.style.display== 'none' ){
			thediv.style.display='block';
			}/*else{
			thediv.style.display='none';
			}*/
		}
		function closeDivRecordThree(divid)
		{
			var div = divid+"CBDiv";
			document.getElementById(div).style.display='none';
			var rValue = document.getElementById("rocordThreeValueId").value;
			document.getElementById("recordThree").value = rValue;	
		}
/////////////////////////////////////////
		function showCHURecordTwo(divid,pagereq,pageset){
			var divTB = divid+"TB";	
			var obj=document.getElementById(divTB);
			var curleft=270;
			var curtop =170;
			var div = divid+"CBDiv";
				thediv = document.getElementById(div);
				thediv.style.top=curtop+'px';
				thediv.style.left=curleft+'px';
				if(thediv.style.display== 'none' ){
				thediv.style.display='block';
				}/*else{
				thediv.style.display='none';
				}*/
			}
			function closeDivRecordTwo(divid)
			{
				var div = divid+"CBDiv";
				document.getElementById(div).style.display='none';
				var rValue = document.getElementById("rocordTwoValueId").value;
				document.getElementById("recordTwo").value = rValue;	
			}
//////////////////////////////////////			
			function showCHURecordOne(divid,pagereq,pageset){
				//var divTB = divid+"TB";	
				//var obj=document.getElementById(divTB);
				var curleft=60;
				var curtop =170;
				var div = divid+"CBDiv";
					thediv = document.getElementById(div);
					thediv.style.top=curtop+'px';
					thediv.style.left=curleft+'px';
					//setTimeout(function(){thediv.style.display='none';}, 2000);
					if(thediv.style.display== 'none' ){
					thediv.style.display='inline';
					}/*else{
					thediv.style.display='none';
					}	*/
					
				}
			
			function closeDivRecordOne(divid)
				{
					var div = divid+"CBDiv";
					document.getElementById(div).style.display='none';
					var rValue = document.getElementById("rocordOneValueId").value;
					document.getElementById("recordOne").value = rValue;	
				}

function viewSelectedRecord(sso, timestamp){
	
	document.forms[0].action="getChuData.jpage?SSO="+sso+"&timeStamp="+timestamp;
	document.forms[0].submit();
		
	}
function deleteSelectedRecord(sso, timestamp){
	
	document.forms[0].action="deleteChuData.jpage?SSO="+sso+"&timeStamp="+timestamp;
	document.forms[0].submit();	
			
	}
function saveWhyOneQuestion(questtionId, columnId, j, i){	
//	alert("questtionId"+questtionId);
//	alert("columnId"+columnId);
	
	
	var columnValue = document.getElementById(columnId).value;
	var whyOne="whyOne"+j;
	var rowCount = document.getElementById('chuTable').rows.length;
	var count=0;
	var whyOneValue=0;
	var whyOneValue = new Array();
	for(var i=1;i<parseFloat(rowCount);i++)
	{
		whyOne=whyOne+i;
		//alert("whyOne::: "+whyOne);
		whyOneValue=document.getElementById(whyOne).value;
		//alert("whyOneValue"+whyOneValue);
		if(document.getElementById(whyOne).checked == true){
			count=count+1;
		//alert("firstIF"+count);
		}
		if(count>=4){
			alert("You can not answer more than 3");
			document.getElementById(whyOne).checked = false;
			return false;
		}
		whyOne="whyOne"+j;
	}
	
}
function saveWhyTwoQuestion(questtionId, columnId, j, i){	
//	alert("questtionId"+questtionId);
//	alert("columnId"+columnId);
	
	
	var columnValue = document.getElementById(columnId).value;
	var whyTwo="whyTwo"+j;
	var rowCount = document.getElementById('chuTable2').rows.length;
	var count=0;
	var whyOneValue=0;
	var whyOneValue = new Array();
	for(var i=1;i<parseFloat(rowCount);i++)
	{
		whyTwo=whyTwo+i;
		//alert("whyOne::: "+whyOne);
		whyOneValue=document.getElementById(whyTwo).value;
	//	alert("whyOneValue"+whyOneValue);
		if(document.getElementById(whyTwo).checked==true){
			count=count+1;
	//	alert("firstIF"+count);
		}
		if(count>=4){
			alert("You can not answer more than 3");
			document.getElementById(whyTwo).checked=false;
			return false;
		}
		whyTwo="whyTwo"+j;
	}
	
}

function saveWhyThreeQuestion(questtionId, columnId, j, i){	
//	alert("questtionId"+questtionId);
//	alert("columnId"+columnId);
	
	
	var columnValue = document.getElementById(columnId).value;
	var whyThree="whyThree"+j;
	var rowCount = document.getElementById('chuTable3').rows.length;
	var count=0;
	var whyOneValue=0;
	var whyOneValue = new Array();
	for(var i=1;i<parseFloat(rowCount);i++)
	{
		whyThree=whyThree+i;
		//alert("whyOne::: "+whyOne);
		whyOneValue=document.getElementById(whyThree).value;
		//alert("whyOneValue"+whyOneValue);
		if(document.getElementById(whyThree).checked==true){
			count=count+1;
		//alert("firstIF"+count);
		}
		if(count>=4){
			alert("You can not answer more than 3");
			//document.getElementById(columnId).value="0";
			document.getElementById(whyThree).checked=false;
			return false;
		}
		whyThree="whyThree"+j;
	}
	
}

function saveWhyFourQuestion(questtionId, columnId, j, i){	
//	alert("questtionId"+questtionId);
//	alert("columnId"+columnId);
	
	
	var columnValue = document.getElementById(columnId).value;
	var whyFour="whyFour"+j;
	var rowCount = document.getElementById('chuTable4').rows.length;
	var count=0;
	var whyOneValue=0;
	var whyOneValue = new Array();
	for(var i=1;i<parseFloat(rowCount);i++)
	{
		whyFour=whyFour+i;
		//alert("whyOne::: "+whyOne);
		whyOneValue=document.getElementById(whyFour).value;
		//alert("whyOneValue"+whyOneValue);
		if(document.getElementById(whyFour).checked == true ){
			count=count+1;
		//alert("firstIF"+count);
		}
		if(count>=4){
			alert("You can not answer more than 3");
			//document.getElementById(columnId).value="0";
			document.getElementById(whyFour).checked=false;
			return false;
		}
		whyFour="whyFour"+j;
	}
	
}

function increaseProgressBar(increaseProgressBar,maxVal){
	var progresBar= $('#progressBar');
    var rowNumber= parseFloat(increaseProgressBar);
    var val=(100 * parseFloat(rowNumber))/maxVal;
    progresBar.progressbar({ value: val , orientation:'vertical'});
    
}



function saveWhyQuestions(recId, recordNum){
	var recordId = parseFloat(recId);
	var recordNumber = parseFloat(recordNum)+1;
	
	var timeStamp= document.getElementById("timeStamp").value;

		var whyOne3='whyOne3';		
		var rowCount = document.getElementById('chuTable').rows.length;
		var whyOneValue=0;
		var whyOneArray = new Array();
		
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyOne3=whyOne3+i;		
			
			whyOneValue=document.getElementById(whyOne3).value;
			
			
			if(document.getElementById(whyOne3).checked==true){
				var queId = 'whyOne1'+i;
				var queIdValue =document.getElementById(queId).value;
			    whyOneArray.push('w1_'+queIdValue);
			}
			whyOne3='whyOne3';
		}
		document.getElementById('whyOneColumnOne').value=whyOneArray.toString();		
		var whyOne4='whyOne4';
		var whyOneValue4=0;
		var whyOneArray4 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyOne4=whyOne4+i;		
			whyOneValue4=document.getElementById(whyOne4).value;
			
			if(document.getElementById(whyOne4).checked==true){
				var queId = 'whyOne1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyOneArray4.push('w1_'+queIdValue);
			}
			whyOne4='whyOne4';
		}
		document.getElementById('whyOneColumnTwo').value=whyOneArray4.toString();
		
		var whyOne5='whyOne5';
		var whyOneValue5=0;
		var whyOneArray5 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyOne5=whyOne5+i;		
			whyOneValue5=document.getElementById(whyOne5).value;
			if(document.getElementById(whyOne5).checked==true){
				var queId = 'whyOne1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyOneArray5.push('w1_'+queIdValue);
			}
			whyOne5='whyOne5';
		}
		document.getElementById('whyOneColumnThree').value=whyOneArray5.toString();
		
		var whyOne6='whyOne6';
		var whyOneValue6=0;
		var whyOneArray6 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyOne6=whyOne6+i;		
			whyOneValue6=document.getElementById(whyOne6).value;
			if(document.getElementById(whyOne6).checked==true){
				var queId = 'whyOne1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyOneArray6.push('w1_'+queIdValue);
			}
			whyOne6='whyOne6';
			
		}
		document.getElementById('whyOneColumnFour').value=whyOneArray6.toString();
		
		var whyOne7='whyOne7';
		var whyOneValue7=0;
		var whyOneArray7 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyOne7=whyOne7+i;		
			whyOneValue7=document.getElementById(whyOne7).value;
			if(document.getElementById(whyOne7).checked==true){
				var queId = 'whyOne1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyOneArray7.push('w1_'+queIdValue);
			}
			whyOne7='whyOne7';
		}
		document.getElementById('whyOneColumnFive').value=whyOneArray7.toString();
		
		/////////////// Why 2 ////
		var whyTwo3='whyTwo3';
		var rowCount = document.getElementById('chuTable2').rows.length;
		var whyTwoValue1=0;
		var whyTwoArray1 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyTwo3=whyTwo3+i;		
			whyTwoValue1=document.getElementById(whyTwo3).value;
			if(document.getElementById(whyTwo3).checked==true){
				var queId = 'whyTwo1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyTwoArray1.push('w2_'+queIdValue);
			}
			whyTwo3='whyTwo3';
		}
		document.getElementById('whyTwoColumnOne').value=whyTwoArray1.toString();
		
		var whyTwo4='whyTwo4';
		var whyTwoValue4=0;
		var whyTwoArray4 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyTwo4=whyTwo4+i;		
			whyTwoValue4=document.getElementById(whyTwo4).value;
			
			
			if(document.getElementById(whyTwo4).checked==true){
				var queId = 'whyTwo1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyTwoArray4.push('w2_'+queIdValue);
			}
			whyTwo4='whyTwo4';
		}
		document.getElementById('whyTwoColumnTwo').value=whyTwoArray4.toString();
		
		var whyTwo5='whyTwo5';
		var whyTwoValue5=0;
		var whyTwoArray5 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyTwo5=whyTwo5+i;		
			whyTwoValue5=document.getElementById(whyTwo5).value;
			
			
			if(document.getElementById(whyTwo5).checked==true){
				var queId = 'whyTwo1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyTwoArray5.push('w2_'+queIdValue);
			}
			whyTwo5='whyTwo5';
		}
		document.getElementById('whyTwoColumnThree').value=whyTwoArray5.toString();
		
		var whyTwo6='whyTwo6';
		var whyTwoValue6=0;
		var whyTwoArray6 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyTwo6=whyTwo6+i;		
			whyTwoValue6=document.getElementById(whyTwo6).value;
			if(document.getElementById(whyTwo6).checked==true){
				var queId = 'whyTwo1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyTwoArray6.push('w2_'+queIdValue);
			}
			whyTwo6='whyTwo6';
			
		}
		document.getElementById('whyTwoColumnFour').value=whyTwoArray6.toString();
		
		var whyTwo7='whyTwo7';
		
		var whyTwoValue7=0;
		var whyTwoArray7 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyTwo7=whyTwo7+i;		
			whyTwoValue7=document.getElementById(whyTwo7).value;
			
			
			if(document.getElementById(whyTwo7).checked==true){
				var queId = 'whyTwo1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyTwoArray7.push('w2_'+queIdValue);
			}
			whyTwo7='whyTwo7';
		}
		document.getElementById('whyTwoColumnFive').value=whyTwoArray7.toString();
		////// WHY 3 ///////
		
		
		
		var whyThree3='whyThree3';
		var rowCount = document.getElementById('chuTable3').rows.length;
		var whyThreeValue3=0;
		var whyThreeArray3 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyThree3=whyThree3+i;		
			whyThreeValue3=document.getElementById(whyThree3).value;
			
			
			if(document.getElementById(whyThree3).checked==true){
				var queId = 'whyThree1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyThreeArray3.push('w3_'+queIdValue);
			}
			whyThree3='whyThree3';
		}
		document.getElementById('whyThreeColumnOne').value=whyThreeArray3.toString();
		
		var whyThree4='whyThree4';

		var whyThreeValue4=0;
		var whyThreeArray4 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyThree4=whyThree4+i;		
			whyThreeValue4=document.getElementById(whyThree4).value;
			if(document.getElementById(whyThree4).checked==true){
				var queId = 'whyThree1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyThreeArray4.push('w3_'+queIdValue);
			}
			whyThree4='whyThree4';
		}
		document.getElementById('whyThreeColumnTwo').value=whyThreeArray4.toString();
		
		var whyThree5='whyThree5';
		var whyThreeValue5=0;
		var whyThreeArray5 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyThree5=whyThree5+i;		
			whyThreeValue5=document.getElementById(whyThree5).value;
			if(document.getElementById(whyThree5).checked==true){
				var queId = 'whyThree1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyThreeArray5.push('w3_'+queIdValue);
			}
			whyThree5='whyThree5';
			
		}
		document.getElementById('whyThreeColumnThree').value=whyThreeArray5.toString();
		
		var whyThree6='whyThree6';
		var whyThreeValue6=0;
		var whyThreeArray6 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyThree6=whyThree6+i;		
			whyThreeValue6=document.getElementById(whyThree6).value;
			if(document.getElementById(whyThree6).checked==true){
				var queId = 'whyThree1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyThreeArray6.push('w3_'+queIdValue);
			}
			whyThree6='whyThree6';
			
		}
		document.getElementById('whyThreeColumnFour').value=whyThreeArray6.toString();
		
		var whyThree7='whyThree7';
		var whyThreeValue7=0;
		var whyThreeArray7 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyThree7=whyThree7+i;		
			whyThreeValue7=document.getElementById(whyThree7).value;
			if(document.getElementById(whyThree7).checked==true){
				var queId = 'whyThree1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyThreeArray7.push('w3_'+queIdValue);
			}
			whyThree7='whyThree7';
			
		}
		document.getElementById('whyThreeColumnFive').value=whyThreeArray7.toString();
		////  WHY 4
		
		var whyFour3='whyFour3';
		
		var whyFourValue3=0;
		var rowCount = document.getElementById('chuTable4').rows.length;
		var whyFourArray3 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyFour3=whyFour3+i;
			//alert("whyFour3:  "+whyFour3);
			whyFourValue3=document.getElementById(whyFour3).value;
			
			if(document.getElementById(whyFour3).checked==true){
				var queId = 'whyFour1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyFourArray3.push('w4_'+queIdValue);
			}
			whyFour3='whyFour3';
			
		}
		document.getElementById('whyFourColumnOne').value=whyFourArray3.toString();
		
		var whyFour4='whyFour4';
		var whyFourValue4=0;
		var whyFourArray4 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyFour4=whyFour4+i;		
			whyFourValue4=document.getElementById(whyFour4).value;
			if(document.getElementById(whyFour4).checked==true){
				var queId ='whyFour1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyFourArray4.push('w4_'+queIdValue);
			}
			whyFour4='whyFour4';
			
		}
		document.getElementById('whyFourColumnTwo').value=whyFourArray4.toString();
		
		var whyFour5='whyFour5';
		var whyFourValue5=0;
		var whyFourArray5 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyFour5=whyFour5+i;		
			whyFourValue5=document.getElementById(whyFour5).value;
						
			if(document.getElementById(whyFour5)==true){
				var queId = 'whyFour1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyFourArray5.push('w4_'+queIdValue);
			}
			whyFour5='whyFour5';
		}
		document.getElementById('whyFourColumnThree').value=whyFourArray5.toString();
		var whyFour6='whyFour6';
		var whyFourValue6=0;
		var whyFourArray6 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyFour6=whyFour6+i;		
			whyFourValue6=document.getElementById(whyFour6).value;
			
			
			if(document.getElementById(whyFour6).checked==true){
				var queId = 'whyFour1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyFourArray6.push('w4_'+queIdValue);
			}
			whyFour6='whyFour6';
		}
		document.getElementById('whyFourColumnFour').value=whyFourArray6.toString();
		
		var whyFour7='whyFour7';
		var whyFourValue7=0;
		var whyFourArray7 = new Array();
		for(var i=1;i<parseFloat(rowCount);i++)
		{
			whyFour7=whyFour7+i;		
			whyFourValue7=document.getElementById(whyFour7).value;
			if(document.getElementById(whyFour7).checked==true){
				var queId = 'whyFour1'+i;
				var queIdValue =document.getElementById(queId).value;
				whyFourArray7.push('w4_'+queIdValue);
			}
			whyFour7='whyFour7';
		}
		document.getElementById('whyFourColumnFive').value=whyFourArray7.toString();		
		var comments = document.getElementById('commentsChu').value;
		var srcCode = document.getElementById('favoriteIconId').getElementsByTagName("img")[0].getAttribute("src");
		var favoritValue;
		if(srcCode=="content/images/favicon.jpg"){
			favoritValue="Yes";
		}else{
			favoritValue="No";	

		}
		document.forms[0].action="saveAllTableRecord.jpage?recordNo="+recordId+"&recordNumber="+recordNumber+"&favoritValue="+favoritValue+"&comments="+comments+"&timeStamp="+timeStamp;
		document.forms[0].submit();

}

function exportChuData(){
	var timeStamp= document.getElementById("timeStamp").value;
	document.forms[0].action="excelDownloadChuvData.jpage?timeStamp="+timeStamp;
	document.forms[0].submit();
}

function pinPopUp() {
	$('#pinPop').replaceWith('<img id="pinPop" src="content/images/unpin.jpg" onclick="unpinPopUp()"');
	
}
function pinPopUp2(){
	$('#pinPop2').replaceWith('<img id="pinPop2" src="content/images/unpin.jpg" onclick="unpinPopUp2()"');
}
function pinPopUp3(){
	$('#pinPop3').replaceWith('<img id="pinPop3" src="content/images/unpin.jpg" onclick="unpinPopUp3()"');
}
function pinPopUp4(){
	$('#pinPop4').replaceWith('<img id="pinPop4" src="content/images/unpin.jpg" onclick="unpinPopUp4()"');
}
function pinPopUp5(){
	$('#pinPop5').replaceWith('<img id="pinPop5" src="content/images/unpin.jpg" onclick="unpinPopUp5()"');
}
function unpinPopUp() {
	$('#pinPop').replaceWith('<img id="pinPop" src="content/images/pin.jpg" onclick="pinPopUp()" ');
}
function unpinPopUp2(){
	$('#pinPop2').replaceWith('<img id="pinPop2" src="content/images/pin.jpg" onclick="pinPopUp2()" ');
}
function unpinPopUp3(){
	$('#pinPop3').replaceWith('<img id="pinPop3" src="content/images/pin.jpg" onclick="pinPopUp3()" ');
}
function unpinPopUp4(){
	$('#pinPop4').replaceWith('<img id="pinPop4" src="content/images/pin.jpg" onclick="pinPopUp4()" ');
}
function unpinPopUp5(){
	$('#pinPop5').replaceWith('<img id="pinPop5" src="content/images/pin.jpg" onclick="pinPopUp5()" ');
}

/**
 * LOGOUT
 */



function logOut(){	
	invalidateSession();
	document.forms[0].action="https://affiliateservices.gecompany.com/logoff/logoff.jsp";
	document.forms[0].submit();
}



function deleteCookie(name, path, domain) {
  //  alert("name"+name);	
  //  alert("path"+path);
  //  alert("domain"+domain);
    if (getCookies(name)) {

    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    	"; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
/* function getCookie(){
	  var pairs = document.cookie.split(";");
	  var cookies = {};
	  for (var i=0; i<pairs.length; i++){
	    var pair = pairs[i].split("=");
	    cookies[pair[0]] = unescape(pair[1]);
	    alert(pair[1]+"::"+pair[0]);
	  }
	  return cookies;
	}*/

function getCookies(name) {
	var dc = document.cookie;

	var prefix = name + "=";
	var begin = dc.indexOf(";" + prefix);
	if (begin == -1) {
	begin = dc.indexOf(prefix);

	if (begin != 0) return null;
	} else
	begin += 2;
	
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	end = dc.length;
	return unescape(dc.substring(begin + prefix.length, end));
}

function encode( uri ) {
    if (encodeURIComponent) {
        return encodeURIComponent(uri);
    }
    if (escape) {
        return escape(uri);
    }
}


function decode( uri ) {
    uri = uri.replace(/\+/g, ' ');

    if (decodeURIComponent) {
        return decodeURIComponent(uri);
    }
    if (unescape) {
        return unescape(uri);
    }
    return uri;
}


function invalidateSession(){
	
	//alert('Hi in invalidate sesssion');
	var url = "logout.jpage";
	data = "";
	
	url += data;
	invokeSessionAjaxFunctionality(url, data);
	
}
function invokeSessionAjaxFunctionality(url, data){
	encode(data);
	return retrieveSessionURL(url, data);
}
function retrieveSessionURL(url, data) {
	  if (window.XMLHttpRequest) { 
		    req = new XMLHttpRequest();
		    req.onreadystatechange = processGetSessionUsingXML;
		    try {
		      req.open("POST", url, true);
		    } catch (e) {
		      alert(e);
		    }
		    req.send(null);
		  }
		  else if (window.ActiveXObject) { // IE  	
		    req = new ActiveXObject("Microsoft.XMLHTTP");
		    if (req) {
			  // Send the POST request
			  req.onreadystatechange = processGetSessionUsingXML;
		      req.open("POST", url, true);
		      req.setRequestHeader("Connection", "close");
		      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		      req.setRequestHeader("Method", "POST" + url + "HTTP/1.1");
		      if ( !data ) data="";
		      req.send(data);
		    }
		  }
		}

function processGetSessionUsingXML(){
	if(req.readyState==4 || req.readyState=="complete")
	{
		return true;
	  } 
	}

/**
 * LOGOUT
 */

function setFavorateValue(){
	if(document.getElementsByName('favorateValue').value=="Yes"){
		document.getElementsByName('favorateValue').value="No";
		$("#favicon").attr('src', 'content/images/favicon_border_yell.jpg');
	}else{
	document.getElementsByName('favorateValue').value="Yes";
	//alert(document.getElementsByName('favorateValue').value);
	$("#favicon").attr('src', 'content/images/favicon.jpg');
	}
}