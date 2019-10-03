"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const sleep_1 = require("./sleep");
function doWork() {
    return __awaiter(this, void 0, void 0, function* () {
        let progress = new index_1.ProgressLogger({
            label: "my-label",
            logInterval: 2000,
            count: 100
        });
        for (var i = 0; i < 100; i++) {
            yield sleep_1.sleep(200);
            if (Math.random() > 0.8)
                progress.increment(new Error("some error"));
            else
                progress.increment();
        }
        progress.end();
        console.log(progress.stats());
    });
}
doWork();
