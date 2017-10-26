define(['angular', './sample-module'], function(angular, directive) {
    'use strict';

    directive.directive('selectDisable', ['$log', function($log) {
        return {
            restrict: 'A',
            link: function(scope, element, attributes, ngModel) {
                
                //Disable The Empty field in Select(Make Unselectable)
                element.bind('click', function(){
                    if(this.children[0].value.includes('?')==true){
                        this.children[0].setAttribute("disabled",true);
                    }
                });

                element.bind('change', function(el){
                    //debugger
                    var val=this.value;
                    var childList=this.children;

                    for(var i=0; i<childList.length; i++){

                       if(childList[i].value==val){
                         this.children[i].setAttribute("disabled",true);
                         var sel1=document.getElementById('machineList');
                         var sel1=document.getElementById('affliationList');
                       }
                       else{
                         //   this.children[i].removeAttribute("disabled");
                       }
                    }
                })               
            }





        };
    }]);
});
