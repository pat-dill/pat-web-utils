"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMobile = void 0;
const usehooks_ts_1 = require("usehooks-ts");
function useIsMobile() {
    return (0, usehooks_ts_1.useWindowSize)().width < 768;
}
exports.useIsMobile = useIsMobile;
