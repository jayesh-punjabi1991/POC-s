"use strict";
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home.component");
var about_component_1 = require("./components/about.component");
var sponsorDetailForm_component_1 = require("./components/sponsorDetailForm.component");
var Acknowledgement_component_1 = require("./components/Acknowledgement.component");
var auctionDonation_component_1 = require("./components/auctionDonation.component");
var invoice_component_1 = require("./components/invoice.component");
var appRoute = [
    {
        path: 'forum',
        component: app_component_1.AppComponent,
        children: [
            {
                path: 'home',
                component: home_component_1.HomeComponent
            },
            {
                path: 'about',
                component: about_component_1.AboutComponent
            },
            {
                path: 'sponsorDetailForm',
                component: sponsorDetailForm_component_1.SponsorDetailComponent
            },
            {
                path: 'acknowledgement',
                component: Acknowledgement_component_1.AcknowledgementComponent
            },
            {
                path: 'auctionDonationInformation',
                component: auctionDonation_component_1.AuctionDonationComponent
            },
            {
                path: 'invoice',
                component: invoice_component_1.InvoiceComponent
            }
        ]
    },
    { path: '**', redirectTo: 'forum/home' }
];
exports.Routing = router_1.RouterModule.forRoot(appRoute);
//# sourceMappingURL=app.routing.js.map