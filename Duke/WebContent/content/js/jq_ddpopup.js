function loadScheduleHour(){
	$("#scheduleHour").multiselect({noneSelectedText:'Hour',
		multiple: false, 
		minWidth:120,
		header: false,
		selectedList: 2
	});
}

function loadScheduleMin(){
	$("#scheduleMin").multiselect({noneSelectedText:'Minute',
		multiple: false, 
		minWidth:120,
		header: false,
		selectedList: 2
	});
}

function loadScheduleFreq(){
	$("#scheduleFreq").multiselect({noneSelectedText:'Frequency',
		multiple: false, 
		minWidth:120,
		header: false,
		selectedList: 2
	});
}

function loadScheduleZone(){
	$("#scheduleZone").multiselect({noneSelectedText:'Zone',
		multiple: false, 
		minWidth:120,
		header: false,
		selectedList: 2
	});
}

$(document).ready(function() {
	
	if(document.forms[0].loaction!=null) loadScheduleHour();
	if(document.forms[0].country!=null) loadScheduleMin();
	if(document.forms[0].msaBucket!=null) loadScheduleFreq();
	if(document.forms[0].connectivityStatus!=null) loadScheduleZone();
	
	
	 wireUpEvents();  
	
});