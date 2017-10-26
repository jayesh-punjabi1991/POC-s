//to retrieve options for the selected drop down
//Variable to hold the xmlHTTPRequest obj
var req;
var toggleId;
var SelectId="divWorking";
var validNavigation = false;
var xmlHttpObj;

function doUnload(){
	
}

function ajaxFetchProblemStatementForRead(trackerId,columnType) {
	var returnValue="";
	xmlHttpObj=getXmlHttpObject();
	if(xmlHttpObj==null)
            {
		alert("Browser doesn't Support HTTP Request");
		return;
	}
	else{
		/*var url = "fetchColumnValues.jpage?prepareDataID="+trackerId+"&columnName="+columnType;
		$.post(url,
				$("form").serialize(),function(data){
			if (data != "") {
				alert(data);
			}
		});	*/
	    
		xmlHttpObj.open("GET","fetchColumnValues.jpage?prepareDataID="+trackerId+"&columnName="+columnType,false);
        xmlHttpObj.onreadystatechange=function(){ 
        	if (xmlHttpObj.readyState == 4 || xmlHttpObj.readyState == "complete") {
        		returnValue = xmlHttpObj.responseText;
        	}
        };
        xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlHttpObj.send(null);
	}
	
	return  returnValue;

}


function getXmlHttpObject(){
	var oXmlHttp=null;
	if(window.XMLHttpRequest) // For Non IE Browsers
	{
		oXmlHttp=new XMLHttpRequest();
	}
	else if(window.ActiveXObject)//For IE Browsers
	{
		oXmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	return oXmlHttp;
}


function loadYearDependents(yrObj,targetObjs){
	if (yrObj.value != "" && yrObj.value != "") {
		clearOption(targetObjs);
		var url = "loadYearDependents.jpage?selectedOption=" + yrObj.value+ "&targetObjects=" +targetObjs;
		data = "";
		data += "&selectedOption=" + yrObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
}


function loadPreAdjustSubRegion(yrObj,targetObjs){
	if (yrObj.value != "" && yrObj.value != "") {
		clearOption(targetObjs);
		var url = "loadPreAdjustSubRegion.jpage?selectedOption=" + yrObj.value+ "&targetObjects=" +targetObjs;
		data = "";
		data += "&selectedOption=" + yrObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
}

function loadGroupDependents(groupObj,targetObjs){
	if(groupObj.value=="Other")
	{
		document.getElementById('groupTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('groupTDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var url = "loadGroupDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}

function loadModality1Dependents(groupObj,targetObjs,reqObj1){
	if(groupObj.value=="Other")
	{
		document.getElementById('modality1TDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('modality1TDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var req1=document.getElementById(reqObj1).value;
		var url = "loadModality1Dependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&requiredObj1="+req1 ;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}



function loadModality2Dependents(groupObj,targetObjs,reqObj1){
	if(groupObj.value=="Other")
	{
		document.getElementById('modality2TDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('modality2TDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var req1=document.getElementById(reqObj1).value;
		var url = "loadModality2Dependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&requiredObj1="+req1 ;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}


function loadSubModalityDependents(groupObj,targetObjs,reqObj1,reqObj2){
	if(groupObj.value=="Other")
	{
		document.getElementById('subModalityTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('subModalityTDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var req1=document.getElementById(reqObj1).value;
		var req2=document.getElementById(reqObj2).value;
		var url = "loadSubModalityDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&requiredObj1="+req1+"&requiredObj2="+req2  ;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}
function loadSegmentDependents(groupObj,targetObjs,reqObj1,reqObj2,reqObj3){
	if(groupObj.value=="Other")
	{
		document.getElementById('segmentTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('segmentTDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var req1=document.getElementById(reqObj1).value;
		var req2=document.getElementById(reqObj2).value;
		var req3=document.getElementById(reqObj3).value;
		var url = "loadSegmentDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&requiredObj1="+req1+"&requiredObj2="+req2+"&requiredObj3="+req3;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}

function loadProdDependents(groupObj)
{
	if(groupObj.value=="Other")
	{
		document.getElementById('productTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('productTDID').style.display='none';
	}
}

function loadRegionDependents(groupObj,targetObjs){
	
	if(groupObj.value=="Other")
	{
		document.getElementById('regionTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('regionTDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var url = "loadRegionDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}
function loadRegionDependent(groupObj,targetObjs){
	var region = document.getElementById("sRegion").value;
	if(region == "other"){
		document.getElementById("sOtherRegionId").style.display = "block";
	}
    	clearOption(targetObjs);
		var url = "loadRegionDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
}
function loadSubRegionDependents(groupObj,targetObjs,reqObj1){
	if(groupObj.value=="Other")
	{
		document.getElementById('subregionTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('subregionTDID').style.display='none';
	if (groupObj.value != "" && groupObj.value != "") {
		clearOption(targetObjs);
		var req1=document.getElementById(reqObj1).value;
		var url = "loadSubRegionDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&requiredObj1="+req1 ;
		data = "";
		data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
		url += data;
	    invokeAjaxFunctionality(url, data);
	} else {
	     clearOption(targetObjs);
	} 
	}
}

function loadStateDependents(groupObj){
	if(groupObj.value=="Other")
	{
		document.getElementById('stateTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('stateTDID').style.display='none';
		
	}
}

function loadCountryDependents(groupObj, targetObjs, region1, subRegion1)
{
	
	if(groupObj.value=="Other")
	{
		document.getElementById('countryTDID').style.display='inline';
		return false;
	}
	else
	{
		document.getElementById('countryTDID').style.display='none';
		if (groupObj.value != "" && groupObj.value != "") {
			clearOption(targetObjs);
			var region=document.getElementById(region1).value;
			var subRegion=document.getElementById(subRegion1).value;
			var url = "loadCountriesDependents.jpage?selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs+"&region="+region+"&subRegion="+subRegion ;
			data = "";
			data += "&selectedOption=" + groupObj.value+ "&targetObjects=" +targetObjs;
			url += data;
		    invokeAjaxFunctionality(url, data);
		} else {
		     clearOption(targetObjs);
		}
	}
}

/*function logOutNOTUSING(){
	
	invalidateSession();
	deleteCookie ("SMSESSION", "/", ".ge.com");
	document.forms[0].action="http://3.206.96.73:8199/CHUV/";
	document.forms[0].submit();
}
*/
function deleteCookie(name, path, domain) {
	
    if (getCookies(name)) {
    document.cookie = name + "=" +
    ((path) ? "; path=" + path : "") +
    ((domain) ? "; domain=" + domain : "") +
    	"; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function getCookies(name) {
	var dc = document.cookie;
	//alert("document.cookie : "+dc);
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
	begin = dc.indexOf(prefix);
	if (begin != 0) return null;
	} else
	begin += 2;
	var end = document.cookie.indexOf(";", begin);
	if (end == -1)
	end = dc.length;
	//alert("bfr return value "+(dc.substring(begin + prefix.length, end)));
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
	
	  if (window.XMLHttpRequest) { // Non-IE browsers
		 
		   // Set up the request
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
function processGetSessionUsingXML() {
	if(req.readyState==4 || req.readyState=="complete")
	{
		return true;
	  } 
	}




function invokeAjaxFunctionality(url, data){
	
	
	encode(data);
	return retrieveURL(url, data);
}

function retrieveURL(url, data) {
	  if (window.XMLHttpRequest) { // Non-IE browsers
	   // Set up the request
	    req = new XMLHttpRequest();
	    req.onreadystatechange = processGetOptionsUsingXML;
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
		  req.onreadystatechange = processGetOptionsUsingXML;
	      req.open("POST", url, true);
	      req.setRequestHeader("Connection", "close");
	      req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	      req.setRequestHeader("Method", "POST" + url + "HTTP/1.1");
	      if ( !data ) data="";
	      req.send(data);
	    }
	  }
	}

//function to encode uri
function encode( uri ) {
    if (encodeURIComponent) {
        return encodeURIComponent(uri);
    }
    if (escape) {
        return escape(uri);
    }
}

// function to decode the uri
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

// function to enable the selected dropdown list
function enableDDL(obj){
	document.getElementById(obj).disabled = false; //enabling the dropdown
}
function processGetFeedbackUsingXML() {
	
if(req.readyState==4 || req.readyState=="complete")
{
	if (req.status == 200) {
		
	    var myChildren = req.responseXML.childNodes;  
	    
	   	 
	    for (var run = 0; run < myChildren.length; run++)
	    {    
		   if(myChildren[run].nodeName=='feedbackStatus')
		   {
				var xmlDocument = req.responseXML.getElementsByTagName('ROW');
				 
				for(var eachRow=0;eachRow<xmlDocument.length;eachRow++) {					
					items = xmlDocument[eachRow].childNodes;
            
					if(items!=null){
						if (items.length > 0)  {
							for (var i=0; i<items.length; i++) {
								var msgValue = items[i].firstChild.nodeValue;
								var issueTo = document.bugForm.issueTo.value;
								document.bugForm.issueTo.value= "";
								var issueSeverity = document.bugForm.issueSeverity.value;
								document.bugForm.issueSeverity.value="";
								var subject = document.bugForm.subject.value;
								document.bugForm.subject.value="";
								var issueDescription = document.bugForm.issueDescription.value;
								document.bugForm.issueDescription.value="";
									
									document.getElementById("successMsg").style.display="block";
									document.getElementById("ajaxImgId").style.display="none";
									document.getElementById("mainTable").style.display="none";
									
							}
						}
					}
				}
			}
		}
	}
  } 
}


function processGetOptionsUsingXML() {
	 
	 if (req.readyState == 4) {
	        if (req.status == 200) {
	        	
	        	//alert(req.responseText)
	            xml = req.responseXML; 
			    // parse the XML
	            if (xml.documentElement) {
	            	//get the target list
		            var targetList = xml.documentElement.getElementsByTagName("target");
		            if (targetList != null && targetList.length > 0) {	            	             	  
							for (var j = 0; j < targetList.length; j++) {
								// retrieving dropdown field name
				             	var target = xml.documentElement.getElementsByTagName("target")[j].firstChild.nodeValue;					             	
				             	var objType = xml.documentElement.getElementsByTagName("objType")[j].firstChild.nodeValue;			             	
				             	if (objType == "comboBox") {
		        			     	// retrieving options
					             	var opts = xml.documentElement.getElementsByTagName("options-"+target);				             	
		        			     	var optionsList = new Array();
									if (opts != null) {									
										for (var i = 0; i < opts.length; i++) {
							                var name = decode(opts[i].firstChild.firstChild.nodeValue);						                
											optionsList[i] = name;
											
											//alert(name)
				            			}
					    			}	
									
			    				setRetrievedDatafromAjax(optionsList, target);		    				
			    				//toggleWork(false,  '');
			    		
		    					}else if (objType == "textData") {
		    		    			var opts = xml.documentElement.getElementsByTagName("options-"+target);
		         					var list = new Array();
		         					for (var i = 0; i < opts.length; i++) {
		         		    		var name;
		         		   			if (opts[i].firstChild.firstChild != null){
			                	 		name = decode(opts[i].firstChild.firstChild.nodeValue);
			               			}else
			                    		name = ""; 	
			                	list[i] = name;
			    			   }		    			   	
			    			  setRetrievedTextDatafromAjax(list, target);
			    			}
			    		//toggleWork(false,  '');
		    		  }
		    		}

					else {
					   // alert("Failed to receive the XML document from the request");
		               // toggleWork(false, '');
					}
	        }
	        else {
	           	alert("There was a problem retrieving the XML data:\n" + req.statusText);
	           	//toggleWork(false,  '');
	        }
	    }// status
	   }// ready state
}


function setRetrievedDatafromAjax(retrieveList, targetObjName) 
{
    var targetObj = document.getElementById(targetObjName);
    if(targetObj!= null){	
    	targetObj.disabled = false; 
    	setComboValues(retrieveList, targetObj);
    }
	return;
}


function setComboValues( retrieveList, targetObj) {
      targetObj.options.length=0;
      var counter = 0;
      if(SelectId !=null && SelectId.length >0){
  
    			 
    	  var newOpt = new Option( value, key );
	      targetObj.options[counter] = newOpt;
	      
		  for (var i = 0; i < retrieveList.length; i++) {
			  
	          var key = retrieveList[i].substring(retrieveList[i].lastIndexOf("&&")+2);
	          var value = retrieveList[i].substring(0, retrieveList[i].lastIndexOf("&&") );
	          if(key==targetObj.name){
	        	  
	          }else{
			      var newOpt = new Option( value, key );
			      targetObj.options[counter] = newOpt; // setting options
			      //targetObj.options[counter].value = retrieveList[i];
			      counter++;
	          }
		  }
	
		  
		 // alert(targetObj.name)
		  
	  if(targetObj.name=='qtr')reloadQtrDD();
	  if(targetObj.name=='month')reloadMonthDD();
	  if(targetObj.name=='fweek')reloadFWeekDD();
	  if(targetObj.name=='subRegion')reloadSubRegionDD();
	  if(targetObj.name=='countryZone')reloadZoneDD();
	  if(targetObj.name=='lct')reloadLCTDD();
	  if(targetObj.name=='sModality')reloadModalityDD();
	  if(targetObj.name=='sSubModality')reloadSubModalityDD();
	  if(targetObj.name=='sSegment')reloadSegmentDD();
	  if(targetObj.name=='sProduct')reloadProductDD();
	  
	  if(targetObj.name=='sSubRegion')reloadSSubRegionDD();
	  if(targetObj.name=='sCountry')reloadCountryDD();
	  if(targetObj.name=='sState')reloadStateDD();
	  
	  
	  
	  
	  if(targetObj.name=='partsCountryZone')reloadPartsCountryZone();
	  if(targetObj.name=='qtrSingle')reloadQtrSingleDD();
	  if(targetObj.name=='monthSingle')loadMonthSingleDD();
	  if(targetObj.name=='fweekSingle')reloadFweekSingleDD();
	  
	  
	  if(targetObj.name=='startFweek')reloadStartFWeekDD();
	  if(targetObj.name=='endFweek')reloadEndFWeekDD();
	  if(targetObj.name=='submetric')reloadSubMetrics();
	  if(targetObj.name=='relatedDataSets')reloadRelatedDataSets();
	  
	   return;
     }
}

function setRetrievedTextDatafromAjax(retrieveData, targetObjName) 
{
    if (targetObjName == 'doesModelExists') {
      setRepeatFailure(retrieveData);
    }else {
	    var targetObj = document.getElementById(targetObjName);
		targetObj.disabled = false; 
		setTextData(retrieveData, targetObj);
		return;
	}
}

function setTextData(retrieveData, targetObj) {
	targetObj.value  = retrieveData;
}

function clearOption(targetObjOriginal)
{
	var mySplitResult = targetObjOriginal.split(",");
	for(i = 0; i < mySplitResult.length; i++){
		var splitObject = mySplitResult[i];
		
		var targetObj = document.getElementById(mySplitResult[i]);
		var mySplitResult1 = splitObject.split(":");
		if (mySplitResult1.length > 0){
			var targetObj1 = document.getElementById(mySplitResult1[0]);
			if (targetObj1!= null && ( targetObj1.type=="select-one" ||  targetObj1.type=="select-multiple")) {
				if(targetObj1.name=="month"){
					targetObj1.options.length=0;
					//if(SelectId !=null && SelectId.length >0){
					//targetObj1.options[0] = new Option(SelectId); 
					//}else{
					targetObj1.options[0] = new Option("Month"); 	
					//}
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sModality"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sSubModality"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sSegment"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sProduct"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sSubRegion"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="sCountry"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}else if(targetObj1.name=="sState"){
					targetObj1.options.length=0;
					targetObj1.options[0] = new Option("Other"); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="singleFweek"){
					targetObj1.options.length=0;
					//if(SelectId !=null && SelectId.length >0){
					//targetObj1.options[0] = new Option(SelectId); 
					//}else{
					targetObj1.options[0] = new Option("F W"); 	
					//}
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="fweek"){
					targetObj1.options.length=0;
					//if(SelectId !=null && SelectId.length >0){
					//targetObj1.options[0] = new Option(SelectId); 
					//}else{
					targetObj1.options[0] = new Option("F W"); 	
					//}
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;
				}
				else if(targetObj1.name=="currentExcelFields"){
					targetObj1.options.length=0;
					
				}
				else if(targetObj1.name=="dbExcelFields"){
					targetObj1.options.length=0;
					
				}else{
					/*targetObj1.options.length=0;
					targetObj1.options[0] = new Option(""); 	
					targetObj1.options[0].value = "";
					targetObj1.options[0].selected;*/
				}
				 
				 
			} else {
				if (targetObj1!= null) targetObj1.value='';
			}
		//
			  if(targetObj!= null && targetObj.name=='qtr')reloadQtrDD();
			  if(targetObj!= null && targetObj.name=='month')reloadMonthDD();
			  if(targetObj!= null && targetObj.name=='fweek')reloadFWeekDD();
			  if(targetObj!= null && targetObj.name=='subRegion')reloadSubRegionDD();
			  if(targetObj!= null && targetObj.name=='countryZone')reloadZoneDD();
			  if(targetObj!= null && targetObj.name=='lct')reloadLCTDD();
			  if(targetObj!= null && targetObj.name=='sModality')reloadModalityDD();
			  if(targetObj!= null && targetObj.name=='sModality2')reloadModality2DD();
			  if(targetObj!= null && targetObj.name=='sSubModality')reloadSubModalityDD();
			  if(targetObj!= null && targetObj.name=='sSegment')reloadSegmentDD();
			  if(targetObj!= null && targetObj.name=='sProduct')reloadProductDD();
			  if(targetObj!= null && targetObj.name=='sSubRegion')reloadSubRegionDD();
			  if(targetObj!= null && targetObj.name=='sCountry')reloadCountryDD();
			  if(targetObj!= null && targetObj.name=='sState')loadStateDD();		  
			  
			  if(targetObj!= null && targetObj.name=='submetric')reloadSubMetrics();
			  if(targetObj!= null && targetObj.name=='relatedDataSets')reloadRelatedDataSets();
			  
			  if(targetObj!= null && targetObj.name=='qtrSingle')reloadQtrSingleDD();
			  if(targetObj!= null && targetObj.name=='monthSingle')loadMonthSingleDD();
			  if(targetObj!= null && targetObj.name=='fweekSingle')reloadFweekSingleDD();
			
		}
	}
}







