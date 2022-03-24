"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FilterEnterprise_1 = __importDefault(require("./filter/FilterEnterprise"));
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
app.get("/filterEnterprise", FilterEnterprise_1.default);
app.listen(3000, function () {
    console.log("Application started on port 3000!");
});
