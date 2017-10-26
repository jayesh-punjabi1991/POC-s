/*
 * SimpleModal Basic Modal Dialog
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2010 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: basic.js 254 2010-07-23 05:14:44Z emartin24 $
 */
function updateRequirementStatus(stauts){
	jQuery(function ($) {
		alert(document.forms[0].drpStatus.value);
	document.forms[0].drpStatus.value = stauts;
	alert(document.forms[0].drpStatus.value);
			$('#basic-modal-content').modal();
			return false;
	});
}

	
	

	



