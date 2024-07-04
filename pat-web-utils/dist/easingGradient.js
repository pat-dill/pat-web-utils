"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.easingGradient = void 0;
const interpolateColor_1 = require("./interpolateColor");
function easingGradient(color1, color2, easeFunc, from = "0%", to = "100%", stops = 15) {
    const results = [];
    for (let i = 0; i <= stops; i++) {
        const timeAlpha = i / stops;
        const colorAlpha = easeFunc(timeAlpha);
        results.push(`${(0, interpolateColor_1.interpolateColor)(color1, color2, colorAlpha)} calc(((${to} - ${from}) * ${timeAlpha}) + ${from})`);
    }
    return results.join(", ");
}
exports.easingGradient = easingGradient;
