smartcity.controller('PlacesofAttractionCtrl', function ($scope, $document) {

     // Adding for default selection -- Praveen
      $('.Submenu li').removeClass("active");
 $('#liPlaces').addClass("active");
     
    $scope.name_of_map = "Jaipur Map";
    $scope.coordx = 50;
    $scope.coordy = 50;
    $document.on('mousemove', function(e){
        $scope.coordx = e.pageX;
        $scope.coordy = e.pageY;
        $scope.$apply();
    });
    $scope.show_line = false;

});
smartcity.directive('dirMap', function($document){
    return {
        retrict: 'A',
        scope: {},      
        link: function(scope, elem, attrs){               
               elem.on("mouseenter", function(){ 
                    angular.element(document.querySelector('.title')).css('display', 'block').css("left", Number(attrs.cx) + 20 + 'px').css("top", attrs.cy + 'px').html(attrs.title);                                              
               });
               elem.on("mouseleave", function(){     
                        angular.element(document.querySelector('.title')).css('display', 'none').css("left", '0px').css("top", '0px');;              
               });               
        }
    }
});
smartcity.directive('userPosition', function($document, $interval){
    return {
        retrict: 'A',      
        link: function(scope, elem, attrs){             
        }
    }
});
smartcity.directive('placeGlow', function($document, $interval){
    return {
        retrict: 'A', 

        link: function(scope, elem, attrs){             

               $interval(function(){  
                                      
                            elem.attr("r", Number(elem.attr('r')) + 1);
                            if(Number(elem.attr('r')) == 10){
                                elem.attr("r", 1);
                            }                                          
                        
               }, 50);
        }
    }
});
smartcity.directive('customTitle', function($document, $interval){
    return {
        retrict: 'A',
        link: function(scope, elem, attrs){
                if(angular.equals(attrs.markerName, "user")){
                    elem.find("title").html("<p>MAC Address:</p> " + attrs.macIp + "<br><b>Location:</b> " + attrs.loc + "<br><b>URL:</b> "+ attrs.url);
                }
                else if(angular.equals(attrs.markerName, "place")){
                    elem.find("title").html("<b>Place Name:</b> " + attrs.placeName + "<br><b>Famous Shop:</b> " + attrs.shopName + "<br><b>Distance:</b> " + attrs.dis + "km");
                }

        }
    }
});