"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompareFn = void 0;
function getCompareFn(...sortKeys) {
    if (sortKeys.length === 0) {
        throw new Error("No sort keys given");
    }
    const sortSteps = sortKeys.map((step) => {
        if (typeof step === "string" || typeof step === "function") {
            return { key: step };
        }
        else {
            return step;
        }
    });
    return (a, b) => {
        for (const { key, order = "asc", nulls = "end" } of sortSteps) {
            let v_a, v_b;
            if (typeof key === "string") {
                v_a = a[key];
                v_b = b[key];
            }
            else {
                v_a = key(a);
                v_b = key(b);
            }
            if (v_a === v_b || (v_a == null && v_b == null)) {
                // first sort key resulted in equal values, sub-sort using next sort key
                continue;
            }
            if (v_a == null) {
                return nulls === "start" ? -1 : 1;
            }
            else if (v_b == null) {
                return nulls === "start" ? 1 : -1;
            }
            const orderMultiplier = order === "asc" ? 1 : -1;
            return orderMultiplier * Math.sign(v_a - v_b);
        }
        return 0; // all sort keys were equal
    };
}
exports.getCompareFn = getCompareFn;
