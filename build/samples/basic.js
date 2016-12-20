"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const index_1 = require("../index");
const sleep_1 = require("./sleep");
function doWork() {
    return __awaiter(this, void 0, void 0, function* () {
        let progress = new index_1.ProgressLogger();
        for (var i = 0; i < 100; i++) {
            yield sleep_1.sleep(200);
            progress.increment();
        }
        progress.end();
        console.log(progress.stats());
    });
}
doWork();
