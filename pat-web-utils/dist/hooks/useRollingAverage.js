"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRollingAverage = void 0;
const react_1 = require("react");
function useRollingAverage(sampleSize, initialValue) {
    const [values, setValues] = (0, react_1.useState)([]);
    const record = (value) => {
        const newValues = [...values, value];
        if (sampleSize && newValues.length > sampleSize) {
            newValues.splice(0, newValues.length - sampleSize);
        }
        setValues(newValues);
    };
    if (values.length === 0) {
        return [initialValue, record];
    }
    return [values.reduce((prev, cur) => prev + cur, 0) / values.length, record];
}
exports.useRollingAverage = useRollingAverage;
