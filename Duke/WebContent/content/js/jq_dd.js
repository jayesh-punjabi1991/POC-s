function destroyRegionDD(){
	$("#serviceRegion").multiselect('destroy');
}
function reloadRegionDD(){
	$("#serviceRegion").multiselect('refresh');
}
function loadRegionDD(){
	$("#serviceRegion").multiselect({noneSelectedText:'Region',		
		   selectedList: 12,
		   header: false,
		   multiple: false,
		   minWidth:145

		});
}


function destroyModalityDD(){
	$("#modalityS").multiselect('destroy');
}
function reloadModalityDD(){
	$("#modalityS").multiselect('refresh');
}
function loadModalityDD(){
	$("#modalityS").multiselect({noneSelectedText:'Modality',		
		   selectedList: 12,
		   header: false,
		   multiple: false,
		   minWidth:130

		});
}