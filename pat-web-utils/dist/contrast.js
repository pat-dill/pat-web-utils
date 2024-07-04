"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHex = exports.shouldUseLightText = exports.getContrast = exports.getLuminance = void 0;
function getRGB(c) {
    return parseInt(c, 16);
}
function getsRGB(c) {
    return getRGB(c) / 255 <= 0.03928 ?
        getRGB(c) / 255 / 12.92
        : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4);
}
function getLuminance(hexColor) {
    return (0.2126 * getsRGB(hexColor.substr(1, 2)) +
        0.7152 * getsRGB(hexColor.substr(3, 2)) +
        0.0722 * getsRGB(hexColor.substr(5, 2)));
}
exports.getLuminance = getLuminance;
function getContrast(f, b) {
    const L1 = getLuminance(f);
    const L2 = getLuminance(b);
    return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
}
exports.getContrast = getContrast;
function shouldUseLightText(bgColor) {
    const whiteContrast = getContrast(bgColor || "#ffffff", "#ffffff");
    const blackContrast = getContrast(bgColor || "#ffffff", "#000000");
    return whiteContrast > blackContrast;
}
exports.shouldUseLightText = shouldUseLightText;
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
}
exports.rgbToHex = rgbToHex;
