"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function doesThrow(cb, ...args) {
    try {
        cb(...args);
        return;
    }
    catch (e) {
        return e;
    }
}
exports.default = doesThrow;
