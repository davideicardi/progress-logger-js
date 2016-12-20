"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ProgressLogger {
    constructor(options = null) {
        this.options = {
            label: "Processing",
            logger: console,
            logInterval: 5000,
            count: null
        };
        this.successItems = 0;
        this.errorItems = 0;
        this.startTime = new Date();
        this.errors = new Set();
        this.options = Object.assign(this.options, options);
        this.log(`started at ${new Date().toISOString()}`);
    }
    increment(error = null, incValue = 1) {
        if (error) {
            this.errorItems += incValue;
            this.errors.add(error.message);
        }
        else
            this.successItems += incValue;
        let elapsed = this.elapsedFromLastLog();
        if (elapsed >= this.options.logInterval
            || this.items() == this.options.count) {
            let rateAtSeconds = this.lastRate(elapsed).toFixed(2);
            let errorsStatus = this.errorItems > 0 ? `, ${this.errorItems} errors` : "";
            if (this.options.count) {
                let percentage = this.percentage().toFixed(2);
                this.log(`... ${percentage}% (${this.items()} of ${this.options.count}${errorsStatus}, ${rateAtSeconds}/sec)`);
            }
            else {
                this.log(`... ${this.items()}${errorsStatus} (${rateAtSeconds}/sec)`);
            }
        }
        return this;
    }
    incrementPromise(incPromise) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield incPromise;
            }
            catch (err) {
                this.increment(err);
                return;
            }
            this.increment();
        });
    }
    percentage() {
        return this.options.count
            ? this.items() * 100 / this.options.count
            : null;
    }
    items() {
        return this.successItems + this.errorItems;
    }
    end() {
        let endTime = new Date();
        let elapsed = (endTime.getTime() - this.startTime.getTime());
        let elapsedSecs = elapsed / 1000;
        const itemsCount = this.items();
        let rateAtSeconds = this.round2(itemsCount / (elapsedSecs || 1));
        let errorsStatus = this.errorItems > 0 ? `, ${this.errorItems} errors` : "";
        this.log(`completed (${this.successItems} success, ${this.errorItems} errors) in ${elapsedSecs.toFixed(1)} seconds (${rateAtSeconds}/sec)`);
        this.statistics = {
            label: this.options.label,
            start: this.startTime,
            end: endTime,
            elapsed: elapsed,
            avg: elapsed / (itemsCount || 1),
            rate: rateAtSeconds,
            count: itemsCount,
            success: itemsCount > 0 ? this.successItems / itemsCount : 0,
            errors: Array.from(this.errors)
        };
        return this;
    }
    stats() {
        return this.statistics;
    }
    lastRate(elapsed) {
        return (this.items() - this.lastLogItems) / (elapsed / 1000);
    }
    elapsedFromLastLog() {
        let current = Date.now();
        let elapsed = current - this.lastLogTime.getTime();
        elapsed = elapsed || 1;
        return elapsed;
    }
    round2(n) {
        return Math.round(n * 100) / 100;
    }
    log(msg) {
        this.lastLogTime = new Date();
        this.lastLogItems = this.items();
        this.options.logger.log(`${this.options.label} ${msg}`);
    }
}
exports.ProgressLogger = ProgressLogger;
