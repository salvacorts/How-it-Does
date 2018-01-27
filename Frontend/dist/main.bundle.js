webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_reviewsService__ = __webpack_require__("../../../../../src/app/services/reviewsService.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__controllers_cards__ = __webpack_require__("../../../../../src/app/controllers/cards.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__controllers_tabs__ = __webpack_require__("../../../../../src/app/controllers/tabs.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__controllers_search__ = __webpack_require__("../../../../../src/app/controllers/search.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__controllers_results__ = __webpack_require__("../../../../../src/app/controllers/results.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["H" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_7__controllers_tabs__["a" /* TabsController */],
                __WEBPACK_IMPORTED_MODULE_6__controllers_cards__["b" /* CardsController */],
                __WEBPACK_IMPORTED_MODULE_8__controllers_search__["a" /* SearchController */],
                __WEBPACK_IMPORTED_MODULE_9__controllers_results__["a" /* ResultsController */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["b" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["c" /* MatGridListModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["e" /* MatTabsModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["d" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_10__angular_material__["a" /* MatButtonModule */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__services_reviewsService__["a" /* ReviewsService */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__controllers_search__["a" /* SearchController */], __WEBPACK_IMPORTED_MODULE_9__controllers_results__["a" /* ResultsController */], __WEBPACK_IMPORTED_MODULE_7__controllers_tabs__["a" /* TabsController */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/controllers/cards.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CardsController; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardKind; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_reviewsService__ = __webpack_require__("../../../../../src/app/services/reviewsService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CardsController = /** @class */ (function () {
    function CardsController(reviewsService) {
        this.reviewsService = reviewsService;
    }
    CardsController.prototype.ngOnInit = function () {
        if (this.kind == CardKind.great)
            this.reviews = this.reviewsService.great_reviews;
        else if (this.kind == CardKind.good)
            this.reviews = this.reviewsService.good_reviews;
        else if (this.kind == CardKind.patchy)
            this.reviews = this.reviewsService.patchy_reviews;
        else if (this.kind == CardKind.bad)
            this.reviews = this.reviewsService.bad_reviews;
        else if (this.kind == CardKind.crap)
            this.reviews = this.reviewsService.crap_reviews;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Input */])(),
        __metadata("design:type", String)
    ], CardsController.prototype, "kind", void 0);
    CardsController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'cards',
            template: __webpack_require__("../../../../../src/app/templates/cards.html"),
            styles: [__webpack_require__("../../../../../src/app/styles/cards.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_reviewsService__["a" /* ReviewsService */]])
    ], CardsController);
    return CardsController;
}());

var CardKind;
(function (CardKind) {
    CardKind["great"] = "great";
    CardKind["good"] = "good";
    CardKind["patchy"] = "patchy";
    CardKind["bad"] = "bad";
    CardKind["crap"] = "crap";
})(CardKind || (CardKind = {}));


/***/ }),

/***/ "../../../../../src/app/controllers/results.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResultsController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_reviewsService__ = __webpack_require__("../../../../../src/app/services/reviewsService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ResultsController = /** @class */ (function () {
    function ResultsController(reviewsService) {
        this.reviewsService = reviewsService;
    }
    ResultsController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'results',
            template: __webpack_require__("../../../../../src/app/templates/results.html"),
            styles: [__webpack_require__("../../../../../src/app/styles/results.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_reviewsService__["a" /* ReviewsService */]])
    ], ResultsController);
    return ResultsController;
}());



/***/ }),

/***/ "../../../../../src/app/controllers/search.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_reviewsService__ = __webpack_require__("../../../../../src/app/services/reviewsService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SearchController = /** @class */ (function () {
    function SearchController(reviewsService) {
        this.reviewsService = reviewsService;
    }
    SearchController.prototype.Search = function (inputValue) {
        this.reviewsService.Search(inputValue);
    };
    SearchController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'search',
            template: __webpack_require__("../../../../../src/app/templates/search.html"),
            styles: [__webpack_require__("../../../../../src/app/styles/search.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_reviewsService__["a" /* ReviewsService */]])
    ], SearchController);
    return SearchController;
}());



/***/ }),

/***/ "../../../../../src/app/controllers/tabs.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__cards__ = __webpack_require__("../../../../../src/app/controllers/cards.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_reviewsService__ = __webpack_require__("../../../../../src/app/services/reviewsService.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TabsController = /** @class */ (function () {
    function TabsController(reviewsService) {
        this.reviewsService = reviewsService;
        this.cardKind = __WEBPACK_IMPORTED_MODULE_1__cards__["a" /* CardKind */]; // Permite usar el enumerado para llamar a <cards> en el html
    }
    TabsController = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'tabs',
            template: __webpack_require__("../../../../../src/app/templates/tabs.html"),
            styles: [__webpack_require__("../../../../../src/app/styles/tabs.css")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_reviewsService__["a" /* ReviewsService */]])
    ], TabsController);
    return TabsController;
}());



/***/ }),

/***/ "../../../../../src/app/parsers/parser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Parser; });
/* harmony export (immutable) */ __webpack_exports__["a"] = GetAvailibleParsers;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var apiURL = "http://127.0.0.1:8080";
var Parser = /** @class */ (function () {
    function Parser(provider, http) {
        this.http = http;
        this.url = apiURL + "/" + provider + "/";
    }
    // REF: https://labs.encoded.io/2016/12/08/asyncawait-with-angular/
    // REF: https://www.w3schools.com/jsref/jsref_replace.asp
    Parser.prototype.RetrieveReviews = function (pattern) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pattern = pattern.replace(/ /g, "+");
                        return [4 /*yield*/, this.http.get(this.url + pattern).toPromise()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Parser;
}());

function GetAvailibleParsers(http) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, http.get(apiURL + "/availible").toPromise()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}


/***/ }),

/***/ "../../../../../src/app/services/reviewsService.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReviewsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("../../../common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__parsers_parser__ = __webpack_require__("../../../../../src/app/parsers/parser.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var ReviewsService = /** @class */ (function () {
    function ReviewsService(http) {
        var _this = this;
        this.great_reviews = [];
        this.good_reviews = [];
        this.patchy_reviews = [];
        this.bad_reviews = [];
        this.crap_reviews = [];
        this.parsers = [];
        // Automatically get availible parsers from API and add them to parsers array
        Object(__WEBPACK_IMPORTED_MODULE_2__parsers_parser__["a" /* GetAvailibleParsers */])(http).then(function (parsers) {
            for (var _i = 0, parsers_1 = parsers; _i < parsers_1.length; _i++) {
                var parser = parsers_1[_i];
                _this.parsers.push(new __WEBPACK_IMPORTED_MODULE_2__parsers_parser__["b" /* Parser */](parser, http));
            }
        });
        // NOTE: Add new parsers here
    }
    ReviewsService.prototype.Search = function (item) {
        var _this = this;
        this.great_reviews.length = 0;
        this.good_reviews.length = 0;
        this.patchy_reviews.length = 0;
        this.bad_reviews.length = 0;
        this.crap_reviews.length = 0;
        this.current_item = item;
        // REF: https://codecraft.tv/courses/angular/http/http-with-promises/
        for (var _i = 0, _a = this.parsers; _i < _a.length; _i++) {
            var parser = _a[_i];
            parser.RetrieveReviews(item).then(function (reviews) {
                _this.ClassifyReviews(reviews);
            });
        }
    };
    ReviewsService.prototype.ClassifyReviews = function (reviews) {
        return __awaiter(this, void 0, void 0, function () {
            var rating_sum, _i, reviews_1, review, rating;
            return __generator(this, function (_a) {
                rating_sum = 0;
                for (_i = 0, reviews_1 = reviews; _i < reviews_1.length; _i++) {
                    review = reviews_1[_i];
                    rating = review.Rating;
                    rating_sum += rating;
                    if (rating >= 4.5)
                        this.great_reviews.push(review);
                    else if (rating < 4.5 && rating >= 4)
                        this.good_reviews.push(review);
                    else if (rating < 4 && rating >= 3)
                        this.patchy_reviews.push(review);
                    else if (rating < 3 && rating >= 1)
                        this.bad_reviews.push(review);
                    else
                        this.bad_reviews.push(review);
                }
                this.average_rating = rating_sum / reviews.length;
                return [2 /*return*/];
            });
        });
    };
    ReviewsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Injectable */])() // Singleton
        ,
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], ReviewsService);
    return ReviewsService;
}());



/***/ }),

/***/ "../../../../../src/app/styles/cards.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Avoid overflow on text inside card */\nmat-card-content {\n   margin-left: 10px;\n   overflow-wrap: break-word;\n   word-wrap: break-word;\n   -webkit-hyphens: auto;\n       -ms-hyphens: auto;\n           hyphens: auto;\n   font-size: 1em;\n}\nmat-card {\n  /* min-height: 80%; */\n  overflow: hidden;\n}\n.avatar {\n  background-image: url('https://material.angular.io/assets/img/examples/shiba1.jpg');\n  background-size: cover;\n  height: 40px;\n  width: 40px;\n  border-radius: 50%;\n  -ms-flex-negative: 0;\n      flex-shrink: 0;\n}\n.reviews-container {\n  background-color: #ededed;\n}\n/* Create grid */\n.grid-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -ms-flex-line-pack: stretch;\n      align-content: stretch;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding-bottom: 2em;\n}\n.grid-item {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  -ms-flex-item-align: stretch;\n      align-self: stretch;\n  -webkit-box-flex: 2;\n      -ms-flex-positive: 2;\n          flex-grow: 2;\n  -ms-flex-negative: 3;\n      flex-shrink: 3;\n  -ms-flex-preferred-size: auto;\n      flex-basis: auto;\n  max-width: 40%;\n  min-width: 40%;\n  padding: 12px 12px 12px 12px;\n}\n.empty-container {\n  text-align: center;\n  padding-top: 2.5em;\n  opacity: 0.4;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/styles/results.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".content {\n   padding-top: 1.2em;\n   color: #212121;\n}\n\n.content h1 {\n   font-size: 1.6em;\n}\n\n.instructions {\n   padding-top: 3em;\n   height: 20em;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/styles/search.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".search-box {\n   padding-top: 6%;\n   width: 100%;\n   height: 36px;\n}\n\n:host {\n   width: 40em;\n   -webkit-box-pack: center;\n       -ms-flex-pack: center;\n           justify-content: center;\n}\n\ninput[type=text] {\n   float: left;\n   width: 85%;\n   height: 100%;\n   -webkit-box-sizing: border-box;\n           box-sizing: border-box;\n   padding-left: 10px;\n   border: none; \n   font-size: 16px;\n   background-color: white;\n   color: #616161;\n   -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);\n           box-shadow: 0 2px 2px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08);\n}\n\ninput[type=text]:focus {\n    outline-style: none;\n    outline-color: transparent;\n    color: #212121;\n}\n\n.search-button {\n   float: left;\n   width: 15%;\n   height: 100%;\n   line-height: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/styles/tabs.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Align tabs to center */\n::ng-deep .mat-tab-labels {\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center; /* align items in Main Axis */\n}\n::ng-deep .mat-tab-label {\n   width: 1%;\n   font-size: 16px;\n}\n::ng-deep .mat-tab-group.mat-primary .mat-tab-label:focus {\n   background-color: transparent;\n}\n/* Card background color */\n::ng-deep .mat-tab-body-wrapper {\n   background-color: #ededed;\n}\n.tab-icon {\n   width: 20%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/templates/cards.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"grid-container\" *ngIf=\"reviews.length > 0\">\n  <div class=\"grid-item\" *ngFor=\"let review of reviews\">\n    <mat-card class=\"card\">\n      <mat-card-header>\n        <img mat-card-avatar src=\"{{review.Avatar}}\">\n        <mat-card-title>{{review.Author}}</mat-card-title>\n        <mat-card-subtitle>{{review.Origin}}</mat-card-subtitle>\n      </mat-card-header>\n      <mat-card-content>\n        {{review.Text}}        \n      </mat-card-content>\n    </mat-card>\n  </div>\n</div>\n\n<div class=\"empty-container\" *ngIf=\"reviews.length == 0\">\n  <h2>No one thinks this is {{kind}}</h2>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/results.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"content\" *ngIf=\"reviewsService.current_item\">\n   <h2>{{reviewsService.current_item}} is {{reviewsService.average_rating}}</h2>\n   <script async src=\"//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js\"></script>\n   <script>\n      (adsbygoogle = window.adsbygoogle || []).push({\n         google_ad_client: \"ca-pub-8491145149712894\",\n         enable_page_level_ads: true\n      });\n   </script>\n</div>\n<div class=\"instructions\" *ngIf=\"!reviewsService.current_item\">\n   <h2>TODO: Intructions should go here</h2>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/search.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"search-box\">\n   <input #input type=\"text\" name=\"search\" placeholder=\"Search...\">\n   <button class=\"search-button\" mat-raised-button color=\"primary\" (click)=\"Search(input.value)\">Search</button>\n</div>"

/***/ }),

/***/ "../../../../../src/app/templates/tabs.html":
/***/ (function(module, exports) {

module.exports = "<mat-tab-group>\n   <mat-tab>\n      <ng-template mat-tab-label>\n         Great\n         <img src=\"/assets/images/emoji/great.png\" class=\"tab-icon\" hspace=\"10\">\n      </ng-template>\n      <cards [kind]=\"cardKind.great\"></cards>\n   </mat-tab>\n   <mat-tab [disabled]=\"!reviewsService.current_item\">\n      <ng-template mat-tab-label>\n         Good\n         <img src=\"/assets/images/emoji/good.png\" class=\"tab-icon\" hspace=\"10\">\n      </ng-template>\n      <cards [kind]=\"cardKind.good\"></cards>\n   </mat-tab>\n   <mat-tab [disabled]=\"!reviewsService.current_item\">\n      <ng-template mat-tab-label>\n         Patchy\n         <img src=\"/assets/images/emoji/patchy.png\" class=\"tab-icon\" hspace=\"10\">\n      </ng-template>\n      <cards [kind]=\"cardKind.patchy\"></cards>\n   </mat-tab>\n   <mat-tab [disabled]=\"!reviewsService.current_item\">\n      <ng-template mat-tab-label>\n         Bad\n         <img src=\"/assets/images/emoji/bad.png\" class=\"tab-icon\" hspace=\"10\">\n      </ng-template>\n      <cards [kind]=\"cardKind.bad\"></cards>\n   </mat-tab>\n   <mat-tab [disabled]=\"!reviewsService.current_item\">\n      <ng-template mat-tab-label>\n         Crap\n         <img src=\"/assets/images/emoji/crap.png\" class=\"tab-icon\" hspace=\"10\">\n      </ng-template>\n      <cards [kind]=\"cardKind.crap\"></cards>\n   </mat-tab>\n</mat-tab-group>"

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_12" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map