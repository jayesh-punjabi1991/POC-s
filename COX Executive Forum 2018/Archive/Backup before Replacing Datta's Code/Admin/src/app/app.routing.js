"use strict";
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var login_component_1 = require("./components/login.component");
var dashboard_component_1 = require("./components/dashboard.component");
var appRoute = [
    {
        path: 'forumadmin',
        component: app_component_1.AppComponent,
        children: [
            {
                path: 'login',
                component: login_component_1.LoginComponent
            },
            {
                path: 'dashboard',
                component: dashboard_component_1.DashboardComponent
            }
        ]
    },
    { path: '**', redirectTo: 'forumadmin/login' }
];
exports.Routing = router_1.RouterModule.forRoot(appRoute);
//# sourceMappingURL=app.routing.js.map