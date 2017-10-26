smartcity.service("global", function(){
            this.formatAMPM = function(date){
                  var date = new Date(date);
                  var hours = date.getHours();
                  var minutes = date.getMinutes();
                  var ampm = hours >= 12 ? 'pm' : 'am';
                  hours = hours % 12;
                  hours = hours ? hours : 12; // the hour '0' should be '12'
                  minutes = minutes < 10 ? '0'+minutes : minutes;
                  var strTime = hours + ampm;
                  return strTime;
        };

   });

   smartcity.controller('SmartWifiManagementCtrl', function ($scope, global) { $(document).ready(function () {
    $("#menu-toggle").click(function(e) {
       e.preventDefault();
         
        $("#wrapper").toggleClass("active");
    e.stopPropagation();
         count++;
         if(count % 2==0)
         {
         }
         else
         {
         }
    })
  })
     });