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
var validateCredentials_service_1 = require("../services/validateCredentials.service");
var DashboardComponent = (function () {
    function DashboardComponent(ValidateAdmin) {
        this.ValidateAdmin = ValidateAdmin;
        this.showTable = true;
        this.showMessage = false;
        this.sponsors = JSON.parse(sessionStorage.getItem("Sponsors"));
        this.number = this.sponsors.registeredUsers.length;
        if (this.number == 0) {
            this.showTable = false;
            this.showMessage = true;
        }
        this.total = this.number * 60000;
        for (this.i = 0; this.i < this.sponsors.registeredUsers.length; this.i++) {
            this.temp = new Date(this.sponsors.registeredUsers[this.i].registrationDate);
            this.sponsors.registeredUsers[this.i].registrationDate = this.temp.getMonth() + 1 + '/' + this.temp.getDate() + '/' + this.temp.getFullYear();
        }
        console.log(this.sponsors.registeredUsers);
    }
    DashboardComponent.prototype.refresh = function () {
        var _this = this;
        this.credentials = JSON.parse(sessionStorage.getItem("Credentials"));
        this.ValidateAdmin.validateAdmin(this.credentials).subscribe(function (returned) {
            sessionStorage.setItem('Sponsors', JSON.stringify(returned));
            _this.sponsors = JSON.parse(sessionStorage.getItem("Sponsors"));
            _this.number = _this.sponsors.registeredUsers.length;
            if (_this.number == 0) {
                _this.showTable = false;
                _this.showMessage = true;
            }
            else {
                _this.showTable = true;
                _this.showMessage = false;
            }
            _this.total = _this.number * 60000;
            for (_this.i = 0; _this.i < _this.sponsors.registeredUsers.length; _this.i++) {
                _this.temp = new Date(_this.sponsors.registeredUsers[_this.i].registrationDate);
                _this.sponsors.registeredUsers[_this.i].registrationDate = _this.temp.getMonth() + 1 + '/' + _this.temp.getDate() + '/' + _this.temp.getFullYear();
            }
        });
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'dashboard',
        templateUrl: "dashboard.component.html",
        styleUrls: ['../stylesheets/dashboard.css'],
        providers: [validateCredentials_service_1.ValidateAdmin]
    }),
    __metadata("design:paramtypes", [validateCredentials_service_1.ValidateAdmin])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map