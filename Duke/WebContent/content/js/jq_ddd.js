function destroyYearDD(){
	$("#year").multiselect('destroy');
}
function reloadYearDD(){
	$("#year").multiselect('refresh');
}
function loadYearDD(){
	$("#year").multiselect({noneSelectedText:'Year',		
		   selectedList: 12,
		   header: false,
		   multiple: false,
		   minWidth:200,
		open:function(){
		if(document.getElementById("g1")!=null)document.getElementById("g1").style.display="none";
		},
		close:function(){
		if(document.getElementById("g1")!=null)document.getElementById("g1").style.display="block";
		} 
		});
}

function destroyQuarterDD(){
	$("#quarter").multiselect('destroy');
}
function reloadQuarterDD(){
	$("#quarter").multiselect('refresh');
}
function loadQuarterDD(){
	$("#quarter").multiselect({noneSelectedText:'Quarter',		
		   selectedList: 12,
		   header: false,
		   multiple: false,
		   minWidth:200
		
		});
}



if(document.forms[0].year!=null)loadYearDD();
if(document.forms[0].quarter!=null)loadQuarterDD();