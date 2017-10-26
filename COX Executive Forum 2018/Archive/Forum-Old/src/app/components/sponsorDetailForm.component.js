"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var addSponsor_service_1 = require("../services/addSponsor.service");
var passData_service_1 = require("../services/passData.service");
var SponsorDetailComponent = (function () {
    function SponsorDetailComponent(PassService, AddService) {
        this.PassService = PassService;
        this.AddService = AddService;
        sessionStorage.clear();
        this.returnSponsorDetails = null;
        this.Message = "Please Fill all the Mandatory Fields";
    }
    SponsorDetailComponent.prototype.ngOnInit = function () { };
    SponsorDetailComponent.prototype.Confirm = function () {
        var _this = this;
        var count = 0;
        var count1 = 0;
        $('form input[type=text]').each(function (i) {
            if ($(this).val() != '') {
                count += 1;
            }
        });
        $('form input[type=number]').each(function (i) {
            if ($(this).val() != '') {
                count += 1;
            }
        });
        $('form input[type=email]').each(function (i) {
            if ($(this).val() != '') {
                count += 1;
            }
        });
        if (count != 15) {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        else {
            $('form input[type=email]').each(function (i) {
                if ($(this).val().includes("@") && $(this).val().includes(".")) {
                    count1 += 1;
                }
                else {
                    document.getElementById('snackbar').innerHTML = "Please Fill the Email Address Correctly";
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                }
            });
        }
        if (count1 == 3) {
            this.SponsorDetails = {
                userDetails: {
                    name: this.sponsorsName,
                    email: this.emailAdd,
                    title: this.tit,
                    company: this.companyName,
                    phoneNumber: this.phoneNo,
                    coxContact: this.coxCont,
                    noOfAttendees: this.noOfAttend,
                    invoiceContact: this.invoiceCont,
                    invoiceContactEmail: this.invoiceContEmail,
                    invoiceContactPhone: this.invoiceContPhone,
                    signageContact: this.signageCont,
                    signageContactEmail: this.signageContEmail,
                    signageContactPhone: this.signageContPhone,
                    address: {
                        companyAddress: this.companyAdd,
                        cityStateZip: this.cSZ,
                    }
                }
            };
            console.log(this.SponsorDetails);
            this.AddService.addSponsor(this.SponsorDetails).subscribe(function (returned) {
                _this.returnSponsorDetails = returned;
                if (Object.keys(returned).length == 2) {
                    if (returned.errorCode == "23502") {
                        document.getElementById('snackbar').innerHTML = "Email Address has already been registered";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    }
                    else if (returned.errorCode == "508") {
                        document.getElementById('snackbar').innerHTML = "There was an issue in saving details of user. Please try again";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    }
                    else if (returned.errorCode == "500") {
                        document.getElementById('snackbar').innerHTML = "Error has occurred. Please contact admin";
                        var x = document.getElementById("snackbar");
                        x.className = "show";
                        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                    }
                }
                else {
                    _this.PassService.setSponsorDetail(_this.returnSponsorDetails);
                    setTimeout(function () {
                        window.location.href = '../forum/acknowledgement';
                    }, 5000);
                }
            });
        }
    };
    return SponsorDetailComponent;
}());
SponsorDetailComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'sponsorDetails',
        templateUrl: "sponsorDetailForm.component.html",
        styleUrls: ['../stylesheets/sponsorDetailForm.css'],
        providers: [addSponsor_service_1.AddService, passData_service_1.PassService]
    }),
    __metadata("design:paramtypes", [passData_service_1.PassService, addSponsor_service_1.AddService])
], SponsorDetailComponent);
exports.SponsorDetailComponent = SponsorDetailComponent;
//# sourceMappingURL=sponsorDetailForm.component.js.map