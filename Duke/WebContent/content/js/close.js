/**
 * This javascript file checks for the brower/browser tab action.
 * It is based on the file menstioned by Daniel Melo.
 * Reference: http://stackoverflow.com/questions/1921941/close-kill-the-session-when-the-browser-or-tab-is-closed
 */
var validNavigation = false;

function endSession() {
  // Browser or broswer tab is closed
  // Do sth here ...
	
 invalidateSession();
}

function wireUpEvents() {
	  
	  $(window).unload(function() {
		  if (!validNavigation) {
		         endSession();
		      }
	  });
	  
	  $(document).keydown(function(e){
		  if (e.keyCode == 116){
		      validNavigation = true;
		    }
	  });
			  
  

  // Attach the event click for all links in the page
  $("a").bind("click", function() {
    validNavigation = true;
  });
  // Attach the event click for all links in the page
  $("a").bind("click", function() {
    validNavigation = true;
  });

  $("form").bind("submit", function() {
	  
    validNavigation = true;
  });

  // Attach the event click for all inputs in the page
  $("select").bind("change", function() {
	  
    validNavigation = true;
  });
  
//Attach the event click for all inputs in the page
  $("input[type=submit]").bind("click", function() {
	  
    validNavigation = true;
  });
  
  // Attach the event click for all inputs in the page
  $("input[type=button]").bind("click", function() {
	  
    validNavigation = true;
   
  });
  
  // Attach the event click for all inputs in the page
  $("input[type=reset]").bind("click", function() {
	  
    validNavigation = true;
  });
  
  
}

