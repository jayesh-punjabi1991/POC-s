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
var router_1 = require("@angular/router");
var validateCredentials_service_1 = require("../services/validateCredentials.service");
var LoginComponent = (function () {
    function LoginComponent(ValidateAdmin, router) {
        this.ValidateAdmin = ValidateAdmin;
        this.router = router;
        this.user = null;
        this.pwd = null;
    }
    LoginComponent.prototype.validate = function () {
        var _this = this;
        if (!this.user || !this.pwd) {
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        }
        else {
            this.credentials = {
                username: this.user,
                password: this.pwd
            };
            sessionStorage.setItem("Credentials", JSON.stringify(this.credentials));
            this.ValidateAdmin.validateAdmin(this.credentials).subscribe(function (returned) {
                _this.response = returned;
                sessionStorage.setItem('Sponsors', JSON.stringify(_this.response));
                if (_this.response.registeredUsers) {
                    _this.success = true;
                    window.location.href = '../forumadmin/dashboard';
                }
                else {
                    _this.success = false;
                    document.getElementById('snackbar').innerHTML = "Incorrect Credentials";
                    var x = document.getElementById("snackbar");
                    x.className = "show";
                    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
                }
            });
        }
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'login',
        templateUrl: "login.component.html",
        styleUrls: ['../stylesheets/login.css'],
        providers: [validateCredentials_service_1.ValidateAdmin]
    }),
    __metadata("design:paramtypes", [validateCredentials_service_1.ValidateAdmin, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map