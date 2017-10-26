//ROUTING
 smartcity.config(function($stateProvider, $urlRouterProvider) {
    
   // $urlRouterProvider.otherwise('/index');

  $stateProvider
  .state('index', {
           url: '/Index',
           templateUrl:'index.html'
        })  
  .state('WifiManagement', {
           url: '/SmartWifiManagement',           
           templateUrl:'Submenu/Templates/SmartWifiManagement.html',
           controller:'SmartWifiManagementCtrl'
        })
  .state('Surveillance', {
           url: '/SmartSurveillance',           
           templateUrl:'Submenu/Templates/SmartSurveillance.html',
           controller:'SmartSurveillanceCtrl'
        })
  .state('WifiManagement.BusiestDay', {
           url: '/BusiestDay',           
           templateUrl:'Submenu/Templates/BusiestDay.html',
           controller:'BusiestDayCtrl'
        })
  .state('WifiManagement.NewVisitorPattern', {
           url: '/NewVisitorPattern',           
           templateUrl:'Submenu/Templates/NewVisitorPattern.html',
           controller:'NewVisitorPatternCtrl'
        })
  .state('WifiManagement.PlacesofAttraction', {
           url: '/PlacesofAttraction',           
           templateUrl:'Submenu/Templates/PlacesofAttraction.html',
           controller:'PlacesofAttractionCtrl'
        })
  .state('WifiManagement.CustomerVisitPattern', {
           url: '/CustomerVisitPattern',           
           templateUrl:'Submenu/Templates/CustomerVisitPattern.html',
           controller:'CustomerVisitPatternCtrl'
        })
   //VSM
  .state('Surveillance.VSMAccessUsageStatistics', {
           url: '/VSMAccessUsageStatistics',           
           templateUrl:'Submenu/Templates/VSMAccessUsageStatistics.html',
           controller:'VSMAccessUsageStatisticsCtrl'
        })
  .state('Surveillance.OperationalStatus', {
           url: '/OperationalStatus',           
           templateUrl:'Submenu/Templates/OperationalStatus.html',
           controller:'OperationalStatusCtrl'
        })
  .state('Surveillance.AssetHealthMonitoring', {
           url: '/AssetHealthMonitoring',           
           templateUrl:'Submenu/Templates/AssetHealthMonitoring.html',
           controller:'AssetHealthCtrl'
        })
  .state('Surveillance.AlertManagementDiagnosis', {
           url: '/AlertManagementDiagnosis',           
           templateUrl:'Submenu/Templates/AlertManagementDiagnosis.html',
           controller:'AlertManagmentCtrl'
        })
  .state('Surveillance.SmartparkingAvailabilityMonitor', {
           url: '/SmartparkingAvailabilityMonitor',           
           templateUrl:'Submenu/Templates/SmartparkingAvailabilityMonitor.html',
           controller:'SmartParkingCtrl'
        })

});
