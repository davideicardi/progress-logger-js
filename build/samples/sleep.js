"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sleep(milliseconds) {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
exports.sleep = sleep;
