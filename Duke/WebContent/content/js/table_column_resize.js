var ob;
var obLeft;
var obRight;
var over = false;
var iEdgeThreshold = 10;
 
function findPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
      curleft = obj.offsetLeft;
      curtop = obj.offsetTop;
      while (obj = obj.offsetParent) {
         curleft += obj.offsetLeft;
         curtop += obj.offsetTop;
      }
   }
   return [curleft,curtop];
}
 
/* Function that tells me if on the border or not */
function isOnBorderRight(objTable,objTh,event){
  var width = objTh.offsetWidth;
  var left = objTh.offsetLeft;
  var pos = findPos(objTable);
  var absRight = pos[0] + left + width;
 
  if( event.clientX > (absRight - iEdgeThreshold) ){
      return true;
  }
 
  //return false;    // commented for temporary fix
  return true;
}
 
function getNodeName(objReference,nodeName){
   var oElement = objReference;
   while (oElement != null && oElement.tagName != null && oElement.tagName != "BODY") {
      if (oElement.tagName.toUpperCase() == nodeName) {
         return oElement;
      }
      oElement = oElement.parentNode;
   }
   return null;
}
 
function doResize(objTh,event){
	
    if(!event) event = window.event;
    var objTable = getNodeName(objTh,"TABLE");
    if( isOnBorderRight(objTable,objTh,event)){ 
       over=true;
       objTh.style.cursor="e-resize";
    }
    else{
       over=false;
       objTh.style.cursor="";
    }
    return over;
}
 
function doneResizing(){
   over=false;
}
 
function MD(event) {
   if(!event) event = window.event;
 
   MOUSTSTART_X=event.clientX;
   MOUSTSTART_Y=event.clientY;
 
   if (over){      
       if(event.srcElement)ob = event.srcElement;
       else if(event.target)ob = event.target;
       else return;
 
       ob = getNodeName(ob,"TH");
       if(ob == null) return;
       //ob2 = getNodeName(ob,"TABLE");
       //obLeft = ob.previousSibling;
       obRight = ob.nextSibling;
       //obLeft = ob.previousElementSibling; 
       //obRight = ob.nextElementSibling;  // Uncomment For FF
       obwidth=parseInt(ob.style.width);
       if (obLeft != null)
       obLeftWidth=parseInt(obLeft.style.width);
       if (obRight != null)
       obRightWidth=parseInt(obRight.style.width);
       //obwidth2=parseInt(ob2.offsetWidth);
   }        
}
 
function MM(event) {
    if(!event) event = window.event;
 
    if (ob) {
        st=event.clientX-MOUSTSTART_X+obwidth;
        //st2=event.clientX-MOUSTSTART_X+obwidth2;
        //document.getElementById("infoDiv").innerHTML = "st=" + st + " clientX=" + event.clientX + " moustart_x=" + MOUSTSTART_X + " obwidth=" + obwidth;
        //document.getElementById("infoDiv").innerHTML += ;
        //document.getElementById("infoDiv").innerHTML += ;
        //document.getElementById("infoDiv").innerHTML += obwidth;
 
        if(st>=10){
            ob.style.width=st;
            //ob2.style.width=st2;
            //obLeft.style.width=st-obLeftWidth;
            obRight.style.width=(parseInt(obwidth - st + obRightWidth) > 10 ? (obwidth - st + obRightWidth) : iEdgeThreshold + "px") ;
        }
        if(document.selection) document.selection.empty();
        else if(window.getSelection)window.getSelection().removeAllRanges();
    }
}
 
function MU(event) {
    if(!event) event = window.event;
    if(ob){
        if(document.selection) document.selection.empty();
        else if(window.getSelection)window.getSelection().removeAllRanges();
        ob = null;
    }
}
 
document.onmousedown = MD;
document.onmousemove = MM;
document.onmouseup = MU;