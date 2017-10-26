function validateUser(){
	$('#userResultMsg').html("");
	var userid = $("#txtsso").val();
	if(userid == ""){
		$('#useridmsgDiv').html("Enter user Id.");
		return false;
	}
	$("#processDiv").show();
	form = $('#LoginForm').serialize();
	$.ajax({
        url: "forgetPassWord.jpage",
        type: "post",
        data: form,
        success: function(retrunData) {
        	$("#processDiv").hide();
        	$('#useridmsgDiv').html("");
        	$('#userResultMsg').html(retrunData);
        	
        }
    }); 
}

function saveUserDetails(){
	var validator = false; 
	$('input:text').each(function(){
	       if( $(this).val().length === 0){
	    	// $("#error").show('slow');
	    	   var id = $(this).attr('id');
	    	   $('#'+id).css("background-color", "orange");
	    	   $('#userRegFormValidMsg').html("Feel in all mandatory fields.");  
	    	   validator=true;
	    	   return false;
	       }
	    });	
	
	if(validator){
		return false;
	}
	
	//document.forms[0].action ="getMatrixExcApprovedMail.jpage";
	//document.forms[0].submit();
	  var form = $('#userForm').serialize();
		$.ajax({
	        url: "userRegistration.jpage",
	        type: "post",
	        data: form,
	        success: function(retrunData) {
		           $('#userRegFormValidMsg').html(retrunData);
	            }
	    });
	}


function checkUser(){
	val = $("#SSOId").val();
	if(val.length==0){
		$('#SSOValidatorId').html(""); 
		 $('#SSOValidationMsgId').html("");
		 return false;
	}
	var $regexname=/^([a-zA-Z0-9]{3,15})$/;
	if ( !val.match($regexname)) {
		alert("Pleas enter valid Id.");
		$("#"+id).val("");
		return false;
	}
	var form = $('#userForm').serialize();
	$.ajax({
        url: "checkUserForReg.jpage",
        type: "post",
        data: form,
        success: function(retrunData) {
	        	if(retrunData =="Exists" ){
	        		$('#SSOValidatorId').html("<img src='content/images/wrong.png' alt='Invalid' />"); 
	                $('#SSOValidationMsgId').html(" User already exists.");
	        	}else{
	        		$('#SSOValidatorId').html("<img src='content/images/accept.png' alt='Success' />"); 
	        		 $('#SSOValidationMsgId').html("");
	        	}
            
            }
    });
} 

function checkName(id){
	val = $("#"+id).val();
	//var intRegex = /^\d+$/;
	var $regexname=/^([a-zA-Z\s]{2,40})$/;
	if (!val.match($regexname)) {
		alert("Pleas enter valid Name.");
		$("#"+id).val("");
		return false;
	}
} 

function ValidateField(id){
	val = $("#"+id).val();
	var $regexname=/^([a-zA-Z0-9]{2,40})$/;
	if (!val.match($regexname)) {
		alert("Invalide input.");
		$("#"+id).val("");
		return false;
	}
}

function validatePassword(){
	 $('#conformPwdMsgId').html("");
	var newPassword = $("#newPasswordId").val();
	if(""==newPassword) {
		alert("Enter New password.");
		return false;
	}
	var form = $('#userForm').serialize();
	$.ajax({
        url: "matchPassword.jpage",
        type: "post",
        data: form,
        success: function(retrunData) {
        	if(retrunData =="P" ){
	        		$('#matchPasswordValidId').html("<img src='content/images/accept.png' alt='Success' />");  
	                $('#conformPwdMsgId').html("");
	        	}else{
	        		$('#matchPasswordValidId').html("<img src='content/images/wrong.png' alt='Invalid' />");
	        		 $('#conformPwdMsgId').html("Password does not match.");
	        	}
            }
    });
}

function restePassword(){
	 var oldPwd = $("#passwordId").val();
	 var newPwd = $("#newPasswordId").val();
	 var confPwd = $("#confirmNewPasswordId").val();
	
	 if(""==oldPwd) {
			alert("Enter Old password.");
			return false;
		}
	if(""==newPwd) {
		alert("Enter New password.");
		return false;
	}
	
	if(""==confPwd) {
		alert("Enter Confirm password.");
		return false;
	}
	
	var form = $('#userForm').serialize();
	$.ajax({
       url: "restePasswordSave.jpage",
       type: "post",
       data: form,
       success: function(retrunData) {
       	if(retrunData =="Your Password has been Changed" ){
	                $('#pwdupdateMsgInfo').html("Password changed successfully.");
	        	}else{
	        		 $('#pwdupdateMsgInfo').html("Password not updated.<br>Please contact to admin.");
	        	}
       	$('#matchPasswordValidId').html("");
           }
   });
}


function closeIt(){
	alert("Testing ...");
	window.close();
    return false;
}
