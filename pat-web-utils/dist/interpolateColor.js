"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interpolateColor = exports.convertToRgba = void 0;
const is = {
    hex: (a) => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
    rgb: (a) => /^rgb\(/.test(a),
    col: (a) => is.hex(a) || is.rgb(a),
};
const convertToRgba = (colour, alpha) => {
    return (is.hex(colour) ? hexToRgba(colour, alpha)
        : is.rgb(colour) ? rbgToRgba(colour, alpha)
            : colour);
};
exports.convertToRgba = convertToRgba;
const hexToRgba = (colour, alpha = 1) => {
    const match = colour.match(/\w\w/g);
    if (!match)
        throw new Error("invalid color");
    const [r, g, b] = match.map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha !== null && alpha !== void 0 ? alpha : 1})`;
};
const rbgToRgba = (colour, alpha = 1) => {
    const [r, g, b] = colour.replace(/[^\d,]/g, "").split(",");
    return `rgba(${r},${g},${b},${alpha !== null && alpha !== void 0 ? alpha : 1})`;
};
const deconstructRgba = (rgba) => {
    return rgba
        .replace(/[^\d,]/g, "")
        .split(",")
        .map((x) => parseInt(x));
};
const formatRbga = (colour) => {
    return `rgba(${colour.r},${colour.g},${colour.b},${colour.a})`;
};
const interpolateColor = (colourA, colourB, progress) => {
    const [r1, g1, b1, a1] = deconstructRgba((0, exports.convertToRgba)(colourA));
    const [r2, g2, b2, a2] = deconstructRgba((0, exports.convertToRgba)(colourB));
    return formatRbga({
        r: Math.round((r2 - r1) * progress + r1),
        g: Math.round((g2 - g1) * progress + g1),
        b: Math.round((b2 - b1) * progress + b1),
        a: (a2 - a1) * progress + a1,
    });
};
exports.interpolateColor = interpolateColor;
