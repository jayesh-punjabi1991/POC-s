"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home.component");
var about_component_1 = require("./components/about.component");
var sponsorDetailForm_component_1 = require("./components/sponsorDetailForm.component");
var Acknowledgement_component_1 = require("./components/Acknowledgement.component");
var print_component_1 = require("./components/print.component");
var auction_component_1 = require("./components/auction.component");
var header_component_1 = require("./components/header.component");
var footer_component_1 = require("./components/footer.component");
var auctionDonation_component_1 = require("./components/auctionDonation.component");
var auctionDonationForm_component_1 = require("./components/auctionDonationForm.component");
var invoice_component_1 = require("./components/invoice.component");
var app_routing_1 = require("./app.routing");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.Routing],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, header_component_1.HeaderComponent, about_component_1.AboutComponent, footer_component_1.FooterComponent, sponsorDetailForm_component_1.SponsorDetailComponent, Acknowledgement_component_1.AcknowledgementComponent, print_component_1.PrintComponent, auction_component_1.AuctionComponent, auctionDonation_component_1.AuctionDonationComponent, auctionDonationForm_component_1.AuctionDonationFormComponent, invoice_component_1.InvoiceComponent],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map