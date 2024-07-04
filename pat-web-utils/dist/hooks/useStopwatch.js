"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStopwatch = void 0;
const react_1 = require("react");
function useStopwatch() {
    const [lapTime, setLapTime] = (0, react_1.useState)(new Date());
    const resetTimer = () => setLapTime(new Date());
    const getTime = () => new Date().valueOf() - lapTime.valueOf();
    return [resetTimer, getTime, lapTime];
}
exports.useStopwatch = useStopwatch;
