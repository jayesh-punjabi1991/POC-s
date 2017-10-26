//ROUTING
 cisco.config(function($stateProvider, $urlRouterProvider) {
    
   // $urlRouterProvider.otherwise('/index');

  $stateProvider
  .state('index', {
           url: '/Index',
            templateUrl:'index.html'
        })  
  .state('VSM', {
           url: '/VSM',
            templateUrl:'Submenu/VSM.html'
        })  
   .state('CMX', {
           url: '/CMX',
           templateUrl:'Submenu/CMX.html'
        }) 
   .state('VSM.CamHealth', {
            url: '/CamHealth',
            templateUrl:'Submenu/Templates/CamHealth.html',
            controller:'CamHealthCtrl'
        }) 
   .state('VSM.AssetOperational', {
            url: '/AssetOperational',
            templateUrl:'Submenu/Templates/AssetAlert.html',
            controller:'AssetAlertCtrl'
        })
     .state('VSM.AssetAlertMontioring', {
            url: '/AssetAlertMontioring',
            templateUrl:'Submenu/Templates/AssetAlertMontioring.html',
            controller:'AssetAlertMontioringCtrl'
        })
      .state('VSM.VSMUsage', {
            url: '/VSMUsage',
            templateUrl:'Submenu/Templates/VSMUsage.html',
            controller:'VSMUsageCtrl'
        })
       .state('VSM.SmartParking', {
            url: '/SmartParking',
            templateUrl:'Submenu/Templates/SmartParking.html',
            controller:'SmartParkingCtrl'
        })
       .state('CMX.BusiestDay', {
            url: '/BusiestDay',
            templateUrl:'Submenu/Templates/BusiestDay.html',
            controller:'BusiestDayCtrl'
        })
         .state('CMX.NewVisitorPattern', {
            url: '/NewVisitorPattern',
            templateUrl:'Submenu/Templates/NewVisitorPattern.html',
            controller:'NewVisitorPatternCtrl'
        })
          .state('CMX.Map', {
            url: '/Map',
            templateUrl:'Submenu/Templates/Map.html',
            controller:'mapCtrl'
        })
          .state('CMX.Donut', {
            url: '/Donut',
            templateUrl:'Submenu/Templates/Donut.html',
            controller:'DonutCtrl'
        })
});
