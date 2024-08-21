"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelayedValue = void 0;
const react_1 = require("react");
const useAnimationFrame_1 = require("./useAnimationFrame");
function useDelayedValue(value, delayMs) {
    const [lastChange, setLastChange] = (0, react_1.useState)(0);
    const [debouncedValue, setDebouncedValue] = (0, react_1.useState)(value);
    (0, react_1.useLayoutEffect)(() => {
        setLastChange(performance.now());
    }, [value]);
    (0, useAnimationFrame_1.useAnimationFrame)(() => {
        const now = performance.now();
        if (now - lastChange >= delayMs) {
            setDebouncedValue(value);
        }
    });
    return debouncedValue;
}
exports.useDelayedValue = useDelayedValue;
